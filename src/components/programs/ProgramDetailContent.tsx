'use client'

import AboutEditorialSection from '@/components/about/AboutEditorialSection'
import AboutPageHero from '@/components/about/AboutPageHero'
import ProgramPageShell from '@/components/programs/ProgramPageShell'
import ProgramTextLink from '@/components/programs/ProgramTextLink'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { getProgramPage } from '@/lib/programPages'
import { uiCopy } from '@/lib/siteContent'

interface ProgramDetailContentProps {
  slug: string
}

function programHeroDetails(lang: 'en' | 'es', sectionCount: number) {
  if (lang === 'es') {
    return [`${sectionCount} secciones`, 'Programas', 'Liderazgo Maya']
  }

  return [`${sectionCount} sections`, 'Programs', 'Maya-led work']
}

function programTitleClassName(title: string) {
  const words = title.trim().split(/\s+/).length
  if (words <= 2) {
    return 'type-display max-w-[12ch] text-[clamp(2.75rem,5vw,5.25rem)] leading-[0.92] text-ink'
  }

  return 'type-display max-w-[14ch] text-[clamp(2.25rem,4vw,4.25rem)] leading-[0.94] text-ink'
}

export default function ProgramDetailContent({ slug }: ProgramDetailContentProps) {
  const { lang } = useLanguage()
  const page = getProgramPage(lang, slug)
  const copy = uiCopy[lang]
  const introLabel = lang === 'es' ? 'Panorama' : 'Overview'

  return (
    <>
      <Navbar />
      <ProgramPageShell activeHref={`/${slug}`}>
        {page.heroImage ? (
          <AboutPageHero
            title={page.title}
            intro={page.intro}
            heroImage={page.heroImage}
            details={programHeroDetails(lang, page.sections.length)}
            titleClassName={programTitleClassName(page.title)}
          />
        ) : (
          <AboutPageHero
            title={page.title}
            details={programHeroDetails(lang, page.sections.length)}
            asideLabel={introLabel}
            asideBody={page.intro}
            titleClassName={programTitleClassName(page.title)}
          />
        )}

        <section aria-label={page.title}>
          {page.sections.map((section, index) => (
            <AboutEditorialSection
              key={`${section.title}-${index}`}
              index={index + 1}
              railLabel={section.eyebrow || String(index + 1).padStart(2, '0')}
              title={section.title}
              body={section.body}
              variant="white"
              leadFirstBody={index === 0}
            >
              {section.links?.length ? (
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-cream-dark pt-8">
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
