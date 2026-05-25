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
    // URL param wins over stored preference so a Spanish-shared link
    // (e.g. /news/<slug>?lang=es) lands the recipient in Spanish even if
    // their last-saved choice was English.
    let resolved: Lang | null = null

    try {
      const params = new URLSearchParams(window.location.search)
      const fromUrl = params.get('lang')
      if (fromUrl === 'en' || fromUrl === 'es') {
        resolved = fromUrl
      }
    } catch {
      // window/URLSearchParams unavailable — fall through
    }

    if (!resolved) {
      try {
        const stored = localStorage.getItem('ml-lang') as Lang | null
        if (stored === 'en' || stored === 'es') resolved = stored
      } catch {
        // localStorage unavailable (e.g. iOS Private Browsing) — fall back to default
      }
    }

    if (resolved && resolved !== 'en') {
      setLangState(resolved)
    }

    if (resolved) {
      try {
        localStorage.setItem('ml-lang', resolved)
      } catch {
        // ignore
      }
    }

    // Clean ?lang= out of the visible URL so a later in-session toggle to
    // the other language isn't overridden when the user refreshes.
    try {
      const params = new URLSearchParams(window.location.search)
      if (params.has('lang')) {
        params.delete('lang')
        const search = params.toString()
        const cleanUrl = `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
        window.history.replaceState(null, '', cleanUrl)
      }
    } catch {
      // ignore
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
