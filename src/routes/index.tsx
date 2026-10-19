import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import { Intro } from '@/components/portfolio/Intro'
import { Nav } from '@/components/portfolio/Nav'
import { Hero } from '@/components/portfolio/Hero'
import { About, Experience, Statement } from '@/components/portfolio/AboutExperience'
import { Projects } from '@/components/portfolio/Projects'
import { Certifications, Education, Resume, Skills } from '@/components/portfolio/Sections'
import { Contact, Footer } from '@/components/portfolio/Contact'
import { useScrollReveal } from '@/components/portfolio/hooks'

export const Route = createFileRoute('/')({
  component: Portfolio,
})

function Portfolio() {
  const [ready, setReady] = useState(false)
  const reveal = useCallback(() => setReady(true), [])
  useScrollReveal()

  return (
    <>
      <div className="page-atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-cyan focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Intro onReveal={reveal} />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Statement />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
