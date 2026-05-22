import type { StructureResolver } from 'sanity/structure'

/**
 * Desk / structure resolver — sidebar labels for non-technical editors.
 */

const SINGLETON_TYPES = new Set(['homepage', 'siteSettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Mayan League')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
            .title('Homepage'),
        ),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site settings'),
        ),
      S.divider(),
      S.listItem()
        .title('Newsroom')
        .child(
          S.list()
            .title('Newsroom')
            .items([
              S.documentTypeListItem('newsArticle')
                .title('News articles')
                .child(
                  S.documentTypeList('newsArticle')
                    .title('News articles')
                    .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
                ),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        if (!id) return false
        return !SINGLETON_TYPES.has(id) && id !== 'newsArticle'
      }),
    ])
