import { urlForImage } from '@/sanity/image'
import type { NewsArticle, NewsArticleI18n, NewsCategory } from '@/lib/news'
import { newsCategories } from '@/lib/news'

import { portableTextToParagraphs } from './portableText'
import type {
  LocalizedString,
  LocalizedText,
  SanityInlineImage,
  SanityNewsArticleDoc,
} from './sanityNewsTypes'

const categoryLabelsEs: Record<NewsCategory, string> = {
  Justice: 'Justicia',
  'Land & Water': 'Tierra y agua',
  'Human Rights': 'Derechos humanos',
  Immigration: 'Inmigración',
  'Culture & Identity': 'Cultura e identidad',
  'Indigenous Languages': 'Idiomas Indígenas',
  'Community Action': 'Acción comunitaria',
}

function pickEn(value?: LocalizedString | LocalizedText): string {
  return value?.en?.trim() || value?.es?.trim() || ''
}

function pickEs(value?: LocalizedString | LocalizedText): string | undefined {
  const es = value?.es?.trim()
  return es || undefined
}

function formatPublishedDate(iso?: string, fallback = ''): string {
  if (!iso) return fallback
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return fallback
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

function mapMainImage(image?: SanityInlineImage): NewsArticle['mainImage'] | undefined {
  if (!image) return undefined

  if (image.source === 'upload' && image.upload?.asset) {
    const url = image.upload.asset.url
      ? image.upload.asset.url
      : urlForImage(image.upload.asset).width(1920).url()
    if (!url) return undefined

    return {
      url,
      alt: pickEn(image.upload.alt),
      caption: pickEn(image.upload.caption),
      photographerName: 'International Mayan League',
      photographerUrl: 'https://mayanleague.vercel.app',
      sourceName: 'International Mayan League',
      sourceUrl: 'https://mayanleague.vercel.app',
    }
  }

  const unsplash = image.unsplash
  if (!unsplash?.url) return undefined

  return {
    url: unsplash.url,
    alt: pickEn(unsplash.alt),
    caption: pickEn(unsplash.caption),
    photographerName: unsplash.photographerName || 'Unsplash',
    photographerUrl: unsplash.photographerUrl || 'https://unsplash.com',
    sourceName: unsplash.sourceName || 'Unsplash',
    sourceUrl: unsplash.sourceUrl || unsplash.url,
    unsplashPhotoId: unsplash.unsplashPhotoId,
    unsplashDownloadLocation: unsplash.unsplashDownloadLocation,
    paletteNotes: unsplash.paletteNotes,
  }
}

function mapMainImageI18n(image?: SanityInlineImage): NewsArticleI18n['mainImage'] | undefined {
  if (!image) return undefined
  const source = image.source === 'upload' ? image.upload : image.unsplash
  if (!source) return undefined

  const alt = pickEs('alt' in source ? source.alt : undefined)
  const caption = pickEs('caption' in source ? source.caption : undefined)
  if (!alt && !caption) return undefined
  return { alt, caption }
}

function isNewsCategory(value: string): value is NewsCategory {
  return (newsCategories as readonly string[]).includes(value)
}

export function mapSanityNewsArticle(
  doc: SanityNewsArticleDoc,
  options?: { fallbackDate?: string },
): NewsArticle {
  const category = isNewsCategory(doc.category) ? doc.category : 'Human Rights'
  const mainImage = mapMainImage(doc.mainImage)
  const seo = doc.seo

  const i18n: NewsArticleI18n = {
    title: pickEs(doc.title),
    dek: pickEs(doc.dek),
    summary: pickEs(doc.summary),
    whyItMatters: pickEs(doc.whyItMatters),
    excerpt: pickEs(doc.excerpt),
    socialTitle: pickEs(seo?.socialTitle),
    socialDescription: pickEs(seo?.socialDescription),
    category: categoryLabelsEs[category],
    keywords: doc.keywords,
    mainImage: mapMainImageI18n(doc.mainImage),
  }

  const hasI18n = Object.values(i18n).some((value) => value !== undefined)

  return {
    title: pickEn(doc.title),
    slug: doc.slug,
    category,
    keywords: doc.keywords ?? [],
    dek: pickEn(doc.dek),
    summary: pickEn(doc.summary),
    whyItMatters: pickEn(doc.whyItMatters),
    excerpt: pickEn(doc.excerpt),
    date: formatPublishedDate(doc.publishedAt, options?.fallbackDate),
    author: doc.author,
    sourceName: doc.sourceName,
    sourceUrl: doc.sourceUrl,
    type: doc.type,
    body:
      doc.type === 'internal'
        ? portableTextToParagraphs(doc.body?.en)
        : undefined,
    featured: doc.featured,
    socialTitle: pickEn(seo?.socialTitle),
    socialDescription: pickEn(seo?.socialDescription),
    suggestedPostCopy: undefined,
    hashtags: seo?.hashtags,
    mainImage,
    ...(hasI18n ? { _i18n: { es: i18n } } : {}),
  }
}
