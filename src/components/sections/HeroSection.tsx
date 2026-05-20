'use client'

import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'

const DONATE_URL = 'https://internationalmayanleague-bloom.kindful.com/embeds/94567c30-cca9-4853-a87f-43c38750420a'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-white pt-[72px] text-ink lg:pt-[124px]">
      <div className="mx-auto max-w-[1728px] px-5 py-6 sm:px-8 lg:px-12 lg:py-10">
        <div className="mb-3 border-y border-cream-dark py-3 sm:mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <p className="type-kicker text-earth-red">{t.hero.eyebrow}</p>
            <ul className="hidden items-center gap-4 sm:flex" aria-label="Organization highlights">
              {t.hero.proofPoints.map((point, i) => (
                <li key={point} className="flex items-center gap-4">
                  {i > 0 ? <span className="hidden h-3 w-px shrink-0 bg-ink/20 sm:block" aria-hidden="true" /> : null}
                  <span className="type-kicker text-ink/52">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 sm:hidden" aria-label="Organization highlights">
            {t.hero.proofPoints.map((point) => (
              <li key={point}>
                <span className="type-kicker text-ink/52">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="motion-reveal grid grid-cols-1 gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
          <h1 className="type-display max-w-[1180px] text-[clamp(3.5rem,8.2vw,10rem)] text-ink">
            {t.hero.tagline}
          </h1>
          <div className="border-t border-cream-dark pt-7 lg:border-l lg:border-t-0 lg:pl-9">
            <p className="mb-7 max-w-[42ch] text-[clamp(1.2rem,1.8vw,1.65rem)] leading-[1.35] text-ink/82">
              {t.hero.clarityLine}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" href={DONATE_URL}>
                {t.hero.ctaDonate}
              </Button>
              <Button variant="secondary" href="/contact">
                {t.hero.ctaConnect}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[0.18fr_0.82fr]">
          <aside className="hidden border-y border-cream-dark py-5 lg:flex lg:flex-col lg:justify-between">
            <p className="type-kicker text-earth-red">Abya Yala</p>
            <p className="type-kicker max-w-[40ch] text-ink/52">{t.brand.full}</p>
          </aside>
          <div className="relative min-h-[280px] overflow-hidden bg-ink sm:min-h-[360px] lg:min-h-[560px]">
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
    </section>
  )
}
