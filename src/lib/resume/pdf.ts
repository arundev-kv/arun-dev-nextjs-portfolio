import { readFile } from 'fs/promises';
import path from 'path';
import {
  PDFArray,
  PDFDict,
  PDFDocument,
  PDFName,
  PDFNumber,
  PDFRawStream,
  decodePDFRawStream,
  type PDFPage,
} from 'pdf-lib';
import { resumeDateToken } from './date';

const FOOTER_FONT_SIZE = 7.5;

type TextArray = {
  start: number;
  end: number;
  body: string;
};

type Atom =
  | { kind: 'glyph'; ch: string }
  | { kind: 'kern'; raw: string; value: number };

function parsePdfLiteral(raw: string) {
  let text = '';
  const inner = raw.slice(1, -1);

  for (let index = 0; index < inner.length; index += 1) {
    const character = inner[index];

    if (character !== '\\') {
      text += character;
      continue;
    }

    const next = inner[(index += 1)];
    if (next === undefined) break;
    if (next === 'n') text += '\n';
    else if (next === 'r') text += '\r';
    else if (next === 't') text += '\t';
    else if (next === 'b') text += '\b';
    else if (next === 'f') text += '\f';
    else if (next >= '0' && next <= '7') {
      let octal = next;
      for (
        let extra = 0;
        extra < 2 && inner[index + 1] >= '0' && inner[index + 1] <= '7';
        extra += 1
      ) {
        octal += inner[(index += 1)];
      }
      text += String.fromCharCode(Number.parseInt(octal, 8));
    } else {
      text += next;
    }
  }

  return text;
}

function escapePdfLiteral(value: string) {
  return `(${value.replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)')})`;
}

function findTextArrays(content: string) {
  const arrays: TextArray[] = [];

  for (let index = 0; index < content.length; index += 1) {
    if (content[index] !== '[') continue;

    let cursor = index + 1;
    let depth = 0;
    let inString = false;
    let escaped = false;

    for (; cursor < content.length; cursor += 1) {
      const character = content[cursor];

      if (inString) {
        if (escaped) {
          escaped = false;
          continue;
        }
        if (character === '\\') {
          escaped = true;
          continue;
        }
        if (character === ')') inString = false;
        continue;
      }

      if (character === '(') {
        inString = true;
        continue;
      }

      if (character === '[') depth += 1;
      else if (character === ']') {
        if (depth === 0) break;
        depth -= 1;
      }
    }

    if (content[cursor] !== ']') continue;

    const operator = /^\s*TJ/.exec(content.slice(cursor + 1));
    if (!operator) continue;

    arrays.push({
      start: index,
      end: cursor + 1 + operator[0].length,
      body: content.slice(index + 1, cursor),
    });
    index = cursor;
  }

  return arrays;
}

function textArrayAtoms(body: string) {
  const atoms: Atom[] = [];
  let index = 0;

  while (index < body.length) {
    const character = body[index];

    if (character === '(') {
      let cursor = index + 1;
      let escaped = false;

      while (cursor < body.length) {
        if (!escaped && body[cursor] === '\\') {
          escaped = true;
          cursor += 1;
          continue;
        }
        if (!escaped && body[cursor] === ')') break;
        escaped = false;
        cursor += 1;
      }

      const literal = parsePdfLiteral(body.slice(index, cursor + 1));
      for (const glyph of literal) atoms.push({ kind: 'glyph', ch: glyph });
      index = cursor + 1;
      continue;
    }

    if (character === '-' || (character >= '0' && character <= '9')) {
      const number = /^-?\d+(?:\.\d+)?/.exec(body.slice(index));
      if (number) {
        atoms.push({ kind: 'kern', raw: number[0], value: Number(number[0]) });
        index += number[0].length;
        continue;
      }
    }

    index += 1;
  }

  return atoms;
}

function glyphWidth(character: string, widths: number[], firstChar: number) {
  const width = widths[character.charCodeAt(0) - firstChar];
  if (!width) {
    throw new Error(`Resume footer font is missing “${character}”`);
  }
  return width;
}

function spanWidth(
  atoms: Atom[],
  start: number,
  end: number,
  widths: number[],
  firstChar: number,
) {
  let glyphIndex = 0;
  let width = 0;

  for (const atom of atoms) {
    if (atom.kind === 'glyph') {
      if (glyphIndex >= start && glyphIndex < end) {
        width += (glyphWidth(atom.ch, widths, firstChar) / 1000) * FOOTER_FONT_SIZE;
      }
      glyphIndex += 1;
      continue;
    }

    const previous = glyphIndex - 1;
    const next = glyphIndex;
    if (previous >= start && next < end) {
      width -= (atom.value / 1000) * FOOTER_FONT_SIZE;
    }
  }

  return width;
}

function rebuildTextArray(atoms: Atom[], start: number, end: number, replacement: string) {
  let glyphIndex = 0;
  let output = '';
  let buffer = '';
  let inserted = false;

  const flush = () => {
    if (!buffer) return;
    output += escapePdfLiteral(buffer);
    buffer = '';
  };

  for (const atom of atoms) {
    if (atom.kind === 'glyph') {
      if (glyphIndex === start) {
        flush();
        output += escapePdfLiteral(replacement);
        inserted = true;
      }
      if (glyphIndex < start || glyphIndex >= end) buffer += atom.ch;
      glyphIndex += 1;
      continue;
    }

    const previous = glyphIndex - 1;
    const next = glyphIndex;
    if (previous >= start && next < end) continue;
    flush();
    output += atom.raw;
  }

  flush();

  if (!inserted) {
    throw new Error('Resume footer date could not be replaced');
  }

  return `[${output}] TJ`;
}

function lastTextPosition(content: string, before: number) {
  const pattern = /1 0 0 1 (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Tm/g;
  const prefix = '1 0 0 1 ';
  let found: { xStart: number; xEnd: number; x: string; y: number } | null = null;
  let match = pattern.exec(content);

  while (match) {
    if (match.index >= before) break;
    const xStart = match.index + prefix.length;
    found = {
      xStart,
      xEnd: xStart + match[1].length,
      x: match[1],
      y: Number(match[2]),
    };
    match = pattern.exec(content);
  }

  return found;
}

function formatShift(original: string, value: number) {
  const decimals = original.includes('.') ? original.split('.')[1].length : 0;
  return value.toFixed(decimals);
}

function stampContent(content: string, dateLabel: string, widths: number[], firstChar: number) {
  const token = resumeDateToken();
  const edits: Array<{ start: number; end: number; text: string }> = [];

  for (const textArray of findTextArrays(content)) {
    const atoms = textArrayAtoms(textArray.body);
    const glyphs = atoms.flatMap((atom) => (atom.kind === 'glyph' ? atom.ch : ''));
    const text = glyphs.join('');
    const tokenAt = text.indexOf(token);
    if (tokenAt === -1) continue;

    const tokenEnd = tokenAt + token.length;
    const currentWidth = spanWidth(atoms, tokenAt, tokenEnd, widths, firstChar);
    const nextWidth = spanWidth(
      [...dateLabel].map((character) => ({ kind: 'glyph' as const, ch: character })),
      0,
      dateLabel.length,
      widths,
      firstChar,
    );
    const shift = (currentWidth - nextWidth) / 2;
    const position = lastTextPosition(content, textArray.start);

    if (!position) {
      throw new Error('Resume footer position is missing');
    }

    edits.push({
      start: textArray.start,
      end: textArray.end,
      text: rebuildTextArray(atoms, tokenAt, tokenEnd, dateLabel),
    });
    edits.push({
      start: position.xStart,
      end: position.xEnd,
      text: formatShift(position.x, Number(position.x) + shift),
    });

    const following = content.slice(textArray.end, textArray.end + 500);
    const trailingSpace = /1 0 0 1 (-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?) Tm[\s\S]{0,160}\[\( \)\] TJ/.exec(
      following,
    );

    if (trailingSpace && Math.abs(Number(trailingSpace[2]) - position.y) < 0.2) {
      const xStart = textArray.end + trailingSpace.index + '1 0 0 1 '.length;
      edits.push({
        start: xStart,
        end: xStart + trailingSpace[1].length,
        text: formatShift(trailingSpace[1], Number(trailingSpace[1]) - shift),
      });
    }
  }

  if (edits.length === 0) return null;

  return edits
    .sort((left, right) => right.start - left.start)
    .reduce((current, edit) => {
      return current.slice(0, edit.start) + edit.text + current.slice(edit.end);
    }, content);
}

function footerFont(page: PDFPage) {
  const resources = page.node.Resources();
  if (!resources) throw new Error('Resume PDF is missing page resources');

  const fonts = resources.lookup(PDFName.of('Font'));
  if (!(fonts instanceof PDFDict)) throw new Error('Resume PDF is missing fonts');

  const font = fonts.lookup(PDFName.of('F1'));
  if (!(font instanceof PDFDict)) throw new Error('Resume PDF is missing the footer font');

  const firstChar = font.lookup(PDFName.of('FirstChar'));
  const widths = font.lookup(PDFName.of('Widths'));

  if (!(firstChar instanceof PDFNumber) || !(widths instanceof PDFArray)) {
    throw new Error('Resume PDF footer font widths are missing');
  }

  const values: number[] = [];
  for (let index = 0; index < widths.size(); index += 1) {
    const width = widths.lookup(index);
    if (!(width instanceof PDFNumber)) {
      throw new Error('Resume PDF footer font width is invalid');
    }
    values.push(width.asNumber());
  }

  return { firstChar: firstChar.asNumber(), widths: values };
}

function replaceStream(
  pdf: PDFDocument,
  page: PDFPage,
  contents: PDFRawStream | PDFArray,
  stream: PDFRawStream,
  next: Uint8Array,
) {
  const encoded = pdf.context.flateStream(next);
  const reference = pdf.context.register(encoded);

  if (contents instanceof PDFArray) {
    for (let index = 0; index < contents.size(); index += 1) {
      if (contents.lookup(index) === stream) {
        contents.set(index, reference);
        return;
      }
    }
    throw new Error('Resume PDF content stream could not be updated');
  }

  page.node.set(PDFName.of('Contents'), reference);
}

async function stampPage(pdf: PDFDocument, page: PDFPage, dateLabel: string) {
  const contents = page.node.Contents();
  const streams =
    contents instanceof PDFArray
      ? Array.from({ length: contents.size() }, (_, index) => contents.lookup(index))
      : [contents];
  const font = footerFont(page);
  let stamped = false;

  for (const stream of streams) {
    if (!(stream instanceof PDFRawStream)) continue;

    const decoded = Buffer.from(decodePDFRawStream(stream).decode()).toString('latin1');
    const updated = stampContent(decoded, dateLabel, font.widths, font.firstChar);
    if (!updated) continue;

    replaceStream(pdf, page, contents instanceof PDFArray ? contents : stream, stream, Buffer.from(updated, 'latin1'));
    stamped = true;
  }

  if (!stamped) {
    throw new Error('Resume PDF footer date was not found');
  }
}

export async function buildPdf(dateLabel: string) {
  const templatePath = path.join(process.cwd(), 'content', 'resume', 'template.pdf');
  const template = await readFile(templatePath);
  const pdf = await PDFDocument.load(template);

  for (const page of pdf.getPages()) {
    await stampPage(pdf, page, dateLabel);
  }

  return Buffer.from(await pdf.save());
}
