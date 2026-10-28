# Kunal Farma — Product Manager Portfolio

**Live site:** https://kunal-pm-portfolio.vercel.app/ (auto-deploys from `main` via Vercel — free Hobby plan, no cold starts). The older Render service at https://kunal-pm-portfolio.onrender.com/ still deploys from `main` too, but its free tier sleeps when idle.

## How the site is built

One Next.js app (TypeScript, React, Tailwind, [Motion](https://motion.dev) for the spring-driven animation).

| URL | File |
| --- | --- |
| `/` (homepage) | `app/page.tsx` — hero, "how I work" stations, case studies, experience, toolkit, contact |
| `/case-studies` | `app/case-studies/page.tsx` |
| `/case-studies/<slug>` | `app/case-studies/[slug]/page.tsx` — one study in four chapters |

Shared pieces: `app/layout.tsx` (fonts, search + link-preview metadata, theme colour), `app/manifest.ts` + `app/icon.svg` + `app/apple-icon.tsx` (add-to-home-screen name and icon), `components/MotionProvider.tsx` (loads only the Motion features the site uses — components import `m`, not `motion`), `components/Navbar.tsx`, `components/Footer.tsx`, `components/Reveal.tsx` (scroll reveal), `components/ScrollTopButton.tsx` (case-study pages only).

Homepage components live in `components/home/`:

- `Hero.tsx` — headline first on every screen. On xl+ the portrait sits beside it with six floating capability icons that take turns lighting up, dotted arrows joining them, and a comet circling the orbit. Below xl: a smaller portrait with four floating icon orbs, then the pitch, buttons, proof and a roadmap card — the four "how I work" stops on a dotted road (each a link to its step) and the three proof sections. The portrait pops in on load and drifts with parallax.
- `JourneyPath.tsx` — the journey. It measures every element marked `data-jp-node`. On lg+ it draws a zig-zag dotted path through them; a glowing arrow (with a softer comet trail) rides the path with scroll on a spring, and the travelled part lights up. Below lg the content is indented and every node sits on a rail at the cards' left edge, so the road is a straight timeline the arrow rides without crossing text; a strip under the navbar mirrors it as a progress bar with a dot per stop and the current stop's name. Nodes the reader has passed get `data-reached`.
- `Story.tsx` — `SpineNode` (an icon on the journey: drops in, floats, glows and pulses once reached) and `StationRow` (a "how I work" step: the card slides in from its side of the spine; on lg+ a big outlined step word fills the other side).
- `Motion.tsx` — `CountUp` (stats), `GravityChips` (toolkit chips fall into their tray), `Parallax`, `Tilt` (cards lean toward the mouse on desktop) and `Aurora` (colour blobs drifting behind the page).
- `Spotlight.tsx` — a soft light that follows the mouse (desktop only).
- `FlowPreview.tsx` — the small zig-zag flow diagram on case-study cards.
- `Icons.tsx` — thin outline icons, looked up by key.

Performance notes: the aurora blobs only drift on screens 1024px and wider, the step cards only use backdrop blur there too, and the hero portrait is preloaded. `prefers-reduced-motion`: every animation is gated — CSS keyframes live inside a `no-preference` media block, and the Motion-driven pieces check `useReducedMotion`. Content is always visible without JavaScript.

Files in `public/`:

- `Kunal_Farma_Resume.pdf` — the resume every download button serves. Replace this file to update the resume.
- `kunal-farma.jpg` — the portrait (hero) and the link-preview image (`og:image`), 900×1200 JPG.

## Editing the content

Everything lives in `lib/content.ts`:

- `profile` — name, contact details, links.
- `hero` and `capabilities` — the headline strap and the six icons around the portrait (`x`/`y` are % positions on desktop).
- `stations` — the four "how I work" steps (Discover → Define → Deliver → Measure); each has `points` (short numbered lines) and `proof` chips.
- `proofStats`, `experience` (with each job's optional `solved` problems and `caseStudy` link), `credentials`, `certifications` (all eight, with issuer), `toolkit`.
- `caseStudies` — each has `kind` (`"work"` for real work, `"practice"` for a thinking exercise) and four chapters: `discover`, `define`, `deliver`, `measure`. The homepage features the `work` study above the practice ones. `caseStudiesAreDemo` swaps the practice badge to "Demo".

Section ids used by the navbar: `#top`, `#how`, `#case-studies`, `#experience`, `#skills`, `#contact`. If you rename one in `app/page.tsx`, update `components/Navbar.tsx` too.

Content comes from the master resume and from Kunal's own account of his work — don't add claims or numbers that aren't backed by one of those. The Amazon / FinBridge / CareLoop studies (e-commerce, banking, healthcare) are **practice exercises, not client work** — FinBridge and CareLoop are illustrative, made-up companies; the badge on each card, the index note and the detail-page banner keep this explicit — please keep them.

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

## Deploying

**Vercel (current):** on vercel.com, Add New → Project, import this repository, keep the Next.js preset and defaults, Deploy. Every push to `main` redeploys.

### Render (previous host)

The repo includes a `render.yaml` blueprint, and Render redeploys automatically on every push to `main`. To set it up from scratch:

**Option A — Blueprint (recommended):** on Render, **New → Blueprint**, select this repository. Render reads `render.yaml` and creates the web service.

**Option B — Manual:** on Render, **New → Web Service**, connect this repository, then set:

- Build command: `npm ci && npm run build`
- Start command: `npm run start`
- Environment: `NODE_VERSION` = `24` (Render injects `PORT` automatically)

No database and no environment secrets — the site is fully static content.
