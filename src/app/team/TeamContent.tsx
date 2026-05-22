'use client'

import AboutCollectionShell from '@/components/about/AboutCollectionShell'
import AboutPersonRow from '@/components/about/AboutPersonRow'
import AboutPersonStickyStack from '@/components/about/AboutPersonStickyStack'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'

export default function TeamContent() {
  const { t } = useLanguage()

  return (
    <>
      <Navbar />
      <AboutCollectionShell
        activeHref="/team"
        heroTitle={t.teamPage.heroHeading}
        heroIntro={t.teamPage.intro}
        animateContent={false}
      >
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
      </AboutCollectionShell>
      <Footer />
    </>
  )
}
