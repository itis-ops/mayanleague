import { projectId } from '@/sanity/env'
import {
  mapAboutPage,
  mapBoardOfDirectorsPage,
  mapCoreValuesPage,
  mapJobOpportunitiesPage,
  mapOurPathPage,
  mapTeamMembers,
  type AboutCollectionContent,
  type AboutPageContent,
  type TeamMembersContent,
} from '@/sanity/lib/mapAboutPages'
import { sanityFetch } from '@/sanity/lib/live'
import {
  aboutPageQuery,
  boardOfDirectorsPageQuery,
  coreValuesPageQuery,
  jobOpportunitiesPageQuery,
  ourPathPageQuery,
  teamMembersQuery,
} from '@/sanity/queries/aboutPages'

const isSanityConfigured = projectId !== 'placeholder-project-id'

/**
 * About-family repositories follow the same Sanity-first / static-fallback
 * pattern as the homepage and news repositories. Each returns `null` when
 * Sanity is not configured or the document hasn't been published yet — the
 * client components then fall back to the static i18n data in src/lib.
 */

export async function getAboutPageContent(): Promise<AboutPageContent | null> {
  if (!isSanityConfigured) return null
  try {
    const { data } = await sanityFetch({ query: aboutPageQuery })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mapAboutPage(data as Record<string, any> | null)
  } catch (error) {
    console.error('[aboutPagesRepository] Failed to fetch about page:', error)
    return null
  }
}

export async function getTeamMembersContent(): Promise<TeamMembersContent | null> {
  if (!isSanityConfigured) return null
  try {
    const { data } = await sanityFetch({ query: teamMembersQuery })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mapTeamMembers(data as Record<string, any>[] | null)
  } catch (error) {
    console.error('[aboutPagesRepository] Failed to fetch team members:', error)
    return null
  }
}

export async function getBoardOfDirectorsContent(): Promise<AboutCollectionContent | null> {
  if (!isSanityConfigured) return null
  try {
    const { data } = await sanityFetch({ query: boardOfDirectorsPageQuery })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mapBoardOfDirectorsPage(data as Record<string, any> | null)
  } catch (error) {
    console.error('[aboutPagesRepository] Failed to fetch board of directors:', error)
    return null
  }
}

export async function getOurPathContent(): Promise<AboutCollectionContent | null> {
  if (!isSanityConfigured) return null
  try {
    const { data } = await sanityFetch({ query: ourPathPageQuery })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mapOurPathPage(data as Record<string, any> | null)
  } catch (error) {
    console.error('[aboutPagesRepository] Failed to fetch our path:', error)
    return null
  }
}

export async function getCoreValuesContent(): Promise<AboutCollectionContent | null> {
  if (!isSanityConfigured) return null
  try {
    const { data } = await sanityFetch({ query: coreValuesPageQuery })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mapCoreValuesPage(data as Record<string, any> | null)
  } catch (error) {
    console.error('[aboutPagesRepository] Failed to fetch core values:', error)
    return null
  }
}

export async function getJobOpportunitiesContent(): Promise<AboutCollectionContent | null> {
  if (!isSanityConfigured) return null
  try {
    const { data } = await sanityFetch({ query: jobOpportunitiesPageQuery })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mapJobOpportunitiesPage(data as Record<string, any> | null)
  } catch (error) {
    console.error('[aboutPagesRepository] Failed to fetch job opportunities:', error)
    return null
  }
}
