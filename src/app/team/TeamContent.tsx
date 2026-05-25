'use client'

import AboutCollectionShell from '@/components/about/AboutCollectionShell'
import AboutPersonRow from '@/components/about/AboutPersonRow'
import AboutPersonStickyStack from '@/components/about/AboutPersonStickyStack'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import type { TeamMembersContent } from '@/sanity/lib/mapAboutPages'

interface TeamContentProps {
  members?: TeamMembersContent | null
}

export default function TeamContent({ members }: TeamContentProps) {
  const { lang, t } = useLanguage()
  const list = members?.[lang] ?? t.teamPage.members

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
          {list.map((member, index) => (
            <AboutPersonRow
              key={`${member.name}-${index}`}
              index={index}
              name={member.name}
              role={member.role}
              image={member.image}
              body={member.bio}
              layout="sticky"
              compact
              isLast={index === list.length - 1}
            />
          ))}
        </AboutPersonStickyStack>
      </AboutCollectionShell>
      <Footer />
    </>
  )
}
