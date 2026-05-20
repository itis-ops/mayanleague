import type { Metadata } from 'next'
import ProgramDetailContent from '@/components/programs/ProgramDetailContent'

export const metadata: Metadata = {
  title: 'Gathering of Ancestral Wisdom | International Mayan League',
  description: 'Gathering of Ancestral Wisdom program from the International Mayan League.',
}

export default function GatheringOfAncestralWisdomPage() {
  return <ProgramDetailContent slug="gathering-of-ancestral-wisdom" />
}
