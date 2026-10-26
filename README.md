# Kunal Farma — Product Manager Portfolio

**Live site:** https://kunal-pm-portfolio.onrender.com/ (auto-deploys from `main` via Render)

## How the site is built

The whole site is one Next.js app (TypeScript, React, Tailwind, [Motion](https://motion.dev) for the scroll-linked animation).

| URL | File |
| --- | --- |
| `/` (homepage) | `app/page.tsx` — sections: hero, why me, case studies, experience, skills, contact |
| `/case-studies`, `/case-studies/<slug>` | `app/case-studies/` |

Shared pieces: `app/layout.tsx` (fonts, search + link-preview metadata), `components/Navbar.tsx`, `components/Footer.tsx`, `components/ScrollTopButton.tsx`.

Homepage components live in `components/home/`:

- `HeroStory.tsx` — the hero and its scroll-linked visual. On wide screens (1280px+) the hero is 210vh tall with a sticky stage; scrolling through it draws the orbit, the six capability nodes, their connectors and arrowheads. Nothing autoplays or loops, and scrolling is never captured. Below 1280px the hero stacks and the six capabilities become a vertical list drawn by its own scroll (`MobileCapabilities`).
- `useScrollProgress.ts` — measures an element’s 0→1 progress through the viewport and feeds it to Motion. (Motion’s own `useScroll` hands element-targeted progress to the browser’s native ScrollTimeline, which mis-mapped in testing.)
- `FlowPreview.tsx` — the schematic “proposed flow” beside each case study, built from that study’s `flow` steps.
- `ScrollLine.tsx` — the experience timeline rule that draws as you scroll.
- `Icons.tsx` — thin outline icons.

`prefers-reduced-motion`: the hero collapses to normal height and every scroll-linked element is shown in its finished state.

Files in `public/`:

- `Kunal_Farma_Resume.pdf` — the resume every download button serves. Replace this file to update the resume.
- `kunal-farma.jpg` — the portrait (hero) and the link-preview image (`og:image`).

## Editing the content

- **All text** — profile and contact details, hero copy, the six capabilities (labels, one-liners and their positions around the portrait), “why me”, stats, experience, education, certifications, skills and case studies — lives in `lib/content.ts`.
- **Section ids** used by the navbar: `#top`, `#why`, `#case-studies`, `#experience`, `#skills`, `#contact`. If you rename one in `app/page.tsx`, update `components/Navbar.tsx` too.

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
