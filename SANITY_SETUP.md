# Sanity Studio — Setup & Editor Guide

The Mayan League site uses **Sanity** as its CMS, embedded at `/studio`. This document covers one-time setup for developers and a day-to-day guide for content editors.

---

## Table of contents

1. [Vercel environment variables](#1-vercel-environment-variables)
2. [One-time local setup](#2-one-time-local-setup)
3. [CORS configuration](#3-cors-configuration)
4. [Accessing the Studio](#4-accessing-the-studio)
5. [Live preview (Presentation Tool)](#5-live-preview-presentation-tool)
6. [Editor test — end-to-end checklist](#6-editor-test--end-to-end-checklist)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Vercel environment variables

These must be set in **Vercel → mayanleague → Settings → Environment Variables** for production to work. All environments (Production, Preview, Development) should have the same values unless noted.

| Variable | Required | Example value | Where to get it |
|---|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ✅ Required | `lehb2c4h` | [sanity.io/manage](https://sanity.io/manage) → project → top of page |
| `NEXT_PUBLIC_SANITY_DATASET` | ✅ Required | `production` | Same page — always `production` for the live site |
| `SANITY_API_VERSION` | ✅ Required | `2026-05-21` | Copy exactly as shown — do not change |
| `SANITY_API_READ_TOKEN` | ✅ Required | `skAj...` | Sanity Manage → API → Tokens → Viewer role token |
| `NEXT_PUBLIC_SITE_URL` | ✅ Required | `https://mayanleague.vercel.app` | Your production domain |
| `PREVIEW_ACCESS_PASSWORD` | Optional | `your-shared-password` | Password you email to reviewers — only when the Vercel draft should be private |
| `PREVIEW_ACCESS_TOKEN` | Optional | `64-char hex from openssl` | Server-only cookie secret — generate with `openssl rand -hex 32`; never share |

> **`SANITY_API_WRITE_TOKEN`** is only needed locally when running migration scripts (`scripts/migrate-*.mjs`). Do not add it to Vercel — it grants write access.

### Preview password gate (optional)

When **both** `PREVIEW_ACCESS_PASSWORD` and `PREVIEW_ACCESS_TOKEN` are set on Vercel, visitors must sign in at `/preview-login` before viewing any page (including `/studio`). If either variable is missing, the gate is off — useful for local dev.

1. Generate a token (keep this private):
   ```bash
   openssl rand -hex 32
   ```
2. Choose a password to share with Mayan League staff (e.g. a long random phrase).
3. Add both variables in Vercel → **Production** (and Preview if you use branch deploys).
4. **Redeploy**.
5. In your outreach email, share only the **password** and the site URL — not the token.

To clear your own session locally: `curl -X DELETE http://localhost:3000/api/preview-auth`

### How to add variables in Vercel

1. Open [vercel.com](https://vercel.com) → your **mayanleague** project.
2. **Settings** → **Environment Variables**.
3. Add each variable from the table above. Paste the name exactly as shown.
4. Click **Save**.
5. **Redeploy** the project — env vars only take effect after a new deploy.

---

## 2. One-time local setup

```bash
# 1. Copy the env template
cp .env.example .env.local

# 2. Fill in the real values (open in any text editor)
# NEXT_PUBLIC_SANITY_PROJECT_ID=lehb2c4h
# SANITY_API_READ_TOKEN=skAj...
# NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 3. Install and run
npm install
npm run dev
```

Open <http://localhost:3000/studio>. Sign in with the Google or GitHub account that is a member of the Sanity project.

> **Add team members:** [sanity.io/manage](https://sanity.io/manage) → project → **Members** → **Invite member**.

---

## 3. CORS configuration

The Studio and Presentation Tool require your site domain to be in the Sanity project's CORS allow-list.

### Add origins (one-time)

```bash
# From the mayanleague/ directory:
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add https://mayanleague.vercel.app --credentials
```

Or manually: [sanity.io/manage](https://sanity.io/manage) → project → **API** → **CORS origins** → **Add** → paste URL → enable **Allow credentials** → save.

---

## 4. Accessing the Studio

| URL | What it does |
|---|---|
| `https://mayanleague.vercel.app/studio` | Production Studio |
| `http://localhost:3000/studio` | Local Studio |
| `/studio/presentation` | Live preview (Presentation Tool) |

The left sidebar has three sections:

- **Homepage** — the entire homepage, one document.
- **Site settings** — contact info, nav labels, footer, social links, donate URL.
- **Newsroom → News articles** — all published and draft articles.

---

## 5. Live preview (Presentation Tool)

The Presentation Tool lets editors see draft changes on the real site before publishing.

1. In the Studio left nav, click **Presentation** (the eye/camera icon).
2. Open a **News article** or the **Homepage** document.
3. The right pane shows a live preview of the front-end. Edits update the preview in real time — no need to publish first.
4. **Click to edit:** click any text in the preview pane → Studio jumps to that field.
5. When done previewing, click **Exit preview** (red badge, bottom-right of the preview).

> Changes in the preview are **never visible** to regular site visitors until you publish the document.

---

## 6. Editor test — end-to-end checklist

Use this checklist to verify the Studio → live site flow is working correctly.

### Test A: News article (create → publish → verify)

- [ ] Open Studio → **Newsroom → News articles → Create**.
- [ ] Fill in: **Title (EN)**, **Slug** (auto-fills from title — verify it looks clean), **Category**, **Published at** (set to today), **Excerpt (EN)**.
- [ ] Click **Publish**.
- [ ] Open `https://mayanleague.vercel.app/news` in a new tab. Wait up to 60 seconds and refresh.
- [ ] The new article appears in the listing.
- [ ] Click the article → the detail page loads at `/news/your-slug`.

### Test B: News article (edit → re-publish → verify)

- [ ] In Studio, open the article from Test A.
- [ ] Change the **Title (EN)** to something clearly different.
- [ ] Click **Publish** (or it auto-saves a draft — click Publish to go live).
- [ ] Refresh `/news` after ~60 seconds. The new title appears.

### Test C: Site settings — contact info

- [ ] Open Studio → **Site settings → Contact**.
- [ ] Change the **Phone** field to a test number (e.g. `(555) 000-0000`).
- [ ] Click **Publish**.
- [ ] Open `https://mayanleague.vercel.app/contact` and wait ~60 seconds.
- [ ] The test phone number appears on the contact page and in the footer.
- [ ] Change the phone back to the real number and **Publish** again.

### Test D: Homepage rail — pin a news article

- [ ] Open Studio → **Homepage → News rail**.
- [ ] Under **Featured articles**, click **Add item** and search for a published article.
- [ ] Click **Publish**.
- [ ] Open `https://mayanleague.vercel.app` and wait ~60 seconds.
- [ ] The pinned article appears as the first card in the news section.

### Test E: Live preview (Presentation Tool)

- [ ] Open Studio → **Presentation**.
- [ ] Navigate to a **News article**.
- [ ] Edit the **Dek** (short tagline) field. The preview pane updates without publishing.
- [ ] Click the dek text in the preview pane → Studio jumps to the dek field.
- [ ] Click **Exit preview** to leave draft mode.

---

## 7. Troubleshooting

| Symptom | Fix |
|---|---|
| `/studio` blank — "projectId is not valid" | `.env.local` still has `placeholder-project-id`. Add the real ID. |
| Studio loads but shows no data | CORS origin missing. Run `npx sanity cors add http://localhost:3000 --credentials`. |
| Presentation Tool shows a blank iframe | `NEXT_PUBLIC_SITE_URL` is wrong or CORS not configured for production. |
| Changes not appearing on the live site | Wait 60 seconds and hard-refresh. If still missing, check that the document is **Published** (not just saved as draft). |
| "Network error" in Studio | Check CORS origins in Sanity Manage. Both local and production URLs need `Allow credentials: on`. |
| Build fails with Sanity import errors | `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing from Vercel env vars. Add it and redeploy. |
| "Exit preview" badge missing | Navigate directly to `/api/draft-mode/disable` to clear the draft cookie. |
