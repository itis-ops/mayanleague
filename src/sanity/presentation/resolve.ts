import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation'

/**
 * Document location resolver for the Presentation Tool.
 *
 * Each entry maps a Sanity document type to one or more frontend URLs.
 * The first URL is the primary preview destination; extras appear as
 * secondary location badges in the Studio UI.
 */
export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    homepage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          { title: 'Homepage', href: '/' },
        ],
      }),
    }),

    newsArticle: defineLocations({
      select: {
        title: 'title.en',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title ?? 'News article',
            href: `/news/${doc?.slug ?? ''}`,
          },
          { title: 'Newsroom', href: '/news' },
        ],
      }),
    }),
  },
}
