import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import ImpactMomentSection from '@/components/sections/ImpactMomentSection'
import MissionSection from '@/components/sections/MissionSection'
import CallToActionSection from '@/components/sections/CallToActionSection'
import ResourcesSection from '@/components/sections/ResourcesSection'
import NewsSection from '@/components/sections/NewsSection'
import Footer from '@/components/layout/Footer'
import { getHomepageNewsArticles } from '@/lib/newsRepository'
import { getHomepageContent } from '@/lib/homepageRepository'

export const revalidate = 60

export default async function HomePage() {
  const [content, newsArticles] = await Promise.all([
    getHomepageContent(),
    getHomepageNewsArticles(4),
  ])

  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection content={content?.hero} />
        <ImpactMomentSection content={content?.impactMoment} />
        <MissionSection content={content?.mission} />
        <ResourcesSection content={content?.resources} />
        <CallToActionSection content={content?.cta} />
        <NewsSection articles={newsArticles} content={content?.newsRail} />
      </main>
      <Footer />
    </>
  )
}
