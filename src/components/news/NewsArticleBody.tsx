'use client'

import { LocalizedNewsText, LocalizedText } from '@/components/news/LocalizedNewsText'
import { useLanguage } from '@/hooks/useLanguage'
import { hubArticleBleedClass, hubArticleBleedInnerClass } from '@/lib/editorialLayout'
import { getLocalizedNewsArticle, type NewsArticle } from '@/lib/news'

interface NewsArticleBodyProps {
  article: NewsArticle
}

const bodyParagraphClass = 'type-body text-[1.0625rem] leading-[1.75] text-ink/72'

export default function NewsArticleBody({ article }: NewsArticleBodyProps) {
  const { lang } = useLanguage()

  if (article.type === 'internal') {
    const localized = getLocalizedNewsArticle(article, lang)
    const paragraphs = localized.body?.length ? localized.body : article.body ?? []

    if (!paragraphs.length) return null

    return (
      <section className={`${hubArticleBleedClass} border-b border-cream-dark bg-white py-10 sm:py-12 lg:py-16`}>
        <div className={`${hubArticleBleedInnerClass} grid grid-cols-1 lg:grid-cols-12 lg:gap-x-14`}>
          <div className="mb-6 lg:col-span-3 lg:mb-0">
            <p className="type-kicker text-ink/55">
              <LocalizedText en="Article" es="Artículo" />
            </p>
            {article.author ? (
              <p className="type-kicker mt-3 text-ink/55">
                <LocalizedText en="By" es="Por" /> {article.author}
              </p>
            ) : null}
          </div>
          <div className="min-w-0 lg:col-span-9">
            <div className={`space-y-7 ${bodyParagraphClass}`}>
              {paragraphs.map((paragraph, index) => (
                <p key={`${article.slug}-body-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!article.whyItMatters) return null

  return (
    <section className={`${hubArticleBleedClass} border-b border-cream-dark bg-white py-10 sm:py-12 lg:py-16`}>
      <div className={`${hubArticleBleedInnerClass} grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16`}>
        <div>
          <p className="type-kicker mb-4 text-earth-red">
            <LocalizedText en="Dispatch" es="Despacho" />
          </p>
          <h2 className="type-section max-w-none text-[clamp(1.65rem,5vw,2.35rem)] leading-[0.98] text-ink lg:max-w-[14ch]">
            <LocalizedText en="Why this story matters" es="Por qué importa esta historia" />
          </h2>
        </div>

        <div className="min-w-0">
          <p className={bodyParagraphClass}>
            <LocalizedNewsText article={article} field="whyItMatters" />
          </p>
        </div>
      </div>
    </section>
  )
}
