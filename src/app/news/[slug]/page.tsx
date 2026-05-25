import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { LocalizedText } from '@/components/news/LocalizedNewsText'
import NewsArticleBody from '@/components/news/NewsArticleBody'
import NewsArticleFile from '@/components/news/NewsArticleFile'
import NewsArticleHero from '@/components/news/NewsArticleHero'
import NewsArticleLanguageBar from '@/components/news/NewsArticleLanguageBar'
import NewsRelatedDispatches from '@/components/news/NewsRelatedDispatches'
import ShareThisDispatch from '@/components/news/ShareThisDispatch'
import ArticleDonationModule from '@/components/news/ArticleDonationModule'
import { hubArticleBleedClass, hubArticleBleedInnerClass, hubPageMainClass, hubPageSectionClass } from '@/lib/editorialLayout'
import {
  getLocalizedNewsArticle,
  getNewsArticleUrl,
  getNewsShareImageAbsoluteUrl,
  getNewsSocial,
} from '@/lib/news'
import { getNewsArticleBySlug, getNewsSlugs, getRelatedNewsArticles } from '@/lib/newsRepository'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateStaticParams() {
  const slugs = await getNewsSlugs()
  return slugs.map((slug) => ({ slug }))
}

function readLangParam(value: string | string[] | undefined): 'en' | 'es' {
  const raw = Array.isArray(value) ? value[0] : value
  return raw === 'es' ? 'es' : 'en'
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams])
  const article = await getNewsArticleBySlug(slug)

  if (!article) {
    return {
      title: 'News Article | International Mayan League',
    }
  }

  const lang = readLangParam(query.lang)
  const localized = lang === 'es' ? getLocalizedNewsArticle(article, 'es') : article
  const social = getNewsSocial(article, lang)
  const url = getNewsArticleUrl(article.slug, lang)
  const imageUrl = getNewsShareImageAbsoluteUrl(article.slug, lang)
  const imageAlt = localized.mainImage?.alt || social.shareImageAlt
  const siteName = lang === 'es' ? 'Liga Maya Internacional' : 'International Mayan League'

  return {
    title: `${localized.title} | ${siteName}`,
    description: social.description,
    alternates: {
      canonical: url,
      languages: {
        en: getNewsArticleUrl(article.slug, 'en'),
        es: getNewsArticleUrl(article.slug, 'es'),
      },
    },
    openGraph: {
      title: localized.title,
      description: social.description,
      url,
      siteName,
      type: 'article',
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      authors: article.author ? [article.author] : undefined,
      tags: localized.keywords,
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
      title: localized.title,
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

  return (
    <>
      <Navbar />
      <main id="main-content" className={hubPageMainClass}>
        <section className={`${hubPageSectionClass} border-t border-cream-dark`}>
          <article className="min-w-0 bg-white">
            <NewsArticleLanguageBar />
            <NewsArticleHero article={article} />

            <div className="flex flex-col">
              {article.mainImage ? (
                <figure className="order-2 bg-white">
                  <div className="relative h-[240px] overflow-hidden bg-ink sm:h-[360px] lg:h-[640px]">
                    <img
                      src={article.mainImage.url}
                      alt={article.mainImage.alt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <figcaption className={`${hubArticleBleedClass} border-b border-cream-dark bg-white py-3 text-right`}>
                    <div className={hubArticleBleedInnerClass}>
                    <a
                      href={article.mainImage.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-body text-xs font-black uppercase tracking-[0.08em] text-ink/48 underline decoration-current underline-offset-4 hover:text-earth-red focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      <LocalizedText
                        en={`Photo by ${article.mainImage.photographerName} on Unsplash`}
                        es={`Foto de ${article.mainImage.photographerName} en Unsplash`}
                      />
                    </a>
                    </div>
                  </figcaption>
                </figure>
              ) : null}

              <div className="order-3 bg-white">
                <NewsArticleBody article={article} />
              </div>

              <div className="order-4">
                <NewsArticleFile article={article} />
              </div>

              <ShareThisDispatch article={article} className="order-5" />
            </div>

            <ArticleDonationModule />

            <NewsRelatedDispatches articles={relatedArticles} />
          </article>
        </section>
      </main>
      <Footer />
    </>
  )
}
