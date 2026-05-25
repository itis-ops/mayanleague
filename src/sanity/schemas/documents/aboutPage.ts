import { defineField, defineType } from 'sanity'

import { ABOUT_PAGE_DOC, onAbout } from '../../lib/fieldDescriptions'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  description: ABOUT_PAGE_DOC,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'whoWeAre', title: 'Who we are' },
    { name: 'howWeWork', title: 'How we work' },
    { name: 'principles', title: 'Principles' },
    { name: 'quote', title: 'Ancestral reference quote' },
    { name: 'seo', title: 'Search & sharing (optional)' },
  ],
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero headline',
      description: onAbout('About page', 'large display headline at the top of the page'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'methodStatement',
      title: 'Hero intro',
      description: onAbout('About page', 'paragraph under the hero headline'),
      type: 'localizedText',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'whoWeAreLabel',
      title: '"Who we are" section label',
      description: onAbout('About page → Who we are', 'red kicker label above the Who-we-are block'),
      type: 'localizedString',
      group: 'whoWeAre',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'howWeWorkLabel',
      title: '"How we work" section label',
      description: onAbout('About page → How we work', 'red kicker label above the How-we-work block'),
      type: 'localizedString',
      group: 'howWeWork',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'paragraphs',
      title: 'Body paragraphs',
      description: onAbout(
        'About page',
        'four paragraphs of body copy. Paragraph 1 sits under "Who we are"; paragraphs 2–4 sit under "How we work".',
      ),
      type: 'array',
      of: [{ type: 'localizedText' }],
      group: 'howWeWork',
      validation: (rule) => rule.length(4).error('The About page needs exactly four body paragraphs.'),
    }),

    defineField({
      name: 'principles',
      title: 'Guiding principles (exactly 4)',
      description: onAbout('About page → How we work', 'four short bullet lines to the right of the body paragraphs'),
      type: 'array',
      of: [{ type: 'localizedString' }],
      group: 'principles',
      validation: (rule) => rule.length(4).error('Show exactly four principles.'),
    }),

    defineField({
      name: 'quoteLabel',
      title: 'Quote label',
      description: onAbout('About page → Ancestral reference', 'small label above the quote (e.g. "Ancestral reference")'),
      type: 'localizedString',
      group: 'quote',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote body',
      description: onAbout('About page → Ancestral reference', 'the full quote text (include the curly quote marks if you want them shown)'),
      type: 'localizedText',
      group: 'quote',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quoteSource',
      title: 'Quote source',
      description: onAbout('About page → Ancestral reference', 'attribution under the quote (e.g. "Pop Wuj")'),
      type: 'localizedString',
      group: 'quote',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'seo',
      title: 'SEO & social',
      description:
        'Where it appears: Google search results and social previews when someone shares /about — not visible on the page itself.',
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'About page', subtitle: 'mayanleague.org/about' }
    },
  },
})
