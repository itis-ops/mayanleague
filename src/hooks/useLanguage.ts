'use client'

import { createContext, useContext } from 'react'
import type { Lang } from '@/lib/i18n'
import translations from '@/lib/i18n'

export type TranslationSet = (typeof translations)[Lang]

export interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: TranslationSet
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function useLanguage() {
  return useContext(LanguageContext)
}
