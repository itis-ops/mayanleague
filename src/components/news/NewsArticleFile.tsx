'use client'

import { LocalizedNewsKeywords, LocalizedNewsText, LocalizedText } from '@/components/news/LocalizedNewsText'
import { hubArticleBleedClass, hubArticleBleedInnerClass } from '@/lib/editorialLayout'
import type { NewsArticle } from '@/lib/news'

interface NewsArticleFileProps {
  article: NewsArticle
  /** Show on mobile only — hidden at lg+ where the sidebar in the hero already shows this metadata. */
  mobileOnly?: boolean
}

export default function NewsArticleFile({ article, mobileOnly = true }: NewsArticleFileProps) {
  const sourceName = article.sourceName || 'International Mayan League'

  return (
    <section
      className={`${hubArticleBleedClass} border-b border-cream-dark bg-mist/30 py-9 sm:py-10 ${
        mobileOnly ? 'lg:hidden' : ''
      }`}
      aria-label="Article file"
    >
      <div className={hubArticleBleedInnerClass}>
        <p className="type-kicker mb-5 text-earth-red">
          <LocalizedText en="Article file" es="Ficha del artículo" />
        </p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          <div>
            <dt className="type-kicker mb-1 text-ink/48">
              <LocalizedText en="Category" es="Categoría" />
            </dt>
            <dd className="font-body text-xs font-bold uppercase tracking-[0.06em] text-earth-red">
              <LocalizedNewsText article={article} field="category" />
            </dd>
          </div>
          <div>
            <dt className="type-kicker mb-1 text-ink/48">
              <LocalizedText en="Source" es="Fuente" />
            </dt>
            <dd className="font-body text-xs font-semibold leading-5 text-ink">{sourceName}</dd>
          </div>
          {article.author ? (
            <div>
              <dt className="type-kicker mb-1 text-ink/48">
                <LocalizedText en="Author" es="Autoría" />
              </dt>
              <dd className="font-body text-xs font-semibold leading-5 text-ink">{article.author}</dd>
            </div>
          ) : null}
          <div>
            <dt className="type-kicker mb-1 text-ink/48">
              <LocalizedText en="Published" es="Publicado" />
            </dt>
            <dd className="font-body text-xs font-semibold leading-5 text-ink">{article.date}</dd>
          </div>
        </dl>

        {article.keywords.length ? (
          <div className="mt-7 border-t border-cream-dark pt-6">
            <p className="type-kicker mb-3 text-ink/48">
              <LocalizedText en="Keywords" es="Palabras clave" />
            </p>
            <div className="flex flex-wrap gap-2">
              <LocalizedNewsKeywords
                article={article}
                className="rounded-full border border-cream-dark bg-white px-3 py-1 font-body text-[10px] font-black uppercase tracking-[0.08em] text-ink/58 sm:text-xs"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
