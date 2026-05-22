import { sanityFetch } from '@/sanity/lib/live'
import { mapHomepage, type HomepageContent } from '@/sanity/lib/mapHomepage'
import { projectId } from '@/sanity/env'
import { homepageQuery } from '@/sanity/queries/homepage'

const isSanityConfigured = projectId !== 'placeholder-project-id'

/**
 * Fetches the `homepage` singleton from Sanity and maps it into per-locale
 * content slices for all 7 homepage sections.
 *
 * Returns `null` if Sanity is not configured or the document doesn't exist yet —
 * section components fall back to static `i18n.ts` data in that case.
 */
export async function getHomepageContent(): Promise<HomepageContent | null> {
  if (!isSanityConfigured) return null

  try {
    const { data } = await sanityFetch({ query: homepageQuery })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped = mapHomepage(data as Record<string, any> | null)
    // If the Sanity homepage document exists but the hero tagline hasn't been
    // filled in yet, treat it as unpublished and fall back to static i18n data.
    if (!mapped?.hero?.en?.tagline) return null
    return mapped
  } catch (error) {
    console.error('[homepageRepository] Failed to fetch homepage content:', error)
    return null
  }
}
