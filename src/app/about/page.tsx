import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About | International Mayan League',
  description:
    'The International Mayan League is guided by elders and ancestors to defend Maya peoples, protect Mother Earth, and advance dignity across Abya Yala.',
}

export default function AboutPage() {
  return <AboutContent />
}
