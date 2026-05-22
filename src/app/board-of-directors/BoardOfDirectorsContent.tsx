'use client'

import AboutCollectionShell from '@/components/about/AboutCollectionShell'
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
      <AboutCollectionShell
        activeHref="/board-of-directors"
        heroTitle={page.title}
        heroIntro={page.intro ?? ''}
        animateContent={false}
      >
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
      </AboutCollectionShell>
      <Footer />
    </>
  )
}
