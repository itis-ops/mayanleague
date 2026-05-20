import type { Metadata } from 'next'
import { ResourceCollectionContent } from '@/components/content/SitePageContent'

export const metadata: Metadata = {
  title: 'Indigenous Human Rights | International Mayan League',
  description: 'Indigenous human rights resources from the International Mayan League.',
}

export default function IndigenousHumanRightsPage() {
  return <ResourceCollectionContent slug="indigenous-human-rights" />
}
