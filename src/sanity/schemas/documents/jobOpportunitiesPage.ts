import { defineField, defineType } from 'sanity'

import { JOB_OPPORTUNITIES_DOC, onAbout } from '../../lib/fieldDescriptions'

export const jobOpportunitiesPage = defineType({
  name: 'jobOpportunitiesPage',
  title: 'Job Opportunities page',
  type: 'document',
  description: JOB_OPPORTUNITIES_DOC,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'listings', title: 'Job listings' },
    { name: 'seo', title: 'Search & sharing (optional)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      description: onAbout('Job Opportunities page', 'big page title at the top (e.g. "Current position(s)")'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      description: onAbout('Job Opportunities page', 'small red label above the title'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      description: onAbout('Job Opportunities page', 'paragraph below the title that explains how to apply'),
      type: 'localizedText',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'listings',
      title: 'Open positions',
      description: onAbout(
        'Job Opportunities page',
        'open positions. Each listing renders a card with kicker, title, body paragraphs, and an "Apply" button that emails info@mayanleague.org.',
      ),
      type: 'array',
      group: 'listings',
      of: [
        {
          type: 'object',
          name: 'jobListing',
          title: 'Job listing',
          fields: [
            defineField({
              name: 'kicker',
              title: 'Kicker',
              description: 'Small label above the job title (e.g. "Part-time \u00b7 Administrative").',
              type: 'localizedString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Job title',
              description: 'Full job title (e.g. "Part-time Administrative Coordinator"). This appears in the mailto subject line when a visitor clicks Apply.',
              type: 'localizedString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Description paragraphs',
              description: 'One or more paragraphs of the role description. Each item is one paragraph.',
              type: 'array',
              of: [{ type: 'localizedText' }],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: { title: 'title.en', subtitle: 'kicker.en' },
          },
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO & social',
      description:
        'Where it appears: Google search results and social previews when someone shares /job-opportunities — not visible on the page itself.',
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Job Opportunities', subtitle: 'mayanleague.org/job-opportunities' }
    },
  },
})
