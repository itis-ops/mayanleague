import { sanityFetch } from '@/sanity/lib/live'
import { mapSiteSettings, type SiteSettingsContent } from '@/sanity/lib/mapSiteSettings'
import { projectId } from '@/sanity/env'
import { siteSettingsQuery } from '@/sanity/queries/siteSettings'

const isSanityConfigured = projectId !== 'placeholder-project-id'

/**
 * Fetches the `siteSettings` singleton (nav labels, footer, contact, social, donate URL).
 * Returns `null` if Sanity is unavailable or the document has no contact email yet.
 */
export async function getSiteSettings(): Promise<SiteSettingsContent | null> {
  if (!isSanityConfigured) return null

  try {
    const { data } = await sanityFetch({ query: siteSettingsQuery })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mapSiteSettings(data as Record<string, any> | null)
  } catch (error) {
    console.error('[siteSettingsRepository] Failed to fetch site settings:', error)
    return null
  }
}
