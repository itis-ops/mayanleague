import { defineArrayMember, defineField, defineType } from 'sanity'

import { BILINGUAL_EN, BILINGUAL_ES } from '../../lib/fieldDescriptions'

const portableText = (locale: 'en' | 'es') =>
  defineField({
    name: locale,
    title: locale === 'en' ? 'English' : 'Español',
    description: locale === 'en' ? BILINGUAL_EN : BILINGUAL_ES,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Heading 2', value: 'h2' },
          { title: 'Heading 3', value: 'h3' },
          { title: 'Quote', value: 'blockquote' },
        ],
        lists: [
          { title: 'Bullet', value: 'bullet' },
          { title: 'Numbered', value: 'number' },
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
          ],
          annotations: [
            defineField({
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                defineField({
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  description: 'Web address the link opens.',
                  validation: (rule) =>
                    rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel'],
                    }),
                }),
                defineField({
                  name: 'external',
                  title: 'Opens in new tab',
                  type: 'boolean',
                  initialValue: true,
                }),
              ],
            }),
          ],
        },
      }),
    ],
  })

export const localizedBlockContent = defineType({
  name: 'localizedBlockContent',
  title: 'Localized rich text',
  type: 'object',
  description:
    'Full article body with headings, bold, links, and lists. Shown on the article page (mayanleague.org/news/…) for Internal articles only.',
  fields: [portableText('en'), portableText('es')],
})
