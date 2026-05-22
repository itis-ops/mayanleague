import { defineField, defineType } from 'sanity'

import { onNews } from '../../lib/fieldDescriptions'

export const sanityImage = defineType({
  name: 'sanityImage',
  title: 'Uploaded image',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image file',
      description: onNews(
        'Article page',
        'upload a JPG or PNG from your computer — wait until the thumbnail preview appears',
      ),
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      description: onNews(
        'Article page',
        'describe what is in the photo for visitors using screen readers (English required once the file is uploaded)',
      ),
      type: 'localizedString',
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      description: onNews('Article page', 'optional caption text below the photo'),
      type: 'localizedText',
    }),
    defineField({
      name: 'credit',
      title: 'Credit / photographer (optional)',
      description: onNews('Article page', 'optional credit line (e.g. photographer or organization name)'),
      type: 'string',
    }),
  ],
  preview: {
    select: {
      media: 'asset',
      title: 'alt.en',
      subtitle: 'credit',
    },
  },
})
