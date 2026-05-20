import type { Metadata } from 'next'
import BoardOfDirectorsContent from './BoardOfDirectorsContent'
import { aboutPages } from '@/lib/aboutPages'

const page = aboutPages['board-of-directors']

export const metadata: Metadata = {
  title: `${page.label} | International Mayan League`,
  description: page.intro || page.sections[0]?.body[0],
}

export default function BoardOfDirectorsPage() {
  return <BoardOfDirectorsContent />
}
