'use client'

import AboutCollectionShell from '@/components/about/AboutCollectionShell'
import AboutEditorialSection from '@/components/about/AboutEditorialSection'
import AboutQuoteFigure from '@/components/about/AboutQuoteFigure'
import JobApplyButton from '@/components/about/JobApplyButton'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { localizedAboutPages, type AboutPageData } from '@/lib/aboutPages'

interface Props {
  page: AboutPageData
}

function usesPathLayout(slug: AboutPageData['slug']) {
  return slug === 'job-opportunities' || slug === 'our-path'
}

export default function AboutDetailContent({ page }: Props) {
  const { lang, t } = useLanguage()
  const currentPage = localizedAboutPages[lang][page.slug]
  const pathLayout = usesPathLayout(currentPage.slug)
  const isOurPath = currentPage.slug === 'our-path'
  const heroIntro =
    currentPage.intro ??
    (isOurPath
      ? lang === 'es'
        ? 'Misión, visión y futuro compartido para nuestros pueblos y la Madre Tierra.'
        : 'Mission, vision, and shared future for our peoples and Mother Earth.'
      : currentPage.sections[0]?.body[0] ?? currentPage.title)

  return (
    <>
      <Navbar />
      <AboutCollectionShell
        activeHref={`/${currentPage.slug}`}
        heroTitle={currentPage.title}
        heroIntro={heroIntro}
      >
        {currentPage.sections.map((section, index) => (
          <AboutEditorialSection
            key={`${section.title || section.kicker || currentPage.slug}-${index}`}
            index={index + 1}
            railLabel={section.kicker}
            title={pathLayout ? section.kicker : section.title}
            image={section.image}
            imageVariant={isOurPath || pathLayout ? 'feature' : 'avatar'}
            body={section.body}
            variant="white"
            leadFirstBody={isOurPath && index === 0}
            layout={pathLayout ? 'path' : 'editorial'}
            wideTitle={currentPage.slug === 'job-opportunities'}
          >
            {currentPage.slug === 'job-opportunities' && section.title ? (
              <JobApplyButton jobTitle={section.title} />
            ) : null}
          </AboutEditorialSection>
        ))}

        {currentPage.quote ? (
          <AboutQuoteFigure
            label={t.aboutPage.quoteLabel}
            quote={currentPage.quote.body}
            source={currentPage.quote.source}
          />
        ) : null}
      </AboutCollectionShell>
      <Footer />
    </>
  )
}
