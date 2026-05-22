# Sanity Studio Setup

The Mayan League site uses **Sanity** as its headless CMS, embedded inside this Next.js app at [`/studio`](http://localhost:3000/studio). This document walks you through the one-time setup so a content editor (or developer running locally) can sign in and start editing News, the Homepage, and Site Settings.

> **Scope at launch:** News articles, Homepage curation, and Site Settings only. See [`CMS_SCOPE.md`](./CMS_SCOPE.md) for what stays in code and the post-launch migration order.

---

## 1. Create the Sanity project (one-time, by an admin)

> This step happens **outside** the codebase. It cannot be automated from here.

1. Go to <https://www.sanity.io/manage>.
2. Sign in with the account that should own the project (use the team owner's email).
3. Click **Create new project**.
   - **Project name:** `mayanleague`
   - **Use the default dataset configuration:** *yes* — this gives you a public dataset named `production`.
   - **Use TypeScript:** doesn't matter, the schemas live in this repo.
4. Once the project is created, copy the **Project ID** shown at the top of the project page (it looks like `abc12xyz`).
5. **CORS origins:** Project page → **API** → **CORS origins** → **Add CORS origin**:
   - Origin: `http://localhost:3000`
   - Allow credentials: **on** (needed so the embedded Studio at `/studio` can authenticate against Sanity from the browser).
   - Repeat for any deployed URL (e.g. `https://mayanleague.vercel.app`) when you're ready.
6. **Read token (server only):** Project page → **API** → **Tokens** → **Add API token**:
   - Name: `nextjs-read-token`
   - Permissions: **Viewer**
   - Copy the token value — it's only shown once.
   - Paste it into `.env.local` as `SANITY_API_READ_TOKEN=...`.
   - This token is **not** required to load the Studio; it's only used by the Next.js server for draft previews and webhook revalidation (post-launch features).

---

## 2. Populate your local environment

The repo ships with a placeholder `.env.local` so `npm run build` succeeds before the real project exists. Once you've got the real Project ID, update `.env.local` in place:

```bash
# mayanleague/.env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12xyz        # ← replace placeholder-project-id with the real value
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2026-05-21                 # do not change unless you know why
SANITY_API_READ_TOKEN=                        # paste the read token from step 1.6 (optional locally)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Reference template lives in [`.env.example`](./.env.example). The `.env.local` file is gitignored — never commit it.

### Why these names?

| Variable | Public/Server | Why |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Public — leaks to browser bundle | Required by the embedded Studio and any client-side Sanity reads. |
| `NEXT_PUBLIC_SANITY_DATASET` | Public | Same reason. Defaults to `production`. |
| `SANITY_API_VERSION` | Server | Pinned to today's date (`2026-05-21`) to lock GROQ behavior — IETF stability convention. |
| `SANITY_API_READ_TOKEN` | **Server only** — never expose to the browser | For draft previews + webhook revalidation. Optional until you wire those up. |

---

## 3. Run the app and visit the Studio

From the `mayanleague/` directory:

```bash
npm install      # already done if you cloned the repo and ran build before
npm run dev      # guarded launcher on port 3000
```

Open <http://localhost:3000/studio>. The first time you load it:

1. Sanity will prompt you to sign in (Google, GitHub, or email).
2. The signed-in account must be a **member of the `mayanleague` Sanity project**. Add team members via Sanity Manage → **Members** → **Invite member**.
3. Once signed in you should see three top-level items in the left nav:
   - **Homepage** (singleton)
   - **Site Settings** (singleton)
   - **Newsroom → News article** (collection)

> If `/studio` shows a "Cannot connect to project" error, double-check `NEXT_PUBLIC_SANITY_PROJECT_ID` and that `http://localhost:3000` is in the project's CORS origins.

---

## 4. Build verification

You can confirm the integration without ever opening the browser:

```bash
npm run build
```

The build should exit `0` and list `/studio` as a dynamic route. If env vars are missing, the build still succeeds (lazy access) but `/studio` will throw a clear error at runtime.

---

## 5. Embedded Studio routes

| Route | Purpose |
|---|---|
| `/studio` | Editor home — pinned singletons + collection list. |
| `/studio/structure/...` | Sanity desk structure deep links. |
| `/studio/vision` | GROQ query playground (development only). |

The studio chunks are isolated under `/studio` and do not affect the public site bundle.

---

## 6. Troubleshooting

| Symptom | Fix |
|---|---|
| `/studio` blank + console says `projectId is not valid` | `.env.local` still has `placeholder-project-id`. Replace it. |
| `/studio` 404 in production | The route is dynamic (`force-dynamic`). Make sure `/studio` is not blocked by hosting rewrites. |
| "Network error" inside Studio | Add `http://localhost:3000` (or your deployed URL) to **CORS origins** in Sanity Manage. |
| Schemas not appearing | Restart `npm run dev` — schema changes hot-reload but new files sometimes need a restart. |

---

## 7. Live Preview (Presentation Tool)

The Studio now includes a **Presentation Tool** that lets editors preview their changes in real time — before publishing — in a side-by-side iframe of the live site.

### How it works

1. In the Studio left nav, click **Presentation** (the camera icon).
2. Navigate to a **News article** or **Homepage** document.
3. The right panel shows a live preview of the front-end. Edits you make in Studio fields update the preview in real time, even in draft state.
4. **Click-to-edit:** In the preview pane, click any piece of editable text to jump directly to that field in Studio.
5. The preview is contained inside the Studio session — published visitors never see draft content.

### CORS setup (required once per environment)

The Presentation Tool's iframe makes credentialed requests from the Studio origin. You must allow the Studio to call the front-end:

| Environment | Where | Action |
|---|---|---|
| **Local dev** | Sanity Manage → Project → API → CORS | Add `http://localhost:3000` with **Allow credentials: on** |
| **Production** | Sanity Manage → Project → API → CORS | Add `https://mayanleague.vercel.app` with **Allow credentials: on** |

CLI shortcut (from the `mayanleague/` directory):

```bash
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add https://mayanleague.vercel.app --credentials
```

### Environment variables for preview

| Variable | Where to set | Why |
|---|---|---|
| `SANITY_API_READ_TOKEN` | `.env.local` + Vercel env vars | Server fetches draft content; browser subscribes to live updates. Must be a **Viewer** token. Already configured locally. |
| `NEXT_PUBLIC_SITE_URL` | Vercel env vars | Tells Studio which front-end URL to load in the Presentation iframe. Set to your production URL (e.g. `https://mayanleague.vercel.app`). |

> **Vercel:** Add `NEXT_PUBLIC_SITE_URL=https://mayanleague.vercel.app` in the project → Settings → Environment Variables, then redeploy.

### Verification checklist

| Step | What to check |
|---|---|
| Local | `npm run dev` → `/studio` → Presentation → open a News article draft → edit the title → iframe updates without publish |
| Homepage | Edit hero tagline in Studio → preview `/` updates live |
| Click-to-edit | Click text in the preview → Studio jumps to that field |
| Published site | With Draft Mode off, `/` and `/news` are unchanged (published data only) |
| Production | After deploy, confirm Presentation `origin` in `sanity.config.ts` matches your `NEXT_PUBLIC_SITE_URL` |

### Exit preview

An **Exit preview** badge appears at the bottom-right of the browser when Draft Mode is active (inside the Presentation iframe). Click it to leave draft mode and return to the published site. Direct URL: `/api/draft-mode/disable`.

---

## 8. What you can edit today

See [`CMS_SCOPE.md`](./CMS_SCOPE.md) for the authoritative scope. Short version:

- **Edit in Studio:** News articles, Homepage sections, Site Settings (donate URL, contact info, social, footer, default OG image).
- **Still in code (for now):** Programs, About / Board / Our Path / Core Values / Job Opportunities, Team, Resources collections, Maya Cosmovision custom blocks, route paths.

The post-launch migration order is documented in `CMS_SCOPE.md`.
