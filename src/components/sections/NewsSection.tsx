'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import NewsCard from '@/components/ui/NewsCard'
import Button from '@/components/ui/Button'
import { getLocalizedNewsArticle, type NewsArticle } from '@/lib/news'
import type { NewsRailSlice } from '@/sanity/lib/mapHomepage'

interface NewsSectionProps {
  articles: NewsArticle[]
  content?: { en: NewsRailSlice; es: NewsRailSlice }
}

export default function NewsSection({ articles, content }: NewsSectionProps) {
  const { lang, t } = useLanguage()
  const newsRail = content?.[lang]

  const sectionKicker = newsRail?.sectionKicker ?? t.news.sectionKicker
  const heading = newsRail?.heading ?? t.news.heading
  const viewAll = newsRail?.viewAll ?? t.news.viewAll

  const [headingLead, headingTail] = lang === 'en' ? heading.split(' from ') : [heading, '']
  const homepageArticles = articles.map((article) => getLocalizedNewsArticle(article, lang))

  return (
    <section id="news" className="bg-white px-5 py-12 text-ink sm:px-8 sm:py-14 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          label={t.news.sectionLabel}
          detail={sectionKicker}
        />

        {/* Header */}
        <div className="motion-reveal mb-7 grid grid-cols-1 items-end gap-5 sm:mb-8 lg:grid-cols-[0.82fr_0.38fr] lg:gap-12">
          <h2 className="type-section max-w-none text-[clamp(2.4rem,5vw,5.4rem)] text-ink">
            <span className="block sm:whitespace-nowrap">{headingLead}</span>
            {headingTail ? (
              <span className="block sm:whitespace-nowrap">
                {lang === 'en' ? `from ${headingTail}` : headingTail}
              </span>
            ) : null}
          </h2>
          <div className="flex justify-start lg:justify-end">
            <Button href="/news" variant="secondary">
              {viewAll}
            </Button>
          </div>
        </div>

        {/*
          Mobile (<sm): full-bleed horizontal scroll, 1.3 cards visible
          Tablet (sm): 2-col grid
          Desktop (lg): 4-col grid
        */}
        <div className="relative">
          {/* Scroll affordance — mobile only */}
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 flex w-16 items-center justify-end sm:hidden" aria-hidden="true">
            <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-r from-transparent to-white" />
            <svg className="relative mr-1 h-5 w-5 text-ink/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 sm:snap-none sm:gap-5 sm:border-t sm:border-cream-dark sm:pt-5 lg:grid-cols-4">
          {homepageArticles.map((item, index) => (
            <div
              key={item.slug}
              className={[
                'min-w-0 w-[min(82vw,300px)] shrink-0 snap-start sm:h-full sm:w-auto',
                `motion-delay-${Math.min(index + 1, 3)}`,
              ].join(' ')}
            >
              <NewsCard
                date={item.category}
                title={item.title}
                excerpt={item.excerpt}
                cta={t.news.readDispatch}
                index={index}
                href={`/news/${item.slug}`}
              />
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
