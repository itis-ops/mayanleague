'use client'

import AboutEditorialSection from '@/components/about/AboutEditorialSection'
import ProgramSectionNav from '@/components/programs/ProgramSectionNav'
import ProgramTextLink from '@/components/programs/ProgramTextLink'
import { collectionArticleSectionClass, scrollAnchorProgramSectionClass } from '@/lib/editorialLayout'
import type { NarrativeSection } from '@/lib/siteContent'

interface ProgramSectionsContentProps {
  slug: string
  sections: NarrativeSection[]
  sectionsNavLabel: string
  viewPageLabel: string
}

function sectionLabel(section: NarrativeSection, index: number) {
  return section.eyebrow || String(index + 1).padStart(2, '0')
}

function sectionLayout(): 'editorial' {
  return 'editorial'
}

export default function ProgramSectionsContent({
  slug,
  sections,
  sectionsNavLabel,
  viewPageLabel,
}: ProgramSectionsContentProps) {
  const hasSectionNav = sections.length >= 3
  const navSections = sections.map((section, index) => ({
    label: sectionLabel(section, index),
    title: section.title,
  }))

  return (
    <>
      {hasSectionNav ? (
        <div className={collectionArticleSectionClass}>
          <ProgramSectionNav
            sections={navSections}
            ariaLabel={sectionsNavLabel}
            getSectionId={(index) => `${slug}-section-${index + 1}`}
          />
        </div>
      ) : null}

      <section aria-label={slug}>
        {sections.map((section, index) => (
          <AboutEditorialSection
            key={`${section.title}-${index}`}
            id={`${slug}-section-${index + 1}`}
            index={index + 1}
            railLabel={sectionLabel(section, index)}
            title={section.title}
            body={section.body}
            variant="white"
            layout={sectionLayout()}
            leadFirstBody={false}
            wideTitle={section.title.trim().split(/\s+/).length > 5}
            className={
              hasSectionNav ? scrollAnchorProgramSectionClass : undefined
            }
          >
            {section.links?.length ? (
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-cream-dark pt-8">
                {section.links.map((link) => (
                  <ProgramTextLink key={link.href} link={link} label={viewPageLabel} />
                ))}
              </div>
            ) : null}
          </AboutEditorialSection>
        ))}
      </section>
    </>
  )
}
