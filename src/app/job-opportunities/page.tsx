import type { Metadata } from 'next'
import AboutDetailContent from '../[slug]/AboutDetailContent'
import { aboutPages } from '@/lib/aboutPages'

const page = aboutPages['job-opportunities']

export const metadata: Metadata = {
  title: `${page.label} | International Mayan League`,
  description: page.intro || page.sections[0]?.body[0],
}

export default function JobOpportunitiesPage() {
  return <AboutDetailContent page={page} />
}
