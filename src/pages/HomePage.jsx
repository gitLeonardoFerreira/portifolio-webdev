import { useEffect, useState, lazy, Suspense } from 'react'
import Hero from '../components/home/Hero.jsx'
import { AboutSection, JourneySection } from '../components/home/ProfileSections.jsx'
import ProjectsSection from '../components/projects/ProjectsSection.jsx'
import ContactSection from '../components/ContactSection.jsx'
import Footer from '../components/Footer.jsx'
const FlightExperience = lazy(() => import('../components/home/FlightExperience.jsx'))
export default function HomePage() {
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    document.title = 'Leonardo Barbosa — Engenharia de Software'
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  if (!reducedMotion) {
    return (
      <main>
        <Suspense fallback={<Hero flight />}>
          <FlightExperience />
        </Suspense>
      </main>
    )
  }

  return (
    <>
      <main>
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
