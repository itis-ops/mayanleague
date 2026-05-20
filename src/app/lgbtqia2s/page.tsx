import type { Metadata } from 'next'
import { ResourceCollectionContent } from '@/components/content/SitePageContent'

export const metadata: Metadata = {
  title: 'LGBTQIA2S+ | International Mayan League',
  description: 'LGBTQIA2S+ resources from the International Mayan League.',
}

export default function LGBTQIA2SPage() {
  return <ResourceCollectionContent slug="lgbtqia2s" />
}
