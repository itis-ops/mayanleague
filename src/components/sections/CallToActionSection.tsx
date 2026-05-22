'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'
import type { CtaSlice } from '@/sanity/lib/mapHomepage'

interface CallToActionSectionProps {
  content?: { en: CtaSlice; es: CtaSlice }
}

export default function CallToActionSection({ content }: CallToActionSectionProps) {
  const { lang, t, site } = useLanguage()
  const cta = content?.[lang] ?? t.cta
  const donateMonthlyUrl = `${site.donateUrl}?schedule=1&bill_today=true`

  return (
    <section className="bg-earth-red px-5 py-10 text-white sm:px-8 lg:px-12 lg:py-16">
      <div className="motion-reveal mx-auto max-w-[1728px]">
        <EditorialSectionBar hideDetailOnMobile variant="on-red" label={cta.eyebrow} detail={t.brand.full} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-12">
          <h2 className="type-section text-[clamp(2.6rem,6vw,6rem)] text-white">
            {cta.heading}
          </h2>

          <div className="border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="mb-7 max-w-[56ch] type-body text-[1.0625rem] leading-[1.75] text-white/80">
              {cta.body}
            </p>
            {/* Primary: monthly donation; secondary: one-time as text link below */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button
                variant="secondary"
                href={donateMonthlyUrl}
                className="!border-white !bg-white !text-earth-red hover:!bg-cream"
              >
                {cta.donate}
              </Button>
              <a
                href={site.donateUrl}
                className="font-body text-sm font-black uppercase leading-none tracking-[0.06em] text-white underline decoration-current decoration-2 underline-offset-4 hover:text-white/70 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {cta.donateOnce}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
