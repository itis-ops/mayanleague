import type { Metadata } from 'next'
import CountOfDaysContent from './CountOfDaysContent'
import { countOfDaysContent } from '@/lib/countOfDaysContent'

const en = countOfDaysContent.en

export const metadata: Metadata = {
  title: en.metaTitle,
  description: en.metaDescription,
  robots: {
    index: false,
    follow: false,
  },
}

export default function CountOfDaysPage() {
  return <CountOfDaysContent />
}
