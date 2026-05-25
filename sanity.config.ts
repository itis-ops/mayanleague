/**
 * Sanity Studio configuration — Mayan League CMS.
 *
 * Mounted at `/studio` inside the Next.js app (see
 * `src/app/studio/[[...tool]]/page.tsx`). Schemas, structure, and env values
 * are kept in `src/sanity/` so they can be reused by server-side queries
 * post-launch without dragging the Studio runtime into the public bundle.
 */
import { visionTool } from '@sanity/vision'
import { defineConfig, isDev } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { resolve } from './src/sanity/presentation/resolve'
import { schemaTypes } from './src/sanity/schemas'
import {
  resolveDocumentActions,
  resolveNewDocumentOptions,
} from './src/sanity/studio/editorDocumentActions'
import { EditorToolMenu } from './src/sanity/studio/EditorToolMenu'
import { mayanLeagueStudioTheme } from './src/sanity/studio/studioTheme'
import { structure } from './src/sanity/structure'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default defineConfig({
  name: 'mayanleague',
  title: 'Mayan League',
  basePath: '/studio',
  projectId,
  dataset,
  theme: mayanLeagueStudioTheme,
  schema: { types: schemaTypes },
  releases: {
    enabled: false,
  },
  scheduledPublishing: {
    enabled: false,
  },
  plugins: [
    structureTool({
      structure,
      title: 'Edit content',
    }),
    presentationTool({
      title: 'Live preview',
      resolve,
      previewUrl: {
        origin: siteUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    // Vision is a GROQ query IDE for developers — never show to content editors.
    ...(isDev ? [visionTool({ defaultApiVersion: apiVersion })] : []),
  ],
  tools: (prev) => {
    const allowed = new Set(['structure', 'presentation', ...(isDev ? ['vision'] : [])])
    return prev.filter((tool) => allowed.has(tool.name))
  },
  studio: {
    components: {
      toolMenu: EditorToolMenu,
    },
  },
  document: {
    actions: resolveDocumentActions,
    newDocumentOptions: resolveNewDocumentOptions,
  },
})
