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

    siteSettings: defineLocations({
      select: {},
      resolve: () => ({
        locations: [
          { title: 'Contact page', href: '/contact' },
          { title: 'Homepage (footer)', href: '/' },
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

    aboutPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'About', href: '/about' }],
      }),
    }),

    boardOfDirectorsPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Board of Directors', href: '/board-of-directors' }],
      }),
    }),

    ourPathPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Our Path', href: '/our-path' }],
      }),
    }),

    coreValuesPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Our Core Values', href: '/our-core-values' }],
      }),
    }),

    jobOpportunitiesPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: 'Job Opportunities', href: '/job-opportunities' }],
      }),
    }),

    teamMember: defineLocations({
      select: { name: 'name' },
      resolve: (doc) => ({
        locations: [
          { title: 'Team', href: '/team' },
          ...(doc?.name ? [{ title: `Team \u2014 ${doc.name}`, href: '/team' }] : []),
        ],
      }),
    }),
  },
}
