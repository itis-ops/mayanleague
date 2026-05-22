import { defineField, defineType } from 'sanity'

/**
 * CTA link with localized label and validated URL. Used by the homepage,
 * call-to-action sections, and anywhere editors need to override a button.
 */
export const ctaLink = defineType({
  name: 'ctaLink',
  title: 'CTA link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL / path',
      description: 'Absolute (https://...) or in-site path (/contact)',
      type: 'string',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (typeof value !== 'string') return 'Required'
          if (value.startsWith('/')) return true
          if (value.startsWith('mailto:')) return true
          if (value.startsWith('tel:')) return true
          try {
            const url = new URL(value)
            if (url.protocol === 'https:' || url.protocol === 'http:') {
              return true
            }
            return 'URL must use http(s), mailto, tel, or start with "/".'
          } catch {
            return 'Enter a valid URL or in-site path (starting with /).'
          }
        }),
    }),
    defineField({
      name: 'external',
      title: 'Opens in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'label.en', subtitle: 'href' },
  },
})
