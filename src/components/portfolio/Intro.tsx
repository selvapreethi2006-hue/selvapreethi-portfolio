import { useEffect, useState } from 'react'
import { profile } from '@/content/site'
import { prefersReducedMotion } from './hooks'

const SEEN_KEY = 'sp-intro-seen'
const INTRO_MS = 1700

/** Brief first-load reveal. Skippable, shown once per session, skipped for reduced motion. */
export function Intro({ onReveal }: { onReveal: () => void }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Storage unavailable — just play the intro.
    }
    if (seen || prefersReducedMotion()) {
      setDone(true)
      onReveal()
      return
    }
    const timer = window.setTimeout(() => {
      setDone(true)
      onReveal()
    }, INTRO_MS)
    return () => window.clearTimeout(timer)
  }, [onReveal])

  const skip = () => {
    setDone(true)
    onReveal()
  }

  return (
    <div className="intro" data-done={done} aria-hidden={done} role="presentation">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan/70 animate-pulse"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37 + 11) % 100}%`,
              animationDelay: `${(i % 6) * 0.25}s`,
              opacity: 0.25 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>
      <div className="relative w-[min(88vw,40rem)] text-center">
        <p className="intro-name font-display text-4xl font-bold tracking-tight text-text sm:text-6xl">{profile.name}</p>
        <div className="intro-line mx-auto my-6 w-full" />
        <p className="intro-sub eyebrow">{profile.role} · Aspiring AI Engineer</p>
      </div>
      {!done && (
        <button
          type="button"
          onClick={skip}
          className="absolute bottom-8 right-8 rounded-full border border-hairline px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-text transition-colors hover:text-text"
        >
          Skip intro
        </button>
      )}
    </div>
  )
}
