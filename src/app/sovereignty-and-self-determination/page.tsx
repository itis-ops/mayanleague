import type { Metadata } from 'next'
import { ResourceCollectionContent } from '@/components/content/SitePageContent'

export const metadata: Metadata = {
  title: 'Sovereignty and Self-Determination | International Mayan League',
  description: 'Sovereignty and self-determination resources from the International Mayan League.',
}

export default function SovereigntyPage() {
  return <ResourceCollectionContent slug="sovereignty-and-self-determination" />
}
