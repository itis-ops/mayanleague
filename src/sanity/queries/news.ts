/**
 * GROQ queries for news articles and homepage news rail.
 *
 * Filtering by draft/published state is handled by the Sanity client's
 * `perspective: 'published'` setting in src/sanity/client.ts — no custom
 * publishStatus field needed here.
 */

export const newsArticleProjection = `{
  _id,
  "slug": slug.current,
  category,
  keywords,
  title,
  dek,
  summary,
  whyItMatters,
  excerpt,
  type,
  body,
  author,
  sourceName,
  sourceUrl,
  mainImage{
    source,
    unsplash{
      url,
      alt,
      caption,
      photographerName,
      photographerUrl,
      sourceName,
      sourceUrl,
      unsplashPhotoId,
      unsplashDownloadLocation,
      paletteNotes
    },
    upload{
      alt,
      caption,
      asset->{url}
    }
  },
  featured,
  publishedAt,
  seo
}`

/** All published articles, newest first. */
export const newsArticlesQuery = `*[
  _type == "newsArticle" &&
  defined(slug.current)
] | order(publishedAt desc) ${newsArticleProjection}`

export const newsArticleBySlugQuery = `*[
  _type == "newsArticle" &&
  slug.current == $slug
][0] ${newsArticleProjection}`

export const newsArticleSlugsQuery = `*[
  _type == "newsArticle" &&
  defined(slug.current)
].slug.current`

/** Homepage singleton — up to 4 curated article references. */
export const homepageFeaturedNewsQuery = `*[_type == "homepage"][0]{
  newsRail{
    featured[]->[
      _type == "newsArticle" &&
      defined(slug.current)
    ] ${newsArticleProjection}
  }
}.newsRail.featured`
