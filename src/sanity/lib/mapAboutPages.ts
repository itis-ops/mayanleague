import type { Lang } from '@/lib/i18n'
import { urlForImage } from '@/sanity/image'

type LocalizedStr = { en?: string; es?: string } | null | undefined
type LocalizedArr = LocalizedStr[] | null | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityDoc = Record<string, any>

interface SanityImageRef {
  alt?: LocalizedStr
  caption?: LocalizedStr
  credit?: string
  asset?: { _id?: string; url?: string } | null
}

/** Picks a localized string with EN fallback. */
function ls(field: LocalizedStr, lang: Lang): string {
  return field?.[lang]?.trim() || field?.en?.trim() || ''
}

/** Maps an array of localized strings to plain strings, dropping empties. */
function la(field: LocalizedArr, lang: Lang): string[] {
  if (!Array.isArray(field)) return []
  return field
    .map((item) => ls(item, lang))
    .filter((value) => value.length > 0)
}

/** Resolves a sanityImage object to its public URL, or undefined. */
function imageUrl(image?: SanityImageRef | null): string | undefined {
  if (!image?.asset) return undefined
  if (image.asset.url) return image.asset.url
  try {
    return urlForImage(image.asset).width(1600).url() ?? undefined
  } catch {
    return undefined
  }
}

/* ---------- About page ---------- */

export interface AboutPageSlice {
  heroHeading: string
  methodStatement: string
  whoWeAreLabel: string
  howWeWorkLabel: string
  paragraphs: string[]
  principles: string[]
  quoteLabel: string
  quote: string
  quoteSource: string
}

export interface AboutPageContent {
  en: AboutPageSlice
  es: AboutPageSlice
}

function mapAboutPageSlice(doc: SanityDoc, lang: Lang): AboutPageSlice {
  return {
    heroHeading: ls(doc.heroHeading, lang),
    methodStatement: ls(doc.methodStatement, lang),
    whoWeAreLabel: ls(doc.whoWeAreLabel, lang),
    howWeWorkLabel: ls(doc.howWeWorkLabel, lang),
    paragraphs: la(doc.paragraphs, lang),
    principles: la(doc.principles, lang),
    quoteLabel: ls(doc.quoteLabel, lang),
    quote: ls(doc.quote, lang),
    quoteSource: ls(doc.quoteSource, lang),
  }
}

export function mapAboutPage(doc: SanityDoc | null | undefined): AboutPageContent | null {
  if (!doc) return null
  const en = mapAboutPageSlice(doc, 'en')
  if (!en.heroHeading) return null
  return { en, es: mapAboutPageSlice(doc, 'es') }
}

/* ---------- Team members ---------- */

export interface TeamMemberSlice {
  name: string
  role: string
  image?: string
  bio: string[]
}

export interface TeamMembersContent {
  en: TeamMemberSlice[]
  es: TeamMemberSlice[]
}

function mapTeamMember(doc: SanityDoc, lang: Lang): TeamMemberSlice {
  return {
    name: doc.name ?? '',
    role: ls(doc.role, lang),
    image: imageUrl(doc.image),
    bio: la(doc.bio, lang),
  }
}

export function mapTeamMembers(docs: SanityDoc[] | null | undefined): TeamMembersContent | null {
  if (!Array.isArray(docs) || docs.length === 0) return null
  return {
    en: docs.map((doc) => mapTeamMember(doc, 'en')).filter((m) => m.name),
    es: docs.map((doc) => mapTeamMember(doc, 'es')).filter((m) => m.name),
  }
}

/* ---------- Board of Directors ---------- */

export interface AboutSectionSlice {
  title?: string
  kicker?: string
  body: string[]
  image?: string
}

export interface AboutCollectionPageSlice {
  slug: string
  label: string
  title: string
  eyebrow: string
  intro?: string
  introLabel?: string
  membersSectionLabel?: string
  heroImage?: string
  sections: AboutSectionSlice[]
  quote?: { body: string; source: string }
}

export interface AboutCollectionContent {
  en: AboutCollectionPageSlice
  es: AboutCollectionPageSlice
}

function mapBoardMemberSection(member: SanityDoc, lang: Lang): AboutSectionSlice {
  const name: string = member.name ?? ''
  const role = ls(member.boardRole, lang)
  const heritage: string = member.heritage ?? ''
  // Recreate the legacy title shape "Name, Role | Heritage" so the
  // existing parser in `parseAboutPersonTitle.ts` keeps working without changes.
  const rolePart = heritage ? `${role} | ${heritage}` : role
  const title = rolePart ? `${name}, ${rolePart}` : name
  return {
    title,
    body: la(member.bio, lang),
  }
}

export function mapBoardOfDirectorsPage(
  doc: SanityDoc | null | undefined,
): AboutCollectionContent | null {
  if (!doc) return null
  const buildSlice = (lang: Lang): AboutCollectionPageSlice => {
    const title = ls(doc.title, lang)
    const sections: AboutSectionSlice[] = Array.isArray(doc.members)
      ? doc.members.map((member: SanityDoc) => mapBoardMemberSection(member, lang))
      : []
    return {
      slug: 'board-of-directors',
      label: title,
      title,
      eyebrow: ls(doc.eyebrow, lang),
      intro: ls(doc.intro, lang) || undefined,
      introLabel: ls(doc.introLabel, lang) || undefined,
      membersSectionLabel: ls(doc.membersSectionLabel, lang) || undefined,
      heroImage: imageUrl(doc.heroImage),
      sections,
    }
  }
  const en = buildSlice('en')
  if (!en.title) return null
  return { en, es: buildSlice('es') }
}

/* ---------- Our Path ---------- */

export function mapOurPathPage(
  doc: SanityDoc | null | undefined,
): AboutCollectionContent | null {
  if (!doc) return null
  const buildSlice = (lang: Lang): AboutCollectionPageSlice => {
    const title = ls(doc.title, lang)
    const sections: AboutSectionSlice[] = Array.isArray(doc.sections)
      ? doc.sections.map((section: SanityDoc) => ({
          kicker: ls(section.kicker, lang) || undefined,
          body: la(section.body, lang),
          image: imageUrl(section.image),
        }))
      : []
    return {
      slug: 'our-path',
      label: title,
      title,
      eyebrow: ls(doc.eyebrow, lang),
      intro: ls(doc.intro, lang) || undefined,
      sections,
    }
  }
  const en = buildSlice('en')
  if (!en.title) return null
  return { en, es: buildSlice('es') }
}

/* ---------- Core Values ---------- */

export function mapCoreValuesPage(
  doc: SanityDoc | null | undefined,
): AboutCollectionContent | null {
  if (!doc) return null
  const buildSlice = (lang: Lang): AboutCollectionPageSlice => {
    const title = ls(doc.title, lang)
    const sections: AboutSectionSlice[] = Array.isArray(doc.values)
      ? doc.values.map((value: SanityDoc) => ({
          title: ls(value.title, lang),
          body: la(value.body, lang),
          image: imageUrl(value.icon),
        }))
      : []
    return {
      slug: 'our-core-values',
      label: title,
      title,
      eyebrow: ls(doc.eyebrow, lang),
      intro: ls(doc.intro, lang) || undefined,
      heroImage: imageUrl(doc.heroImage),
      sections,
    }
  }
  const en = buildSlice('en')
  if (!en.title) return null
  return { en, es: buildSlice('es') }
}

/* ---------- Job Opportunities ---------- */

export function mapJobOpportunitiesPage(
  doc: SanityDoc | null | undefined,
): AboutCollectionContent | null {
  if (!doc) return null
  const buildSlice = (lang: Lang): AboutCollectionPageSlice => {
    const title = ls(doc.title, lang)
    const sections: AboutSectionSlice[] = Array.isArray(doc.listings)
      ? doc.listings.map((listing: SanityDoc) => ({
          kicker: ls(listing.kicker, lang) || undefined,
          title: ls(listing.title, lang) || undefined,
          body: la(listing.body, lang),
        }))
      : []
    return {
      slug: 'job-opportunities',
      label: title,
      title,
      eyebrow: ls(doc.eyebrow, lang),
      intro: ls(doc.intro, lang) || undefined,
      sections,
    }
  }
  const en = buildSlice('en')
  if (!en.title) return null
  return { en, es: buildSlice('es') }
}
