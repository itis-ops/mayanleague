import { sanityFetch } from '@/sanity/lib/live'
import { projectId } from '@/sanity/env'
import { mapSanityNewsArticle } from '@/sanity/lib/mapNewsArticle'
import type { SanityNewsArticleDoc } from '@/sanity/lib/sanityNewsTypes'
import {
  homepageFeaturedNewsQuery,
  newsArticleBySlugQuery,
  newsArticleSlugsQuery,
  newsArticlesQuery,
} from '@/sanity/queries/news'

import {
  getFeaturedNewsArticles as getStaticFeaturedNewsArticles,
  getNewsArticle as getStaticNewsArticle,
  newsArticles as staticNewsArticles,
  type NewsArticle,
} from './news'

const isSanityConfigured = projectId !== 'placeholder-project-id'

/** All published articles, newest first. Stega active in draft mode for overlays. */
export async function getNewsArticles(): Promise<NewsArticle[]> {
  if (!isSanityConfigured) return staticNewsArticles

  try {
    const { data } = await sanityFetch({ query: newsArticlesQuery })
    const docs = data as SanityNewsArticleDoc[] | null
    if (docs?.length) return docs.map((doc) => mapSanityNewsArticle(doc))
  } catch (error) {
    console.error('[newsRepository] Failed to fetch articles from Sanity:', error)
  }

  return staticNewsArticles
}

/** Single article by slug. Default sanityFetch behavior (stega on) for page render. */
export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  if (isSanityConfigured) {
    try {
      const { data } = await sanityFetch({ query: newsArticleBySlugQuery, params: { slug } })
      const doc = data as SanityNewsArticleDoc | null
      if (doc) return mapSanityNewsArticle(doc)
    } catch (error) {
      console.error(`[newsRepository] Failed to fetch article "${slug}":`, error)
    }
  }

  return getStaticNewsArticle(slug)
}

/**
 * Slugs for generateStaticParams — always published perspective, never stega,
 * so draft articles don't create static routes prematurely.
 */
export async function getNewsSlugs(): Promise<string[]> {
  if (isSanityConfigured) {
    try {
      const { data } = await sanityFetch({
        query: newsArticleSlugsQuery,
        perspective: 'published',
        stega: false,
      })
      const slugs = data as string[] | null
      if (slugs?.length) return slugs
    } catch (error) {
      console.error('[newsRepository] Failed to fetch slugs:', error)
    }
  }

  return staticNewsArticles.map((a) => a.slug)
}

/** Homepage news rail: curated refs first, then featured flag, then latest. */
export async function getHomepageNewsArticles(limit = 4): Promise<NewsArticle[]> {
  if (isSanityConfigured) {
    try {
      const { data } = await sanityFetch({ query: homepageFeaturedNewsQuery })
      const curated = data as SanityNewsArticleDoc[] | null
      if (curated?.length) {
        return curated.slice(0, limit).map((doc) => mapSanityNewsArticle(doc))
      }
    } catch (error) {
      console.error('[newsRepository] Failed to fetch homepage featured news:', error)
    }
  }

  const all = await getNewsArticles()
  const featured = all.filter((a) => a.featured)
  const source = featured.length ? featured : all
  return source.slice(0, limit)
}

export async function getRelatedNewsArticles(
  article: NewsArticle,
  limit = 3,
): Promise<NewsArticle[]> {
  const all = await getNewsArticles()
  return all
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      const sharedKeywords = candidate.keywords.filter((kw) =>
        article.keywords.includes(kw),
      ).length
      const categoryScore = candidate.category === article.category ? 3 : 0
      return { article: candidate, score: categoryScore + sharedKeywords }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ article: related }) => related)
}

/** @deprecated Use async functions from this repository in server components. */
export function getFeaturedNewsArticlesSync() {
  return getStaticFeaturedNewsArticles()
}
