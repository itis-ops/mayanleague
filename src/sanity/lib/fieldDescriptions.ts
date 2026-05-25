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

export const ABOUT_PAGE_DOC =
  'Controls the About page at mayanleague.org/about. The board quote at the bottom of this page is shared with the Homepage mission section — edit it there.'

export const TEAM_MEMBER_DOC =
  'A single team member shown on mayanleague.org/team. Order in Studio determines the order on the site (top to bottom).'

export const BOARD_OF_DIRECTORS_DOC =
  'Controls the Board of Directors page at mayanleague.org/board-of-directors. Add or reorder board members in the "Board members" list.'

export const OUR_PATH_DOC =
  'Controls the Our Path page at mayanleague.org/our-path. Two stacked sections — Mission and Vision — with an editable intro line at the top.'

export const CORE_VALUES_DOC =
  'Controls the Our Core Values page at mayanleague.org/our-core-values. Seven principles, each with an icon image and a paragraph of body copy.'

export const JOB_OPPORTUNITIES_DOC =
  'Controls the Job Opportunities page at mayanleague.org/job-opportunities. Each listing renders an "Apply" button that opens the visitor\'s email client with the job title in the subject line.'

/** Prefix for About-family page fields. */
export function onAbout(page: string, element: string): string {
  return `Where it appears: ${page} → ${element}.`
}
