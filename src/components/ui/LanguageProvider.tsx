'use client'

import { useState, useEffect } from 'react'
import { LanguageContext } from '@/hooks/useLanguage'
import translations from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
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

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}
