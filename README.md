# Mayan League

The official website of the [International Mayan League](https://www.mayanleague.org). Built with Next.js 16 (App Router + Turbopack), React 19, Tailwind CSS v4, and Sanity Studio embedded at `/studio`.

## Quick start

```bash
npm install
npm run dev           # guarded launcher on port 3000
```

Open <http://localhost:3000>. The embedded CMS is at <http://localhost:3000/studio>.

> Studio sign-in requires a Sanity project. See [`SANITY_SETUP.md`](./SANITY_SETUP.md) for one-time setup steps (project creation, CORS, env vars). The site renders fine without it — the Studio route just won't load until `.env.local` has a real `NEXT_PUBLIC_SANITY_PROJECT_ID`.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Guarded dev server on port 3000 (writes `.dev-server.pid`, idempotent restart). |
| `npm run dev:raw` | Plain `next dev -p 3000` — useful when the guard interferes. |
| `npm run dev:stop` | Stops the guarded dev server. |
| `npm run dev:status` | Shows whether the guarded dev server is running. |
| `npm run build` | Production build. Verifies all routes including `/studio` compile. |
| `npm run start` | Serves the production build. |

## Project layout

```
mayanleague/
├── src/
│   ├── app/                  # Next.js App Router routes (including /studio)
│   ├── components/           # UI components grouped by feature
│   ├── hooks/                # useLanguage and friends
│   ├── lib/                  # Static content + helpers (still source of truth at launch)
│   └── sanity/               # Sanity Studio + client setup
├── public/site-images/       # Local images (Unsplash images stay hotlinked)
├── sanity.config.ts          # Studio configuration
├── sanity.cli.ts             # `npx sanity ...` configuration
├── SANITY_SETUP.md           # Studio setup walkthrough
├── CMS_SCOPE.md              # What the client can edit + post-launch migration order
└── AGENTS.md                 # Repo-specific notes for AI coding agents
```

## Content & CMS

At launch the Sanity CMS is **additive** — the public site still reads from the static TypeScript files in `src/lib/`. The Studio scope is:

- News articles (full CRUD, EN + ES)
- Homepage curation (hero, featured news, mission, CTAs)
- Site Settings (donate URL, contact info, social handles, footer copy, default OG image)

Programs, About, Team, Resources, and Maya Cosmovision custom blocks remain in code at launch. See [`CMS_SCOPE.md`](./CMS_SCOPE.md) for the full inventory and the post-launch migration order.

## Languages

Every user-facing string is bilingual (English + Spanish) by rule. The toggle is wired through `useLanguage()` and `LanguageProvider`. New content must ship with EN and ES at the same time — Sanity schemas enforce both on every `localized*` field, and the workspace rule [`.cursor/rules/bilingual-content.mdc`](../.cursor/rules/bilingual-content.mdc) covers the rest.

## Standards baked in

- **WCAG 1.1.1** — required alt text on every image (schema-level for CMS content, lint-level for static images).
- **IETF RFC 3986** — slugs are lowercase + hyphens, validated.
- **ISO 8601** — CMS dates stored as `datetime`, formatted on render.
- **OG / Twitter safe limits** — social title ≤ 60 chars, description ≤ 160 chars.
- **Unsplash compliance** — hotlinks preferred, attribution preserved (photographer name, URL, source URL, photo ID). See [`.cursor/rules/unsplash-compliance.mdc`](../.cursor/rules/unsplash-compliance.mdc).

## Deployment

The site deploys to Vercel via the existing project link in `.vercel/`. Production env vars (the Sanity project ID, dataset, read token, and `NEXT_PUBLIC_SITE_URL`) are set in the Vercel dashboard.
