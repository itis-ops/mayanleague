import type { Metadata } from 'next'

import { aboutPages } from '@/lib/aboutPages'
import { getBoardOfDirectorsContent } from '@/lib/aboutPagesRepository'

import BoardOfDirectorsContent from './BoardOfDirectorsContent'

export const revalidate = 60

const staticPage = aboutPages['board-of-directors']

export async function generateMetadata(): Promise<Metadata> {
  const content = await getBoardOfDirectorsContent()
  const en = content?.en
  return {
    title: `${en?.label || staticPage.label} | International Mayan League`,
    description: en?.intro || staticPage.intro || staticPage.sections[0]?.body[0],
  }
}

export default async function BoardOfDirectorsPage() {
  const content = await getBoardOfDirectorsContent()
  return <BoardOfDirectorsContent content={content} />
}
