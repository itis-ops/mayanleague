import { defineField, defineType } from 'sanity'

import { BILINGUAL_EN, BILINGUAL_ES } from '../../lib/fieldDescriptions'

/**
 * Optional SEO & social overrides. Used on Homepage and News articles.
 */
export const seoFields = defineType({
  name: 'seoFields',
  title: 'Search & sharing',
  type: 'object',
  description:
    'Optional. Controls how this page looks in Google search results and when someone shares a link on Facebook, X (Twitter), or messaging apps. If left blank, the site uses the main title and summary from the page.',
  fields: [
    defineField({
      name: 'socialTitle',
      title: 'Social / search title override',
      description:
        'Where it appears: The link title in search results and social media previews (not the big headline on the page itself). Keep under 60 characters so nothing gets cut off.',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          description: BILINGUAL_EN,
          validation: (rule) =>
            rule.max(60).warning('Titles over 60 characters may be clipped in search and social feeds.'),
        }),
        defineField({
          name: 'es',
          title: 'Español',
          type: 'string',
          description: BILINGUAL_ES,
          validation: (rule) =>
            rule.max(60).warning('Los títulos de más de 60 caracteres pueden recortarse.'),
        }),
      ],
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social / search description override',
      description:
        'Where it appears: The short paragraph under the title in search results and social previews. Keep under 160 characters.',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 2,
          description: BILINGUAL_EN,
          validation: (rule) =>
            rule.max(160).warning('Descriptions over 160 characters may be clipped.'),
        }),
        defineField({
          name: 'es',
          title: 'Español',
          type: 'text',
          rows: 2,
          description: BILINGUAL_ES,
          validation: (rule) =>
            rule.max(160).warning('Las descripciones de más de 160 caracteres pueden recortarse.'),
        }),
      ],
    }),
    defineField({
      name: 'hashtags',
      title: 'Hashtags for sharing',
      description:
        'Where it appears: Suggested hashtags when staff use the "Share this dispatch" tools on a news article. Type words without the # symbol (e.g. MayanRights).',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
})
