import type { Metadata } from 'next'
import TeamContent from './TeamContent'

export const metadata: Metadata = {
  title: 'Team | International Mayan League',
  description:
    'Meet the International Mayan League team.',
}

export default function TeamPage() {
  return <TeamContent />
}
