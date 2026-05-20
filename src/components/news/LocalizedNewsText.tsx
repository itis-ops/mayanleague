'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { getLocalizedNewsArticle, type NewsArticle } from '@/lib/news'

type NewsTextField = 'title' | 'category' | 'dek' | 'summary' | 'whyItMatters' | 'excerpt'

interface LocalizedNewsTextProps {
  article: NewsArticle
  field: NewsTextField
}

export function LocalizedNewsText({ article, field }: LocalizedNewsTextProps) {
  const { lang } = useLanguage()
  const localizedArticle = getLocalizedNewsArticle(article, lang)

  return <>{localizedArticle[field]}</>
}

interface LocalizedNewsKeywordsProps {
  article: NewsArticle
  limit?: number
  className: string
}

export function LocalizedNewsKeywords({ article, limit, className }: LocalizedNewsKeywordsProps) {
  const { lang } = useLanguage()
  const localizedArticle = getLocalizedNewsArticle(article, lang)
  const keywords = typeof limit === 'number' ? localizedArticle.keywords.slice(0, limit) : localizedArticle.keywords

  return (
    <>
      {keywords.map((keyword) => (
        <span key={keyword} className={className}>
          {keyword}
        </span>
      ))}
    </>
  )
}

interface LocalizedTextProps {
  en: string
  es: string
}

export function LocalizedText({ en, es }: LocalizedTextProps) {
  const { lang } = useLanguage()

  return <>{lang === 'es' ? es : en}</>
}
