'use client'

import Button from '@/components/ui/Button'
import { useLanguage } from '@/hooks/useLanguage'

export default function NewsroomDonationInterstitial() {
  const { lang, site } = useLanguage()

  const copy = lang === 'es'
    ? {
        eyebrow: 'Periodismo independiente',
        heading: 'El testimonio público necesita apoyo público.',
        body: 'Ayuda a sostener la defensa liderada por indígenas, el acceso al idioma y la protección comunitaria.',
        donate: 'Da esperanza',
      }
    : {
        eyebrow: 'Independent journalism',
        heading: 'Public witness needs public support.',
        body: 'Help sustain Indigenous-led advocacy, language access, and community defense.',
        donate: 'Give to hope',
      }

  const donateMonthlyUrl = `${site.donateUrl}?schedule=1&bill_today=true`

  return (
    <div className="border-y border-earth-red bg-earth-red px-7 py-12 text-white sm:px-10 sm:py-14 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:px-12 lg:py-14">
      <div>
        <p className="type-kicker mb-4 text-white/85">{copy.eyebrow}</p>
        <h2 className="type-section max-w-[24ch] text-[clamp(1.75rem,2.8vw,2.65rem)] leading-[0.98] text-white">
          {copy.heading}
        </h2>
        <p className="type-body mt-5 max-w-[58ch] text-white/85">{copy.body}</p>
      </div>

      <div className="mt-8 lg:mt-0">
        <Button
          variant="secondary"
          href={donateMonthlyUrl}
          className="w-fit shrink-0 whitespace-nowrap !border-white !bg-white !text-earth-red hover:!bg-cream"
        >
          {copy.donate}
        </Button>
      </div>
    </div>
  )
}
