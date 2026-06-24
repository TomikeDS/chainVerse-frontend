import HeroSection from '@/src/shared/HeroSection'
import { Features } from './sections/Features/Features'
import FeaturedCourses from '@/src/shared/FeaturedCourses'
import Footer from '@/src/shared/Footer'

export function LandingPage() {
  return (
    <main>
      <HeroSection />
      <Features />
      <FeaturedCourses />
      <Footer />
    </main>
  )
}
