import { createClient } from '@supabase/supabase-js';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';

export async function saveResumeDownload(email: string) {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (url && key) {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.from('resume_downloads').insert({ email });

    if (error) {
      throw new Error('Could not save this email');
    }

    return;
  }

  if (process.env.NODE_ENV === 'development') {
    const directory = path.join(process.cwd(), '.data');
    await mkdir(directory, { recursive: true });
    await appendFile(
      path.join(directory, 'resume-downloads.jsonl'),
      `${JSON.stringify({ email, requested_at: new Date().toISOString() })}\n`,
      'utf8',
    );
    return;
  }

  throw new Error('Resume download storage is not configured');
}
