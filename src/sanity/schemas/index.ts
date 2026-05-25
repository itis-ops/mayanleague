import type { SchemaTypeDefinition } from 'sanity'

import { aboutPage } from './documents/aboutPage'
import { boardOfDirectorsPage } from './documents/boardOfDirectorsPage'
import { coreValuesPage } from './documents/coreValuesPage'
import { homepage } from './documents/homepage'
import { jobOpportunitiesPage } from './documents/jobOpportunitiesPage'
import { newsArticle } from './documents/newsArticle'
import { ourPathPage } from './documents/ourPathPage'
import { siteSettings } from './documents/siteSettings'
import { teamMember } from './documents/teamMember'
import { ctaLink } from './objects/ctaLink'
import { inlineImage } from './objects/inlineImage'
import { localizedBlockContent } from './objects/localizedBlockContent'
import { localizedString } from './objects/localizedString'
import { localizedText } from './objects/localizedText'
import { sanityImage } from './objects/sanityImage'
import { seoFields } from './objects/seoFields'
import { unsplashImage } from './objects/unsplashImage'

/**
 * Aggregate schema list registered in `sanity.config.ts`.
 * Object types must come before documents that reference them.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  localizedString,
  localizedText,
  localizedBlockContent,
  ctaLink,
  unsplashImage,
  sanityImage,
  inlineImage,
  seoFields,
  newsArticle,
  homepage,
  aboutPage,
  teamMember,
  boardOfDirectorsPage,
  ourPathPage,
  coreValuesPage,
  jobOpportunitiesPage,
  siteSettings,
]
