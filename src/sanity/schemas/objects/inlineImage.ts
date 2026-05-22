import { defineField, defineType } from 'sanity'

import { onNews } from '../../lib/fieldDescriptions'
import { validateInlineImage } from '../../lib/validateInlineImage'

export const inlineImage = defineType({
  name: 'inlineImage',
  title: 'Image',
  type: 'object',
  description: onNews(
    'Article page',
    'optional hero photo — leave "Image source" blank if you do not have an image',
  ),
  fields: [
    defineField({
      name: 'source',
      title: 'Image source',
      description:
        'Leave blank to skip the image. Choose Unsplash for stock photos (with credit) or Direct upload for photos your organization owns.',
      type: 'string',
      options: {
        list: [
          { title: 'Unsplash (hotlinked)', value: 'unsplash' },
          { title: 'Direct upload (Mayan League photos)', value: 'upload' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'unsplash',
      title: 'Unsplash image',
      description: onNews('Article page', 'photo from Unsplash — paste the image URL and photographer credit'),
      type: 'unsplashImage',
      hidden: ({ parent }) => parent?.source !== 'unsplash',
    }),
    defineField({
      name: 'upload',
      title: 'Uploaded image',
      description: onNews(
        'Article page',
        'photo uploaded from your computer — wait for the preview to finish before publishing',
      ),
      type: 'sanityImage',
      hidden: ({ parent }) => parent?.source !== 'upload',
    }),
  ],
  validation: (rule) => rule.custom((value) => validateInlineImage(value)),
  preview: {
    select: {
      source: 'source',
      unsplashAlt: 'unsplash.alt.en',
      unsplashUrl: 'unsplash.url',
      uploadAlt: 'upload.alt.en',
      uploadAsset: 'upload.asset',
    },
    prepare({ source, unsplashAlt, unsplashUrl, uploadAlt, uploadAsset }) {
      if (source === 'upload') {
        return {
          title: uploadAlt || 'Uploaded image',
          subtitle: 'Uploaded',
          media: uploadAsset,
        }
      }
      if (source === 'unsplash') {
        return {
          title: unsplashAlt || 'Unsplash image',
          subtitle: 'Unsplash (hotlinked)',
          imageUrl: unsplashUrl,
        }
      }
      return { title: 'No image selected' }
    },
  },
})
