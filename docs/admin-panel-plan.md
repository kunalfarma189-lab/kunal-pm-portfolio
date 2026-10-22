# Admin Panel — Phase 0 Audit & Phase 1 Security/Database Design

Status: **PROPOSAL — not implemented.** No admin code, no DB, no auth dependency has been added. `main` (live site) is untouched; all admin work happens on `feature/admin-panel`.

---

## Part 1 — Phase 0: Current Architecture Audit (verified 2026-10-23)

### Git & deployment state
- Working tree **clean**, on `main` @ `a7ee827`, synced with `origin/main`.
- New branch created from main: **`feature/admin-panel`** (this doc lives there).
- `render.yaml` defines ONE web service (name `kunal-pm-portfolio`, free plan, build `npm ci && npm run build`, start `npm run start`, health check `/`, Node 24). No branch filter → Blueprint tracks the repo default branch (`main`) only. **Pushing the feature branch does NOT trigger a deploy.**
- Live site: https://kunal-pm-portfolio.onrender.com/ (verified healthy, serves v2).

### Application
- Next.js 16.4.2 (App Router, `cacheComponents: true`, `partialPrefetching`), React 19.3, TypeScript 5, Tailwind 4. Runtime deps: **only next/react/react-dom** — no auth, DB, or session libraries yet.
- Routes (all static): `/`, `/case-studies`, `/case-studies/[slug]` (3 slugs), `/_not-found`.
- Production build: **passing** (verified on branch creation).

### Content sources (single source of truth)
- `lib/content.ts` — 8 exports: `profile`, `heroChips`, `experience`, `caseStudies`, `aiProjects`, `certifications`, `education` (+ TS interfaces `CaseStudy`, `AiProject`, `ExperienceItem`).
- Pages consume only these exports — no hardcoded content in components.

### Assets & environment
- `public/Kunal_Farma_Resume.pdf` (resume download; md5-matched to the Downloads master) + 5 template SVGs.
- **No `.env` files exist**, no secrets in repo, `.gitignore` already covers `.env*`.
- No database, no storage service, no auth provider connected anywhere.

### Risk notes for Phase 1+
- `cacheComponents: true` means future admin pages must explicitly opt into dynamic rendering (`connection()` / route segment config) — static prerender will not suit authenticated pages.
- Render free web service = ephemeral filesystem (uploads cannot live on the server disk) + cold starts; single instance (in-memory rate limiting would reset per deploy — hence DB-backed limiter below).

---

## Part 2 — Phase 1: Proposed Architecture

Guiding rules: single admin account, deny-by-default authorization, `lib/content.ts` stays the public source of truth until DB content is verified identical, no destructive migrations, live site must never depend on the DB being up (graceful fallback).

### 2.1 Database provider — decision required
| Option | Cost | Pros | Cons |
|---|---|---|---|
| **Neon PostgreSQL (recommended to start)** | Free tier (0.5 GB, always-free) | Persistent free tier, serverless, TLS connection, PITR on paid | Second vendor; external latency (~ms, negligible for admin use) |
| Render PostgreSQL Starter | $7/mo | Same dashboard/billing as the app; internal connection string | Free Render PG **expires after 90 days** — unsafe for durable content |

Either works with the plan below (only `DATABASE_URL` changes). Recommendation: start on **Neon free**, migrate to Render PG later only if single-vendor matters. No code change needed to switch.

### 2.2 ORM & migration strategy
- **Drizzle ORM + drizzle-kit** (TypeScript-first, tiny runtime, migrations are plain reviewable SQL files).
- Migrations: forward-only **additive** SQL (`CREATE TABLE`, `ADD COLUMN`) — no `DROP`, no destructive `ALTER`. Each migration is committed and reviewed as text before it can run.
- Order of operations at deploy time: **backup → run migration → deploy code** (old code keeps working because changes are additive).
- Rollback: `git revert` on `main` + redeploy; schema stays at newest additive version (safe for old code); data restore from dump if needed.

### 2.3 Schema (first migration, v1)
```
admin_users      (id uuid PK, email text UNIQUE NOT NULL, password_hash text NOT NULL,
                  created_at, updated_at, last_login_at)

sessions         (id text PK  -- SHA-256 of the opaque cookie token
                  user_id uuid FK → admin_users ON DELETE CASCADE,
                  expires_at NOT NULL, created_at, ip_hash, user_agent)

login_attempts   (id serial PK, email text, ip_hash, ok boolean, created_at)
                  -- rate limiting + audit source

auth_events      (id serial PK, kind text, email, ip_hash, created_at)
                  -- login_ok / login_fail / logout / locked

case_studies     (id uuid PK, slug text UNIQUE, company, title, one_liner,
                  problem, target_users jsonb, evidence jsonb, root_causes jsonb,
                  solution jsonb, flow jsonb, metrics jsonb, risks jsonb,
                  learnings jsonb, tags jsonb,
                  is_hypothetical boolean NOT NULL DEFAULT true,
                  seo_title, seo_description, sort_order int,
                  created_at, updated_at)

ai_projects      (id uuid PK, slug text UNIQUE, title, status,
                  problem, intended_user, approach, limitations,
                  evaluation, impact, tags jsonb, sort_order int,
                  created_at, updated_at)

media_assets     (id uuid PK, kind text  -- 'resume' | 'image'
                  filename, mime, size_bytes, storage_path,
                  created_at)              -- designed now, used in a later phase
```
Notes:
- `case_studies` columns mirror the existing `CaseStudy` TS interface field-for-field → the seed script is a direct mapping with zero content transformation.
- `is_hypothetical` is a **non-negotiable boolean** — the UI renders the amber "Hypothetical case study" badge whenever it is `true`; the badge is not editable text, so disclaimers cannot be accidentally removed.
- Slugs stay identical to today's (`amazon-cart-dropoff`, `flipkart-cod-rto`, `myntra-size-fit`) → **URLs and SEO unchanged**.

### 2.4 Password hashing & initial admin provisioning
- **Argon2id** via `@node-rs/argon2` (prebuilt native binaries — no build pain on Windows or Render). Parameters: memoryCost 19 MiB (19456), timeCost 2, parallelism 1 (OWASP baseline).
- Plaintext passwords are **never** stored, logged, or emailed. Hash format embeds salt+params.
- Provisioning: `npm run create-admin` (tsx script):
  1. Reads `ADMIN_EMAIL` + `ADMIN_INITIAL_PASSWORD` from env **or** interactive hidden prompt.
  2. Refuses to create a second admin account unless `ALLOW_SECOND_ADMIN=1` (one-account rule by default).
  3. On success, logs only the email — never the password — and instructs to delete `ADMIN_INITIAL_PASSWORD` from Render env.
  4. `last_login_at` starts null; first login works only with that initial password.

### 2.5 Server-side sessions & secure cookies
- Opaque 256-bit random token (base64url) generated at login. Cookie carries the token; DB stores only `SHA-256(token)` → a DB leak yields unusable hashes.
- Cookie `kf_admin_session`: `HttpOnly; Secure; SameSite=Lax; Path=/admin; MaxAge=8h` (Secure works behind Render TLS with `TRUST_PROXY=true`).
- Rolling expiry: sliding renewal on activity, absolute cap 24h. Logout deletes the row + expires the cookie. Sessions table cleaned by lazy delete on read.
- No JWTs: single-admin revocability beats stateless tokens.

### 2.6 Routes, endpoints & authorization
- Public routes unchanged. New (later phases, behind auth): `/admin/login` (GET form + POST action), `/admin/logout` (POST), `/admin` dashboard.
- Defense layers:
  1. `middleware.ts` — **redirect-only** cookie presence check (UX, not a security boundary; edge runtime cannot query DB).
  2. `/admin/layout.tsx` — `requireAdmin()`: resolves session → user, else redirect to login.
  3. **Every** server action / API route calls `requireAdmin()` itself — deny by default; layout checks are never trusted as the only gate.
- `requireAdmin()` also invalidates expired sessions and enforces the single-account rule (user must exist + not deleted).

### 2.7 Rate limiting, validation, CSRF, error handling
- **Login rate limit** (DB-backed, survives deploys): 5 failed attempts per `email + ip_hash` in 15 min → HTTP 429 + `auth_events(locked)` entry; success resets the counter. Constant-response-time on unknown email (still runs a dummy argon2 verify) to prevent user enumeration.
- **Validation**: zod schemas on every input (email format, password length caps, slug regex `^[a-z0-9-]+$`, text length caps matching DB column limits). Server actions re-validate — client validation is UX only.
- **CSRF**: mutations only via POST server actions (Next's action ID protections) + explicit `Origin`/`Host` check helper on every mutation + `SameSite=Lax` cookie. No GET ever mutates state.
- **Error handling**: generic "Invalid email or password"; no stack traces or SQL errors to the client; `auth_events` audit trail for every login attempt; 500 route renders neutral error page.

### 2.8 Environment variables & secret management
Set in **Render dashboard** (encrypted at rest) for production; `.env.local` (gitignored) for local dev. No secret ever gets a `NEXT_PUBLIC_` prefix.

| Variable | Purpose | Set where |
|---|---|---|
| `DATABASE_URL` | Postgres connection string (`...sslmode=require`) | Render + `.env.local` |
| `TRUST_PROXY` | `true` — Secure cookies + real IP behind Render TLS proxy | Render |
| `ADMIN_EMAIL` | One-time provisioning input | Render (temporarily) / local |
| `ADMIN_INITIAL_PASSWORD` | One-time provisioning input — **delete after setup** | Render (temporarily) / local |
| `SESSION_TTL_HOURS` | optional, default 8 | Render / local |

### 2.9 Backup & rollback
- **Backups**: `npm run db:dump` (pg_dump) run (a) manually before every migration, (b) weekly via GitHub Action scheduled workflow storing the dump as a workflow artifact (7-day retention, downloadable). Neon paid adds PITR later if wanted.
- **Rollback**: code — `git revert` + push (Render redeploys old build; additive schema keeps it compatible). Data — restore latest dump to a fresh database, swap `DATABASE_URL`.
- Migration gate: no migration runs against production until its SQL has been read line-by-line and it exists on the reviewed branch.

### 2.10 Future uploads (persistent storage)
- Render web disk is ephemeral (and paid) → not suitable. Plan: **Cloudflare R2 free tier** (10 GB, zero egress fees) behind a small `Storage` interface (`put/get/signedUrl`), so the provider stays swappable. `media_assets` table (2.3) is the index.
- Until that phase, the resume PDF stays a versioned static file in `public/` — no storage dependency added now.

### 2.11 Content migration plan (content.ts → DB, lossless)
1. `db/seed.ts` imports `lib/content.ts` and **upserts by slug** (idempotent; re-runnable).
2. Verification gate: `npm run db:verify-content` diffs DB rows against `content.ts` field-by-field; must report **0 differences** before proceeding.
3. Public pages switch to a `getContent()` helper: reads DB; **falls back to `content.ts` on any DB error/empty** → the live site can never go dark because of the database.
4. SEO: `generateMetadata` reads `seo_title`/`seo_description` columns, seeded with today's exact values; slugs unchanged → URLs, metadata, and disclaimers preserved bit-for-bit.
5. Only after 3–4 verified on production does `content.ts` get demoted to "fallback/seed source".

### 2.12 Security checklist (must pass before any admin code merges)
- [ ] No plaintext or hardcoded credentials anywhere; no secrets in client bundle (`grep -r NEXT_PUBLIC` check in CI)
- [ ] All admin server actions call `requireAdmin()` (test: direct POST without session → 401/redirect)
- [ ] Login: generic errors, dummy-hash on unknown email, rate limit lock works (5 fails → 429)
- [ ] Cookie flags verified (HttpOnly, Secure, SameSite, Path) via browser devtools
- [ ] Session revocation: logout invalidates server-side row (replay of old cookie fails)
- [ ] Origin check blocks cross-site POST (manual test with curl spoofed Origin)
- [ ] Zod rejects oversized/malformed payloads (fuzz a few)
- [ ] No stack traces / SQL errors in any HTTP response
- [ ] DB connection uses TLS; credentials only in env
- [ ] Seed verify diff = 0; live pages byte-equivalent before/after DB switch (curl diff of rendered HTML)

### 2.13 Implementation sequence (each step gated)
1. **Done in this PR:** branch + this design doc.
2. **You:** create Neon DB (or Render PG) → get `DATABASE_URL` (5 min, instructions in Part 3).
3. Add Drizzle + schema + migration **files** (no runtime DB usage yet); review SQL on the PR.
4. `db/seed.ts` + `db:verify-content` script; run against the DB; gate = 0 diff.
5. Auth core on the branch: argon2 hashing, sessions table logic, `requireAdmin()`, login/logout, rate limiting, zod — **dashboard shell only, no CRUD**.
6. Local + temporary-preview testing against the security checklist.
7. PR review (you read the diff) → merge to `main` → Render deploys; then provision admin (`create-admin`) and run production checklist.
8. Phase 2 (CRUD screens, image upload) — separate branch, only after Phase 1 is stable in production.

### Part 3 — Provider setup instructions (when you're ready)
**Neon (recommended, ~5 min):** neon.tech → sign up → New Project (region: Singapore `aws-ap-southeast-1`, closest to India) → Dashboard → Connection string → copy `postgresql://...?sslmode=require` → that's `DATABASE_URL`. Free tier: 0.5 GB storage, always free, no expiry.

**Render PG alternative:** Render Dashboard → New → PostgreSQL → Starter ($7/mo; free tier **expires in 90 days — do not use free for durable data**) → Internal Database URL → `DATABASE_URL`.

**Render env vars:** kunal-pm-portfolio service → Environment → add `DATABASE_URL`, `TRUST_PROXY=true` (add `ADMIN_EMAIL`/`ADMIN_INITIAL_PASSWORD` only during provisioning, delete after).

### Part 4 — Decisions needed from you (blocking Phase 2)
1. **Database**: Neon free (recommended) or Render PostgreSQL Starter ($7/mo)?
2. **Admin email**: use `kunalfarma189@gmail.com` for the admin login?
3. **Uploads/storage**: defer Cloudflare R2 to a later phase (recommended) or set it up now?
4. **Staging preference**: test locally + short maintenance-window deploy (free, recommended) vs Render preview environment (may incur cost).

Nothing above touches the live site until step 7, and even then only auth shell (no public page changes).
