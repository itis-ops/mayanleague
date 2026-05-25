import Button from '@/components/ui/Button'
import { LocalizedNewsText, LocalizedText } from '@/components/news/LocalizedNewsText'
import { hubArticleBleedClass, hubArticleBleedInnerClass } from '@/lib/editorialLayout'
import type { NewsArticle } from '@/lib/news'

interface NewsArticleBodyProps {
  article: NewsArticle
}

const bodyParagraphClass = 'type-body text-[1.0625rem] leading-[1.75] text-ink/72'

export default function NewsArticleBody({ article }: NewsArticleBodyProps) {
  if (article.type === 'internal' && article.body?.length) {
    return (
      <section className={`${hubArticleBleedClass} border-b border-cream-dark bg-white py-10 sm:py-12 lg:py-16`}>
        <div className={`${hubArticleBleedInnerClass} grid grid-cols-1 lg:grid-cols-12 lg:gap-x-14`}>
          <div className="mb-6 lg:col-span-3 lg:mb-0">
            <p className="type-kicker text-ink/55">
              <LocalizedText en="Article" es="Artículo" />
            </p>
          </div>
          <div className="min-w-0 lg:col-span-9">
            <div className={`space-y-7 ${bodyParagraphClass}`}>
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

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

          <aside className="mt-8 border-t border-cream-dark pt-8 lg:mt-10">
            <p className="type-kicker mb-4 text-earth-red">
              <LocalizedText en="Original source" es="Fuente original" />
            </p>
            <p className={`${bodyParagraphClass} mb-8`}>
              <LocalizedText
                en={`This story was originally published by ${article.sourceName}. Follow the source link to read the full article from the publisher.`}
                es={`Esta historia fue publicada originalmente por ${article.sourceName}. Sigue el enlace de la fuente para leer el artículo completo en el sitio de la publicación.`}
              />
            </p>
            {article.sourceUrl ? (
              <Button href={article.sourceUrl} variant="primary" target="_blank" rel="noreferrer" className="w-full sm:w-fit">
                <LocalizedText en="Read original source" es="Leer fuente original" />
              </Button>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  )
}
