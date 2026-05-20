import type { Metadata } from 'next'
import { ResourcesIndexContent } from '@/components/content/SitePageContent'

export const metadata: Metadata = {
  title: 'Resources | International Mayan League',
  description:
    'Resources from the International Mayan League, including Indigenous Language Resources and Know Your Rights materials.',
}

export default function ResourcesPage() {
  return <ResourcesIndexContent />
}
