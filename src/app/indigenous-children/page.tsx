import type { Metadata } from 'next'
import { ResourceCollectionContent } from '@/components/content/SitePageContent'

export const metadata: Metadata = {
  title: 'Indigenous Children | International Mayan League',
  description: 'Indigenous children resources from the International Mayan League.',
}

export default function IndigenousChildrenPage() {
  return <ResourceCollectionContent slug="indigenous-children" />
}
