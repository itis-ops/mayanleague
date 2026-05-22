import { defineField, defineType } from 'sanity'

import { onNews } from '../../lib/fieldDescriptions'

export const unsplashImage = defineType({
  name: 'unsplashImage',
  title: 'Unsplash image (hotlinked)',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Image URL',
      description: onNews(
        'Article page',
        'paste the full https://images.unsplash.com/… address (on Unsplash: right-click the image → Copy image address)',
      ),
      type: 'url',
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      description: onNews(
        'Article page',
        'short description of the image for screen readers and search engines (required in English)',
      ),
      type: 'localizedString',
    }),
    defineField({
      name: 'photographerName',
      title: 'Photographer name',
      description: onNews(
        'Article page',
        'credit line under the photo (required by Unsplash — e.g. "Maria Garcia")',
      ),
      type: 'string',
    }),
    defineField({
      name: 'photographerUrl',
      title: 'Photographer profile URL',
      description: onNews(
        'Article page',
        'link to the photographer on Unsplash (include utm_source=mayan_league when possible)',
      ),
      type: 'url',
    }),
    defineField({
      name: 'sourceName',
      title: 'Source name',
      description: 'Usually "Unsplash" — shown in photo credit.',
      type: 'string',
      initialValue: 'Unsplash',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Photo page URL',
      description: onNews('Article page', 'link to the photo page on unsplash.com (used in the credit link)'),
      type: 'url',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      description: onNews('Article page', 'optional caption below the photo'),
      type: 'localizedText',
    }),
    defineField({
      name: 'unsplashPhotoId',
      title: 'Photo ID (optional)',
      description: 'Internal reference only — not shown on the website.',
      type: 'string',
    }),
    defineField({
      name: 'unsplashDownloadLocation',
      title: 'Download tracking URL (optional)',
      description: 'For API compliance only — not shown on the website.',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      imageUrl: 'url',
      title: 'alt.en',
      subtitle: 'photographerName',
    },
    prepare({ imageUrl, title, subtitle }) {
      return {
        title: title || 'Untitled Unsplash image',
        subtitle: subtitle ? `Photo by ${subtitle}` : 'Unsplash',
        imageUrl,
      }
    },
  },
})
