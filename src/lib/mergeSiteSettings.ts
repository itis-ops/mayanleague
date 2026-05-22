import translations from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import type { SiteSettingsContent } from '@/sanity/lib/mapSiteSettings'
import type { TranslationSet } from '@/hooks/useLanguage'

/** Merges Sanity site settings into the static i18n translation set for one locale. */
export function mergeTranslations(lang: Lang, settings: SiteSettingsContent | null | undefined): TranslationSet {
  const base = translations[lang]
  if (!settings) return base

  const slice = settings[lang]
  const address = settings.global.addressDisplay || base.footer.address

  return {
    ...base,
    brand: {
      short: slice.brand.short || base.brand.short,
      full: slice.brand.full || base.brand.full,
    },
    nav: {
      about: slice.nav.about || base.nav.about,
      programs: slice.nav.programs || base.nav.programs,
      resources: slice.nav.resources || base.nav.resources,
      media: slice.nav.media || base.nav.media,
      contact: slice.nav.contact || base.nav.contact,
      donate: slice.nav.donate || base.nav.donate,
    },
    footer: {
      ...base.footer,
      tagline: slice.footer.tagline || base.footer.tagline,
      quickLinks: slice.footer.quickLinks || base.footer.quickLinks,
      contact: slice.footer.contact || base.footer.contact,
      whoWeAre: slice.footer.whoWeAre || base.footer.whoWeAre,
      whatWeDo: slice.footer.whatWeDo || base.footer.whatWeDo,
      getInvolved: slice.footer.getInvolved || base.footer.getInvolved,
      whoLinks: (slice.footer.whoLinks.length
        ? slice.footer.whoLinks
        : base.footer.whoLinks) as typeof base.footer.whoLinks,
      involvedLinks: (slice.footer.involvedLinks.length
        ? slice.footer.involvedLinks
        : base.footer.involvedLinks) as typeof base.footer.involvedLinks,
      socialLabel: slice.footer.socialLabel || base.footer.socialLabel,
      copyright: slice.footer.copyright || base.footer.copyright,
      address: address as typeof base.footer.address,
    },
  } as TranslationSet
}
