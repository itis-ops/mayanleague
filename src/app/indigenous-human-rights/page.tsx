import type { Metadata } from 'next'
import ResourceCollectionPage from '@/components/content/ResourceCollectionPage'

export const metadata: Metadata = {
  title: 'Indigenous Human Rights | International Mayan League',
  description: 'Indigenous human rights resources from the International Mayan League.',
}

export default function IndigenousHumanRightsPage() {
  return <ResourceCollectionPage slug="indigenous-human-rights" />
}
