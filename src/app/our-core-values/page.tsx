import type { Metadata } from 'next'

import { aboutPages } from '@/lib/aboutPages'
import { getCoreValuesContent } from '@/lib/aboutPagesRepository'

import CoreValuesContent from './CoreValuesContent'

export const revalidate = 60

const staticPage = aboutPages['our-core-values']

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCoreValuesContent()
  const en = content?.en
  return {
    title: `${en?.label || staticPage.label} | International Mayan League`,
    description: en?.intro || staticPage.intro || staticPage.sections[0]?.body[0],
  }
}

export default async function OurCoreValuesPage() {
  const content = await getCoreValuesContent()
  return <CoreValuesContent content={content} />
}
