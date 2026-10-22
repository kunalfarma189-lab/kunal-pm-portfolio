# Admin Panel — Local Setup Guide (Phase 1)

Auth foundation: Argon2id passwords, DB-backed sessions, rate-limited login, protected `/admin`. The public site is untouched and never queries the database.

## 1. Create the Neon database (~5 min, once)

1. Go to <https://neon.tech> → sign up (free).
2. **New Project** → name `kunal-pm-portfolio`, region `AWS ap-southeast-1 (Singapore)` (closest to India).
3. Dashboard → **Connection string** → copy the `postgresql://...` string (it already includes `?sslmode=require`).
4. In Neon you can create extra branches/databases — for tests, create a second database (or branch) and copy its connection string too.

Nothing in this repo touches your Neon account until you run migrations locally.

## 2. Environment variables

```bash
cp .env.example .env.local
```

| Variable | Value | Notes |
|---|---|---|
| `DATABASE_URL` | your Neon connection string | Server-only. Never committed; never prefixed `NEXT_PUBLIC_`. |
| `TRUST_PROXY` | `true` | Needed on Render (TLS proxy) for Secure cookies. |
| `ADMIN_EMAIL` | `kunalfarma189@gmail.com` | Used only by the provisioning script. |
| `ADMIN_INITIAL_PASSWORD` | *(leave empty — hidden prompt instead)* | If you do set it, delete it right after provisioning. |
| `SESSION_TTL_HOURS` | `8` | Optional (1–24). |
| `TEST_DATABASE_URL` | separate test database URL | Integration tests refuse to run without it — and never touch `DATABASE_URL`. |

`.env.local` is gitignored (`.env*` rule, with `.env.example` whitelisted as the safe template).

## 3. Run migrations

```bash
npm install
npm run db:migrate
```

Applies `drizzle/0000_*.sql` — four `CREATE TABLE` statements (additive only, no drops). Re-running is safe: applied migrations are tracked and skipped.

## 4. Provision the first admin

```bash
npm run create-admin
```

- Asks for a password with echo disabled (min 10 chars) — never stored or printed in plain form.
- Creates (or rotates) only `ADMIN_EMAIL`. A second admin is refused unless `ALLOW_SECOND_ADMIN=1`.
- If you used `ADMIN_INITIAL_PASSWORD`, delete it from your environment afterwards.

## 5. Run locally

```bash
npm run dev        # http://localhost:3000
```

- `/admin` → redirects to `/admin/login` when signed out.
- Login → dashboard shows your email + session expiry; logout invalidates the session server-side.
- Public pages (`/`, `/case-studies`, resume PDF) work exactly as before — with or without the DB.

## 6. Tests

```bash
npm test
```

- **Unit tests always run** (argon2, token hashing, rate-limit logic, validation, cookie flags, missing-env handling).
- **Integration tests require `TEST_DATABASE_URL`** — they migrate that test DB and exercise provisioning, login verification, session lifecycle/expiry/cleanup, rate limiting, and connection-failure handling. Without the variable they print a skip notice instead of silently passing.

## 7. Troubleshooting

| Symptom | Fix |
|---|---|
| `DATABASE_URL is not set` | Create `.env.local` from the example; restart `npm run dev`. |
| `password authentication failed` / `SASL` error | Re-copy the connection string from Neon; passwords with special chars must be URL-encoded. |
| Login always says "temporarily unavailable" | `npm run dev` terminal shows the real DB error (never shown in the browser). Check Neon is not suspended (free tier auto-suspends, wakes on connect — first query may take a second). |
| `Too many failed attempts` | Wait 15 min or clear the lock: delete rows from `login_attempts` for your email. |
| Migrations error mid-way | Migration files are additive; fix the env issue and re-run `npm run db:migrate` — it resumes from the ledger. |

## 8. Revoking sessions & rotating credentials

- **Revoke all sessions:** `DELETE FROM sessions;` (in Neon's SQL editor) — every admin is logged out instantly; cookies become invalid because validation is server-side.
- **Rotate the admin password:** `npm run create-admin` with a new password (updates the hash in place), then revoke sessions as above.
- **Rotate the Neon password:** Neon dashboard → reset password → update `DATABASE_URL` locally and in Render (when this phase deploys).
- **Session cookies** are HttpOnly + SameSite=Lax, `Secure` in production, and the DB stores only SHA-256 hashes of session tokens — a leaked DB cannot be replayed as logins.
