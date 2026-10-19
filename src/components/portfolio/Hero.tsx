import { ArrowRight, Download, MessageCircle } from 'lucide-react'
import type { CSSProperties } from 'react'
import { profile } from '@/content/site'
import { cn } from '@/lib/utils'
import { ParticleField } from './ParticleField'
import { Portrait } from './Portrait'
import { usePointerParallax } from './hooks'
import { stagger } from './primitives'

const depth = (px: number) => ({ '--depth': `${px}px` }) as CSSProperties

export function Hero({ ready }: { ready: boolean }) {
  const sceneRef = usePointerParallax<HTMLElement>()

  return (
    <section
      id="home"
      ref={sceneRef}
      className={cn('relative z-10 flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-28 sm:px-8', ready && 'hero-ready')}
    >
      {/* Environment */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-grid" />
        <ParticleField className="absolute inset-0 h-full w-full" />
        <div className="parallax absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-violet/20 blur-[120px]" style={depth(-24)} />
        <div className="parallax absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-cyan/10 blur-[110px]" style={depth(18)} />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Introduction */}
        <div className="order-2 lg:order-1">
          {profile.availability && (
            <p
              className="enter mb-7 inline-flex items-center gap-2.5 rounded-full border border-cyan/25 bg-cyan/[0.06] px-4 py-2 text-[0.8rem] font-medium text-cyan-soft"
              style={stagger(0)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              {profile.availability}
            </p>
          )}

          <h1 className="enter font-display text-[clamp(2.6rem,6.4vw,5.2rem)] font-bold leading-[0.98] tracking-tight text-text" style={stagger(1)}>
            Hi, I&apos;m <span className="text-gradient">{profile.name}.</span>
          </h1>

          <p className="enter mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm uppercase tracking-[0.18em] text-violet-soft" style={stagger(2)}>
            {profile.role}
          </p>
          <p className="enter mt-3 font-display text-2xl font-semibold text-text/90 sm:text-3xl" style={stagger(3)}>
            {profile.tagline}
          </p>
          <p className="enter mt-6 max-w-xl text-lg leading-relaxed text-muted-text" style={stagger(4)}>
            {profile.heroDescription}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#projects" className="enter btn btn-primary" style={stagger(5)}>
              Explore My Projects
              <ArrowRight size={18} className="arrow" />
            </a>
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download="Selva-Preethi-J-Resume.pdf"
                className="enter btn btn-ghost"
                style={stagger(6)}
              >
                <Download size={18} />
                Download My Resume
              </a>
            )}
            <a href="#contact" className="enter btn btn-ghost" style={stagger(7)}>
              <MessageCircle size={18} />
              Let&apos;s Connect
            </a>
          </div>
        </div>

        {/* Portrait + AI orb */}
        <div className="orb-stage relative order-1 mx-auto w-[min(78vw,26rem)] lg:order-2 lg:w-full lg:max-w-[30rem]">
          <div className="enter-portrait enter relative aspect-square">
            {/* Orb sits behind and offset from the portrait */}
            <div className="parallax pointer-events-none absolute -right-[12%] -top-[14%] h-[46%] w-[46%]" style={depth(-22)} aria-hidden="true">
              <div className="orb-core absolute inset-0" />
              <div className="orb-mesh absolute inset-0" />
              <div className="ring ring-a -inset-[30%]" />
              <div className="ring ring-b -inset-[48%]" />
            </div>

            <div className="pointer-events-none absolute -inset-[9%]" aria-hidden="true">
              <div className="orbit-path absolute inset-0">
                <span className="orbit-dot left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="orbit-path reverse absolute inset-[6%]">
                <span className="orbit-dot bottom-[14%] left-[3%] bg-violet-soft shadow-[0_0_12px_#8b5cf6]" />
              </div>
              <div className="ring ring-c inset-[-4%]" />
            </div>

            <div className="absolute inset-[10%] rounded-full bg-violet/30 blur-3xl" aria-hidden="true" />

            <div className="parallax relative h-full w-full" style={depth(8)}>
              <div className="portrait-float h-full w-full p-[10%]">
                <Portrait className="h-full w-full" />
              </div>
            </div>

            <div
              className="glass parallax absolute -left-[6%] bottom-[8%] hidden rounded-2xl px-4 py-3 sm:block"
              style={depth(14)}
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-dim">Currently</p>
              <p className="mt-1 text-sm font-semibold text-text">AI &amp; ML Intern · SURE ProEd</p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-dim transition-colors hover:text-text md:flex"
      >
        Scroll
        <span className="h-10 w-px overflow-hidden bg-hairline">
          <span className="block h-1/2 w-full animate-bounce bg-gradient-to-b from-cyan to-transparent" />
        </span>
      </a>
    </section>
  )
}
