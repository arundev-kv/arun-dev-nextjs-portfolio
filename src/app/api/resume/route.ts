import { NextResponse } from 'next/server';
import { emailsMatch, isValidEmail, ownerEmail } from '@/lib/resume/access';
import { resumeDownloadDate } from '@/lib/resume/date';
import { buildDocx } from '@/lib/resume/docx';
import { saveResumeDownload } from '@/lib/resume/downloads';
import { buildPdf } from '@/lib/resume/pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BASE_NAME = 'Arun_Dev_KV_Senior_React_Native_Engineer_Resume';

function jsonError(status: number, error: string) {
  return NextResponse.json(
    { error },
    { status, headers: { 'Cache-Control': 'no-store' } },
  );
}

function fileResponse(bytes: Buffer, filename: string, contentType: string) {
  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonError(400, 'Enter a valid email address.');
  }

  const body =
    payload && typeof payload === 'object'
      ? (payload as { email?: unknown; format?: unknown })
      : {};
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (!isValidEmail(email)) {
    return jsonError(400, 'Enter a valid email address.');
  }

  if (body.format !== undefined && body.format !== 'pdf' && body.format !== 'docx') {
    return jsonError(400, 'Choose a PDF or Word file.');
  }

  const format = body.format === 'pdf' || body.format === 'docx' ? body.format : undefined;
  const owner = ownerEmail();

  if (!owner) {
    if (format === 'docx') {
      return jsonError(403, 'Word download is unavailable.');
    }

    try {
      const { label, iso } = resumeDownloadDate();
      const file = await buildPdf(label);
      return fileResponse(file, `${BASE_NAME}_${iso}.pdf`, 'application/pdf');
    } catch {
      return jsonError(500, 'The resume could not be downloaded.');
    }
  }

  const isOwner = emailsMatch(email, owner);

  if (isOwner && !format) {
    return NextResponse.json({ choose: true }, { headers: { 'Cache-Control': 'no-store' } });
  }

  const downloadFormat = isOwner ? format ?? 'pdf' : 'pdf';
  const { label, iso } = resumeDownloadDate();

  try {
    if (!isOwner) {
      await saveResumeDownload(email.toLowerCase());
    }

    if (downloadFormat === 'docx') {
      const file = await buildDocx(label);
      return fileResponse(
        file,
        `${BASE_NAME}_${iso}.docx`,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      );
    }

    const file = await buildPdf(label);
    return fileResponse(file, `${BASE_NAME}_${iso}.pdf`, 'application/pdf');
  } catch (error) {
    const detail =
      error instanceof Error && error.message.startsWith('SAVE:')
        ? error.message.slice('SAVE:'.length)
        : '';

    if (detail) {
      return NextResponse.json(
        { error: 'The download could not be saved. Try again.' },
        {
          status: 503,
          headers: {
            'Cache-Control': 'no-store',
            'X-Save-Error': detail.replace(/[\r\n]/g, ' ').slice(0, 300),
          },
        },
      );
    }

    return jsonError(500, 'The resume could not be downloaded.');
  }
}
