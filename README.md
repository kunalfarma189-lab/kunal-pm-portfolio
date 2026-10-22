# Kunal Farma — Product Manager Portfolio

A single-page portfolio built with Next.js, TypeScript, React, and Tailwind CSS.

Sections: Home, Experience, Case Studies (Amazon, Flipkart, Myntra — **hypothetical case studies, labelled as such on the page**), AI Projects, About, Contact.

## Run it locally

```bash
npm install
npm run dev        # dev server at http://localhost:3000
```

Production build check:

```bash
npm run build
npm run start      # serves the production build
```

## Editing the content

Almost everything you'd want to change lives in **`lib/content.ts`** — name, tagline, email, LinkedIn URL, experience entries, case studies, and AI project cards. No other file needs touching for content edits.

Two placeholders to replace before sharing the site publicly (marked `TODO` in `lib/content.ts`):

- `email` — currently `your.email@example.com`
- `linkedin` — currently a placeholder URL

## Deploying to Render

The repo includes a `render.yaml` blueprint. Two ways to deploy:

**Option A — Blueprint (recommended):**

1. Push this repo to GitHub (already done if you're reading this on GitHub).
2. On Render: **New → Blueprint**, select this repository. Render reads `render.yaml` and creates the web service.
3. After the first deploy, the site is live on a free `onrender.com` URL.

**Option B — Manual:**

1. On Render: **New → Web Service**, connect this repository.
2. Build command: `npm ci && npm run build`
3. Start command: `npm run start`
4. Environment: add `NODE_VERSION` = `24`. Render injects `PORT` automatically.

No database, no environment secrets — the site is fully static content.

## Notes

- The Amazon / Flipkart / Myntra case studies are **hypothetical thinking exercises**, not client work. The badge on each card and the footer disclaimer keep this explicit — please keep them.
- Deployed on Render: add the live URL here once the first deploy succeeds.
