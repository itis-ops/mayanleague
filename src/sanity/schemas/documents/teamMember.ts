import { defineField, defineType } from 'sanity'

import { onAbout, TEAM_MEMBER_DOC } from '../../lib/fieldDescriptions'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  description: TEAM_MEMBER_DOC,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: onAbout('Team page', 'first name shown above the role'),
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / title',
      description: onAbout('Team page', 'job title shown under the name (e.g. "Executive Director")'),
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Portrait',
      description: onAbout('Team page', 'photo shown as a round portrait; if empty, the page shows initials instead'),
      type: 'sanityImage',
    }),
    defineField({
      name: 'bio',
      title: 'Bio paragraphs',
      description: onAbout(
        'Team page',
        'one or more paragraphs of biography. Each item is one paragraph.',
      ) +
        ' Spanish translations are recommended — current English bios will fall back when Spanish is blank, but visitors using the ES toggle will see English copy.',
      type: 'array',
      of: [{ type: 'localizedText' }],
      validation: (rule) => rule.min(1).error('At least one bio paragraph is required.'),
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      description:
        'Lower numbers appear first on the Team page. Use 10 / 20 / 30 so it is easy to insert new members in between later (e.g. give a new person 25 to sit between 20 and 30).',
      type: 'number',
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Sort order (manual)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role.en', media: 'image.asset' },
    prepare({ title, subtitle, media }) {
      return { title: title ?? 'Untitled team member', subtitle, media }
    },
  },
})
