import type { CSSProperties, ReactNode, SVGProps } from 'react'
import { cn } from '@/lib/utils'
import { profile } from '@/content/site'

/** Stagger index for `.reveal` / `.enter` transitions. */
export const stagger = (n: number) => ({ '--d': n }) as CSSProperties

/** Netlify Image CDN URL — serves resized WebP instead of the full-size original. */
export function cdn(src: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp&q=78`
}

export function cdnSrcSet(src: string, widths: number[]) {
  return widths.map((w) => `${cdn(src, w)} ${w}w`).join(', ')
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-grid place-items-center rounded-xl font-display font-bold tracking-tight text-white',
        className,
      )}
    >
      <span className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-cyan/90 via-violet/70 to-violet-soft/40 opacity-90" />
      <span className="absolute inset-[1.5px] rounded-[inherit] bg-ink-950/90" />
      <span className="relative bg-gradient-to-br from-cyan-soft to-violet-soft bg-clip-text text-transparent">
        {profile.initials}
      </span>
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}) {
  return (
    <header className={cn('reveal mb-12 md:mb-16', align === 'center' && 'mx-auto max-w-2xl text-center')}>
      <p className={cn('eyebrow mb-4 flex items-center gap-3', align === 'center' && 'justify-center')}>
        <span className="h-px w-8 bg-gradient-to-r from-violet to-cyan" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && <p className="mt-5 max-w-xl text-lg text-muted-text">{subtitle}</p>}
    </header>
  )
}

export function Section({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={cn('relative z-10 px-5 py-24 sm:px-8 md:py-32', className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-hairline bg-ink-800/70 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-cyan-soft/90">
      {children}
    </span>
  )
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3" />
    </svg>
  )
}
