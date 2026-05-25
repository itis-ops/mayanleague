import { defineField, defineType } from 'sanity'

import { NEWS_ARTICLE_DOC, onNews } from '../../lib/fieldDescriptions'
import { requireEnglish } from '../../lib/validateLocalized'

const NEWS_CATEGORIES: { title: string; value: string }[] = [
  { title: 'Justice', value: 'Justice' },
  { title: 'Land & Water', value: 'Land & Water' },
  { title: 'Human Rights', value: 'Human Rights' },
  { title: 'Immigration', value: 'Immigration' },
  { title: 'Culture & Identity', value: 'Culture & Identity' },
  { title: 'Indigenous Languages', value: 'Indigenous Languages' },
  { title: 'Community Action', value: 'Community Action' },
]

const ARTICLE_TYPE: { title: string; value: string }[] = [
  {
    title: 'External — links out to the original source',
    value: 'external',
  },
  {
    title: 'Internal — written by the Mayan League and published here',
    value: 'internal',
  },
]

const hideUnlessExternal = (document: { type?: string } | undefined) =>
  document?.type !== 'external'
const hideUnlessInternal = (document: { type?: string } | undefined) =>
  document?.type !== 'internal'

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News article',
  type: 'document',
  description: NEWS_ARTICLE_DOC,
  groups: [
    { name: 'content', title: 'Story', default: true },
    { name: 'source', title: 'Source credit' },
    { name: 'media', title: 'Photo' },
    { name: 'publishing', title: 'Publish date' },
    { name: 'seo', title: 'Search & sharing (optional)' },
  ],
  fieldsets: [
    {
      name: 'publishRequired',
      title: 'Required to publish',
      description:
        'Fill every field in this box first. The Publish button stays gray until these are valid.',
      options: { collapsible: false },
    },
    {
      name: 'publishRecommended',
      title: 'Recommended (not required)',
      description: 'Helpful for readers but optional — you can add these after publishing.',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // ── Article type (drives field visibility) ────────────────────────────
    defineField({
      name: 'type',
      title: 'Article type',
      description:
        'Pick this first — it changes which fields below are required.\n' +
        '• External: a story published elsewhere (e.g. Medill News, Remezcla). The site shows your title, summary, and a button that links to the original source. The full article body lives on the publisher\'s site.\n' +
        '• Internal: a story written by the International Mayan League and hosted here. The full body text is required and renders on the article page.',
      type: 'string',
      group: 'content',
      fieldset: 'publishRequired',
      options: { list: ARTICLE_TYPE, layout: 'radio' },
      initialValue: 'external',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'title',
      title: 'Title',
      description: onNews(
        'Newsroom list + Article page',
        'main headline (large text at the top of the article; also the title in the news list). For External articles, copy the title from the original source word-for-word — don\'t paraphrase. For Internal articles, write the title in the Mayan League voice.',
      ),
      type: 'localizedString',
      group: 'content',
      fieldset: 'publishRequired',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (web address)',
      description: onNews(
        'Article page URL',
        'the end of the link after /news/ — e.g. byron-testing-articles becomes mayanleague.org/news/byron-testing-articles. Click Generate after filling the English title.',
      ),
      type: 'slug',
      group: 'content',
      fieldset: 'publishRequired',
      options: {
        source: 'title.en',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 96),
      },
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Slug is required — click Generate.'
          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return 'Slug may only use lowercase letters, numbers, and hyphens.'
          }
          return true
        }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      description: onNews(
        'Newsroom list + Article page',
        'red topic label (e.g. Justice, Immigration) — also used to group articles in the Newsroom sidebar',
      ),
      type: 'string',
      group: 'content',
      fieldset: 'publishRequired',
      options: { list: NEWS_CATEGORIES, layout: 'dropdown' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dek',
      title: 'Dek (subtitle)',
      description: onNews(
        'Article page',
        'one-sentence line directly under the main headline (not shown on the small homepage cards). This is your secondary headline — make it pull readers in.',
      ),
      type: 'localizedText',
      group: 'content',
      fieldset: 'publishRequired',
      validation: (rule) =>
        rule.custom((value) =>
          requireEnglish(value as { en?: string; es?: string } | undefined, 'Dek'),
        ),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (teaser)',
      description: onNews(
        'Newsroom list + Homepage news cards',
        'short preview text on listing cards — keep to 1–2 sentences',
      ),
      type: 'localizedText',
      group: 'content',
      fieldset: 'publishRequired',
      validation: (rule) =>
        rule.custom((value) =>
          requireEnglish(value as { en?: string; es?: string } | undefined, 'Excerpt'),
        ),
    }),

    // ── Internal-only: full article body ──────────────────────────────────
    defineField({
      name: 'body',
      title: 'Body (full article text)',
      description: onNews(
        'Article page',
        'full story text — Internal articles only. Required for Internal type. External articles leave this blank and link out instead.',
      ),
      type: 'localizedBlockContent',
      group: 'content',
      fieldset: 'publishRequired',
      hidden: ({ document }) => hideUnlessInternal(document as { type?: string } | undefined),
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as { type?: string } | undefined
          if (doc?.type !== 'internal') return true
          const blocks = (value as { en?: unknown[] } | undefined)?.en ?? []
          if (!Array.isArray(blocks) || blocks.length === 0) {
            return 'Body (English) is required for Internal articles.'
          }
          return true
        }),
    }),

    // ── External-only context fields ──────────────────────────────────────
    defineField({
      name: 'whyItMatters',
      title: 'Why it matters',
      description: onNews(
        'Article page',
        'mission context box explaining why this story matters to the Mayan League. Shown on External articles only — Internal articles use the body instead.',
      ),
      type: 'localizedText',
      group: 'content',
      fieldset: 'publishRecommended',
      hidden: ({ document }) => hideUnlessExternal(document as { type?: string } | undefined),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      description: onNews(
        'Article page (External only)',
        'longer overview paragraph used on External article pages (optional at publish time)',
      ),
      type: 'localizedText',
      group: 'content',
      fieldset: 'publishRecommended',
      hidden: ({ document }) => hideUnlessExternal(document as { type?: string } | undefined),
    }),

    defineField({
      name: 'keywords',
      title: 'Keywords',
      description: onNews(
        'Article page footer + Related articles',
        'topic tags (e.g. language access, Standing Rock) — used to suggest related stories at the bottom and shown in the article file footer.',
      ),
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'content',
      fieldset: 'publishRecommended',
    }),

    // ── Source credit ─────────────────────────────────────────────────────
    defineField({
      name: 'author',
      title: 'Author',
      description: onNews(
        'Article page',
        'byline name shown on the article page. For Internal articles this is the Mayan League staff or board member who wrote the story. For External articles, this is the original article\'s reporter.',
      ),
      type: 'string',
      group: 'source',
    }),
    defineField({
      name: 'sourceName',
      title: 'Publication / outlet name',
      description: onNews(
        'Newsroom list + Article page',
        'For External: the outlet that published the original story (e.g. Medill News Service, Remezcla). For Internal: leave blank — the site will display "International Mayan League" automatically.',
      ),
      type: 'string',
      group: 'source',
      validation: (rule) =>
        rule.custom((value, context) => {
          const doc = context.document as { type?: string } | undefined
          if (doc?.type === 'external' && !value) {
            return 'Source name is required for External articles.'
          }
          return true
        }),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Original article URL',
      description: onNews(
        'Article page',
        'link for the "Read at <source>" button (External articles only — must start with https://). Required for External; hidden for Internal.',
      ),
      type: 'url',
      group: 'source',
      hidden: ({ document }) => hideUnlessExternal(document as { type?: string } | undefined),
      validation: (rule) =>
        rule
          .uri({ scheme: ['https', 'http'] })
          .error('URL must start with https:// or http://')
          .custom((value, context) => {
            const doc = context.document as { type?: string } | undefined
            if (doc?.type === 'external' && !value) {
              return 'Original article URL is required for External articles.'
            }
            return true
          }),
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      description: onNews(
        'Article page',
        'large photo below the headline. Optional — leave Image source blank to publish without a photo. To show on homepage cards, pin the article under Homepage → News rail.',
      ),
      type: 'inlineImage',
      group: 'media',
    }),

    defineField({
      name: 'featured',
      title: 'Feature on homepage (fallback)',
      description:
        'Legacy fallback only. To show a story on the homepage, use Homepage → News on homepage → Featured articles.',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
      hidden: () => true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish date',
      description: onNews(
        'Newsroom list + Article page',
        'date shown next to the outlet name (e.g. MAY 21, 2026) and used to sort newest-first',
      ),
      type: 'datetime',
      group: 'publishing',
      options: { dateFormat: 'MMMM D, YYYY', timeFormat: 'HH:mm' },
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'seo',
      title: 'SEO & social',
      description: onNews(
        'Search + social sharing',
        'optional overrides for Google, Facebook, and X previews — defaults to the title and dek if left blank',
      ),
      type: 'seoFields',
      group: 'seo',
    }),
  ],

  preview: {
    select: {
      titleEn: 'title.en',
      titleEs: 'title.es',
      category: 'category',
      type: 'type',
      unsplashUrl: 'mainImage.unsplash.url',
      uploadAsset: 'mainImage.upload.asset',
    },
    prepare({ titleEn, titleEs, category, type, unsplashUrl, uploadAsset }) {
      const hasEs = Boolean(titleEs)
      const typeLabel = type === 'internal' ? 'Internal' : 'External'
      return {
        title: titleEn || titleEs || 'Untitled article',
        subtitle: [typeLabel, category, hasEs ? 'EN+ES' : 'EN only']
          .filter(Boolean)
          .join(' · '),
        media: uploadAsset ?? undefined,
        imageUrl: uploadAsset ? undefined : unsplashUrl,
      }
    },
  },

  orderings: [
    {
      title: 'Published (newest first)',
      name: 'publishedDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Title (EN, A→Z)',
      name: 'titleEnAsc',
      by: [{ field: 'title.en', direction: 'asc' }],
    },
  ],
})
