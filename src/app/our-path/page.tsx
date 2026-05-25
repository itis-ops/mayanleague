import type { Metadata } from 'next'

import { aboutPages } from '@/lib/aboutPages'
import { getOurPathContent } from '@/lib/aboutPagesRepository'

import AboutDetailContent from '../[slug]/AboutDetailContent'

export const revalidate = 60

const staticPage = aboutPages['our-path']

export async function generateMetadata(): Promise<Metadata> {
  const content = await getOurPathContent()
  const en = content?.en
  return {
    title: `${en?.label || staticPage.label} | International Mayan League`,
    description: en?.intro || staticPage.intro || staticPage.sections[0]?.body[0],
  }
}

export default async function OurPathPage() {
  const content = await getOurPathContent()
  return <AboutDetailContent page={staticPage} content={content} />
}
