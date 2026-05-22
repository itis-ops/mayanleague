# CMS Scope — International Mayan League

This is the source of truth for what a non-developer editor can change in Studio versus what still requires a code change.

---

## What editors can change in Studio today

### 1. News articles (`newsArticle`)

Full create / edit / publish / unpublish for every article.

| Field | Where it appears on the site |
|---|---|
| Title (EN + ES) | Article page `<h1>`, news listing card, homepage news rail |
| Slug | URL (`/news/your-slug`) — set on first save, avoid changing after publish |
| Category | News card label (e.g. "Human Rights") |
| Keywords | Related articles logic |
| Dek (short tagline) | Below the title on the article page |
| Summary + Why It Matters | Key-points sidebar on the article page |
| Excerpt | Homepage news card and listing teaser |
| Type: External / Internal | External → link-out card; Internal → full article hosted here |
| Author, Source name + URL | Byline on article page |
| Main image (Unsplash or upload) | Article hero image + social OG image |
| Featured flag | Fallback for homepage rail when no pinned articles are set |
| Published at | Sort order on `/news`; required to publish |
| SEO fields | Google title/description, OG/social preview |

Changes appear on the live site within **60 seconds** after publishing.

---

### 2. Homepage (`homepage` singleton)

All seven homepage sections are editable. Changes go live within 60 seconds.

| Section | What you can change |
|---|---|
| **Hero** | Eyebrow, main headline, sidebar mission line, supporting paragraph, Donate + Connect button labels, 3 proof-point lines |
| **Impact moment** | Section label, kicker (date + location), large headline, body paragraph, statement link label + URL |
| **Mission** | Section label + kicker, heading, board statement paragraphs (up to 2), attribution, Learn-more label |
| **Programs spotlight** | Section kicker, heading, intro paragraph, Learn-more label, up to 6 program cards (name + description each) |
| **Call to action** | Eyebrow, heading, body, Monthly Donate label, One-time Donate label, Contact label |
| **Resources spotlight** | Section label + kicker, eyebrow, heading, explore label, up to 8 resource cards (title + description each) |
| **News rail** | Section label, headline, Visit newsroom label, up to 4 pinned article references |

> **Tip:** The homepage reads from Sanity as soon as the **Hero → Main headline** field is filled in and the document is published. If the hero headline is blank, the site falls back to the built-in copy — so you will not accidentally blank out the homepage.

---

### 3. Site settings (`siteSettings` singleton)

Global values used across every page. Changes go live within 60 seconds.

| Setting | Where it appears |
|---|---|
| **Brand name** (short + full, EN + ES) | Top nav logo label, footer |
| **Nav labels** (About, Programs, Resources, News, Contact, Donate) | Top navigation bar + mobile menu |
| **Footer tagline** | Footer left column |
| **Footer column headings** (Who we are, What we do, Get involved) | Footer |
| **Footer link labels** | Footer navigation lists |
| **Copyright line** | Footer bottom |
| **Contact email** | Footer, Contact page, job application mailto links |
| **Contact phone** | Footer, Contact page |
| **Address lines** | Footer, Contact page + embedded map query |
| **Social URLs** (Facebook, Instagram, YouTube, X/Twitter) | Footer social icons |
| **Donate URL** | Every Donate button on the site (hero, nav, CTA section, footer) |

---

## What still requires a code change

These pages read from TypeScript files (`src/lib/`) and need a developer to update. They are planned for future Sanity migration phases.

| Content | Why not in CMS yet |
|---|---|
| **Program detail pages** (Maya Cosmovision, Human Rights, Environmental Protection, Immigration, Maya Women Delegation, Gathering of Ancestral Wisdom) | Six pages with highly structured, culturally specific copy including custom art blocks. Phase 2 migration. |
| **About collection** (Board of Directors, Our Path, Core Values, Job Opportunities) | Four pages sharing a common schema; need `aboutPage` document type first. Phase 2. |
| **Team page** | Staff roster and bios; need `teamMember` documents. Phase 2. |
| **Resource collection pages** (`/indigenous-language-resources`, `/land-rights`, `/lgbtqia2s`, etc.) | Specialized legal/cultural documents, some in Maya Mam. Require `resourceCollection` schema. Phase 3. |
| **Contact page copy** (hero, newsletter section) | Rarely changes; labels in Site Settings cover the live contact info. Phase 3. |
| **Navigation routes** | Paths like `/about`, `/programs` are in code; only the *labels* are editable in Site Settings. |
| **UI accessibility strings** | Skip-link text, ARIA labels — these are developer concerns, not content. |

---

## Post-launch migration order

Each phase is independent — the site never breaks between phases.

| Phase | Work |
|---|---|
| **Phase 2** | Programs, About, Team — define document types, migrate content, delete static files. |
| **Phase 3** | Resource collection pages (indigenous language resources, thematic resource hubs). Contact page copy. |
| **Phase 4** | Instant ISR revalidation via Sanity webhook → `revalidateTag`. Currently the site caches for 60 seconds. |
| **Phase 5** | Full i18n parity — any remaining hardcoded strings surfaced in Site Settings. |

---

## Schema enforcement (cannot be bypassed by editors)

- **Images** — every image requires alt text in both EN and ES (WCAG 1.1.1).
- **Slugs** — lowercase letters, digits, and hyphens only; unique per type (RFC 3986).
- **Publish date** — ISO 8601 datetime; required to publish a news article.
- **SEO limits** — social title ≤ 60 chars, social description ≤ 160 chars per locale.
- **Bilingual rule** — every `localizedString` / `localizedText` field requires both English and Spanish.
- **Unsplash compliance** — Unsplash images preserve photographer name, URL, photo ID, and download location. Attribution is never hidden.

---

## Files

```
mayanleague/
├── sanity.config.ts                         Studio config (mounted at /studio)
├── sanity.cli.ts                            CLI config (npx sanity ...)
├── src/sanity/
│   ├── env.ts                               Typed env access with build-safe fallbacks
│   ├── client.ts                            Sanity client + stega (click-to-edit)
│   ├── lib/
│   │   ├── live.ts                          sanityFetch + SanityLive (draft / live preview)
│   │   ├── mapHomepage.ts                   Sanity doc → per-locale section slices
│   │   ├── mapSiteSettings.ts               Sanity doc → contact, nav, footer slices
│   │   ├── mapNewsArticle.ts                Sanity doc → NewsArticle interface
│   │   └── fieldDescriptions.ts            Shared field description strings
│   ├── queries/
│   │   ├── news.ts                          GROQ: news article queries
│   │   ├── homepage.ts                      GROQ: homepage singleton
│   │   └── siteSettings.ts                  GROQ: site settings singleton
│   ├── presentation/
│   │   └── resolve.ts                       Presentation Tool URL mapping
│   ├── structure.ts                         Desk sidebar (singletons pinned at top)
│   └── schemas/
│       ├── objects/  (localizedString, localizedText, inlineImage, seoFields …)
│       └── documents/ (newsArticle, homepage, siteSettings)
├── src/lib/
│   ├── newsRepository.ts                    News data: Sanity-first, static fallback
│   ├── homepageRepository.ts                Homepage data: Sanity-first, static fallback
│   ├── siteSettingsRepository.ts            Site settings: Sanity-first, static fallback
│   └── mergeSiteSettings.ts                 Merges Sanity settings into i18n translation set
└── src/app/
    ├── api/draft-mode/enable/route.ts       Draft Mode enable (Presentation Tool)
    ├── api/draft-mode/disable/route.ts      Draft Mode disable (Exit preview)
    └── studio/[[...tool]]/                  Embedded Sanity Studio
```
