import CardIndexMark, { CardWesternIndex } from '@/components/ui/CardIndexMark'
import { LocalizedNewsText, LocalizedText } from '@/components/news/LocalizedNewsText'
import { hubArticleBleedClass, hubArticleBleedInnerClass } from '@/lib/editorialLayout'
import type { NewsArticle } from '@/lib/news'

interface NewsRelatedDispatchesProps {
  articles: NewsArticle[]
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NewsRelatedDispatches({ articles }: NewsRelatedDispatchesProps) {
  if (!articles.length) return null

  return (
    <section className={`bg-white ${hubArticleBleedClass}`} aria-labelledby="related-dispatches-heading">
      <div className={`border-t border-cream-dark py-6 ${hubArticleBleedInnerClass}`}>
        <p id="related-dispatches-heading" className="type-kicker text-earth-red">
          <LocalizedText en="Related dispatches" es="Despachos relacionados" />
        </p>
      </div>

      <div className={`grid grid-cols-1 gap-5 pb-8 md:grid-cols-3 md:pb-10 ${hubArticleBleedInnerClass}`}>
        {articles.map((relatedArticle, index) => (
          <a
            key={relatedArticle.slug}
            href={`/news/${relatedArticle.slug}`}
            className="group motion-card flex min-h-80 min-w-0 flex-col overflow-hidden border border-cream-dark bg-white p-1.5 hover:border-earth-red/35 hover:bg-cream focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            {relatedArticle.mainImage ? (
              <div className="relative h-40 shrink-0 overflow-hidden bg-ink sm:h-44">
                <img
                  src={relatedArticle.mainImage.url}
                  alt={relatedArticle.mainImage.alt}
                  className="h-full w-full object-cover object-center transition-transform duration-[var(--motion-base)] ease-[var(--ease-emil)] group-hover:scale-[1.03]"
                />
              </div>
            ) : null}

            <div className="flex min-h-0 flex-1 flex-col bg-white p-6 group-hover:bg-cream sm:p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <p className="type-kicker min-w-0 text-earth-red">
                  <LocalizedNewsText article={relatedArticle} field="category" />
                </p>
                <CardIndexMark value={index + 1} variant="lg" className="shrink-0" />
              </div>

              <h3 className="type-section min-w-0 text-[clamp(1.35rem,1.9vw,1.75rem)] text-ink group-hover:text-earth-red">
                <LocalizedNewsText article={relatedArticle} field="title" />
              </h3>

              <p className="type-body mt-4 min-w-0 border-t border-cream-dark pt-4 text-sm leading-6 text-ink/68 line-clamp-4">
                <LocalizedNewsText article={relatedArticle} field="excerpt" />
              </p>

              <div className="mt-auto flex items-end justify-between gap-4 border-t border-cream-dark pt-5">
                <div className="flex items-center gap-1.5 text-earth-red/70 transition-colors group-hover:text-earth-red">
                  <span className="font-body text-xs font-semibold uppercase tracking-wider">
                    <LocalizedText en="Read dispatch" es="Leer despacho" />
                  </span>
                  <ArrowIcon />
                </div>
                <CardWesternIndex value={index + 1} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
