import type { Metadata } from 'next'
import ResourceCollectionPage from '@/components/content/ResourceCollectionPage'

export const metadata: Metadata = {
  title: 'LGBTQIA2S+ | International Mayan League',
  description: 'LGBTQIA2S+ resources from the International Mayan League.',
}

export default function LGBTQIA2SPage() {
  return <ResourceCollectionPage slug="lgbtqia2s" />
}
