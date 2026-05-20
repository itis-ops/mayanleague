'use client'

import AboutPageHero from '@/components/about/AboutPageHero'
import AboutPageShell from '@/components/about/AboutPageShell'
import AboutQuoteFigure from '@/components/about/AboutQuoteFigure'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import MayaNumber from '@/components/ui/MayaNumber'
import { useLanguage } from '@/hooks/useLanguage'

export default function AboutContent() {
  const { t } = useLanguage()
  const { aboutPage, mission } = t

  return (
    <>
      <Navbar />
      <AboutPageShell activeHref="/about">
        <AboutPageHero
          label={aboutPage.label}
          title={aboutPage.heroHeading}
          intro={aboutPage.methodStatement}
          heroImage="/site-images/atitlan-ulew.jpg"
        />

        <section
          id="who-we-are"
          className="scroll-mt-36 border-b border-cream-dark px-6 py-16 sm:px-10 lg:px-14 lg:py-24"
        >
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-14">
            <p className="type-kicker text-ink/55 lg:col-span-3 lg:pt-1">{aboutPage.whoWeAreLabel}</p>
            <div className="space-y-12 lg:col-span-8 lg:col-start-5">
              <p className="max-w-[48ch] font-accent text-[clamp(1.35rem,2.1vw,1.85rem)] leading-[1.48] tracking-[-0.02em] text-ink/90">
                {mission.boardStatement[0]}
              </p>
              <p className="max-w-[56ch] type-body text-[1.0625rem] leading-[1.75] text-ink/72">
                {mission.boardStatement[1]}
              </p>
              <p className="type-kicker max-w-[40ch] pt-4 text-ink/45">
                {mission.boardStatementAttribution}
              </p>
            </div>
          </div>
        </section>

        <section
          id="how-we-work"
          className="scroll-mt-36 px-6 py-14 sm:px-10 lg:px-14 lg:py-20"
        >
          <p className="type-kicker mb-10 text-earth-red">{aboutPage.howWeWorkLabel}</p>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-20">
            <div className="max-w-[72ch] space-y-7">
              {aboutPage.paragraphs.map((paragraph) => (
                <p key={paragraph} className="type-body text-[1.0625rem] leading-[1.75] text-ink/72">
                  {paragraph}
                </p>
              ))}
            </div>
            <ol className="space-y-6 lg:pt-1">
              {aboutPage.principles.map((principle, index) => (
                <li
                  key={principle}
                  className="flex gap-5 border-t border-cream-dark pt-6 first:border-t-0 first:pt-0"
                >
                  <MayaNumber
                    value={index + 1}
                    className="shrink-0 scale-75 origin-top-left text-earth-red"
                  />
                  <p className="type-body text-sm leading-7 text-ink/72">{principle}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <AboutQuoteFigure
          label={aboutPage.quoteLabel}
          quote={aboutPage.quote}
          source={aboutPage.quoteSource}
        />
      </AboutPageShell>
      <Footer />
    </>
  )
}
