import type { Metadata } from 'next'
import ProgramDetailContent from '@/components/programs/ProgramDetailContent'

export const metadata: Metadata = {
  title: 'Maya Women Delegation | International Mayan League',
  description: 'Maya Women Delegation program from the International Mayan League.',
}

export default function MayaWomenDelegationPage() {
  return <ProgramDetailContent slug="maya-women-delegation" />
}
