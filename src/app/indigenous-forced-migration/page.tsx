import type { Metadata } from 'next'
import ResourceCollectionPage from '@/components/content/ResourceCollectionPage'

export const metadata: Metadata = {
  title: 'Indigenous Forced Migration | International Mayan League',
  description: 'Indigenous forced migration resources from the International Mayan League.',
}

export default function IndigenousForcedMigrationPage() {
  return <ResourceCollectionPage slug="indigenous-forced-migration" />
}
