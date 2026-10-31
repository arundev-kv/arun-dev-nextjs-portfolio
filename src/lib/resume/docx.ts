import { readFile } from 'fs/promises';
import path from 'path';
import JSZip from 'jszip';
import { resumeDateToken } from './date';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export async function buildDocx(dateLabel: string) {
  const templatePath = path.join(process.cwd(), 'content', 'resume', 'template.docx');
  const template = await readFile(templatePath);
  const zip = await JSZip.loadAsync(template);
  const footerFile = zip.file('word/footer1.xml');

  if (!footerFile) {
    throw new Error('Resume footer is missing');
  }

  const footer = await footerFile.async('string');
  const token = resumeDateToken();

  if (!footer.includes(token)) {
    throw new Error('Resume date token is missing');
  }

  zip.file('word/footer1.xml', footer.replaceAll(token, escapeXml(dateLabel)));

  return zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });
}
