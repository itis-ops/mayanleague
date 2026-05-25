import { defineField, defineType } from 'sanity'

import { CORE_VALUES_DOC, onAbout } from '../../lib/fieldDescriptions'

export const coreValuesPage = defineType({
  name: 'coreValuesPage',
  title: 'Our Core Values page',
  type: 'document',
  description: CORE_VALUES_DOC,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'values', title: 'Values' },
    { name: 'seo', title: 'Search & sharing (optional)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      description: onAbout('Our Core Values page', 'big page title at the top'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      description: onAbout('Our Core Values page', 'small red label above the title'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      description: onAbout('Our Core Values page', 'short intro paragraph above the seven values'),
      type: 'localizedText',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description: onAbout('Our Core Values page', 'large hero image (usually reuses the first value icon)'),
      type: 'sanityImage',
      group: 'hero',
    }),
    defineField({
      name: 'values',
      title: 'Core values (exactly 7)',
      description: onAbout(
        'Our Core Values page',
        'the seven principles, each rendered as a row with an icon and a paragraph of body copy.',
      ),
      type: 'array',
      group: 'values',
      of: [
        {
          type: 'object',
          name: 'coreValue',
          title: 'Value',
          fields: [
            defineField({
              name: 'title',
              title: 'Value statement',
              description: 'Full sentence stating the value (e.g. "We respect and care for Mother Earth and Mother Nature.").',
              type: 'localizedString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icon / illustration',
              description: 'Small image displayed next to the value title.',
              type: 'sanityImage',
            }),
            defineField({
              name: 'body',
              title: 'Body paragraphs',
              description: 'One or more paragraphs explaining the value. Each item is one paragraph.',
              type: 'array',
              of: [{ type: 'localizedText' }],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: { title: 'title.en', media: 'icon.asset' },
          },
        },
      ],
      validation: (rule) => rule.length(7).error('Show exactly seven values.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO & social',
      description:
        'Where it appears: Google search results and social previews when someone shares /our-core-values — not visible on the page itself.',
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Our Core Values', subtitle: 'mayanleague.org/our-core-values' }
    },
  },
})
