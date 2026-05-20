import type { Metadata } from 'next'
import { ResourceCollectionContent } from '@/components/content/SitePageContent'

export const metadata: Metadata = {
  title: 'Indigenous Forced Migration | International Mayan League',
  description: 'Indigenous forced migration resources from the International Mayan League.',
}

export default function IndigenousForcedMigrationPage() {
  return <ResourceCollectionContent slug="indigenous-forced-migration" />
}
