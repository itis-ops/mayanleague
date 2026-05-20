'use client'

import AboutPageHero from '@/components/about/AboutPageHero'
import AboutPageShell from '@/components/about/AboutPageShell'
import AboutPersonRow from '@/components/about/AboutPersonRow'
import AboutPersonStickyStack from '@/components/about/AboutPersonStickyStack'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { localizedAboutPages } from '@/lib/aboutPages'
import { parseAboutPersonTitle } from '@/lib/parseAboutPersonTitle'

export default function BoardOfDirectorsContent() {
  const { lang } = useLanguage()
  const page = localizedAboutPages[lang]['board-of-directors']

  return (
    <>
      <Navbar />
      <AboutPageShell activeHref="/board-of-directors">
        <AboutPageHero
          title={page.title}
          details={
            lang === 'es'
              ? ['5 líderes', 'Junta cargadora', 'Liderazgo Maya']
              : ['5 leaders', 'Governing board', 'Maya leadership']
          }
          asideLabel={page.introLabel}
          asideBody={page.intro}
        />

        <AboutPersonStickyStack label={page.membersSectionLabel ?? page.title}>
          {page.sections.map((section, index) => {
            const { name, role } = parseAboutPersonTitle(section.title ?? '')
            const roleLabel = role || section.kicker || ''

            return (
              <AboutPersonRow
                key={`${section.title}-${index}`}
                index={index}
                name={name}
                role={roleLabel}
                image={section.image}
                body={section.body}
                layout="sticky"
                compact
                isLast={index === page.sections.length - 1}
              />
            )
          })}
        </AboutPersonStickyStack>
      </AboutPageShell>
      <Footer />
    </>
  )
}
