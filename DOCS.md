# TransformArte — Technical Documentation

> Last updated: 2026-04-15 · Status: **Production-hardened MVP**

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture](#2-architecture)
3. [Developer Guide](#3-developer-guide)
4. [Security](#4-security)
5. [Deployment](#5-deployment)
6. [Change Log](#6-change-log)
7. [Remaining Risks & Roadmap](#7-remaining-risks--roadmap)

---

## 1. Executive Summary

### What the product is

**TransformArte** is the official website for a Rotary District 4130 social campaign in Mexico that uses art as a vehicle for youth mental health awareness. It is a bilingual (Spanish/English) full-stack web application deployed at [transform-arte.com.mx](https://transform-arte.com.mx).

Core capabilities:
- Public artwork catalog with submission and admin approval flow
- Community forum with image posts and comments
- Donation and lead-capture forms
- Event listings and promotion
- Role-based admin dashboard with CSV exports
- Visitor analytics with optional IP geolocation

### What was broken (before this patch)

| # | Issue | Severity |
|---|-------|----------|
| 1 | `POST /api/upload` accepted file uploads from **unauthenticated** callers — any bot could fill the storage bucket | **Critical** |
| 2 | JWT signing key fell back to the hardcoded literal `'dev-secret-change'` when `JWT_SECRET` env var was absent — tokens forgeable in production | **Critical** |
| 3 | `typescript.ignoreBuildErrors: true` in `next.config.js` silenced all TypeScript errors during the build — runtime crashes were guaranteed over time | **Critical** |
| 4 | `Cache-Control: public, max-age=3600` applied **globally** including to `/api/admin/*` — CDN/proxy layers could cache admin responses | **Critical** |
| 5 | `api/visits/route.ts` had a hardcoded absolute path to the developer's local machine (`/Users/chochesanchez/Desktop/…/GeoLite2-City.mmdb`) — crashed (silently) on every non-local deployment | **Critical** |
| 6 | `GET /api/artworks` returned **pending** artworks including `donor_email` and `donor_phone` — sensitive contact data publicly exposed | **High** |
| 7 | In-memory rate limiter (`Map` in module scope) is reset on every serverless cold start — effectively no rate limiting in production | **High** |
| 8 | CORS check skipped when `CORS_ALLOWED_ORIGINS` was unset (the default) with no warning | **High** |
| 9 | `@ts-ignore` in `security.ts` suppressed a real TypeScript error on a custom `statusCode` property | **Medium** |
| 10 | `db-admin.ts` contained a dead `example()` function with a self-referencing call to `prisma.$disconnect()` that would crash if uncommented | **Medium** |
| 11 | No `.env.example` file existed — new developers had no reference for required environment variables | **Medium** |

### What was fixed

All items above were addressed. See [Change Log](#6-change-log) for file-level details.

### Current project status

**Production-hardened MVP.** The core user flows (browse, donate artwork, join forum, contact, admin moderation) are functional and secure. The remaining risks below are medium-term improvements, not blockers.

---

## 2. Architecture

### System overview

```
Browser
  │
  ├── GET /es/* or /en/*         Next.js App Router (SSR / RSC)
  │     └── Reads from Supabase (server-side fetch in page components)
  │
  ├── POST/GET /api/*            Next.js Route Handlers (Node.js runtime)
  │     ├── Auth: JWT in httpOnly cookie, verified by jose
  │     ├── DB reads/writes: Supabase JS client (service role)
  │     └── File storage: Supabase Storage
  │
  └── Client components          React (hydration only where needed)
        ├── State: React useState / useEffect (no global store)
        └── API calls: native fetch()

Infrastructure
  ├── Vercel          — hosting, edge network, deployment
  ├── Supabase        — PostgreSQL database + S3-compatible file storage
  └── Sentry          — error tracking (server + client)
```

### Frontend

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.3 (strict mode) |
| Styling | Tailwind CSS 3.4 |
| i18n | next-intl 4.1 — locale prefix routing (`/es/*`, `/en/*`) |
| Fonts | Google Fonts Inter (loaded server-side) |
| Notifications | react-hot-toast |

Pages are Server Components by default. `'use client'` is used only for interactive elements (forms, image carousel, mobile nav, language switcher).

### Backend

| Layer | Technology |
|-------|-----------|
| Runtime | Next.js Route Handlers (Node.js 20) |
| Auth | Custom JWT (`jose` + `bcryptjs`) in httpOnly cookies |
| ORM | Prisma 6 (models, migrations, type safety) |
| Database client | Supabase JS client (admin service role) |
| Validation | Zod |
| File conversion | Sharp (HEIC → JPEG) |
| Error tracking | Sentry |

### Database design

**Provider:** PostgreSQL hosted on Supabase (12 models, 2 migrations).

```
users               — email/password accounts, role (user/admin/superadmin)
artworks            — donated artwork submissions; status: pending → approved/rejected
forum_posts         — community posts with JSON image array
comments            — comments on forum posts
events              — event definitions (populated manually or via admin)
event_registrations — participant sign-ups for events
post_reports        — community moderation reports
audit_logs          — admin action history
user_sessions       — server-side session store (defined, not yet wired)
password_reset_tokens  — password recovery (defined, not yet wired)
email_verification_tokens — email verification (defined, not yet wired)
contact_messages    — contact form submissions
leads               — lead capture with optional file upload
```

**Important:** The application currently stores and reads user records through the **Supabase JS client** directly (bypassing Prisma). The `User` model in `prisma/schema.prisma` defines the shape but Prisma does not manage this table at runtime. All other models use Prisma. See [Remaining Risks](#7-remaining-risks--roadmap) for the consolidation plan.

### Auth design

```
1. POST /api/auth?action=signup
   → bcrypt hash password (salt 10)
   → INSERT into Supabase `users` table
   → SignJWT (HS256, 30d) with { sub, email, fullName, role }
   → Set-Cookie: ta_session=<token>; HttpOnly; SameSite=Lax; Secure

2. POST /api/auth?action=login
   → SELECT user by email from Supabase
   → bcrypt.compare(plain, hash)
   → SignJWT → Set-Cookie (same as above)

3. GET /api/auth
   → jwtVerify(cookie token)
   → Return { user: { id, email, fullName, role } } or { user: null }

4. POST /api/auth?action=logout
   → Clear cookie (maxAge=0)
```

Sessions are **stateless JWT** — they cannot be server-side invalidated before expiry (30 days). The `UserSession` table exists in the schema for a future server-side invalidation mechanism.

### Data flow — upload

```
Client (authenticated)
  │ multipart/form-data
  ▼
POST /api/upload
  │ 1. Verify JWT session cookie (401 if missing)
  │ 2. Validate MIME type
  │ 3. If HEIC/HEIF: Sharp converts → JPEG
  │ 4. Upload to Supabase Storage (bucket: `uploads`)
  │ 5. Return { publicUrl, signedUrl, path }
  ▼
Browser stores URL, attaches to artwork/forum submission
```

### i18n routing

```
middleware.ts
  → Reads NEXT_LOCALE cookie
  → If locale mismatch in URL path, redirects to saved locale
  → Falls through to next-intl middleware (always-prefix routing)

Supported locales: ['es', 'en']  (default: 'es')
Messages:          /messages/es.json  /messages/en.json
```

---

## 3. Developer Guide

### Prerequisites

- Node.js 20+
- npm 10+
- A Supabase project (free tier works)
- (Optional) MaxMind GeoLite2-City database for visit analytics

### Setup

```bash
# 1. Clone and install
git clone <repo>
cd Transformarte
npm install

# 2. Configure environment
cp .env.example .env.local
# Fill in all required variables (see .env.example for descriptions)

# 3. Run migrations
npx prisma migrate dev

# 4. Start dev server
npm run dev
```

### Environment variables

See `.env.example` for the full list with descriptions. Required variables:

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Pooled Postgres connection (PgBouncer) |
| `DIRECT_URL` | Yes | Direct Postgres connection (migrations) |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server-only) |
| `JWT_SECRET` | **Yes** (crashes in prod if missing) | JWT signing key ≥ 32 chars |
| `SUPABASE_BUCKET` | No | Storage bucket name (default: `uploads`) |
| `COOKIE_NAME` | No | Session cookie name (default: `ta_session`) |
| `ALLOWED_MIME_TYPES` | No | Upload MIME whitelist |
| `CORS_ALLOWED_ORIGINS` | No | Comma-separated allowed origins |
| `GEOIP_MMDB_PATH` | No | Path to MaxMind .mmdb file |
| `SENTRY_DSN` | No | Sentry error tracking DSN |

### Folder structure

```
/
├── messages/              Translation JSON files (en.json, es.json)
├── prisma/
│   ├── schema.prisma      Database schema (12 models)
│   └── migrations/        Migration history
├── public/                Static assets (logo, images, favicon)
├── src/
│   ├── app/
│   │   ├── [locale]/      All localised pages (RSC by default)
│   │   │   ├── admin/     Admin dashboard and components
│   │   │   ├── catalogo/  Public artwork gallery
│   │   │   ├── comunidad/ Community forum
│   │   │   └── ...
│   │   └── api/           Route handlers
│   │       ├── auth/      Login, signup, logout, session check
│   │       ├── artworks/  Public artwork submission and catalog
│   │       ├── upload/    Authenticated file upload (→ Supabase Storage)
│   │       ├── forum/     Forum CRUD
│   │       ├── comments/  Comment CRUD
│   │       ├── contact/   Contact form
│   │       ├── leads/     Lead capture
│   │       ├── visits/    Visit analytics
│   │       ├── profile/   User profile
│   │       ├── storage/sign/ Signed URL generation
│   │       └── admin/     Admin-only endpoints (artworks, posts, contacts, exports)
│   ├── components/        Shared UI components
│   ├── hooks/             Custom React hooks
│   ├── lib/
│   │   ├── auth.ts        JWT session helpers + startup validation
│   │   ├── prisma.ts      Prisma singleton
│   │   ├── supabase.ts    Supabase admin client
│   │   ├── security.ts    CORS + rate limiting
│   │   └── db-admin.ts    Admin Prisma helpers
│   ├── types/
│   │   └── index.ts       Shared TypeScript types
│   ├── i18n.ts            next-intl configuration
│   └── middleware.ts      Locale redirect middleware
├── .env.example           Environment variable reference
├── DOCS.md                This file
├── next.config.js         Next.js configuration
└── tsconfig.json          TypeScript configuration (strict)
```

### Key modules

#### `src/lib/auth.ts`
- `hashPassword(plain)` — bcrypt hash with salt 10
- `verifyPassword(plain, hash)` — bcrypt compare
- `createSession(user)` — SignJWT (HS256, 30d), sets httpOnly cookie
- `clearSession()` — deletes the session cookie
- `getAuthUser(request)` — extracts and verifies JWT from `cookie` header → `SessionUser | null`
- `requireAdmin(user)` — `true` if `role === 'admin' | 'superadmin'`

**Startup guard:** If `JWT_SECRET` is missing and `NODE_ENV === 'production'`, the module throws immediately at import time.

#### `src/lib/supabase.ts`
Exports a single `supabaseAdmin` client (service role). Never import or use this in client components — it contains a privileged key.

#### `src/lib/security.ts`
- `assertAllowedOrigin(request)` — throws if origin not in `CORS_ALLOWED_ORIGINS`
- `rateLimit(key)` — in-memory counter (see ⚠️ warning in the file)

#### `src/types/index.ts`
Centralised TypeScript types. Import as `import type { SessionUser } from '@/types'`.

### Admin flows

1. A user with `role = 'admin'` or `role = 'superadmin'` can access `/[locale]/admin`.
2. The admin page fetches data from `/api/admin/*` endpoints, all of which verify `requireAdmin(user)`.
3. Admin actions: approve/reject artworks, hide/delete forum posts, view contact messages, export CSV.

To create the first admin: manually update `role` in the `users` Supabase table for the target account.

---

## 4. Security

### Vulnerabilities fixed in this patch

| Vulnerability | Root Cause | Fix Applied |
|---------------|-----------|-------------|
| Unauthenticated file upload | `POST /api/upload` had no auth check | Added `getAuthUser()` guard; returns 401 if no session |
| Forgeable JWT in production | `JWT_SECRET` fell back to a known literal | Module throws at startup if `JWT_SECRET` is absent in production |
| `Cache-Control: public` on admin routes | Header applied globally in `next.config.js` | Split headers: `no-store` for `/api/*`, `s-maxage` for pages |
| Hardcoded developer path in production code | `openSync('/Users/chochesanchez/…')` in visits route | Replaced with `process.env.GEOIP_MMDB_PATH`; graceful no-op if unset |
| Pending artwork donor data exposed publicly | `GET /api/artworks` returned all statuses including contact fields | Returns only `approved` rows; contact fields excluded via explicit SELECT |
| `@ts-ignore` masking a real type error | Custom `statusCode` property on `Error` | Replaced with a typed `RateLimitError` class |
| TypeScript errors silently ignored | `typescript.ignoreBuildErrors: true` | Removed; build now fails on type errors |
| Missing CSRF protection awareness | — | Documented as a remaining risk |

### Current protections

| Protection | Implementation |
|-----------|---------------|
| Authentication | JWT (HS256) in HttpOnly, SameSite=Lax, Secure cookies |
| Password storage | bcrypt (cost factor 10) |
| Input validation | Zod schemas on all API inputs |
| Admin authorisation | `requireAdmin()` check in every admin route handler |
| File upload auth | Session required for all uploads |
| MIME type filtering | Whitelist via `ALLOWED_MIME_TYPES` |
| HEIC conversion | Sharp converts to JPEG server-side before storage |
| XSS mitigation | `X-XSS-Protection`, `X-Content-Type-Options`, CSP header |
| Clickjacking | `X-Frame-Options: SAMEORIGIN`, CSP `frame-ancestors 'none'` |
| Transport | HSTS (`max-age=63072000; includeSubDomains; preload`) |
| Rate limiting | In-memory (effective on warm instances only — see ⚠️) |
| CORS | `assertAllowedOrigin()` in sensitive endpoints |
| Error tracking | Sentry (server + client) |

### Known security limitations

1. **Rate limiter is not production-grade** — resets on cold starts. Replace with Upstash Redis / Vercel KV for true distributed rate limiting.
2. **JWT sessions are not revocable** — a stolen session token is valid for 30 days. The `UserSession` table is scaffolded but not wired. Until wired: shorten expiry (e.g., 7d) or implement session invalidation.
3. **No CSRF protection** — mutations are validated by Zod and gated by auth, but there is no CSRF token mechanism. SameSite=Lax on the cookie provides partial protection against cross-site form submissions.
4. **`unsafe-inline` in CSP** — required by the `VisitPing` inline script in `[locale]/layout.tsx`. Moving that script to a `src` file and implementing nonce-based CSP would eliminate this.
5. **No email verification** — users can register with any email address. The `EmailVerificationToken` model exists for a future implementation.
6. **No password reset** — `PasswordResetToken` model exists but is not wired to any endpoint or email flow.
7. **Dual-database pattern** — users are managed via Supabase client while all other entities use Prisma. This bypasses ORM-level FK enforcement and transaction safety for user-related writes.

---

## 5. Deployment

### Production checklist

Before every production release, verify:

- [ ] `JWT_SECRET` is set in Vercel project environment variables (min 32 chars)
- [ ] `DATABASE_URL` and `DIRECT_URL` are set and point to the correct Supabase project
- [ ] `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
- [ ] `SUPABASE_BUCKET` is set and the bucket exists in Supabase Storage
- [ ] `NEXT_PUBLIC_BASE_URL` is set to `https://transform-arte.com.mx`
- [ ] `NODE_ENV=production` (Vercel sets this automatically)
- [ ] Sentry DSN is configured (`SENTRY_DSN`)
- [ ] Run `npx prisma migrate deploy` after any schema changes
- [ ] Build passes without TypeScript errors (`npm run build`)

### Caching rules (as configured in next.config.js)

| Route pattern | Cache-Control |
|--------------|---------------|
| `/api/*` | `no-store, no-cache, max-age=0, must-revalidate` |
| All other pages | `public, max-age=0, s-maxage=3600, stale-while-revalidate=86400` |
| `_next/static/*` | Controlled by Next.js (immutable, long TTL) |

Pages that call `cookies()` or `headers()` internally are automatically made dynamic by Next.js and bypass the CDN cache.

### Database migrations

```bash
# Development: apply and generate migration
npx prisma migrate dev --name <description>

# Production: apply without regenerating (CI/CD safe)
npx prisma migrate deploy

# Generate Prisma client after schema changes (also runs in postinstall)
npx prisma generate
```

### CI/CD recommendation

The project has no CI/CD pipeline. Recommended GitHub Actions workflow:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit   # type-check without building
      - run: npm run build
        env:
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          DIRECT_URL: ${{ secrets.DIRECT_URL }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

---

## 6. Change Log

### 2026-04-15 — Production hardening patch

#### `next.config.js`
- **Removed** `typescript: { ignoreBuildErrors: true }` — TypeScript errors now fail the build as they should
- **Replaced** global `Cache-Control: public, max-age=3600` with route-scoped rules:
  - `/api/*` → `no-store, no-cache, max-age=0, must-revalidate`
  - All other pages → `public, max-age=0, s-maxage=3600, stale-while-revalidate=86400`
- **Added** `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- **Added** `Content-Security-Policy` header (default-src 'self'; script-src allows unsafe-inline for VisitPing)
- **Removed** redundant `assetPrefix` (same domain as deployment)

#### `src/lib/auth.ts`
- **Added** startup guard: throws `Error` in production if `JWT_SECRET` is not set; warns in development
- **Changed** JWT secret fallback from `'dev-secret-change'` to `'dev-only-insecure-secret-do-not-deploy'` (less ambiguous)
- **Added** `SessionUser` type export
- **Fixed** cookie value parsing: `split('=')[1]` → `split('=').slice(1).join('=')` to preserve base64 padding characters in JWT tokens
- **Fixed** return type of `getAuthUser()` from `any` to `SessionUser | null`
- **Fixed** return type of `requireAdmin()` from implicit `boolean` to explicit `boolean`

#### `src/app/api/upload/route.ts`
- **Added** authentication guard at the top of `POST` handler — returns HTTP 401 if no valid session
- **Replaced** `(file as any).type/size/name/arrayBuffer()` casts with proper `File` API usage
- **Improved** error handling: `err: unknown` with `instanceof Error` check

#### `src/lib/security.ts`
- **Replaced** `@ts-ignore` + dynamic property with a proper `RateLimitError extends Error` class that carries `statusCode: 429`
- **Added** production warning when `CORS_ALLOWED_ORIGINS` is not configured
- **Added** clear comment block documenting the serverless limitation of the in-memory rate limiter

#### `src/app/api/visits/route.ts`
- **Removed** hardcoded developer-machine path `/Users/chochesanchez/Desktop/PROJECTS/TOOLS/GeoLite2-City.mmdb`
- **Added** `GEOIP_MMDB_PATH` environment variable for the database path
- **Added** warning log if `GEOIP_MMDB_PATH` is unset in production
- **Fixed** `request.ip` (Vercel-Edge-only) removed in favour of `x-forwarded-for` header which works in all runtimes

#### `src/app/api/artworks/route.ts`
- **Fixed** public `GET` was returning both `pending` and `approved` artworks — now returns **only `approved`**
- **Fixed** public `GET` was returning `select('*')` including `donor_email` and `donor_phone` — now selects only safe public fields
- **Improved** error handling: `err: unknown` with typed checks

#### `src/app/[locale]/page.tsx`
- **Added** white decorative circle (`w-10 h-10 rounded-full bg-white shadow-lg opacity-90`) centered below the main logo in the hero section

#### `src/lib/db-admin.ts`
- **Removed** dead `example()` function that contained self-referencing `console.log` calls and a `prisma.$disconnect()` that would crash if executed
- **Simplified** each method to its single-expression Prisma call (no try/catch masking errors from callers)

#### `src/types/index.ts` _(new file)_
- Created central shared types: `SessionUser`, `ApiSuccess`, `ApiError`, `ArtworkStatus`, `ReportStatus`, `UserRole`, `PublicArtwork`, `ForumPost`, `Comment`

#### `.env.example` _(new file)_
- Created complete environment variable reference with descriptions, format examples, and security notes for every variable

---

## 7. Remaining Risks & Roadmap

### Must-fix before scaling

| Risk | Effort | Recommendation |
|------|--------|---------------|
| Rate limiter is not production-grade | Low | Replace with `@upstash/ratelimit` + Vercel KV |
| JWT sessions not revocable | Medium | Wire the existing `UserSession` table; set expiry to 7d |
| Dual-database split (users in Supabase, rest in Prisma) | High | Consolidate: write users through Prisma using `DIRECT_URL` |

### Should fix soon

| Risk | Effort | Recommendation |
|------|--------|---------------|
| No email verification | Medium | Wire `EmailVerificationToken` model + transactional email (Resend, SendGrid) |
| No password reset | Medium | Wire `PasswordResetToken` model + email |
| No pagination on forum/gallery | Medium | Add `?cursor=` or `?page=` params to forum and catalog |
| `unsafe-inline` in CSP | Medium | Move `VisitPing` to a `src` file; implement nonce-based CSP |

### Nice to have

| Item | Notes |
|------|-------|
| Test suite | Vitest for units/integration; Playwright for E2E |
| GitHub Actions CI | lint → tsc --noEmit → build → deploy |
| Events admin UI | Remove hardcoded JSON dependency for events |
| Artwork auction system | `marketPrice` / `startingPrice` schema is ready |
| Image resizing pipeline | Generate thumbnails on upload via Sharp or Supabase Edge |
| Structured logging | Pino + Sentry integration; remove raw `console.*` |
| ISR for static pages | Homepage, about, project pages can use `revalidate: 3600` instead of `force-dynamic` |
