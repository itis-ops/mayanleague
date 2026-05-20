'use client'

import AboutEditorialSection from '@/components/about/AboutEditorialSection'
import AboutPageHero from '@/components/about/AboutPageHero'
import AboutPageShell from '@/components/about/AboutPageShell'
import AboutQuoteFigure from '@/components/about/AboutQuoteFigure'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { localizedAboutPages, type AboutPageData } from '@/lib/aboutPages'

interface Props {
  page: AboutPageData
}

function usesPathLayout(slug: AboutPageData['slug']) {
  return slug === 'job-opportunities'
}

export default function AboutDetailContent({ page }: Props) {
  const { lang, t } = useLanguage()
  const currentPage = localizedAboutPages[lang][page.slug]
  const pathLayout = usesPathLayout(currentPage.slug)
  const isOurPath = currentPage.slug === 'our-path'

  return (
    <>
      <Navbar />
      <AboutPageShell activeHref={`/${currentPage.slug}`}>
        <AboutPageHero
          label={currentPage.label}
          title={currentPage.title}
          intro={currentPage.intro}
          heroImage={currentPage.heroImage}
          details={
            isOurPath
              ? lang === 'es'
                ? ['Misión', 'Visión', 'Futuro compartido']
                : ['Mission', 'Vision', 'Shared future']
              : currentPage.slug === 'job-opportunities'
                ? lang === 'es'
                  ? ['Medio tiempo', 'Administrativo', 'Organización Maya']
                  : ['Part-time', 'Administrative', 'Maya-led nonprofit']
                : undefined
          }
        />

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
          />
        ))}

        {currentPage.quote ? (
          <AboutQuoteFigure
            label={t.aboutPage.quoteLabel}
            quote={currentPage.quote.body}
            source={currentPage.quote.source}
          />
        ) : null}
      </AboutPageShell>
      <Footer />
    </>
  )
}
