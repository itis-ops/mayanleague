import type { Metadata } from 'next'
import ResourceCollectionPage from '@/components/content/ResourceCollectionPage'

export const metadata: Metadata = {
  title: 'Sovereignty and Self-Determination | International Mayan League',
  description: 'Sovereignty and self-determination resources from the International Mayan League.',
}

export default function SovereigntyPage() {
  return <ResourceCollectionPage slug="sovereignty-and-self-determination" />
}
