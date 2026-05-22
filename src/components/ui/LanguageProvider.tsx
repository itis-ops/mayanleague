'use client'

import { useState, useEffect, useMemo } from 'react'
import { LanguageContext } from '@/hooks/useLanguage'
import type { SiteSettingsContent } from '@/sanity/lib/mapSiteSettings'
import { mergeTranslations } from '@/lib/mergeSiteSettings'
import { DONATE_URL as DEFAULT_DONATE_URL } from '@/lib/siteLinks'
import type { Lang } from '@/lib/i18n'

const defaultSite = {
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

interface LanguageProviderProps {
  children: React.ReactNode
  siteSettings?: SiteSettingsContent | null
}

export default function LanguageProvider({ children, siteSettings }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ml-lang') as Lang | null
      if (stored === 'en' || stored === 'es') setLangState(stored)
    } catch {
      // localStorage unavailable (e.g. iOS Private Browsing) — fall back to default
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('ml-lang', l)
    } catch {
      // localStorage unavailable — language preference won't persist this session
    }
  }

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: mergeTranslations(lang, siteSettings),
      site: siteSettings?.global ?? defaultSite,
    }),
    [lang, siteSettings],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
