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
  { title: 'External — links out to the original source', value: 'external' },
  { title: 'Internal — full body hosted on this site', value: 'internal' },
]

export const newsArticle = defineType({
  name: 'newsArticle',
  title: 'News article',
  type: 'document',
  description: NEWS_ARTICLE_DOC,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'source', title: 'Source & attribution' },
    { name: 'media', title: 'Image' },
    { name: 'publishing', title: 'Publishing' },
    { name: 'seo', title: 'SEO & social' },
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
    defineField({
      name: 'title',
      title: 'Title',
      description: onNews(
        'Newsroom list + Article page',
        'main headline (large text at the top of the article; also the title in the news list)',
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
        'one-sentence line directly under the main headline (not shown on the small homepage cards)',
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
    defineField({
      name: 'type',
      title: 'Article type',
      description: onNews(
        'Article page',
        'External = visitors click through to the original news site. Internal = full story text is written here in the Body field.',
      ),
      type: 'string',
      group: 'content',
      fieldset: 'publishRequired',
      options: { list: ARTICLE_TYPE, layout: 'radio' },
      initialValue: 'external',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      description: onNews(
        'Article page',
        'longer overview paragraph in the main article body (optional at publish time)',
      ),
      type: 'localizedText',
      group: 'content',
      fieldset: 'publishRecommended',
    }),
    defineField({
      name: 'whyItMatters',
      title: 'Why it matters',
      description: onNews(
        'Article page',
        'mission context box explaining why this story matters to the Mayan League (optional at publish time)',
      ),
      type: 'localizedText',
      group: 'content',
      fieldset: 'publishRecommended',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      description: onNews(
        'Article page sidebar + Related articles',
        'topic tags (e.g. language access, Standing Rock) — used to suggest related stories at the bottom',
      ),
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'content',
      fieldset: 'publishRecommended',
    }),
    defineField({
      name: 'body',
      title: 'Body (full article text)',
      description: onNews(
        'Article page',
        'full story text — only for Internal articles. External articles leave this blank and link out instead.',
      ),
      type: 'localizedBlockContent',
      group: 'content',
      fieldset: 'publishRecommended',
      hidden: ({ document }) => document?.type !== 'internal',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      description: onNews('Article page', 'byline name in the article sidebar (e.g. a staff or board member)'),
      type: 'string',
      group: 'source',
    }),
    defineField({
      name: 'sourceName',
      title: 'Publication / outlet name',
      description: onNews(
        'Newsroom list + Article page',
        'outlet shown next to the date (e.g. Medill News Service, Remezcla)',
      ),
      type: 'string',
      group: 'source',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Original article URL',
      description: onNews(
        'Article page',
        'link for the "Read original source" button (External articles only — must start with https://)',
      ),
      type: 'url',
      group: 'source',
      validation: (rule) =>
        rule.uri({ scheme: ['https', 'http'] }).error('URL must start with https:// or http://'),
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
        'Only used when Homepage → News rail has no pinned articles. To feature on the homepage today, open Homepage → News rail → Featured articles and add this story (max 4).',
      type: 'boolean',
      group: 'publishing',
      initialValue: false,
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
      unsplashUrl: 'mainImage.unsplash.url',
      uploadAsset: 'mainImage.upload.asset',
    },
    prepare({ titleEn, titleEs, category, unsplashUrl, uploadAsset }) {
      const hasEs = Boolean(titleEs)
      return {
        title: titleEn || titleEs || 'Untitled article',
        subtitle: [category, hasEs ? 'EN+ES' : 'EN only'].filter(Boolean).join(' · '),
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
