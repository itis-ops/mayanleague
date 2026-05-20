'use client'

import AboutPageHero from '@/components/about/AboutPageHero'
import AboutPageShell from '@/components/about/AboutPageShell'
import AboutPersonRow from '@/components/about/AboutPersonRow'
import AboutPersonStickyStack from '@/components/about/AboutPersonStickyStack'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'

export default function TeamContent() {
  const { lang, t } = useLanguage()

  return (
    <>
      <Navbar />
      <AboutPageShell activeHref="/team">
        <AboutPageHero
          title={t.teamPage.heroHeading}
          details={
            lang === 'es'
              ? ['6 líderes', 'Organización liderada por Maya', 'Washington, D.C.']
              : ['6 leaders', 'Maya-led organization', 'Washington, D.C.']
          }
          asideLabel={t.teamPage.introLabel}
          asideBody={t.teamPage.intro}
        />

        <AboutPersonStickyStack label={t.teamPage.membersSectionLabel}>
          {t.teamPage.members.map((member, index) => (
            <AboutPersonRow
              key={member.name}
              index={index}
              name={member.name}
              role={member.role}
              image={member.image}
              body={member.bio}
              layout="sticky"
              compact
              isLast={index === t.teamPage.members.length - 1}
            />
          ))}
        </AboutPersonStickyStack>
      </AboutPageShell>
      <Footer />
    </>
  )
}
