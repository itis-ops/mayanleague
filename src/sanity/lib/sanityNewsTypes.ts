/** Raw shapes returned by GROQ (before mapping to `NewsArticle`). */

export interface LocalizedString {
  en?: string
  es?: string
}

export interface LocalizedText {
  en?: string
  es?: string
}

export interface PortableTextBlock {
  _type: string
  _key?: string
  style?: string
  children?: Array<{ _type?: string; text?: string }>
}

export interface LocalizedBlockContent {
  en?: PortableTextBlock[]
  es?: PortableTextBlock[]
}

export interface SanityUnsplashImage {
  url?: string
  alt?: LocalizedString
  caption?: LocalizedText
  photographerName?: string
  photographerUrl?: string
  sourceName?: string
  sourceUrl?: string
  unsplashPhotoId?: string
  unsplashDownloadLocation?: string
  paletteNotes?: string[]
}

export interface SanityInlineImage {
  source?: 'unsplash' | 'upload'
  unsplash?: SanityUnsplashImage
  upload?: {
    asset?: { _ref?: string; url?: string }
    alt?: LocalizedString
    caption?: LocalizedText
  }
}

export interface SanitySeoFields {
  socialTitle?: LocalizedString
  socialDescription?: LocalizedText
  hashtags?: string[]
}

export interface SanityNewsArticleDoc {
  _id: string
  slug: string
  category: string
  keywords?: string[]
  title: LocalizedString
  dek: LocalizedText
  summary: LocalizedText
  whyItMatters: LocalizedText
  excerpt: LocalizedText
  type: 'external' | 'internal'
  body?: LocalizedBlockContent
  author?: string
  sourceName?: string
  sourceUrl?: string
  mainImage?: SanityInlineImage
  featured?: boolean
  publishedAt?: string
  seo?: SanitySeoFields
}
