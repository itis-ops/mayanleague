import type { Metadata } from 'next'
import MayaCosmovisionContent from './MayaCosmovisionContent'

export const metadata: Metadata = {
  title: 'Maya Cosmovision | International Mayan League',
  description:
    'Our connection to the world and the cosmos are the basis of our action, of our thoughts, and our sentiments in life and of life.',
}

export default function MayaCosmovisionPage() {
  return <MayaCosmovisionContent />
}
