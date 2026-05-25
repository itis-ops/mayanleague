import { defineField, defineType } from 'sanity'

import { HOMEPAGE_DOC, onHomepage } from '../../lib/fieldDescriptions'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  description: HOMEPAGE_DOC,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'impactMoment', title: 'Impact moment' },
    { name: 'mission', title: 'Mission' },
    { name: 'programs', title: 'Programs spotlight' },
    { name: 'cta', title: 'Call to action' },
    { name: 'resources', title: 'Resources spotlight' },
    { name: 'newsRail', title: 'News on homepage' },
    { name: 'seo', title: 'Search & sharing (optional)' },
  ],
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero',
      description: onHomepage('Hero (top of page)', 'all fields in this group'),
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          description: onHomepage('Hero', 'small red label above the main headline (e.g. organization name)'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'tagline',
          title: 'Main headline (tagline)',
          description: onHomepage('Hero', 'the very large headline text visitors read first'),
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'mission',
          title: 'Mission line (sidebar)',
          description: onHomepage(
            'Hero',
            'short line in the left sidebar on desktop (next to the brand bar — not the big headline)',
          ),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'clarityLine',
          title: 'Supporting paragraph',
          description: onHomepage(
            'Hero',
            'paragraph to the right of the headline on desktop, above the Donate and Connect buttons',
          ),
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'ctaDonate',
          title: 'Donate button label',
          description: onHomepage('Hero', 'text on the primary red Donate button (links to the donation page)'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'ctaConnect',
          title: 'Connect button label',
          description: onHomepage('Hero', 'text on the secondary Connect button (links to the Contact page)'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'proofPoints',
          title: 'Proof points (exactly 3)',
          description: onHomepage(
            'Hero',
            'three short lines in the top brand bar (e.g. stats or credibility lines). Must be exactly 3 items.',
          ),
          type: 'array',
          of: [{ type: 'localizedString' }],
          validation: (rule) =>
            rule.length(3).error('The homepage hero always shows exactly three proof points.'),
        }),
      ],
    }),

    defineField({
      name: 'impactMoment',
      title: 'Impact moment',
      description: onHomepage('Impact moment (dark band)', 'all fields in this group'),
      type: 'object',
      group: 'impactMoment',
      fields: [
        defineField({
          name: 'label',
          title: 'Section label',
          description: onHomepage('Impact moment', 'small label in the top bar of this dark section'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'kicker',
          title: 'Kicker (date + venue)',
          description: onHomepage(
            'Impact moment',
            'detail line in the top bar (often a date and location, e.g. "March 2026 · United Nations")',
          ),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Section headline',
          description: onHomepage('Impact moment', 'large headline on the left side of the dark band'),
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body paragraph',
          description: onHomepage('Impact moment', 'paragraph on the right side, above the statement link'),
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'readStatement',
          title: 'Statement link label',
          description: onHomepage(
            'Impact moment',
            'text on the link that opens the full statement (opens in a new tab)',
          ),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'statementUrl',
          title: 'Statement link URL',
          description: onHomepage(
            'Impact moment',
            'web address the statement link opens (must start with https://)',
          ),
          type: 'url',
          validation: (rule) => rule.uri({ scheme: ['https'] }),
        }),
        defineField({
          name: 'featuredArticle',
          title: 'Featured news article (optional)',
          description:
            'Optional. Pick a published news article to highlight in this section when the site is wired to use it. Leave empty if unsure.',
          type: 'reference',
          to: [{ type: 'newsArticle' }],
        }),
      ],
    }),

    defineField({
      name: 'mission',
      title: 'Mission section',
      description: onHomepage('Mission (cream section)', 'all fields in this group'),
      type: 'object',
      group: 'mission',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section label',
          description: onHomepage('Mission', 'small label in the top bar of this section'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'sectionKicker',
          title: 'Section kicker',
          description: onHomepage('Mission', 'second line in the top bar (short context or date line)'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Section heading',
          description: onHomepage('Mission', 'large heading above the board statement quote'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'boardStatement',
          title: 'Board statement (paragraphs)',
          description: onHomepage(
            'Mission',
            'one or more quote paragraphs shown in large accent type (add each paragraph as a separate item)',
          ),
          type: 'array',
          of: [{ type: 'localizedText' }],
          validation: (rule) => rule.min(1),
        }),
        defineField({
          name: 'boardStatementAttribution',
          title: 'Quote attribution',
          description: onHomepage('Mission', 'name or title line under the quote (e.g. board chair name)'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'learnMore',
          title: 'Learn-more button label',
          description: onHomepage('Mission', 'text on the button that links to the About page'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'programsSpotlight',
      title: 'Programs spotlight',
      description: onHomepage('Programs spotlight', 'all fields in this group'),
      type: 'object',
      group: 'programs',
      fields: [
        defineField({
          name: 'kicker',
          title: 'Section kicker',
          description: onHomepage('Programs', 'small red label above the programs heading'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Section heading',
          description: onHomepage('Programs', 'large headline introducing the program cards'),
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'intro',
          title: 'Intro paragraph',
          description: onHomepage('Programs', 'short paragraph to the right of the heading on desktop'),
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'learnMore',
          title: 'Learn-more link label',
          description: onHomepage('Programs', 'text on links inside each program card'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'items',
          title: 'Program cards',
          description: onHomepage(
            'Programs',
            'scrollable grid of program cards (each card title, blurb, and link). Program pages themselves are built separately — this only controls the homepage teaser.',
          ),
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'programItem',
              title: 'Program card',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Program name',
                  description: onHomepage('Programs', 'title on each program card'),
                  type: 'localizedString',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Program description',
                  description: onHomepage('Programs', 'short blurb under the program name on each card'),
                  type: 'localizedText',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'href',
                  title: 'Program page link',
                  description: onHomepage(
                    'Programs',
                    'where the card links when clicked — must be an on-site path starting with / (e.g. /human-rights)',
                  ),
                  type: 'string',
                  validation: (rule) =>
                    rule.required().custom((value) => {
                      if (typeof value === 'string' && value.startsWith('/')) return true
                      return 'Must start with "/" — example: /maya-cosmovision'
                    }),
                }),
              ],
              preview: { select: { title: 'name.en', subtitle: 'href' } },
            },
          ],
          validation: (rule) => rule.min(1).max(6),
        }),
      ],
    }),

    defineField({
      name: 'callToAction',
      title: 'Call to action (donate band)',
      description: onHomepage('Call to action (red band)', 'all fields in this group'),
      type: 'object',
      group: 'cta',
      fields: [
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          description: onHomepage('Call to action', 'small label at the top of the red donate section'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Section heading',
          description: onHomepage('Call to action', 'large headline in the red donate band'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body paragraph',
          description: onHomepage('Call to action', 'short paragraph under the heading'),
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'donate',
          title: 'Monthly donate button label',
          description: onHomepage('Call to action', 'text on the primary monthly donation button'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'donateOnce',
          title: 'One-time donate button label',
          description: onHomepage('Call to action', 'text on the one-time donation button'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'connect',
          title: 'Contact button label',
          description: onHomepage('Call to action', 'text on the button that links to the Contact page'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'resourcesSpotlight',
      title: 'Resources spotlight',
      description: onHomepage('Resources spotlight', 'all fields in this group'),
      type: 'object',
      group: 'resources',
      fields: [
        defineField({
          name: 'sectionLabel',
          title: 'Section label',
          description: onHomepage('Resources', 'small label in the top bar of this section'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'sectionKicker',
          title: 'Section kicker',
          description: onHomepage('Resources', 'second line in the top bar'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'eyebrow',
          title: 'Eyebrow',
          description: onHomepage('Resources', 'small red label above the resources heading'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Section heading',
          description: onHomepage('Resources', 'large headline for the resources area'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'intro',
          title: 'Intro paragraph',
          description: onHomepage('Resources', 'intro text above the three resource cards'),
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'explore',
          title: 'Explore button label',
          description: onHomepage('Resources', 'text on each resource card button (e.g. "Explore")'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'items',
          title: 'Resource cards',
          description: onHomepage(
            'Resources',
            'up to eight resource teasers; the live site shows the first three as cards',
          ),
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'resourceItem',
              title: 'Resource card',
              fields: [
                defineField({
                  name: 'title',
                  title: 'Resource title',
                  description: onHomepage('Resources', 'title on each resource card'),
                  type: 'localizedString',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  title: 'Resource description',
                  description: onHomepage('Resources', 'short description on each resource card'),
                  type: 'localizedText',
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: { select: { title: 'title.en' } },
            },
          ],
          validation: (rule) => rule.min(1).max(8),
        }),
      ],
    }),

    defineField({
      name: 'newsRail',
      title: 'News rail',
      description: onHomepage('News rail (bottom section)', 'all fields in this group'),
      type: 'object',
      group: 'newsRail',
      fields: [
        defineField({
          name: 'kicker',
          title: 'Section label',
          description: onHomepage('News rail', 'small label in the top bar (e.g. "News")'),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'headline',
          title: 'Section headline',
          description: onHomepage(
            'News rail',
            'large two-line headline above the four news cards (e.g. "Perspectives and analysis from our nation")',
          ),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'intro',
          title: 'Intro (optional)',
          description: onHomepage('News rail', 'optional short paragraph under the headline — rarely shown on the live site'),
          type: 'localizedText',
        }),
        defineField({
          name: 'viewAll',
          title: 'Visit newsroom button label',
          description: onHomepage(
            'News rail',
            'text on the button that links to the full Newsroom page (mayanleague.org/news)',
          ),
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'featured',
          title: 'Featured articles (max 4)',
          description:
            'Where it appears: Homepage → four news cards in a row (category, title, excerpt, "Read dispatch" link). ' +
            'Pick up to four published News articles. This list controls the homepage — checking "Feature on homepage" on an article alone is not enough if articles are pinned here.',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'newsArticle' }] }],
          validation: (rule) => rule.max(4).error('The homepage shows at most four news cards.'),
        }),
      ],
    }),

    defineField({
      name: 'seo',
      title: 'SEO & social',
      description:
        'Where it appears: Google search results and social previews when someone shares the homepage link — not visible as a section on the page itself.',
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Homepage', subtitle: 'mayanleague.org/' }
    },
  },
})
