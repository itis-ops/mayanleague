import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { LocalizedNewsKeywords, LocalizedNewsText, LocalizedText } from '@/components/news/LocalizedNewsText'
import NewsArticleLanguageBar from '@/components/news/NewsArticleLanguageBar'
import ShareThisDispatch from '@/components/news/ShareThisDispatch'
import { hubPageMainClass, hubPageSectionClass } from '@/lib/editorialLayout'
import { getNewsArticleUrl, getNewsInstagramStoryImageUrl, getNewsShareImageUrl, getNewsSocial } from '@/lib/news'
import { getNewsArticleBySlug, getNewsSlugs, getRelatedNewsArticles } from '@/lib/newsRepository'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article) {
    return {
      title: 'News Article | International Mayan League',
    }
  }

  const social = getNewsSocial(article)
  const url = getNewsArticleUrl(article.slug)
  const imageUrl = getNewsShareImageUrl(article.slug)
  const imageAlt = article.mainImage?.alt || social.shareImageAlt

  return {
    title: `${article.title} | International Mayan League`,
    description: social.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: social.description,
      url,
      siteName: 'International Mayan League',
      type: 'article',
      authors: article.author ? [article.author] : undefined,
      tags: article.keywords,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: social.description,
      images: [imageUrl],
    },
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article) notFound()

  const relatedArticles = await getRelatedNewsArticles(article)
  const articleUrl = getNewsArticleUrl(article.slug)
  const shareImageUrl = getNewsShareImageUrl(article.slug)
  const storyImageUrl = getNewsInstagramStoryImageUrl(article.slug)
  const social = getNewsSocial(article)

  return (
    <>
      <Navbar />
      <main id="main-content" className={hubPageMainClass}>
        <section className={`${hubPageSectionClass} border-t border-cream-dark`}>
          <article className="min-w-0 bg-white">
            <NewsArticleLanguageBar />
            <div className="px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
          <div className="mb-8 flex items-center justify-between border-y border-cream-dark py-3">
            <a
              href="/news"
              className="motion-link type-kicker inline-flex items-center gap-2 text-ink underline decoration-current decoration-2 underline-offset-4 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              <span aria-hidden="true">←</span>
              <LocalizedText en="Back to newsroom" es="Volver a la sala de prensa" />
            </a>
            <p className="type-kicker hidden text-earth-red sm:block">
              {article.type === 'external' ? (
                <LocalizedText en="External source" es="Fuente externa" />
              ) : (
                <LocalizedText en="Original article" es="Artículo original" />
              )}
            </p>
          </div>

          <header className="grid grid-cols-1 bg-white lg:grid-cols-[0.7fr_0.3fr]">
            <div className="flex flex-col justify-start bg-cream px-7 pb-7 sm:px-10 sm:pb-10 lg:min-h-[560px] lg:px-14 lg:pb-14">
              <div className="flex items-start justify-between gap-8 border-y border-cream-dark py-3">
                <div>
                  <p className="type-kicker mb-3 text-earth-red"><LocalizedNewsText article={article} field="category" /></p>
                  <p className="font-body text-sm font-black uppercase leading-5 tracking-[0.08em] text-ink/52">
                    {article.sourceName || 'International Mayan League'} / {article.date}
                  </p>
                </div>
              </div>

              <div className="mt-8 lg:mt-10">
                <h1 className="type-display max-w-5xl text-[clamp(2rem,6.2vw,6.1rem)] text-ink">
                  <LocalizedNewsText article={article} field="title" />
                </h1>
                <p className="type-intro mt-6 max-w-[68ch] text-[clamp(1.25rem,2.35vw,2.25rem)] text-ink/82 sm:mt-8">
                  <LocalizedNewsText article={article} field="dek" />
                </p>

                <details className="mt-6 border-t border-cream-dark lg:hidden">
                  <summary className="type-kicker flex min-h-11 cursor-pointer list-none items-center justify-between py-4 text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                    <LocalizedText en="Article file" es="Ficha del artículo" />
                    <span className="font-body text-lg leading-none text-ink/40" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <dl className="space-y-5 pb-4">
                    <div>
                      <dt className="type-kicker mb-1 text-ink/48"><LocalizedText en="Category" es="Categoría" /></dt>
                      <dd className="font-body text-sm font-bold uppercase tracking-[0.06em] text-ink">
                        <LocalizedNewsText article={article} field="category" />
                      </dd>
                    </div>
                    <div>
                      <dt className="type-kicker mb-1 text-ink/48"><LocalizedText en="Source" es="Fuente" /></dt>
                      <dd className="font-body text-sm font-bold leading-6 text-ink">{article.sourceName || 'International Mayan League'}</dd>
                    </div>
                    {article.author ? (
                      <div>
                        <dt className="type-kicker mb-1 text-ink/48"><LocalizedText en="Author" es="Autoría" /></dt>
                        <dd className="font-body text-sm font-bold leading-6 text-ink">{article.author}</dd>
                      </div>
                    ) : null}
                  </dl>
                </details>
              </div>
            </div>

            <aside className="hidden border-t border-cream-dark bg-ink p-7 text-cream sm:p-10 lg:block lg:border-l lg:border-t-0 lg:p-12">
              <p className="type-kicker mb-8 text-cream"><LocalizedText en="Article file" es="Ficha del artículo" /></p>
              <dl className="space-y-7">
                <div>
                  <dt className="type-kicker mb-2 text-cream/48"><LocalizedText en="Category" es="Categoría" /></dt>
                  <dd className="font-display text-4xl font-bold uppercase leading-none tracking-[-0.05em] text-cream"><LocalizedNewsText article={article} field="category" /></dd>
                </div>
                <div>
                  <dt className="type-kicker mb-2 text-cream/48"><LocalizedText en="Source" es="Fuente" /></dt>
                  <dd className="font-body text-base font-bold leading-6 text-cream">{article.sourceName || 'International Mayan League'}</dd>
                </div>
                {article.author ? (
                  <div>
                    <dt className="type-kicker mb-2 text-cream/48"><LocalizedText en="Author" es="Autoría" /></dt>
                    <dd className="font-body text-base font-bold leading-6 text-cream">{article.author}</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="type-kicker mb-3 text-cream/48"><LocalizedText en="Keywords" es="Palabras clave" /></dt>
                  <dd className="flex flex-wrap gap-2">
                    <LocalizedNewsKeywords article={article} className="rounded-full border border-white/18 px-3 py-1 font-body text-xs font-black uppercase tracking-[0.08em] text-cream/74" />
                  </dd>
                </div>
              </dl>
            </aside>
          </header>

          <div className="flex flex-col">

          <ShareThisDispatch
            title={social.title}
            text={social.suggestedPostCopy}
            url={articleUrl}
            hashtags={social.hashtags}
            shareImageUrl={shareImageUrl}
            storyImageUrl={storyImageUrl}
            className="order-4 lg:order-3"
          />

          {article.mainImage ? (
            <figure className="order-2 bg-white">
              <div className="relative h-[240px] overflow-hidden bg-ink sm:h-[360px] lg:h-[640px]">
                <img
                  src={article.mainImage.url}
                  alt={article.mainImage.alt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <figcaption className="border-b border-cream-dark px-5 py-3 text-right sm:px-6">
                <a
                  href={article.mainImage.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-xs font-black uppercase tracking-[0.08em] text-ink/48 underline decoration-current underline-offset-4 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                >
                  <LocalizedText en={`Photo by ${article.mainImage.photographerName} on Unsplash`} es={`Foto de ${article.mainImage.photographerName} en Unsplash`} />
                </a>
              </figcaption>
            </figure>
          ) : null}

          <section className="order-3 bg-white lg:order-4">
            <div className="p-7 sm:p-10 lg:p-14">
              {article.type === 'internal' && article.body?.length ? (
                <div className="type-body max-w-[78ch] space-y-7 text-ink/76">
                  {article.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.68fr)_minmax(280px,0.32fr)] lg:gap-14">
                  <div>
                    <h2 className="type-section mb-8 text-[clamp(2rem,3.6vw,3.8rem)] text-ink">
                      <LocalizedText en="Why this story matters" es="Por qué importa esta historia" />
                    </h2>
                    <p className="type-body max-w-[78ch] text-ink/74"><LocalizedNewsText article={article} field="whyItMatters" /></p>
                  </div>
                  <aside className="border-t border-cream-dark pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                    <p className="type-kicker mb-5 text-earth-red"><LocalizedText en="Original source" es="Fuente original" /></p>
                    <p className="type-body mb-8 text-ink/70">
                      <LocalizedText
                        en={`This story was originally published by ${article.sourceName}. Follow the source link to read the full article from the publisher.`}
                        es={`Esta historia fue publicada originalmente por ${article.sourceName}. Sigue el enlace de la fuente para leer el artículo completo en el sitio de la publicación.`}
                      />
                    </p>
                    {article.sourceUrl ? (
                      <Button href={article.sourceUrl} variant="primary" target="_blank" rel="noreferrer" className="w-fit">
                        <LocalizedText en="Read original source" es="Leer fuente original" />
                      </Button>
                    ) : null}
                  </aside>
                </div>
              )}
            </div>
          </section>

          </div>

          {relatedArticles.length ? (
            <section className="mt-5 bg-white">
              <div className="border-y border-cream-dark px-7 py-8 sm:px-10 lg:px-12">
                <p className="type-kicker text-earth-red"><LocalizedText en="Related dispatches" es="Despachos relacionados" /></p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                {relatedArticles.map((relatedArticle, index) => (
                  <a
                    key={relatedArticle.slug}
                    href={`/news/${relatedArticle.slug}`}
                    className="group flex min-h-80 flex-col border-b border-cream-dark p-7 hover:bg-mist focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold md:border-r md:last:border-r-0 sm:p-8"
                  >
                    <div className="mb-8 flex items-start justify-between gap-6">
                      <p className="type-kicker text-earth-red"><LocalizedNewsText article={relatedArticle} field="category" /></p>
                      <p className="font-display text-4xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>
                    <h3 className="type-section text-[clamp(1.45rem,2.1vw,2rem)] text-ink group-hover:text-earth-red">
                      <LocalizedNewsText article={relatedArticle} field="title" />
                    </h3>
                    <p className="mt-auto border-t border-cream-dark pt-5 font-body text-sm font-semibold leading-6 text-ink/68">
                      <LocalizedNewsText article={relatedArticle} field="excerpt" />
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
