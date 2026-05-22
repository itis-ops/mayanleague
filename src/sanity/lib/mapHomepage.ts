import type { Lang } from '@/lib/i18n'

/** Raw shape returned by `homepageQuery`. Fields use { en, es } sub-objects. */
type LocalizedStr = { en?: string; es?: string } | null | undefined
type LocalizedArr = LocalizedStr[] | null | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityHomepageDoc = Record<string, any>

/** Locale-resolved slice for HeroSection. */
export interface HeroSlice {
  eyebrow: string
  tagline: string
  proofPoints: string[]
  clarityLine: string
  ctaDonate: string
  ctaConnect: string
}

/** Locale-resolved slice for ImpactMomentSection. */
export interface ImpactMomentSlice {
  label: string
  kicker: string
  heading: string
  body: string
  readStatement: string
  statementUrl: string
}

/** Locale-resolved slice for MissionSection. */
export interface MissionSlice {
  sectionLabel: string
  sectionKicker: string
  /** Mirrors i18n `eyebrow` — mapped from sectionLabel. */
  eyebrow: string
  heading: string
  boardStatement: string[]
  boardStatementAttribution: string
  learnMore: string
}

/** Locale-resolved slice for ProgramsSection. */
export interface ProgramsSlice {
  heading: string
  intro: string
  learnMore: string
  items: { name: string; description: string }[]
}

/** Locale-resolved slice for CallToActionSection. */
export interface CtaSlice {
  eyebrow: string
  heading: string
  body: string
  donate: string
  donateOnce: string
  connect: string
}

/** Locale-resolved slice for ResourcesSection. */
export interface ResourcesSlice {
  sectionLabel: string
  sectionKicker: string
  eyebrow: string
  heading: string
  explore: string
  items: { title: string; description: string }[]
}

/** Locale-resolved slice for NewsSection labels. */
export interface NewsRailSlice {
  sectionKicker: string
  heading: string
  viewAll: string
}

export interface HomepageContent {
  hero: { en: HeroSlice; es: HeroSlice }
  impactMoment: { en: ImpactMomentSlice; es: ImpactMomentSlice }
  mission: { en: MissionSlice; es: MissionSlice }
  programs: { en: ProgramsSlice; es: ProgramsSlice }
  cta: { en: CtaSlice; es: CtaSlice }
  resources: { en: ResourcesSlice; es: ResourcesSlice }
  newsRail: { en: NewsRailSlice; es: NewsRailSlice }
}

function ls(field: LocalizedStr, lang: Lang): string {
  return field?.[lang] ?? field?.en ?? ''
}

function la(field: LocalizedArr, lang: Lang): string[] {
  if (!Array.isArray(field)) return []
  return field.map((item) => ls(item, lang))
}

function mapHero(doc: SanityHomepageDoc, lang: Lang): HeroSlice {
  const h = doc.hero
  return {
    eyebrow: ls(h?.eyebrow, lang),
    tagline: ls(h?.tagline, lang),
    proofPoints: la(h?.proofPoints, lang),
    clarityLine: ls(h?.clarityLine, lang),
    ctaDonate: ls(h?.ctaDonate, lang),
    ctaConnect: ls(h?.ctaConnect, lang),
  }
}

function mapImpactMoment(doc: SanityHomepageDoc, lang: Lang): ImpactMomentSlice {
  const im = doc.impactMoment
  return {
    label: ls(im?.label, lang),
    kicker: ls(im?.kicker, lang),
    heading: ls(im?.heading, lang),
    body: ls(im?.body, lang),
    readStatement: ls(im?.readStatement, lang),
    statementUrl: im?.statementUrl ?? '',
  }
}

function mapMission(doc: SanityHomepageDoc, lang: Lang): MissionSlice {
  const m = doc.mission
  const sectionLabel = ls(m?.sectionLabel, lang)
  return {
    sectionLabel,
    sectionKicker: ls(m?.sectionKicker, lang),
    eyebrow: sectionLabel,
    heading: ls(m?.heading, lang),
    boardStatement: Array.isArray(m?.boardStatement)
      ? m.boardStatement.map((item: LocalizedStr) => ls(item, lang)).filter(Boolean)
      : [],
    boardStatementAttribution: ls(m?.boardStatementAttribution, lang),
    learnMore: ls(m?.learnMore, lang),
  }
}

function mapPrograms(doc: SanityHomepageDoc, lang: Lang): ProgramsSlice {
  const p = doc.programsSpotlight
  return {
    heading: ls(p?.heading, lang),
    intro: ls(p?.intro, lang),
    learnMore: ls(p?.learnMore, lang),
    items: Array.isArray(p?.items)
      ? p.items.map((item: SanityHomepageDoc) => ({
          name: ls(item.name, lang),
          description: ls(item.description, lang),
        }))
      : [],
  }
}

function mapCta(doc: SanityHomepageDoc, lang: Lang): CtaSlice {
  const c = doc.callToAction
  return {
    eyebrow: ls(c?.eyebrow, lang),
    heading: ls(c?.heading, lang),
    body: ls(c?.body, lang),
    donate: ls(c?.donate, lang),
    donateOnce: ls(c?.donateOnce, lang),
    connect: ls(c?.connect, lang),
  }
}

function mapResources(doc: SanityHomepageDoc, lang: Lang): ResourcesSlice {
  const r = doc.resourcesSpotlight
  return {
    sectionLabel: ls(r?.sectionLabel, lang),
    sectionKicker: ls(r?.sectionKicker, lang),
    eyebrow: ls(r?.eyebrow, lang),
    heading: ls(r?.heading, lang),
    explore: ls(r?.explore, lang),
    items: Array.isArray(r?.items)
      ? r.items.map((item: SanityHomepageDoc) => ({
          title: ls(item.title, lang),
          description: ls(item.description, lang),
        }))
      : [],
  }
}

function mapNewsRail(doc: SanityHomepageDoc, lang: Lang): NewsRailSlice {
  const n = doc.newsRail
  return {
    sectionKicker: ls(n?.kicker, lang),
    heading: ls(n?.headline, lang),
    viewAll: ls(n?.viewAll, lang),
  }
}

/**
 * Maps a raw Sanity `homepage` document into per-locale content slices for all
 * 7 homepage sections. Returns `null` if the document is missing or empty.
 */
export function mapHomepage(doc: SanityHomepageDoc | null | undefined): HomepageContent | null {
  if (!doc) return null

  return {
    hero: { en: mapHero(doc, 'en'), es: mapHero(doc, 'es') },
    impactMoment: { en: mapImpactMoment(doc, 'en'), es: mapImpactMoment(doc, 'es') },
    mission: { en: mapMission(doc, 'en'), es: mapMission(doc, 'es') },
    programs: { en: mapPrograms(doc, 'en'), es: mapPrograms(doc, 'es') },
    cta: { en: mapCta(doc, 'en'), es: mapCta(doc, 'es') },
    resources: { en: mapResources(doc, 'en'), es: mapResources(doc, 'es') },
    newsRail: { en: mapNewsRail(doc, 'en'), es: mapNewsRail(doc, 'es') },
  }
}
