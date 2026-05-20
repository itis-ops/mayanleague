'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'

const DONATE_URL = 'https://internationalmayanleague-bloom.kindful.com/embeds/94567c30-cca9-4853-a87f-43c38750420a'
const DONATE_MONTHLY_URL = `${DONATE_URL}?schedule=1&bill_today=true`

export default function CallToActionSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-earth-red px-5 py-12 text-white sm:px-8 lg:px-12 lg:py-16">
      <div className="motion-reveal mx-auto max-w-[1728px]">
        <EditorialSectionBar hideDetailOnMobile variant="on-red" label={t.cta.eyebrow} detail={t.brand.full} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:gap-12">
          <h2 className="type-section text-[clamp(2.8rem,6vw,6rem)] text-white">
            {t.cta.heading}
          </h2>

          <div className="border-t border-white/20 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="mb-6 max-w-[56ch] type-body text-[1.0625rem] leading-[1.75] text-white/80">
              {t.cta.body}
            </p>
            <div className="flex flex-wrap items-center gap-6">
                <Button
                variant="secondary"
                href={DONATE_MONTHLY_URL}
                className="!border-white !bg-white !text-earth-red hover:!bg-cream"
              >
                {t.cta.donate}
              </Button>
              <a
                href={DONATE_URL}
                className="font-body text-sm font-black uppercase leading-none tracking-[0.06em] text-white underline decoration-current decoration-2 underline-offset-4 hover:text-white/70 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                {t.cta.donateOnce}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
