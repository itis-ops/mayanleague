# CMS Scope at Launch

The Sanity CMS is **additive** at launch. The public site continues to read content from the existing TypeScript files under `src/lib/` — wiring the rendered pages to live Sanity queries is a post-launch task (the "Phase 6+" work tracked in the 5/21 plan).

This document is the source of truth for what a non-developer editor can change in Studio versus what still requires a code change.

---

## At launch the client can edit in Studio (`/studio`)

### News articles (`newsArticle` document type)

Full CRUD over individual articles, including:

- Title, slug, category, keywords, dek, summary, why-it-matters, excerpt — all bilingual (EN + ES required).
- Article type: **External** (links to source) or **Internal** (full body hosted on the site, Portable Text).
- Author, source name, source URL.
- Main image — choose between an Unsplash hotlink (with photographer credit fields) or a direct upload. Alt text is required on every image.
- Featured flag (controls inclusion in the homepage news rail).
- Publish status: `draft`, `scheduled`, or `published`, with ISO 8601 `publishedAt`.
- SEO fields: social title, social description, OG image, hashtags.

### Homepage (`homepage` singleton)

Full control over the seven sections rendered in [`src/app/page.tsx`](src/app/page.tsx):

1. **Hero** — eyebrow, tagline, mission line, clarity line, CTA labels, three proof points.
2. **Impact moment** — eyebrow, headline, body, and one featured `newsArticle` reference.
3. **Mission** — kicker, heading, body, optional CTA.
4. **Programs spotlight** — kicker, heading, intro, and three items (label + description). Note: the program *pages* themselves are not in Sanity yet — the homepage spotlight just labels and links to fixed routes.
5. **Call to action** — kicker, heading, body, primary + secondary CTAs.
6. **Resources spotlight** — kicker, heading, intro, items (title + description).
7. **News rail** — kicker, headline, up to four featured `newsArticle` references.

Plus homepage-level SEO (OG title/description/image).

### Site Settings (`siteSettings` singleton)

Global values used in every layout:

- **Brand:** short and full names (bilingual).
- **Navigation labels:** About, Programs, Resources, News, Contact, Donate (bilingual). Route paths stay in code.
- **Footer:** tagline, columns, copyright (bilingual).
- **Contact:** email, phone, address lines.
- **Social handles:** Facebook, Instagram, YouTube, X/Twitter, etc. (URL-validated).
- **Donate URL:** the destination of every `Donate` button site-wide.
- **Default OG image, default social title, default social description.**

---

## At launch the client cannot edit (post-launch migration)

These still live in TypeScript and require a code change:

| Content | File | Notes |
|---|---|---|
| Program pages (Maya Cosmovision, Human Rights, Environmental Protection, Immigration, Maya Women Delegation, Gathering of Ancestral Wisdom) | [`src/lib/siteContent.ts`](src/lib/siteContent.ts) | All six program detail pages + index intro copy. |
| Maya Cosmovision custom blocks (artist bio, directional colors, art section) | [`src/app/maya-cosmovision/MayaCosmovisionContent.tsx`](src/app/maya-cosmovision/MayaCosmovisionContent.tsx) and [`MayaCosmovisionArtSection.tsx`](src/app/maya-cosmovision/MayaCosmovisionArtSection.tsx) | Hardcoded special-case content. |
| About / Board of Directors / Our Path / Our Core Values / Job Opportunities | [`src/lib/aboutPages.ts`](src/lib/aboutPages.ts) | All four collection pages share the same shape. |
| Team page | [`src/lib/i18n.ts`](src/lib/i18n.ts) (under `team` keys) | Roster + bios. |
| Resources collections (LGBTQIA2S+, Land Rights, Sovereignty, etc.) | [`src/lib/siteContent.ts`](src/lib/siteContent.ts) and [`src/lib/resourcePages.ts`](src/lib/resourcePages.ts) | Includes the Indigenous Language Resources singleton. |
| UI strings / hardcoded labels not surfaced in Site Settings | [`src/lib/i18n.ts`](src/lib/i18n.ts) | Skip-link text, ARIA labels, etc. |
| Route paths and navigation order | [`src/lib/siteContent.ts`](src/lib/siteContent.ts) `programNav`, `resourceNav`, `mediaNav` and [`src/lib/aboutPages.ts`](src/lib/aboutPages.ts) `ABOUT_PAGE_LINKS` | The labels are in Site Settings; the *paths* are in code. |

---

## Post-launch migration order

Sequence chosen so each phase compiles independently and the public site never breaks:

1. **News rendering → Sanity** (5/21+).
   - Add GROQ queries.
   - Replace `import { newsArticles } from '@/lib/news'` with server-side queries.
   - Wire ISR revalidation on publish/unpublish via Sanity webhook + `revalidateTag('news')`.
   - Add draft preview routing (`/preview/...`).
2. **Homepage rendering → Sanity.**
   - Same pattern as News. Each section component receives its slice of the `homepage` singleton via a single query.
3. **Site Settings → Sanity.**
   - Replace `useLanguage` reads from `i18n.ts` (for nav, footer, brand, contact) with a server-fetched settings object passed via Layout.
4. **Programs.** Define `program` document type with Portable Text sections + Maya Cosmovision custom fields (artist bio, directional colors). Migrate all six programs.
5. **Resources.** Define `resourceCollection` document type and `indigenousLanguageResources` singleton.
6. **About + Team.** Define `aboutPage` document type for the four About-family pages and `teamMember` documents for the Team page.

Each post-launch phase ends with: GROQ queries written, component reads ported, content migrated from the static files into Sanity, then the static file deleted.

---

## Standards the schemas enforce

These cannot be bypassed by editors — Sanity validation rejects the document otherwise:

- **WCAG 1.1.1** — every image (`unsplashImage`, `sanityImage`, `inlineImage`, `seoFields.ogImage`) requires a localized `alt` (EN + ES).
- **IETF RFC 3986** — `newsArticle.slug` must match `^[a-z0-9-]+$` and is unique per type.
- **ISO 8601** — `publishedAt` is a `datetime`. The legacy free-form `"Mar 26, 2026"` strings are formatted on render, not stored.
- **OG / Twitter safe limits** — `seoFields.socialTitle` ≤ 60 chars per locale; `socialDescription` ≤ 160 chars per locale.
- **Bilingual rule** (per `.cursor/rules/bilingual-content.mdc`) — every `localized*` field requires both `en` and `es` non-empty.
- **Unsplash compliance** (per `.cursor/rules/unsplash-compliance.mdc`) — `unsplashImage` preserves photographer name, photographer URL, source URL, photo ID, download location, and palette notes. Hotlinked URLs stay primary; uploads are the escape hatch.

---

## Files involved

```
mayanleague/
├── sanity.config.ts                       # Studio config (mounted at /studio)
├── sanity.cli.ts                          # CLI config (for `npx sanity ...`)
├── src/sanity/
│   ├── env.ts                             # Typed env access, build-safe fallbacks
│   ├── client.ts                          # createClient for server-side GROQ
│   ├── image.ts                           # @sanity/image-url helper
│   ├── structure.ts                       # Desk structure (singletons pinned)
│   └── schemas/
│       ├── index.ts
│       ├── objects/
│       │   ├── localizedString.ts
│       │   ├── localizedText.ts
│       │   ├── localizedBlockContent.ts
│       │   ├── ctaLink.ts
│       │   ├── unsplashImage.ts
│       │   ├── sanityImage.ts
│       │   ├── inlineImage.ts
│       │   └── seoFields.ts
│       └── documents/
│           ├── newsArticle.ts
│           ├── homepage.ts
│           └── siteSettings.ts
└── src/app/studio/[[...tool]]/
    ├── page.tsx                           # NextStudio mount
    ├── layout.tsx                         # noindex + minimal chrome
    └── loading.tsx                        # hydration placeholder
```
