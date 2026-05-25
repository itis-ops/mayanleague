import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import NewsroomStickyHero from '@/components/news/NewsroomStickyHero'
import { hubPageMainClass, hubPageSectionClass } from '@/lib/editorialLayout'
import { LocalizedNewsKeywords, LocalizedNewsText, LocalizedText } from '@/components/news/LocalizedNewsText'
import { newsCategories } from '@/lib/news'
import { getNewsArticles } from '@/lib/newsRepository'
import NewsroomDonationInterstitial from '@/components/news/NewsroomDonationInterstitial'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0">
      <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const revalidate = 60

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

export default async function NewsPage() {
  const newsArticles = await getNewsArticles()

  if (!newsArticles.length) {
    return (
      <>
        <Navbar />
        <main id="main-content" className={hubPageMainClass}>
          <section className={`${hubPageSectionClass} border-t border-cream-dark py-24`}>
            <p className="type-body text-center text-ink/60">No dispatches available yet.</p>
          </section>
        </main>
        <Footer />
      </>
    )
  }

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
      <main id="main-content" className={hubPageMainClass}>
        <div className="border-t border-cream-dark pb-8 lg:pb-12">
          <div className={hubPageSectionClass}>
            <NewsroomStickyHero categories={categoryFilters} dates={dateFilters} dispatchCount={newsArticles.length} />
          </div>

          {/* Featured section — full-bleed, lead + up to 3 supporting */}
          <section className="relative mt-8 flex flex-col gap-6 px-5 sm:px-8 lg:px-12">
            {/* Lead article */}
            <article
              id={featuredArticle.category.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-')}
              className="group relative scroll-mt-32 overflow-hidden border border-cream-dark bg-white p-1.5 xl:scroll-mt-48"
            >
              {dateArchive.find((group) => group.firstSlug === featuredArticle.slug) ? (
                <span id={dateArchive.find((group) => group.firstSlug === featuredArticle.slug)?.id} className="absolute -top-32" aria-hidden="true" />
              ) : null}

              <div className={`flex h-full flex-col bg-white ${featuredArticle.mainImage ? 'lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch' : ''}`}>
                {featuredArticle.mainImage ? (
                  <a
                    href={`/news/${featuredArticle.slug}`}
                    className="relative block aspect-[16/10] overflow-hidden bg-ink lg:aspect-auto lg:min-h-[480px]"
                    aria-label={featuredArticle.title}
                  >
                    <img
                      src={featuredArticle.mainImage.url}
                      alt={featuredArticle.mainImage.alt}
                      title={`Photo by ${featuredArticle.mainImage.photographerName} on ${featuredArticle.mainImage.sourceName}`}
                      loading="eager"
                      className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-[700ms] ease-[var(--ease-emil)] group-hover:scale-[1.015] group-hover:grayscale-0"
                    />
                  </a>
                ) : null}

                <div className="flex flex-1 flex-col gap-6 px-7 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-14">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="type-kicker text-earth-red"><LocalizedText en="Featured" es="Destacado" /></span>
                    <span className="h-px w-8 bg-earth-red/40" aria-hidden="true" />
                    <span className="type-kicker text-ink/55"><LocalizedNewsText article={featuredArticle} field="category" /></span>
                  </div>

                  <h2 className="type-section max-w-[22ch] text-[clamp(1.85rem,3.4vw,3.5rem)] leading-[0.96] text-ink transition-colors duration-300 group-hover:text-earth-red">
                    <LocalizedNewsText article={featuredArticle} field="title" />
                  </h2>

                  {featuredArticle.summary || featuredArticle.dek ? (
                    <p className="font-accent max-w-[58ch] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.55] tracking-[-0.01em] text-ink/80">
                      <LocalizedNewsText article={featuredArticle} field={featuredArticle.summary ? 'summary' : 'dek'} />
                    </p>
                  ) : null}

                  <p className="font-body text-xs font-black uppercase tracking-[0.08em] text-ink/45">
                    {featuredArticle.sourceName ? `${featuredArticle.sourceName} · ` : ''}{featuredArticle.date}
                  </p>

                  <div className="mt-auto flex flex-col gap-5 pt-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    {featuredArticle.keywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        <LocalizedNewsKeywords article={featuredArticle} limit={3} className="rounded-full border border-cream-dark px-3 py-1 font-body text-xs font-black uppercase tracking-[0.08em] text-ink/62" />
                      </div>
                    ) : <span aria-hidden="true" />}
                    <Button href={`/news/${featuredArticle.slug}`} variant="primary" className="w-fit shrink-0">
                      <LocalizedText en="Read dispatch" es="Leer despacho" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>

            {/* Supporting featured articles — 3-up grid */}
            {supportingFeatured.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {supportingFeatured.slice(0, 3).map((article) => (
                  <article
                    key={article.slug}
                    className="group relative border border-cream-dark bg-white p-1.5 transition-colors duration-300 hover:border-earth-red/35"
                  >
                    {dateArchive.find((group) => group.firstSlug === article.slug) ? (
                      <span id={dateArchive.find((group) => group.firstSlug === article.slug)?.id} className="absolute -top-32" aria-hidden="true" />
                    ) : null}

                    <a
                      href={`/news/${article.slug}`}
                      className="flex h-full flex-col bg-white focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-gold"
                    >
                      {article.mainImage ? (
                        <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                          <img
                            src={article.mainImage.url}
                            alt={article.mainImage.alt}
                            title={`Photo by ${article.mainImage.photographerName} on ${article.mainImage.sourceName}`}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-[600ms] ease-[var(--ease-emil)] group-hover:scale-[1.04] group-hover:grayscale-0"
                          />
                        </div>
                      ) : null}

                      <div className="flex flex-1 flex-col gap-3 px-6 py-7 lg:px-7 lg:py-8">
                        <p className="type-kicker text-earth-red"><LocalizedNewsText article={article} field="category" /></p>
                        <h3 className="type-section text-[clamp(1.2rem,1.6vw,1.6rem)] leading-[1.12] text-ink transition-colors duration-300 group-hover:text-earth-red">
                          <LocalizedNewsText article={article} field="title" />
                        </h3>
                        {article.excerpt ? (
                          <p className="line-clamp-3 font-body text-sm leading-6 text-ink/68">
                            <LocalizedNewsText article={article} field="excerpt" />
                          </p>
                        ) : null}
                        <p className="mt-auto pt-3 font-body text-[11px] font-black uppercase leading-5 tracking-[0.08em] text-ink/45">
                          {article.sourceName || <LocalizedText en="Original" es="Original" />}
                          <span aria-hidden="true"> · </span>
                          {article.date}
                        </p>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            ) : null}
          </section>

          {/* Archive — full-width sticky rail + image-led list */}
          <section className="mt-10 bg-white lg:mt-14">
            <div className="grid grid-cols-1 border-y border-cream-dark lg:grid-cols-[minmax(260px,16rem)_1fr]">
              <aside className="hidden lg:block lg:border-r lg:border-cream-dark">
                <div className="sticky top-[140px] px-8 py-12 xl:top-[210px] xl:px-12">
                  <p className="type-kicker mb-6 text-earth-red"><LocalizedText en="All dispatches" es="Todos los despachos" /></p>
                  <p className="type-body text-[0.9375rem] leading-[1.65] text-ink/68">
                    <LocalizedText
                      en="Explore articles by topic, from land and water defense to migration, language access, culture, and justice."
                      es="Explora artículos por tema, desde la defensa de la tierra y el agua hasta migración, acceso lingüístico, cultura y justicia."
                    />
                  </p>
                </div>
              </aside>

              <div>
                {archiveArticles.map(({ article, categoryId, shouldAnchor }, index) => (
                  <div key={article.slug}>
                    {index === 3 && <NewsroomDonationInterstitial />}
                    <article
                      id={shouldAnchor ? categoryId : undefined}
                      className="group relative scroll-mt-32 border-b border-cream-dark transition-colors duration-300 hover:bg-mist/50 xl:scroll-mt-48"
                    >
                      {dateArchive.find((group) => group.firstSlug === article.slug) ? (
                        <span id={dateArchive.find((group) => group.firstSlug === article.slug)?.id} className="absolute -top-32 xl:-top-48" aria-hidden="true" />
                      ) : null}

                      <div className="grid grid-cols-1 gap-6 px-7 py-8 sm:px-10 sm:py-10 lg:grid-cols-[220px_1fr_auto] lg:items-center lg:gap-10 lg:px-12 lg:py-12">
                        {article.mainImage ? (
                          <div className="relative aspect-[4/3] overflow-hidden bg-ink lg:aspect-[5/4] lg:w-[220px]">
                            <img
                              src={article.mainImage.url}
                              alt={article.mainImage.alt}
                              title={`Photo by ${article.mainImage.photographerName} on ${article.mainImage.sourceName}`}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-[600ms] ease-[var(--ease-emil)] group-hover:scale-[1.04] group-hover:grayscale-0"
                            />
                          </div>
                        ) : (
                          <div className="hidden lg:block lg:w-[220px]" aria-hidden="true" />
                        )}

                        <div className="flex min-w-0 flex-col gap-3">
                          <div className="flex flex-wrap items-center gap-2.5 type-kicker text-ink/45">
                            <span className="text-earth-red"><LocalizedNewsText article={article} field="category" /></span>
                            <span className="h-px w-4 bg-cream-dark" aria-hidden="true" />
                            <span>{article.sourceName || <LocalizedText en="Original" es="Original" />}</span>
                            <span aria-hidden="true">·</span>
                            <span>{article.date}</span>
                          </div>

                          <h2 className="type-section max-w-[28ch] text-[clamp(1.5rem,2.4vw,2.4rem)] leading-[1.04] text-ink transition-colors duration-300 group-hover:text-earth-red">
                            <a
                              href={`/news/${article.slug}`}
                              className="rounded-sm focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold after:absolute after:inset-0 after:content-['']"
                            >
                              <LocalizedNewsText article={article} field="title" />
                            </a>
                          </h2>

                          {article.excerpt || article.summary ? (
                            <p className="line-clamp-2 max-w-[62ch] font-body text-[0.9375rem] leading-[1.65] text-ink/68">
                              <LocalizedNewsText article={article} field={article.excerpt ? 'excerpt' : 'summary'} />
                            </p>
                          ) : null}
                        </div>

                        <div
                          aria-hidden="true"
                          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-dark text-ink/55 transition-all duration-300 group-hover:border-earth-red group-hover:bg-earth-red group-hover:text-white lg:flex"
                        >
                          <ArrowIcon />
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
