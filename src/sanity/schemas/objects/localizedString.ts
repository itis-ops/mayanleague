import { defineField, defineType } from 'sanity'

import { BILINGUAL_EN, BILINGUAL_ES } from '../../lib/fieldDescriptions'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      description: BILINGUAL_EN,
      validation: (rule) => rule.required().error('English value is required.'),
    }),
    defineField({
      name: 'es',
      title: 'Español',
      type: 'string',
      description: BILINGUAL_ES,
      validation: (rule) =>
        rule.warning('Spanish translation recommended — add before publishing to the Spanish UI.'),
    }),
  ],
  preview: {
    select: { title: 'en', subtitle: 'es' },
  },
})
