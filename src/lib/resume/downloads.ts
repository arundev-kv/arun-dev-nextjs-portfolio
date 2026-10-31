import { createClient } from '@supabase/supabase-js';
import https from 'node:https';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';

const SERVER_USER_AGENT = 'arun-dev-portfolio';

function serverEnv(name: string) {
  const value = process.env[name]?.replace(/[^\x21-\x7E]/g, '');
  return value || undefined;
}

// Supabase rejects a secret key when the request looks like a browser. Netlify
// forwards the visitor's User-Agent, so this call uses Node's HTTP client.
function serverFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const request = new Request(input, init);
  const headers = Object.fromEntries(request.headers.entries());
  headers['user-agent'] = SERVER_USER_AGENT;

  return new Promise((resolve, reject) => {
    const req = https.request(
      request.url,
      { method: request.method, headers },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => {
          const responseHeaders = new Headers();
          const rawHeaders = res.rawHeaders ?? [];

          for (let index = 0; index < rawHeaders.length; index += 2) {
            responseHeaders.append(rawHeaders[index], rawHeaders[index + 1]);
          }

          resolve(
            new Response(Buffer.concat(chunks), {
              status: res.statusCode ?? 500,
              headers: responseHeaders,
            }),
          );
        });
      },
    );

    req.on('error', reject);
    request
      .arrayBuffer()
      .then((body) => {
        if (body.byteLength > 0) req.write(Buffer.from(body));
        req.end();
      })
      .catch(reject);
  });
}

export async function saveResumeDownload(email: string) {
  const url = serverEnv('SUPABASE_URL');
  const key = serverEnv('SUPABASE_SERVICE_ROLE_KEY');

  if (url && key) {
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: {
        headers: { 'User-Agent': SERVER_USER_AGENT },
        fetch: serverFetch,
      },
    });
    const { error } = await supabase.from('resume_downloads').insert({ email });

    if (error) {
      console.error('resume download save failed', error.code, error.message);
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
