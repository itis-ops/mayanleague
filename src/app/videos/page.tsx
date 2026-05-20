import type { Metadata } from 'next'
import { MediaIndexContent } from '@/components/content/SitePageContent'

export const metadata: Metadata = {
  title: 'Videos | International Mayan League',
  description: 'Videos from the International Mayan League YouTube channel.',
}

export default function VideosPage() {
  return <MediaIndexContent slug="videos" />
}
