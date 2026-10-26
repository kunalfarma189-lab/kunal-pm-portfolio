# Kunal Farma — Product Manager Portfolio

**Live site:** https://kunal-pm-portfolio.onrender.com/ (auto-deploys from `main` via Render)

## How the site is built

The site has two parts:

| URL | What serves it | Where to edit |
| --- | --- | --- |
| `/` (homepage) | `public/home.html` — a single self-contained HTML page (its own CSS and JS inline) | `public/home.html` |
| `/case-studies`, `/case-studies/<slug>` | Next.js app (TypeScript, React, Tailwind) | `lib/content.ts` for text, `app/case-studies/` for layout |

`next.config.ts` rewrites `/` to `/home.html`, so the homepage is plain HTML while the case studies are Next.js pages with their own navbar (`components/Navbar.tsx`) and footer.

Other files in `public/`:

- `Kunal_Farma_Resume.pdf` — the resume both homepage buttons download. Replace this file to update the resume.
- `kunal-farma.jpg` — the link-preview image (`og:image`) for shares on LinkedIn, WhatsApp, etc. The homepage portrait itself is embedded in `home.html`.

## Editing the content

- **Homepage text, sections, contact details:** edit `public/home.html`. Its `<head>` also holds the search description and link-preview tags — keep them in step with the page.
- **Case studies:** edit `lib/content.ts`.
- **Links between the two:** the case-study navbar links to homepage sections by id (`#top`, `#help`, `#why`, `#work`, `#journey`, `#contact`). If you rename a section id in `home.html`, update `components/Navbar.tsx` too.

Content is sourced from the master resume — don't add claims that aren't already resume-backed. The Amazon / Flipkart / Myntra case studies are **hypothetical independent analyses, not client work**. The badge on each card, the index-page note, the detail-page banner and the footer disclaimer keep this explicit — please keep them.

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

## Deploying to Render

The repo includes a `render.yaml` blueprint, and Render redeploys automatically on every push to `main`. To set it up from scratch:

**Option A — Blueprint (recommended):** on Render, **New → Blueprint**, select this repository. Render reads `render.yaml` and creates the web service.

**Option B — Manual:** on Render, **New → Web Service**, connect this repository, then set:

- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Environment: `NODE_VERSION` = `24` (Render injects `PORT` automatically)

No database and no environment secrets — the site is fully static content.
