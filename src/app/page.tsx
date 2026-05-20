import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/sections/HeroSection'
import ImpactMomentSection from '@/components/sections/ImpactMomentSection'
import MissionSection from '@/components/sections/MissionSection'
import ProgramsSection from '@/components/sections/ProgramsSection'
import CallToActionSection from '@/components/sections/CallToActionSection'
import ResourcesSection from '@/components/sections/ResourcesSection'
import NewsSection from '@/components/sections/NewsSection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <ImpactMomentSection />
        <MissionSection />
        <ProgramsSection />
        <CallToActionSection />
        <ResourcesSection />
        <NewsSection />
      </main>
      <Footer />
    </>
  )
}
