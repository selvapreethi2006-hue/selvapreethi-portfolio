import { BrainCircuit, Briefcase, GraduationCap, Sparkles, Target } from 'lucide-react'
import { about, experience, profile } from '@/content/site'
import { Section, SectionHeading, Tag, stagger } from './primitives'
import { Portrait } from './Portrait'

export function Statement() {
  return (
    <section className="relative z-10 border-y border-hairline bg-ink-900/40 px-5 py-20 sm:px-8 md:py-28" aria-label="Personal statement">
      <div className="mx-auto max-w-5xl">
        <p className="reveal eyebrow mb-6">Personal brand</p>
        <p className="reveal font-display text-[clamp(2.2rem,5.5vw,4.6rem)] font-bold leading-[1.02] tracking-tight" style={stagger(1)}>
          <span className="text-gradient">{profile.headline}</span>
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <p className="reveal text-xl leading-relaxed text-text/85" style={stagger(2)}>
            {profile.supportingHeadline}
          </p>
          <p className="reveal leading-relaxed text-muted-text" style={stagger(3)}>
            {profile.brandStatement}
          </p>
        </div>
      </div>
    </section>
  )
}

const highlightIcons = [Briefcase, GraduationCap, Target]

export function About() {
  return (
    <Section id="about">
      <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="reveal relative mx-auto w-full max-w-sm lg:sticky lg:top-28">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glass edge p-8">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet/25 blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-cyan/15 blur-3xl" aria-hidden="true" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Profile</span>
                <BrainCircuit className="text-cyan-soft portrait-float" size={26} aria-hidden="true" />
              </div>
              <Portrait className="mx-auto w-3/4" sizes="300px" />
              <div>
                <p className="font-display text-2xl font-bold text-text">{profile.name}</p>
                <p className="mt-1 text-sm text-muted-text">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading eyebrow="About me" title={about.title} />
          <div className="space-y-5 text-lg leading-relaxed text-muted-text">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="reveal" style={stagger(i)}>
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-12 grid gap-4 sm:grid-cols-3">
            {about.highlights.map((h, i) => {
              const Icon = highlightIcons[i % highlightIcons.length]
              return (
                <div key={h.label} className="reveal group glass edge rounded-2xl p-5" style={stagger(i + 1)}>
                  <Icon size={20} className="icon-bob mb-4 text-cyan" aria-hidden="true" />
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-dim">{h.label}</dt>
                  <dd className="mt-2 font-semibold leading-snug text-text">{h.value}</dd>
                </div>
              )
            })}
          </dl>
        </div>
      </div>
    </Section>
  )
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading eyebrow="Work experience" title="Experience That Shapes My Journey." />
      <div className="relative pl-10 md:pl-0">
        {/* Timeline spine */}
        <div className="absolute bottom-0 left-[11px] top-2 w-px bg-hairline md:left-[calc(30%-0.5px)]" aria-hidden="true">
          <div className="timeline-line h-full w-full bg-gradient-to-b from-cyan via-violet to-transparent" />
        </div>

        <ol className="space-y-12">
          {experience.map((job) => (
            <li key={job.role} className="relative grid gap-6 md:grid-cols-[30%_1fr] md:gap-14">
              <div className="reveal md:pr-14 md:text-right">
                <span
                  className={`absolute -left-10 top-1.5 grid h-6 w-6 place-items-center rounded-full border border-cyan/60 bg-ink-950 md:left-[calc(30%-12px)] ${job.current ? 'pulse-marker' : ''}`}
                  aria-hidden="true"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_14px_#38e1f0]" />
                </span>
                <p className="font-mono text-sm text-cyan-soft">{job.duration}</p>
                <p className="mt-2 font-display text-xl font-semibold text-text">{job.organization}</p>
                {job.current && (
                  <span className="mt-3 inline-block rounded-full bg-cyan/10 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-cyan">
                    Current role
                  </span>
                )}
              </div>

              <article className="reveal group glass edge rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 md:p-9" style={stagger(1)}>
                <div className="flex items-start gap-4">
                  <span className="icon-bob grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet/30 to-cyan/20 text-cyan-soft">
                    <Sparkles size={20} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-bold leading-tight text-text">{job.role}</h3>
                </div>
                <p className="mt-5 leading-relaxed text-muted-text">{job.description}</p>
                <ul className="mt-6 space-y-3">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-text/85">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gradient-to-br from-cyan to-violet" aria-hidden="true" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-2 border-t border-hairline pt-6">
                  {job.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
