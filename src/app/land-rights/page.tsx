import type { Metadata } from 'next'
import ResourceCollectionPage from '@/components/content/ResourceCollectionPage'

export const metadata: Metadata = {
  title: 'Land Rights | International Mayan League',
  description: 'Land rights resources from the International Mayan League.',
}

export default function LandRightsPage() {
  return <ResourceCollectionPage slug="land-rights" />
}
