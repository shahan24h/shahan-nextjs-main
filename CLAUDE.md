# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint check
npm start        # Start production server
```

No test suite is configured.

## Environment Variables

Create `.env.local` with:

```
MONGODB_URI=
SECRET_KEY_ACCESS_TOKEN=
SECRET_KEY_REFRESH_TOKEN=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_USER=
EMAIL_PASS=
NEXT_PUBLIC_API_URL=   # optional; defaults to window.location.origin/api
```

Note: The README lists `JWT_SECRET` / `JWT_REFRESH_SECRET`, but `src/lib/auth.ts` reads `SECRET_KEY_ACCESS_TOKEN` / `SECRET_KEY_REFRESH_TOKEN`.

## Architecture

This is a **Next.js App Router** portfolio site for Shahan Ahmed (Data Scientist / ML Engineer). It has a public-facing portfolio and a password-protected admin dashboard.

### Key directories

- `src/app/` — App Router pages and API routes
  - `src/app/api/` — Backend API (MongoDB via Mongoose, JWT auth, Cloudinary uploads)
  - `src/app/dashboard/` — Admin dashboard (projects, messages, appointments, availability)
  - `src/app/project/` — Static project case-study pages (not DB-driven; each is a hand-written page)
- `src/components/` — Shared React components; `src/components/dashboard/` for admin UI
- `src/contexts/AuthContext.tsx` — Client-side auth state (JWT stored in `localStorage`)
- `src/lib/` — Utilities: `db.ts` (singleton Mongoose connection), `auth.ts` (JWT sign/verify), `api.ts` (frontend `ApiClient` class), `security.ts` (request validation helpers), `validation.ts` (input length limits, sanitization, email/URL validators), `rateLimit.ts` (in-memory rate limiter), `availability.ts` (appointment scheduling config/logic, `America/New_York`), `seo.ts` (metadata factory), `email.ts` (Nodemailer), `cloudinary.ts`
- `src/proxy.ts` — Edge middleware (matcher: `/api/:path*`). Applies `rateLimit.ts` limits (skipped in dev) and enforces JWT auth on non-GET `/api/project/*` and `GET /api/contact`. This is where API rate limiting and edge-level auth actually run. Dashboard *pages* (as opposed to their API routes) are not protected here — that guard is client-side only (see Authentication flow below).
- `src/models/` — Mongoose schemas: `User`, `Project`, `Appointment`, `Availability`, `Contact`, `Blog`

### Authentication flow

- **Tokens:** 15-minute access token + 7-day refresh token, both JWT.
- **Storage:** `localStorage` (not HTTP-only cookies). `AuthContext` reads them on mount.
- **API calls:** `src/lib/api.ts` `ApiClient` attaches `Authorization: Bearer <token>` and auto-retries once on 401 using the refresh token.
- **Route guard:** `src/app/dashboard/layout.tsx` checks `AuthContext` + `localStorage` and redirects to `/login` if unauthenticated.
- **Server-side:** API routes call `verifyAuth(request)` from `src/lib/security.ts`, which decodes the JWT using `SECRET_KEY_ACCESS_TOKEN`.

### Rate limiting

`src/lib/rateLimit.ts` is a singleton in-memory limiter (resets between cold starts on Vercel). Limits are per IP+path. This is **not distributed** — for production multi-instance use, replace with Redis/Vercel KV.

### Project content

The portfolio projects shown on `/project/[slug]` pages are **static, hand-coded pages** (one file per case study), not loaded from the database. The `Project` Mongoose model and dashboard `/dashboard/projects` are for a separate dynamic projects list.

### Blog content

Same dual-system split as projects. The **public blog** (`/blog` and `/blog/[slug]`) is served entirely from **static data in `src/data/blogPosts.ts`** — not the database. Posts are markdown rendered with `react-markdown` + `remark-gfm` + `remark-math` + `rehype-katex` + `rehype-raw` (math via KaTeX; `katex` CSS must be loaded for equations to display). The `Blog` Mongoose model, `/api/blog`, and the `/dashboard/blog` editor (`BlogEditor.tsx`, TipTap/Slate) are a **separate dynamic system not wired to the public route**.

### SEO

`src/lib/seo.ts` exports `generateMetadata()` used in each page's `export const metadata`. `src/app/sitemap.ts` and `src/app/robots.ts` generate those files automatically. `src/components/StructuredData.tsx` adds JSON-LD.

### Image uploads

Images are uploaded to **Cloudinary** via `POST /api/image/upload` and stored as `{ url, public_id }` objects on the `Project` model. `next.config.ts` allows `res.cloudinary.com` as a remote image host.

### Deployment

Deployed to Vercel (`vercel.json`). API functions run in `iad1` with a 30-second max duration. Security headers (CSP-lite, `X-Frame-Options: DENY`, etc.) are set at the Vercel edge for all `/api/*` routes.
