import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import NewsroomStickyHero from '@/components/news/NewsroomStickyHero'
import { LocalizedNewsKeywords, LocalizedNewsText, LocalizedText } from '@/components/news/LocalizedNewsText'
import { newsArticles, newsCategories } from '@/lib/news'

export const metadata: Metadata = {
  title: 'News | International Mayan League',
  description: 'Perspectives and analysis from our Nation.',
}

function getDateArchive(date: string) {
  const normalized = date.replace(',', '')
  const parts = normalized.split(' ').filter(Boolean)
  const month = parts[0] || date
  const year = parts.find((part) => /^\d{4}$/.test(part)) || parts[parts.length - 1] || ''
  const label = year ? `${month} ${year}` : date
  const id = `date-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`

  return { label, id }
}

export default function NewsPage() {
  const featuredArticles = newsArticles.filter((article) => article.featured)
  const featuredArticle = featuredArticles[0] || newsArticles[0]
  const supportingFeatured = featuredArticles.slice(1)
  const remainingArticles = newsArticles.filter((article) => article.slug !== featuredArticle.slug)
  const anchoredCategories = new Set<string>()
  const dateArchive = newsArticles.reduce<Array<{ label: string; id: string; count: number; firstSlug: string }>>((archive, article) => {
    const dateGroup = getDateArchive(article.date)
    const existingGroup = archive.find((group) => group.id === dateGroup.id)

    if (existingGroup) {
      existingGroup.count += 1
      return archive
    }

    archive.push({ ...dateGroup, count: 1, firstSlug: article.slug })
    return archive
  }, [])
  const categoryFilters = newsCategories.map((category) => ({
    label: category,
    href: `#${category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')}`,
    count: newsArticles.filter((article) => article.category === category).length,
  }))
  const dateFilters = dateArchive.map((group) => ({
    label: group.label,
    href: `#${group.id}`,
    count: group.count,
  }))
  const archiveArticles = remainingArticles.map((article) => {
    const categoryId = article.category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')
    const shouldAnchor = !anchoredCategories.has(categoryId)
    anchoredCategories.add(categoryId)

    return { article, categoryId, shouldAnchor }
  })

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-mist pt-[72px] text-ink xl:pt-[124px]">
        <section className="mx-auto max-w-[1728px] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
          <NewsroomStickyHero categories={categoryFilters} dates={dateFilters} dispatchCount={newsArticles.length} />

          <section className="relative mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.42fr]">
            <article id={featuredArticle.category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')} className="group relative scroll-mt-32 border border-cream-dark bg-white p-1.5 hover:bg-cream xl:scroll-mt-48">
              {dateArchive.find((group) => group.firstSlug === featuredArticle.slug) ? (
                <span id={dateArchive.find((group) => group.firstSlug === featuredArticle.slug)?.id} className="absolute -top-32" aria-hidden="true" />
              ) : null}
              <div className="flex min-h-0 flex-col bg-white p-6 group-hover:bg-cream sm:min-h-[420px] sm:p-10 lg:min-h-[520px] lg:p-12">
                <div className="mb-6 flex items-start justify-between gap-6 sm:mb-10 sm:gap-8">
                  <div>
                    <p className="type-kicker mb-3 text-earth-red"><LocalizedNewsText article={featuredArticle} field="category" /></p>
                    <p className="font-body text-sm font-bold uppercase tracking-[0.08em] text-ink/50">
                      {featuredArticle.sourceName} / {featuredArticle.date}
                    </p>
                  </div>
                  <p className="font-display text-4xl font-bold leading-none tracking-[-0.06em] text-earth-red sm:text-5xl">01</p>
                </div>
                <h2 className="type-section max-w-4xl text-[clamp(1.85rem,4.5vw,4.6rem)] text-ink group-hover:text-earth-red">
                  <LocalizedNewsText article={featuredArticle} field="title" />
                </h2>
                <p className="type-body mt-6 max-w-[76ch] border-t border-cream-dark pt-5 text-ink/74 sm:mt-8 sm:pt-6">
                  <LocalizedNewsText article={featuredArticle} field="summary" />
                </p>
                <div className="mt-auto flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pt-10">
                  <div className="flex flex-wrap gap-2">
                    <LocalizedNewsKeywords article={featuredArticle} limit={4} className="rounded-full border border-cream-dark px-3 py-1 font-body text-xs font-black uppercase tracking-[0.08em] text-ink/62" />
                  </div>
                  <Button href={`/news/${featuredArticle.slug}`} variant="primary" className="w-fit shrink-0">
                    <LocalizedText en="Read dispatch" es="Leer despacho" />
                  </Button>
                </div>
              </div>
            </article>

            <div className="grid grid-cols-1 gap-5">
              {supportingFeatured.map((article, index) => (
                <article key={article.slug} className="group relative border border-cream-dark bg-white p-1.5 hover:bg-cream">
                  {dateArchive.find((group) => group.firstSlug === article.slug) ? (
                    <span id={dateArchive.find((group) => group.firstSlug === article.slug)?.id} className="absolute -top-32" aria-hidden="true" />
                  ) : null}
                  <div className="flex min-h-64 flex-col bg-white p-6 group-hover:bg-cream">
                    <div className="mb-6 flex items-start justify-between gap-6">
                      <p className="type-kicker text-earth-red"><LocalizedNewsText article={article} field="category" /></p>
                      <p className="font-display text-4xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                        {String(index + 2).padStart(2, '0')}
                      </p>
                    </div>
                    <h3 className="type-section text-[clamp(1.45rem,2.2vw,2.05rem)] text-ink group-hover:text-earth-red">
                      <LocalizedNewsText article={article} field="title" />
                    </h3>
                    <p className="mt-5 border-t border-cream-dark pt-4 font-body text-sm font-semibold leading-6 text-ink/68"><LocalizedNewsText article={article} field="excerpt" /></p>
                    <div className="mt-auto pt-6">
                      <a
                        href={`/news/${article.slug}`}
                        className="motion-link type-kicker inline-flex min-h-10 items-center text-ink underline decoration-current decoration-2 underline-offset-4 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                      >
                        <LocalizedText en="Read dispatch" es="Leer despacho" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-5 bg-white">
            <div className="grid grid-cols-1 border-y border-cream-dark lg:grid-cols-[0.24fr_1fr]">
              <div className="border-b border-cream-dark p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
                <p className="type-kicker mb-8 text-earth-red"><LocalizedText en="All dispatches" es="Todos los despachos" /></p>
                <p className="type-body text-ink/70">
                  <LocalizedText
                    en="Explore articles by topic, from land and water defense to migration, language access, culture, and justice."
                    es="Explora artículos por tema, desde la defensa de la tierra y el agua hasta migración, acceso lingüístico, cultura y justicia."
                  />
                </p>
              </div>
              <div>
                {archiveArticles.map(({ article, categoryId, shouldAnchor }, index) => (
                  <article
                    id={shouldAnchor ? categoryId : undefined}
                    key={article.slug}
                    className="relative grid scroll-mt-32 grid-cols-1 gap-8 border-b border-cream-dark px-7 py-10 hover:bg-mist sm:px-10 xl:scroll-mt-48 lg:grid-cols-[0.12fr_0.22fr_1fr_0.2fr] lg:items-start lg:px-12"
                  >
                    {dateArchive.find((group) => group.firstSlug === article.slug) ? (
                      <span id={dateArchive.find((group) => group.firstSlug === article.slug)?.id} className="absolute -top-32 xl:-top-48" aria-hidden="true" />
                    ) : null}
                    <p className="font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <div>
                      <p className="type-kicker mb-3 text-earth-red"><LocalizedNewsText article={article} field="category" /></p>
                      <p className="font-body text-xs font-black uppercase leading-5 tracking-[0.08em] text-ink/50">
                        {article.sourceName || <LocalizedText en="Original" es="Original" />} / {article.date}
                      </p>
                    </div>
                    <div>
                      <h2 className="type-section max-w-3xl text-[clamp(1.8rem,3vw,3.35rem)] text-ink">
                        <LocalizedNewsText article={article} field="title" />
                      </h2>
                      <p className="type-body mt-5 max-w-[78ch] text-ink/72"><LocalizedNewsText article={article} field="summary" /></p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <LocalizedNewsKeywords article={article} limit={3} className="rounded-full bg-cream px-3 py-1 font-body text-xs font-black uppercase tracking-[0.08em] text-ink/58" />
                      </div>
                    </div>
                    <div className="lg:flex lg:justify-end">
                      <Button href={`/news/${article.slug}`} variant="secondary" className="w-fit shrink-0 whitespace-nowrap">
                        <LocalizedText en="View article" es="Ver artículo" />
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </>
  )
}
