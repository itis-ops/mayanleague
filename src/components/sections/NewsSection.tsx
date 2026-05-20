'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import NewsCard from '@/components/ui/NewsCard'
import Button from '@/components/ui/Button'
import { getLocalizedNewsArticle, newsArticles } from '@/lib/news'

export default function NewsSection() {
  const { lang, t } = useLanguage()
  const [headingLead, headingTail] = lang === 'en' ? t.news.heading.split(' from ') : [t.news.heading, '']
  const homepageArticles = newsArticles.slice(0, 4).map((article) => getLocalizedNewsArticle(article, lang))

  return (
    <section id="news" className="bg-white px-5 py-14 text-ink sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          label={t.news.sectionLabel}
          detail={t.news.sectionKicker}
        />

        <div className="motion-reveal mb-8 grid grid-cols-1 items-end gap-6 lg:grid-cols-[0.82fr_0.38fr] lg:gap-12">
          <div>
            <h2 className="type-section max-w-none text-[clamp(2.65rem,5vw,5.4rem)] text-ink">
              <span className="block sm:whitespace-nowrap">{headingLead}</span>
              {headingTail ? (
                <span className="block sm:whitespace-nowrap">
                  {lang === 'en' ? `from ${headingTail}` : headingTail}
                </span>
              ) : null}
            </h2>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Button href="/news" variant="secondary">
              {t.news.viewAll}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-cream-dark pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {homepageArticles.map((item, index) => (
            <NewsCard key={item.slug} date={item.category} title={item.title} excerpt={item.excerpt} cta={t.news.readDispatch} index={index} href={`/news/${item.slug}`} />
          ))}
        </div>
      </div>
    </section>
  )
}
