import { redirect } from 'next/navigation'
import { DONATE_URL } from '@/lib/siteLinks'

export default function DonorsPage() {
  redirect(DONATE_URL)
}
