/**
 * Sanity Studio configuration — Mayan League CMS.
 *
 * Mounted at `/studio` inside the Next.js app (see
 * `src/app/studio/[[...tool]]/page.tsx`). Schemas, structure, and env values
 * are kept in `src/sanity/` so they can be reused by server-side queries
 * post-launch without dragging the Studio runtime into the public bundle.
 */
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { resolve } from './src/sanity/presentation/resolve'
import { schemaTypes } from './src/sanity/schemas'
import { structure } from './src/sanity/structure'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'mayanleague',
  title: 'Mayan League',
  basePath: '/studio',
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: siteUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Hide the "duplicate" action on singletons so editors don't accidentally
    // create a second homepage / siteSettings document.
    actions: (prev, { schemaType }) => {
      const SINGLETONS = ['homepage', 'siteSettings']
      if (!SINGLETONS.includes(schemaType)) return prev
      return prev.filter(
        ({ action }) =>
          action !== 'duplicate' && action !== 'delete' && action !== 'unpublish',
      )
    },
    // Don't show singletons in "create new" templates either.
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (template) =>
            template.templateId !== 'homepage' &&
            template.templateId !== 'siteSettings',
        )
      }
      return prev
    },
  },
})
