'use client'

import EditorialBrandBar from '@/components/editorial/EditorialBrandBar'
import HeroLanguageAnchor from '@/components/editorial/HeroLanguageAnchor'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'
import type { HeroSlice } from '@/sanity/lib/mapHomepage'

interface HeroSectionProps {
  content?: { en: HeroSlice; es: HeroSlice }
}

export default function HeroSection({ content }: HeroSectionProps) {
  const { lang, t, site } = useLanguage()
  const hero = content?.[lang] ?? t.hero

  return (
    <section className="bg-white pt-[72px] text-ink xl:pt-[124px]">
      <div className="mx-auto max-w-[1728px] px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
        <EditorialBrandBar
          brand={hero.eyebrow}
          details={hero.proofPoints}
          border="y"
          className="mb-3 sm:mb-8"
        />

        <div className="relative">
          <HeroLanguageAnchor />

          {/* Headline + aside — right-pad on h1 only clears the language toggle on mobile */}
          <div className="motion-reveal grid grid-cols-1 gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
            <h1 className="type-display max-w-[1180px] pr-12 text-[clamp(3.5rem,8.2vw,10rem)] text-ink sm:pr-14 lg:pr-0">
              {hero.tagline}
            </h1>
            <div className="border-t border-cream-dark pt-7 lg:border-l lg:border-t-0 lg:pl-9">
              <p className="mb-7 max-w-[42ch] text-[clamp(1.15rem,1.8vw,1.65rem)] leading-[1.38] text-ink/80">
                {hero.clarityLine}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Button variant="primary" href={site.donateUrl} className="w-full sm:w-auto">
                  {hero.ctaDonate}
                </Button>
                <Button variant="secondary" href="/contact" className="w-full sm:w-auto">
                  {hero.ctaConnect}
                </Button>
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[0.18fr_0.82fr]">
            <aside className="hidden border-y border-cream-dark py-5 lg:flex lg:flex-col lg:justify-between">
              <p className="type-kicker text-earth-red">Abya Yala</p>
              <p className="type-kicker max-w-[40ch] text-ink/52">{t.brand.full}</p>
            </aside>
            <div className="relative min-h-[56vw] max-h-[520px] overflow-hidden bg-ink sm:min-h-[380px] sm:max-h-none lg:min-h-[560px]">
              <img
                src="/site-images/atitlan-ulew.jpg"
                alt="Lake Atitlán, Guatemala — ancestral Maya homeland"
                className="absolute inset-0 h-full w-full object-cover grayscale"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
