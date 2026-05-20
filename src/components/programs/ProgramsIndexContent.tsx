'use client'

import AboutEditorialSection from '@/components/about/AboutEditorialSection'
import AboutPageHero from '@/components/about/AboutPageHero'
import ProgramPageShell from '@/components/programs/ProgramPageShell'
import ProgramTextLink from '@/components/programs/ProgramTextLink'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { getProgramsIndex } from '@/lib/programPages'
import { uiCopy } from '@/lib/siteContent'

export default function ProgramsIndexContent() {
  const { lang } = useLanguage()
  const page = getProgramsIndex(lang)
  const copy = uiCopy[lang]
  const introLabel = lang === 'es' ? 'Panorama' : 'Overview'
  const details =
    lang === 'es'
      ? [`${page.sections.length} programas`, 'Cosmovisión Maya', 'Trabajo comunitario']
      : [`${page.sections.length} programs`, 'Maya cosmovision', 'Community-led work']

  return (
    <>
      <Navbar />
      <ProgramPageShell activeHref="/programs">
        <AboutPageHero
          title={page.label}
          details={details}
          asideLabel={introLabel}
          asideBody={page.intro}
          titleClassName="type-display max-w-[10ch] text-[clamp(3rem,5.5vw,5.75rem)] leading-[0.92] text-ink"
        />

        <section aria-label={page.label}>
          {page.sections.map((section, index) => (
            <AboutEditorialSection
              key={`${section.title}-${index}`}
              index={index + 1}
              railLabel={String(index + 1).padStart(2, '0')}
              title={section.title}
              body={section.body}
              variant="white"
            >
              {section.links?.length ? (
                <div className="mt-8 border-t border-cream-dark pt-8">
                  {section.links.map((link) => (
                    <ProgramTextLink key={link.href} link={link} label={copy.viewPage} />
                  ))}
                </div>
              ) : null}
            </AboutEditorialSection>
          ))}
        </section>
      </ProgramPageShell>
      <Footer />
    </>
  )
}
