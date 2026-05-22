import type { Metadata } from 'next'
import ResourceCollectionPage from '@/components/content/ResourceCollectionPage'

export const metadata: Metadata = {
  title: 'Indigenous Children | International Mayan League',
  description: 'Indigenous children resources from the International Mayan League.',
}

export default function IndigenousChildrenPage() {
  return <ResourceCollectionPage slug="indigenous-children" />
}
