import type { Metadata } from 'next'
import ProgramDetailContent from '@/components/programs/ProgramDetailContent'

export const metadata: Metadata = {
  title: 'Human Rights and Advocacy | International Mayan League',
  description: 'Human Rights and Advocacy program from the International Mayan League.',
}

export default function HumanRightsPage() {
  return <ProgramDetailContent slug="human-rights" />
}
