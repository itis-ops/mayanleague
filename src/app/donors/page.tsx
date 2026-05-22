import { redirect } from 'next/navigation'
import { getSiteSettings } from '@/lib/siteSettingsRepository'
import { DONATE_URL } from '@/lib/siteLinks'

export default async function DonorsPage() {
  const settings = await getSiteSettings()
  redirect(settings?.global.donateUrl ?? DONATE_URL)
}
