'use client'

import EditorialSectionBar from '@/components/editorial/EditorialSectionBar'
import { useLanguage } from '@/hooks/useLanguage'
import Button from '@/components/ui/Button'

export default function ResourcesSection() {
  const { t } = useLanguage()

  return (
    <section id="resources" className="relative overflow-hidden bg-white px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-[1728px]">
        <EditorialSectionBar
          hideDetailOnMobile
          label={t.resources.sectionLabel}
          detail={t.resources.sectionKicker}
        />
      </div>

      <div className="motion-reveal mx-auto max-w-[1728px] border border-cream-dark bg-cream p-1.5">
        <div className="relative min-h-[540px] overflow-hidden bg-ink">
          <img
            src="/site-images/maya-delegation.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-white/30" />
          <div className="relative flex min-h-[540px] items-start px-7 py-16 sm:px-10 lg:px-16">
            <div className="max-w-5xl bg-white/95 p-7 sm:p-10">
              <p className="type-kicker mb-6 text-earth-red">
                {t.resources.eyebrow}
              </p>
              <h2 className="type-section max-w-4xl text-[clamp(2.35rem,4.8vw,4.9rem)] text-earth-red">
                {t.resources.heading}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-12 max-w-[1728px] px-4 sm:px-8">
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-3">
          {t.resources.items.slice(0, 3).map((item, index) => {
            const href = index === 0 ? '/indigenous-language-resources' : '/resources'

            return (
              <article key={item.title} className="motion-card border border-cream-dark bg-white p-1.5 hover:bg-cream">
                <div className="flex min-h-[340px] flex-col bg-white p-8 hover:bg-cream sm:p-10">
                  <p className="mb-8 font-display text-5xl font-bold leading-none tracking-[-0.06em] text-earth-red">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="type-section mb-5 text-[clamp(1.7rem,2.4vw,2.1rem)] text-ink">
                    {item.title}
                  </h3>
                  <p className="mb-8 border-t border-cream-dark pt-5 type-body text-[1.05rem] leading-8 text-ink/74">
                    {item.description}
                  </p>
                  <div className="mt-auto">
                    <Button href={href} variant="tertiary" ariaLabel={`${t.resources.explore}: ${item.title}`}>
                      {t.resources.explore}
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
