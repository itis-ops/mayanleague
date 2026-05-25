import type { Metadata } from 'next'

import { getAboutPageContent } from '@/lib/aboutPagesRepository'
import { getHomepageContent } from '@/lib/homepageRepository'

import AboutContent from './AboutContent'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutPageContent()
  const heroHeading = content?.en?.heroHeading
  const description = content?.en?.methodStatement
  return {
    title: 'About | International Mayan League',
    description:
      description ||
      'The International Mayan League is guided by elders and ancestors to defend Maya peoples, protect Mother Earth, and advance dignity across Abya Yala.',
    openGraph: heroHeading ? { title: heroHeading } : undefined,
  }
}

export default async function AboutPage() {
  const [aboutContent, homepageContent] = await Promise.all([
    getAboutPageContent(),
    getHomepageContent(),
  ])
  return (
    <AboutContent
      aboutContent={aboutContent}
      missionContent={homepageContent?.mission}
    />
  )
}
