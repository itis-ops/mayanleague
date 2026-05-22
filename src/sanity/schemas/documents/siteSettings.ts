import { defineField, defineType } from 'sanity'

/**
 * Site Settings singleton — covers the globals currently defined in
 * `src/lib/i18n.ts` (`brand`, `nav`, `footer`) and `src/lib/contact.ts`
 * (`CONTACT_EMAIL`), plus social handles, donate URL, and default OG
 * metadata. Singleton enforcement happens in `src/sanity/structure.ts`.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'nav', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social' },
    { name: 'defaults', title: 'Defaults (OG, share)' },
  ],
  fields: [
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'object',
      group: 'brand',
      fields: [
        defineField({
          name: 'short',
          title: 'Short name',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'full',
          title: 'Full name',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'nav',
      title: 'Top navigation labels',
      type: 'object',
      group: 'nav',
      fields: [
        defineField({
          name: 'about',
          title: 'About',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'programs',
          title: 'Programs',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'resources',
          title: 'Resources',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'media',
          title: 'News',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'contact',
          title: 'Contact',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'donate',
          title: 'Donate',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({
          name: 'tagline',
          title: 'Tagline',
          type: 'localizedText',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'quickLinks',
          title: 'Quick Links label',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'contact',
          title: 'Contact column label',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'whoWeAre',
          title: 'Who we are label',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'whatWeDo',
          title: 'What we do label',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'getInvolved',
          title: 'Get involved label',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'whoLinks',
          title: 'Who-we-are link labels',
          type: 'array',
          of: [{ type: 'localizedString' }],
          validation: (rule) => rule.min(1),
        }),
        defineField({
          name: 'involvedLinks',
          title: 'Get-involved link labels',
          type: 'array',
          of: [{ type: 'localizedString' }],
          validation: (rule) => rule.min(1),
        }),
        defineField({
          name: 'socialLabel',
          title: 'Social block label',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'copyright',
          title: 'Copyright line',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: (rule) =>
            rule
              .required()
              .email()
              .error('Enter a valid email address (RFC 5322).'),
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
        }),
        defineField({
          name: 'addressLines',
          title: 'Address lines',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social handles',
      type: 'object',
      group: 'social',
      fields: [
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({ scheme: ['https'] }),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({ scheme: ['https'] }),
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({ scheme: ['https'] }),
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter / X URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({ scheme: ['https'] }),
        }),
      ],
    }),
    defineField({
      name: 'donateUrl',
      title: 'Donate URL',
      description:
        'Single source of truth for the donate CTA across the site.',
      type: 'url',
      group: 'defaults',
      validation: (rule) =>
        rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph image',
      type: 'inlineImage',
      group: 'defaults',
    }),
    defineField({
      name: 'defaultSocialTitle',
      title: 'Default social title',
      type: 'localizedString',
      group: 'defaults',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'defaultSocialDescription',
      title: 'Default social description',
      type: 'localizedText',
      group: 'defaults',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site settings' }
    },
  },
})
