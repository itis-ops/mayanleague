@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start dev server at localhost:3000
- `npm run build` — production build (TypeScript + static generation)
- `npm start` — serve the production build

## Architecture

This is a Next.js 16 App Router project (Turbopack) using Tailwind CSS v4 and React 19.

**Homepage only** — a single `/` route assembled in `src/app/page.tsx` from section components.

### Key patterns

- **All components are client components** (`'use client'`) because they consume `useLanguage` context. The context lives in `LanguageProvider` (wrapped around `<body>` in `layout.tsx`).
- **Bilingual (EN/ES)** via `src/hooks/useLanguage.ts` context + `localStorage`. All strings live in `src/lib/i18n.ts` — never hardcode visible text in components.
- **Design tokens** are in `src/app/globals.css` under `@theme` — colors (`forest-dark`, `forest`, `jade`, `gold`, `cream`, `ink`, `mist`) and font families.
- **Decorative SVGs** in `src/components/decorative/` are hand-authored React components (no external icon libraries). `MayaPatternOverlay` uses `useId()` for SSR-safe pattern IDs.

### Component map

```
layout/Navbar.tsx       — sticky scroll-aware nav + mobile hamburger
layout/Footer.tsx       — 3-col footer with pattern BG
sections/HeroSection    — full-bleed hero with SVG pattern overlay
sections/ProgramsSection — 6-card program grid
sections/MissionSection  — pull-quote + stat blocks on forest BG
sections/NewsSection     — 3 news cards (horizontal scroll on mobile)
ui/Button.tsx           — variant: primary | outline | ghost
ui/ProgramCard.tsx      — program card with inline SVG icon
ui/NewsCard.tsx         — news card with placeholder image
ui/LanguageToggle.tsx   — EN/ES pill toggle (client)
ui/LanguageProvider.tsx — context provider with localStorage persistence
decorative/MayaPatternOverlay — animated diamond mesh SVG
decorative/SteppedFretDivider — grecas horizontal divider SVG
decorative/KinSeparator       — 4-petal Kin glyph SVG
```
