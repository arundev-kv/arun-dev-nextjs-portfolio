# Arun Dev K V — Career Field Notes

An editorial portfolio for a mobile systems engineer. Built with Next.js App Router, React, TypeScript, and plain responsive CSS. The homepage stays static. The résumé download runs as a server route on Netlify.

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content updates

All professional content is in:

```text
src/data/portfolio.ts
```

The data model in `src/types/portfolio.ts` separates:

- verified professional experience;
- core and supporting capabilities;
- technologies currently being expanded;
- non-proprietary technical field-note outlines;
- education and credentials.

Keep outcomes concrete. If a result cannot be published or verified, leave the explicit placeholder rather than adding a metric.

## Update the portrait

Replace `public/images/arun-dev.png` with the new portrait. Keeping the same filename updates the optimized hero image without any component changes.

## Download resume

The public button asks for an email. `RESUME_OWNER_EMAIL` can choose a Word or PDF file, and that address is not stored. Any other valid email is saved, then the PDF downloads immediately.

Both files are the uploaded résumé in `content/resume/`. The route replaces only the footer token `{{DOWNLOAD_DATE}}` with the current date in Asia/Kolkata. Do not put those templates in `public/`.

Create a free Supabase project and run [`supabase/migrations/20261031140000_resume_downloads.sql`](supabase/migrations/20261031140000_resume_downloads.sql) in the SQL editor. Then set these variables in Netlify and in `.env.local`:

```text
RESUME_OWNER_EMAIL=arundevkv1@gmail.com
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

The service-role key stays on the server. Row-level security is enabled and no public policies are granted, so the saved emails are visible in the Supabase table only. Until those Supabase variables are set, `npm run dev` appends other people's emails to `.data/resume-downloads.jsonl`. A production deploy without them refuses the public download instead of skipping the save.

## Build and deploy

```bash
npm run typecheck
npm run build
```

Connect the repository to Netlify. The included `netlify.toml` publishes `.next` and uses the Next.js runtime, which serves the static page and the download route. A drag-and-drop of a static `out/` folder cannot run the download.

## Structure

```text
src/
  app/          metadata, page composition, global visual system, résumé route
  components/   server-rendered sections, career dossier, résumé dialog
  data/         editable portfolio content
  lib/resume/   date stamp, Word and PDF copies, download log
  types/        portfolio content contracts
content/resume/ private résumé templates
supabase/       saved-email table
```

The page is server-rendered by default. The career timeline and résumé dialog are client components for their accessible native dialogs.
