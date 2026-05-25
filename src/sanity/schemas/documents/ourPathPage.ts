import { defineField, defineType } from 'sanity'

import { onAbout, OUR_PATH_DOC } from '../../lib/fieldDescriptions'

export const ourPathPage = defineType({
  name: 'ourPathPage',
  title: 'Our Path page',
  type: 'document',
  description: OUR_PATH_DOC,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'sections', title: 'Mission & Vision sections' },
    { name: 'seo', title: 'Search & sharing (optional)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      description: onAbout('Our Path page', 'big page title at the top'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      description: onAbout('Our Path page', 'small red label above the title'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph (optional)',
      description: onAbout('Our Path page', 'optional short intro paragraph between the title and the first section'),
      type: 'localizedText',
      group: 'hero',
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      description: onAbout(
        'Our Path page',
        'stacked sections (e.g. Mission, Vision). Each section pairs a body paragraph block with one image.',
      ),
      type: 'array',
      group: 'sections',
      of: [
        {
          type: 'object',
          name: 'pathSection',
          title: 'Section',
          fields: [
            defineField({
              name: 'kicker',
              title: 'Section kicker',
              description: 'Short label above the body (e.g. "Mission", "Vision").',
              type: 'localizedString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body paragraphs',
              description: 'One or more paragraphs of body copy. Each item is one paragraph.',
              type: 'array',
              of: [{ type: 'localizedText' }],
              validation: (rule) => rule.min(1),
            }),
            defineField({
              name: 'image',
              title: 'Section image',
              description: 'Image shown next to (or below) the body copy.',
              type: 'sanityImage',
            }),
          ],
          preview: {
            select: { title: 'kicker.en', media: 'image.asset' },
          },
        },
      ],
      validation: (rule) => rule.min(1).error('At least one section is required.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO & social',
      description:
        'Where it appears: Google search results and social previews when someone shares /our-path — not visible on the page itself.',
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Our Path', subtitle: 'mayanleague.org/our-path' }
    },
  },
})
