import type { Metadata } from 'next'
import ProgramDetailContent from '@/components/programs/ProgramDetailContent'

export const metadata: Metadata = {
  title: 'Immigration | International Mayan League',
  description: 'Immigration program from the International Mayan League.',
}

export default function ImmigrationPage() {
  return <ProgramDetailContent slug="immigration" />
}
