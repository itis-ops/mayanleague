'use client'

import { createContext, useContext } from 'react'
import type { Lang } from '@/lib/i18n'
import translations from '@/lib/i18n'
import type { SiteSettingsContent, SiteSettingsGlobal } from '@/sanity/lib/mapSiteSettings'
import { mergeTranslations } from '@/lib/mergeSiteSettings'
import { DONATE_URL as DEFAULT_DONATE_URL } from '@/lib/siteLinks'

export type TranslationSet = (typeof translations)[Lang]

export interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: TranslationSet
  /** Contact, social URLs, and donate link from Sanity (or static defaults). */
  site: SiteSettingsGlobal
}

const defaultSite: SiteSettingsGlobal = {
  email: 'info@mayanleague.org',
  phone: '(202) 827-6673',
  phoneHref: 'tel:+12028276673',
  addressLines: ['1201 K ST NW', 'Washington, D.C. 20005'],
  addressDisplay: '1201 K ST NW, Washington, D.C. 20005',
  mapQuery: '1201 K ST NW Washington D.C. 20005',
  donateUrl: DEFAULT_DONATE_URL,
  social: {
    facebook: 'https://facebook.com/mayanleague',
    instagram: 'https://instagram.com/mayanleague',
    youtube: 'https://youtube.com/@mayanleague',
    twitter: 'https://twitter.com/mayanleague',
  },
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  site: defaultSite,
})

export function useLanguage() {
  return useContext(LanguageContext)
}

export function buildLanguageContextValue(
  lang: Lang,
  siteSettings: SiteSettingsContent | null | undefined,
): LanguageContextValue {
  return {
    lang,
    setLang: () => {},
    t: mergeTranslations(lang, siteSettings),
    site: siteSettings?.global ?? defaultSite,
  }
}
