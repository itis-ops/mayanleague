import type { Metadata } from 'next'
import ProgramDetailContent from '@/components/programs/ProgramDetailContent'

export const metadata: Metadata = {
  title: 'Environmental Protection | International Mayan League',
  description: 'Environmental Protection program from the International Mayan League.',
}

export default function EnvironmentalProtectionPage() {
  return <ProgramDetailContent slug="environmental-protection" />
}
