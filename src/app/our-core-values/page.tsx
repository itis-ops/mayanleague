import type { Metadata } from 'next'
import { aboutPages } from '@/lib/aboutPages'
import CoreValuesContent from './CoreValuesContent'

const page = aboutPages['our-core-values']

export const metadata: Metadata = {
  title: `${page.label} | International Mayan League`,
  description: page.intro || page.sections[0]?.body[0],
}

export default function OurCoreValuesPage() {
  return <CoreValuesContent />
}
