import type { Metadata } from 'next'
import ProgramsIndexContent from '@/components/programs/ProgramsIndexContent'

export const metadata: Metadata = {
  title: 'Programs | International Mayan League',
  description: 'Programs from the International Mayan League.',
}

export default function ProgramsPage() {
  return <ProgramsIndexContent />
}
