'use client'

import NewsFiltersSheet from '@/components/news/NewsFiltersSheet'
import { useLanguage } from '@/hooks/useLanguage'

interface FilterItem {
  label: string
  href: string
  count: number
}

interface NewsArchiveMobileBarProps {
  categories: FilterItem[]
  dates: FilterItem[]
}

/**
 * Sticky bar above the archive article list on mobile + tablet.
 * Provides a compact archive browse trigger. Hidden on xl+.
 */
export default function NewsArchiveMobileBar({ categories, dates }: NewsArchiveMobileBarProps) {
  const { lang } = useLanguage()
  const label = lang === 'es' ? 'Todos los despachos' : 'All dispatches'

  return (
    <div className="flex items-center justify-between gap-4 border-b border-cream-dark px-5 py-3 sm:px-8 xl:hidden">
      <p className="type-kicker min-w-0 text-earth-red">{label}</p>
      <NewsFiltersSheet categories={categories} dates={dates} size="compact" />
    </div>
  )
}
