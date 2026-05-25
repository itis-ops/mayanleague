import type { Metadata } from 'next'

import { getTeamMembersContent } from '@/lib/aboutPagesRepository'

import TeamContent from './TeamContent'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Team | International Mayan League',
  description: 'Meet the International Mayan League team.',
}

export default async function TeamPage() {
  const members = await getTeamMembersContent()
  return <TeamContent members={members} />
}
