import type { Metadata } from 'next'
import { ResourceCollectionContent } from '@/components/content/SitePageContent'

export const metadata: Metadata = {
  title: 'Land Rights | International Mayan League',
  description: 'Land rights resources from the International Mayan League.',
}

export default function LandRightsPage() {
  return <ResourceCollectionContent slug="land-rights" />
}
