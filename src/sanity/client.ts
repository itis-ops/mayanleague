import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from './env'

/**
 * Public Sanity client used by `sanityFetch` via `defineLive`.
 * `stega.studioUrl` enables click-to-edit overlays in the Presentation Tool —
 * the overlay component reads stega-encoded source maps and links back to `/studio`.
 */
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: 'published',
  stega: {
    studioUrl: '/studio',
  },
})
