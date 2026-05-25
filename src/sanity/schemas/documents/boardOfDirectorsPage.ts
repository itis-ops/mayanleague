import { defineField, defineType } from 'sanity'

import { BOARD_OF_DIRECTORS_DOC, onAbout } from '../../lib/fieldDescriptions'

export const boardOfDirectorsPage = defineType({
  name: 'boardOfDirectorsPage',
  title: 'Board of Directors page',
  type: 'document',
  description: BOARD_OF_DIRECTORS_DOC,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'members', title: 'Board members' },
    { name: 'seo', title: 'Search & sharing (optional)' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      description: onAbout('Board of Directors page', 'big page title at the top'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow label',
      description: onAbout('Board of Directors page', 'small red label above the title (usually "About")'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introLabel',
      title: 'Intro label',
      description: onAbout('Board of Directors page', 'red kicker above the intro paragraph (e.g. "Who we are")'),
      type: 'localizedString',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      description: onAbout('Board of Directors page', 'paragraph that introduces the board'),
      type: 'localizedText',
      group: 'hero',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description: onAbout('Board of Directors page', 'large image at the top of the page'),
      type: 'sanityImage',
      group: 'hero',
    }),
    defineField({
      name: 'membersSectionLabel',
      title: 'Members section label',
      description: onAbout('Board of Directors page', 'kicker label above the list of board members'),
      type: 'localizedString',
      group: 'members',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'members',
      title: 'Board members',
      description: onAbout('Board of Directors page', 'ordered list of board members shown one per row'),
      type: 'array',
      group: 'members',
      of: [
        {
          type: 'object',
          name: 'boardMember',
          title: 'Board member',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              description: 'First name only (e.g. "Felipe").',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'boardRole',
              title: 'Board role',
              description: 'Role on the board (e.g. "President", "Vice President", "Treasurer", "Director").',
              type: 'localizedString',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'heritage',
              title: 'Heritage / lineage',
              description:
                'Maya lineage line shown after the role (e.g. "Maya Mam", "Maya K\u2019iche\u2019"). Same string in English and Spanish.',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'bio',
              title: 'Bio paragraphs',
              description: 'One or more paragraphs of biography. Each item is one paragraph.',
              type: 'array',
              of: [{ type: 'localizedText' }],
              validation: (rule) => rule.min(1),
            }),
          ],
          preview: {
            select: { title: 'name', role: 'boardRole.en', heritage: 'heritage' },
            prepare({ title, role, heritage }) {
              const parts = [role, heritage].filter(Boolean).join(' \u00b7 ')
              return { title: title ?? 'Untitled', subtitle: parts || undefined }
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).error('At least one board member is required.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO & social',
      description:
        'Where it appears: Google search results and social previews when someone shares /board-of-directors — not visible on the page itself.',
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Board of Directors', subtitle: 'mayanleague.org/board-of-directors' }
    },
  },
})
