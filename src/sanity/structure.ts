import {
  CogIcon,
  DocumentsIcon,
  HomeIcon,
  InfoOutlineIcon,
  UsersIcon,
} from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

/**
 * Desk structure for non-technical editors — flat list, no orphan types, no extra nesting.
 */

const SINGLETON_TYPES = new Set([
  'homepage',
  'siteSettings',
  'aboutPage',
  'boardOfDirectorsPage',
  'ourPathPage',
  'coreValuesPage',
  'jobOpportunitiesPage',
])

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
        .title('About pages')
        .icon(InfoOutlineIcon)
        .id('aboutPages')
        .child(
          S.list()
            .title('About pages')
            .items([
              S.listItem()
                .title('About')
                .id('aboutPage')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About'),
                ),
              S.listItem()
                .title('Board of Directors')
                .id('boardOfDirectorsPage')
                .child(
                  S.document()
                    .schemaType('boardOfDirectorsPage')
                    .documentId('boardOfDirectorsPage')
                    .title('Board of Directors'),
                ),
              S.listItem()
                .title('Our Path')
                .id('ourPathPage')
                .child(
                  S.document()
                    .schemaType('ourPathPage')
                    .documentId('ourPathPage')
                    .title('Our Path'),
                ),
              S.listItem()
                .title('Our Core Values')
                .id('coreValuesPage')
                .child(
                  S.document()
                    .schemaType('coreValuesPage')
                    .documentId('coreValuesPage')
                    .title('Our Core Values'),
                ),
              S.listItem()
                .title('Job Opportunities')
                .id('jobOpportunitiesPage')
                .child(
                  S.document()
                    .schemaType('jobOpportunitiesPage')
                    .documentId('jobOpportunitiesPage')
                    .title('Job Opportunities'),
                ),
            ]),
        ),
      S.documentTypeListItem('teamMember')
        .title('Team members')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('teamMember')
            .title('Team members')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
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
      S.divider(),
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
    ])

/** Exported for tests / docs — types editors should never see in the desk. */
export const HIDDEN_DESK_TYPES = SINGLETON_TYPES
