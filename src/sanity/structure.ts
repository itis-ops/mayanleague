import { CogIcon, DocumentsIcon, HomeIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

/**
 * Desk structure for non-technical editors — flat list, no orphan types, no extra nesting.
 */

const SINGLETON_TYPES = new Set(['homepage', 'siteSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mayan League')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage'),
        ),
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site settings'),
        ),
      S.divider(),
      S.documentTypeListItem('newsArticle')
        .title('News articles')
        .icon(DocumentsIcon)
        .child(
          S.documentTypeList('newsArticle')
            .title('News articles')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
        ),
    ])

/** Exported for tests / docs — types editors should never see in the desk. */
export const HIDDEN_DESK_TYPES = SINGLETON_TYPES
