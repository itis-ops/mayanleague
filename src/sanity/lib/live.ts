import { defineLive } from 'next-sanity/live'

import { sanityClient } from '@/sanity/client'

/**
 * `sanityFetch` — server-side data fetching with automatic draft/published
 * perspective switching based on Next.js Draft Mode cookies.
 *
 * `SanityLive` — React component that subscribes to Sanity content mutations
 * and re-renders the page in real time when an editor changes a field in Studio.
 *
 * Both tokens use the same SANITY_API_READ_TOKEN (Viewer role):
 *   - serverToken: server-side draft fetches (never sent to browser)
 *   - browserToken: browser live subscription during draft mode
 */
export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
})
