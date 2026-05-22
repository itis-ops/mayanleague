import { defineField, defineType } from 'sanity'

import { BILINGUAL_EN, BILINGUAL_ES } from '../../lib/fieldDescriptions'

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
      description: BILINGUAL_EN,
      validation: (rule) => rule.required().error('English value is required.'),
    }),
    defineField({
      name: 'es',
      title: 'Español',
      type: 'text',
      rows: 3,
      description: BILINGUAL_ES,
      validation: (rule) =>
        rule.warning('Spanish translation recommended — add before publishing to the Spanish UI.'),
    }),
  ],
  preview: {
    select: { title: 'en', subtitle: 'es' },
  },
})
