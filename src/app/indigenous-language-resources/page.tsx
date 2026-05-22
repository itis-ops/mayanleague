import type { Metadata } from 'next'
import IndigenousLanguageResourcesPage from '@/components/content/IndigenousLanguageResourcesPage'

export const metadata: Metadata = {
  title: 'Indigenous Language Resources | International Mayan League',
  description:
    'Linguistically and culturally tailored audiovisual Know Your Rights resources in Mayan languages from the International Mayan League.',
}

export default function Page() {
  return <IndigenousLanguageResourcesPage />
}
