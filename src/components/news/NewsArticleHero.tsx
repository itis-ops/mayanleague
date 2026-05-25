'use client'

import Button from '@/components/ui/Button'
import { LocalizedNewsKeywords, LocalizedNewsText, LocalizedText } from '@/components/news/LocalizedNewsText'
import {
  hubArticleBleedClass,
  hubArticleBleedInnerClass,
} from '@/lib/editorialLayout'
import type { NewsArticle } from '@/lib/news'

interface NewsArticleHeroProps {
  article: NewsArticle
}

function ArticleFileDetails({ article, compact = false }: { article: NewsArticle; compact?: boolean }) {
  const labelClass = compact ? 'type-kicker mb-1 text-ink/48' : 'type-kicker mb-2 text-ink/48'
  const valueClass = compact
    ? 'font-body text-xs font-semibold leading-5 text-ink'
    : 'font-body text-sm font-semibold leading-6 text-ink'

  return (
    <dl className={compact ? 'grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3' : 'space-y-5'}>
      <div>
        <dt className={labelClass}>
          <LocalizedText en="Category" es="Categoría" />
        </dt>
        <dd className={compact ? 'type-kicker text-earth-red' : 'font-body text-sm font-bold uppercase tracking-[0.06em] text-ink'}>
          <LocalizedNewsText article={article} field="category" />
        </dd>
      </div>
      <div>
        <dt className={labelClass}>
          <LocalizedText en="Source" es="Fuente" />
        </dt>
        <dd className={valueClass}>{article.sourceName || 'International Mayan League'}</dd>
      </div>
      {article.author ? (
        <div>
          <dt className={labelClass}>
            <LocalizedText en="Author" es="Autoría" />
          </dt>
          <dd className={valueClass}>{article.author}</dd>
        </div>
      ) : null}
      {article.keywords.length ? (
        <div className={compact ? 'col-span-2 sm:col-span-3' : undefined}>
          <dt className={labelClass}>
            <LocalizedText en="Keywords" es="Palabras clave" />
          </dt>
          <dd className="flex flex-wrap gap-2 pt-1">
            <LocalizedNewsKeywords
              article={article}
              className="rounded-full border border-cream-dark px-3 py-1 font-body text-[10px] font-black uppercase tracking-[0.08em] text-ink/58 sm:text-xs"
            />
          </dd>
        </div>
      ) : null}
    </dl>
  )
}

export default function NewsArticleHero({ article }: NewsArticleHeroProps) {
  const sourceName = article.sourceName || 'International Mayan League'
  const sourceLine = `${sourceName} / ${article.date}`
  const isExternal = article.type === 'external'
  const articleTypeLabel = isExternal ? (
    <LocalizedText en="External source" es="Fuente externa" />
  ) : (
    <LocalizedText en="Original article" es="Artículo original" />
  )

  return (
    <>
      <div className={`${hubArticleBleedClass} border-b border-cream-dark bg-white`}>
        <div className={`flex min-h-11 items-center justify-between gap-4 py-3 ${hubArticleBleedInnerClass}`}>
          <a
            href="/news"
            className="motion-link type-kicker inline-flex min-h-11 items-center gap-2 text-ink underline decoration-current decoration-2 underline-offset-4 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span aria-hidden="true">←</span>
            <LocalizedText en="Back to newsroom" es="Volver a la sala de prensa" />
          </a>
          <p className="type-kicker shrink-0 text-earth-red">{articleTypeLabel}</p>
        </div>
      </div>

      <header className={`${hubArticleBleedClass} overflow-hidden border-b border-cream-dark bg-white`}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(220px,24%)] lg:items-stretch">
          <div className={`${hubArticleBleedInnerClass} pb-8 pt-6 sm:pb-10 sm:pt-7 lg:pr-8 lg:pb-10 lg:pt-8 xl:pr-12`}>
            <p className="type-kicker mb-3 text-earth-red">
              <LocalizedNewsText article={article} field="category" />
            </p>
            <p className="type-kicker mb-5 text-ink/52">{sourceLine}</p>
            <h1 className="type-display max-w-none text-[clamp(2.35rem,8vw,5.75rem)] leading-[0.92] text-ink lg:max-w-[18ch]">
              <LocalizedNewsText article={article} field="title" />
            </h1>
            <p className="type-intro mt-5 max-w-none text-[clamp(1.15rem,4.2vw,1.75rem)] leading-[1.34] text-ink/82 sm:mt-6 lg:max-w-[42ch]">
              <LocalizedNewsText article={article} field="dek" />
            </p>

            {isExternal && article.sourceUrl ? (
              <div className="mt-7 sm:mt-8">
                <Button
                  href={article.sourceUrl}
                  variant="primary"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-fit"
                >
                  <LocalizedText
                    en={`Read at ${sourceName}`}
                    es={`Leer en ${sourceName}`}
                  />
                </Button>
                <p className="type-kicker mt-3 text-ink/52">
                  <LocalizedText
                    en="Opens the original article in a new tab."
                    es="Abre el artículo original en una nueva pestaña."
                  />
                </p>
              </div>
            ) : null}
          </div>

          <aside className="hidden border-t border-cream-dark bg-mist/35 lg:block lg:border-l lg:border-t-0">
            <div className={`${hubArticleBleedInnerClass} py-8 lg:pl-6 lg:pr-0 xl:pl-8`}>
              <p className="type-kicker mb-5 text-earth-red">
                <LocalizedText en="Article file" es="Ficha del artículo" />
              </p>
              <ArticleFileDetails article={article} />
            </div>
          </aside>
        </div>
      </header>
    </>
  )
}
