/**
 * Embedded Sanity Studio route.
 *
 * Catch-all under `/studio` so the Studio handles its own client-side routing
 * (e.g. `/studio/structure/newsArticle;abc123`). Marked as a client component
 * because the Studio runtime is browser-only.
 *
 * Built as a fully static shell — Next.js renders the host page once and the
 * Studio app hydrates and takes over.
 */
'use client'

import { NextStudio } from 'next-sanity/studio'

import config from '../../../../sanity.config'
import '@/sanity/studio.css'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}
