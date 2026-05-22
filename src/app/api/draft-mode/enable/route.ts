import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { sanityClient } from '@/sanity/client'

/**
 * Draft Mode enable route.
 * The Sanity Presentation Tool calls GET /api/draft-mode/enable with a signed
 * preview secret. If valid, Next.js Draft Mode is activated in the iframe
 * session and the browser is redirected to the preview URL.
 */
export const { GET } = defineEnableDraftMode({
  client: sanityClient.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
  }),
})
