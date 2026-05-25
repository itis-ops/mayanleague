import type { Metadata } from 'next'

import { aboutPages } from '@/lib/aboutPages'
import { getJobOpportunitiesContent } from '@/lib/aboutPagesRepository'

import AboutDetailContent from '../[slug]/AboutDetailContent'

export const revalidate = 60

const staticPage = aboutPages['job-opportunities']

export async function generateMetadata(): Promise<Metadata> {
  const content = await getJobOpportunitiesContent()
  const en = content?.en
  return {
    title: `${en?.label || staticPage.label} | International Mayan League`,
    description: en?.intro || staticPage.intro || staticPage.sections[0]?.body[0],
  }
}

export default async function JobOpportunitiesPage() {
  const content = await getJobOpportunitiesContent()
  return <AboutDetailContent page={staticPage} content={content} />
}
