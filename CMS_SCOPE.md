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

### 3. About pages + team

All five About-family pages plus the Team roster are now editable in Studio. Changes go live within 60 seconds.

| Document | Page | What you can change |
|---|---|---|
| `aboutPage` (singleton) | `/about` | Hero headline & intro, Who-we-are / How-we-work labels, 4 body paragraphs, 4 guiding principles, ancestral quote + source. (The board statement at the bottom is shared with **Homepage → Mission** — edit it there.) |
| `boardOfDirectorsPage` (singleton) | `/board-of-directors` | Page title, eyebrow, intro paragraph, hero image, ordered list of board members (name, role, heritage, bio paragraphs). |
| `ourPathPage` (singleton) | `/our-path` | Title, eyebrow, intro line, ordered Mission / Vision sections (kicker, body paragraphs, image). |
| `coreValuesPage` (singleton) | `/our-core-values` | Title, eyebrow, intro, hero image, exactly 7 values (each with a statement, icon image, and body paragraphs). |
| `jobOpportunitiesPage` (singleton) | `/job-opportunities` | Title, eyebrow, intro, list of open positions (kicker, job title, body paragraphs). The Apply button auto-emails `info@…` with the job title in the subject. |
| `teamMember` (multi-doc) | `/team` | One document per staff member: name, role, portrait, bio paragraphs, sort order. Reorder by editing the **Sort order** field (10 / 20 / 30 → leaves room to insert in between). |

> **Known content TODO:** Spanish translations for team-member bios were not yet provided by the client. The English copy is stored in both EN and ES slots; Studio shows a yellow warning ("Spanish translation recommended") on each `es` field until a translation is filled in. Visitors using the Spanish toggle see the English copy as a fallback in the meantime.

---

### 4. Site settings (`siteSettings` singleton)

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
| **Program detail pages** (Maya Cosmovision, Human Rights, Environmental Protection, Immigration, Maya Women Delegation, Gathering of Ancestral Wisdom) | Six pages with highly structured, culturally specific copy including custom art blocks. Phase 3 — redesigned alongside Resources into a persona-based experience that needs client collaboration before schema is finalized. |
| **Resource collection pages** (`/indigenous-language-resources`, `/land-rights`, `/lgbtqia2s`, etc.) | Specialized legal / cultural documents, some in Maya Mam. Phase 3 — paired with the Programs redesign so the schema can serve both audiences cleanly. |
| **Contact page copy** (hero, newsletter section) | Rarely changes; labels in Site Settings cover the live contact info. Phase 4. |
| **Navigation routes** | Paths like `/about`, `/programs` are in code; only the *labels* are editable in Site Settings. |
| **UI accessibility strings** | Skip-link text, ARIA labels — these are developer concerns, not content. |

---

## Post-launch migration order

Each phase is independent — the site never breaks between phases.

| Phase | Work | Status |
|---|---|---|
| **Phase 1** | Homepage + News + Site settings into Sanity. | Shipped |
| **Phase 2** | About, Board of Directors, Our Path, Our Core Values, Job Opportunities, Team into Sanity. | Shipped |
| **Phase 3** | Programs + Resources redesigned into a persona-based experience and migrated to Sanity. Requires client workshop to define personas and IA before schema design. | Pending client collaboration |
| **Phase 4** | Contact page copy + remaining hardcoded strings into Site Settings / dedicated singletons. | Future |
| **Phase 5** | Instant ISR revalidation via Sanity webhook → `revalidateTag`. Currently the site caches for 60 seconds. | Future |

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
│   │   ├── mapAboutPages.ts                 Sanity docs → About / Team / Board / Path / Values / Jobs slices
│   │   └── fieldDescriptions.ts             Shared field description strings
│   ├── queries/
│   │   ├── news.ts                          GROQ: news article queries
│   │   ├── homepage.ts                      GROQ: homepage singleton
│   │   ├── siteSettings.ts                  GROQ: site settings singleton
│   │   └── aboutPages.ts                    GROQ: About / Team / Board / Path / Values / Jobs
│   ├── presentation/
│   │   └── resolve.ts                       Presentation Tool URL mapping
│   ├── structure.ts                         Desk sidebar (singletons pinned at top, About pages grouped)
│   └── schemas/
│       ├── objects/  (localizedString, localizedText, inlineImage, seoFields, sanityImage …)
│       └── documents/ (newsArticle, homepage, siteSettings, aboutPage, boardOfDirectorsPage, ourPathPage, coreValuesPage, jobOpportunitiesPage, teamMember)
├── src/lib/
│   ├── newsRepository.ts                    News data: Sanity-first, static fallback
│   ├── homepageRepository.ts                Homepage data: Sanity-first, static fallback
│   ├── siteSettingsRepository.ts            Site settings: Sanity-first, static fallback
│   ├── aboutPagesRepository.ts              About / Team / Board / Path / Values / Jobs: Sanity-first, static fallback
│   └── mergeSiteSettings.ts                 Merges Sanity settings into i18n translation set
├── scripts/
│   ├── migrate-news-to-sanity.mjs           One-shot migration: news.ts → Sanity
│   ├── migrate-homepage-to-sanity.mjs       One-shot migration: i18n.ts homepage → Sanity
│   ├── migrate-site-settings-to-sanity.mjs  One-shot migration: i18n.ts site settings → Sanity
│   └── migrate-about-pages-to-sanity.mjs    One-shot migration: About pages + team + 16 images → Sanity
└── src/app/
    ├── api/draft-mode/enable/route.ts       Draft Mode enable (Presentation Tool)
    ├── api/draft-mode/disable/route.ts      Draft Mode disable (Exit preview)
    └── studio/[[...tool]]/                  Embedded Sanity Studio
```
