import type { Lang } from '@/lib/i18n'
import { DONATE_URL as FALLBACK_DONATE_URL } from '@/lib/siteLinks'

type LocalizedStr = { en?: string; es?: string } | null | undefined

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanitySiteSettingsDoc = Record<string, any>

function ls(field: LocalizedStr, lang: Lang): string {
  return field?.[lang] ?? field?.en ?? ''
}

function la(field: LocalizedStr[] | null | undefined, lang: Lang): string[] {
  if (!Array.isArray(field)) return []
  return field.map((item) => ls(item, lang)).filter(Boolean)
}

/** Per-locale labels for brand, nav, and footer (paths stay in code). */
export interface SiteSettingsLocaleSlice {
  brand: { short: string; full: string }
  nav: {
    about: string
    programs: string
    resources: string
    media: string
    contact: string
    donate: string
  }
  footer: {
    tagline: string
    quickLinks: string
    contact: string
    whoWeAre: string
    whatWeDo: string
    getInvolved: string
    whoLinks: string[]
    involvedLinks: string[]
    socialLabel: string
    copyright: string
    address: string
  }
}

/** Contact, social, and donate — same for both languages. */
export interface SiteSettingsGlobal {
  email: string
  phone: string
  phoneHref: string
  addressLines: string[]
  addressDisplay: string
  mapQuery: string
  donateUrl: string
  social: {
    facebook: string
    instagram: string
    youtube: string
    twitter: string
  }
}

export interface SiteSettingsContent {
  en: SiteSettingsLocaleSlice
  es: SiteSettingsLocaleSlice
  global: SiteSettingsGlobal
}

function phoneToHref(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  return digits.startsWith('1') ? `tel:+${digits}` : `tel:+1${digits}`
}

function mapLocale(doc: SanitySiteSettingsDoc, lang: Lang, addressDisplay: string): SiteSettingsLocaleSlice {
  const brand = doc.brand ?? {}
  const nav = doc.nav ?? {}
  const footer = doc.footer ?? {}

  return {
    brand: {
      short: ls(brand.short, lang),
      full: ls(brand.full, lang),
    },
    nav: {
      about: ls(nav.about, lang),
      programs: ls(nav.programs, lang),
      resources: ls(nav.resources, lang),
      media: ls(nav.media, lang),
      contact: ls(nav.contact, lang),
      donate: ls(nav.donate, lang),
    },
    footer: {
      tagline: ls(footer.tagline, lang),
      quickLinks: ls(footer.quickLinks, lang),
      contact: ls(footer.contact, lang),
      whoWeAre: ls(footer.whoWeAre, lang),
      whatWeDo: ls(footer.whatWeDo, lang),
      getInvolved: ls(footer.getInvolved, lang),
      whoLinks: la(footer.whoLinks, lang),
      involvedLinks: la(footer.involvedLinks, lang),
      socialLabel: ls(footer.socialLabel, lang),
      copyright: ls(footer.copyright, lang),
      address: addressDisplay,
    },
  }
}

export function mapSiteSettings(doc: SanitySiteSettingsDoc | null | undefined): SiteSettingsContent | null {
  if (!doc) return null

  const email = doc.contact?.email ?? ''
  if (!email) return null

  const addressLines: string[] = Array.isArray(doc.contact?.addressLines)
    ? doc.contact.addressLines.filter((line: string) => typeof line === 'string' && line.length > 0)
    : []
  const addressDisplay = addressLines.join(', ')
  const phone = doc.contact?.phone ?? ''

  const social = doc.social ?? {}
  const global: SiteSettingsGlobal = {
    email,
    phone,
    phoneHref: phoneToHref(phone),
    addressLines,
    addressDisplay,
    mapQuery: addressDisplay || '1201 K ST NW Washington DC 20005',
    donateUrl: doc.donateUrl || FALLBACK_DONATE_URL,
    social: {
      facebook: social.facebook ?? '',
      instagram: social.instagram ?? '',
      youtube: social.youtube ?? '',
      twitter: social.twitter ?? '',
    },
  }

  return {
    en: mapLocale(doc, 'en', addressDisplay),
    es: mapLocale(doc, 'es', addressDisplay),
    global,
  }
}
