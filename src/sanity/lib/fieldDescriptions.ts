/**
 * Plain-language Studio field descriptions for non-technical editors.
 * Each string explains what the field is and where it appears on the live site.
 */

/** Shown under every English sub-field (localizedString / localizedText). */
export const BILINGUAL_EN =
  'English copy. Shown on the live site when a visitor chooses English (EN) in the language toggle.'

/** Shown under every Spanish sub-field. */
export const BILINGUAL_ES =
  'Spanish copy. Shown on the live site when a visitor chooses Spanish (ES) in the language toggle.'

export const HOMEPAGE_DOC =
  'Controls the main landing page at mayanleague.org/ (top to bottom: hero banner, impact story, mission, programs, donate section, resources, and news cards). Publish this document after editing.'

export const NEWS_ARTICLE_DOC =
  'A single news story. Published articles appear in the Newsroom list at mayanleague.org/news. To feature one on the homepage, also pin it under Homepage → News rail.'

/** Prefix for homepage section fields. */
export function onHomepage(section: string, element: string): string {
  return `Where it appears: Homepage (mayanleague.org/) → ${section} → ${element}.`
}

/** Prefix for news article fields. */
export function onNews(location: string, element: string): string {
  return `Where it appears: ${location} → ${element}.`
}
