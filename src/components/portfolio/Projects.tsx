import { useState } from 'react'
import { ArrowUpRight, ChevronDown, Info } from 'lucide-react'
import { projects, type Project } from '@/content/site'
import { cn } from '@/lib/utils'
import { GitHubIcon, Section, SectionHeading, Tag, cdn, cdnSrcSet, stagger } from './primitives'
import { useTilt } from './hooks'

const accentGlow: Record<Project['accent'], string> = {
  cyan: 'from-cyan/35',
  violet: 'from-violet/40',
  blue: 'from-azure/35',
  teal: 'from-cyan/25',
}

function ProjectCard({
  project,
  index,
  featured,
  reverse,
}: {
  project: Project
  index: number
  featured: boolean
  reverse: boolean
}) {
  const tiltRef = useTilt<HTMLElement>(featured ? 3 : 5)
  const [open, setOpen] = useState(false)
  const detailsId = `project-${project.slug}-details`

  return (
    <div className={cn('reveal', featured && 'md:col-span-2')} style={stagger(index % 2)}>
      <article
        ref={tiltRef}
        className={cn(
          'tilt group glass edge relative flex h-full flex-col overflow-hidden rounded-[1.75rem]',
          featured && 'md:grid',
          featured && (reverse ? 'md:grid-cols-[1fr_1.25fr]' : 'md:grid-cols-[1.25fr_1fr]'),
        )}
      >
        <div className="shine pointer-events-none absolute inset-0 z-10" aria-hidden="true" />

        <div className={cn('relative overflow-hidden', reverse && 'md:order-2', featured ? 'aspect-[16/10] md:aspect-auto md:min-h-[26rem]' : 'aspect-[16/9]')}>
          <img
            src={cdn(project.image, 960)}
            srcSet={cdnSrcSet(project.image, [480, 720, 960, 1280])}
            sizes={featured ? '(min-width: 768px) 640px, 100vw' : '(min-width: 768px) 560px, 100vw'}
            alt={project.imageAlt}
            width={1376}
            height={768}
            loading="lazy"
            decoding="async"
            className={cn('zoom-img h-full w-full object-cover', featured && 'md:absolute md:inset-0')}
          />
          <div className={cn('absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60', accentGlow[project.accent])} aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" aria-hidden="true" />
          <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-ink-950/60 px-3 py-1 font-mono text-[0.68rem] tracking-wider text-text/80 backdrop-blur">
            0{index + 1}
          </span>
        </div>

        <div className="relative z-20 flex flex-1 flex-col p-7 md:p-8">
          <p className="eyebrow !text-[0.66rem]">{project.kicker}</p>
          <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-text md:text-[1.7rem]">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-muted-text">{project.description}</p>

          {project.note && (
            <p className="mt-4 flex gap-2 text-sm text-dim">
              <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              {project.note}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={() => setOpen((v) => !v)}
            className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-violet-soft transition-colors hover:text-text"
          >
            {open ? 'Hide' : 'Show'} problem, approach &amp; learning
            <ChevronDown size={16} className={cn('transition-transform duration-300', open && 'rotate-180')} aria-hidden="true" />
          </button>
          <dl
            id={detailsId}
            hidden={!open}
            className="mt-4 space-y-3 rounded-2xl border border-hairline bg-ink-950/50 p-5 text-sm animate-in fade-in slide-in-from-top-1"
          >
            {project.details.map((d) => (
              <div key={d.label} className="grid gap-1 sm:grid-cols-[6.5rem_1fr]">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-cyan-soft">{d.label}</dt>
                <dd className="text-text/85">{d.text}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-11 !text-sm">
                View live demo
                <ArrowUpRight size={17} className="arrow" aria-hidden="true" />
                <span className="sr-only">(opens {project.title} in a new tab)</span>
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center rounded-full border border-dashed border-hairline px-4 font-mono text-xs uppercase tracking-[0.18em] text-dim">
                Concept project
              </span>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11 !text-sm">
                <GitHubIcon className="h-4 w-4" />
                Source code
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Featured projects"
        title="Things I Have Built."
        subtitle="Exploring AI through practical projects and intelligent digital experiences."
      />
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} featured={i === 0 || i === projects.length - 1} reverse={i > 0 && i === projects.length - 1} />
        ))}
      </div>
    </Section>
  )
}
