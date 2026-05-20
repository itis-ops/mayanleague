import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact | International Mayan League',
  description:
    'Follow the International Mayan League on social media, connect with staff, volunteer or intern, and sign up for NOJB\'EL MAYAB\'.',
}

export default function ContactPage() {
  return <ContactContent />
}
