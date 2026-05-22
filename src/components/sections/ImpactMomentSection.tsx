'use client'

import PartnershipLockup from '@/components/brand/PartnershipLockup'
import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import type { ImpactMomentSlice } from '@/sanity/lib/mapHomepage'

interface ImpactMomentSectionProps {
  content?: { en: ImpactMomentSlice; es: ImpactMomentSlice }
}

export default function ImpactMomentSection({ content }: ImpactMomentSectionProps) {
  const { lang, t } = useLanguage()
  const im = content?.[lang] ?? t.impactMoment

  return (
    <section className="bg-ink px-5 py-10 text-cream sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          variant="on-ink"
          label={im.label}
          detail={im.kicker}
        />

        <div className="motion-reveal grid grid-cols-1 gap-7 lg:grid-cols-[1fr_0.52fr] lg:items-stretch lg:gap-12">
          <div className="flex min-h-full flex-col justify-between gap-8 lg:gap-12">
            <PartnershipLockup label={t.impactMoment.lockupLabel} />
            <h2 className="type-section max-w-4xl text-[clamp(2.4rem,6vw,6rem)] text-cream">
              {im.heading}
            </h2>
          </div>

          <div className="flex flex-col justify-end border-t border-cream/14 pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="mb-6 max-w-[56ch] type-body text-[1.0625rem] leading-[1.75] text-cream/72">
              {im.body}
            </p>
            <a
              href={im.statementUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="motion-control inline-flex items-center gap-2 font-body text-sm font-black uppercase leading-none tracking-[0.06em] text-earth-red underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-gold"
            >
              {im.readStatement}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
