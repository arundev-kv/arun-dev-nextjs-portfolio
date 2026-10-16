# Arun Dev K V — Career Field Notes

An editorial portfolio for a mobile systems engineer. Built with Next.js App Router, React, TypeScript, and plain responsive CSS. The site exports to static files and can be deployed with Netlify Drop.

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

## Build and deploy

```bash
npm run typecheck
npm run build
```

The production export is generated in `out/`. Drag that directory onto [Netlify Drop](https://app.netlify.com/drop), or connect the repository to Netlify using the included `netlify.toml`.

## Structure

```text
src/
  app/          metadata, page composition, global visual system
  components/   server-rendered sections and the interactive career dossier
  data/         editable portfolio content
  types/        portfolio content contracts
```

The page is server-rendered by default. Only the career timeline uses a client component for its accessible native dialog interaction.
