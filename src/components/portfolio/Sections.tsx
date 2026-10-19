import { Award, BadgeCheck, BarChart3, Cloud, Code2, Download, Eye, FileText, GraduationCap, Languages, MessagesSquare, Sparkles, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { certificates, education, languages, profile, simulations, skillGroups, softSkills } from '@/content/site'
import { Section, SectionHeading, cdn, stagger } from './primitives'

const skillIcons: Record<(typeof skillGroups)[number]['icon'], LucideIcon> = {
  sparkles: Sparkles,
  code: Code2,
  chart: BarChart3,
  cloud: Cloud,
  tools: Wrench,
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading eyebrow="Technical skills" title="My Technical Toolkit." />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = skillIcons[group.icon]
          // The AI group is the lead tile of an asymmetric bento layout.
          return (
            <div key={group.name} className={`reveal ${i === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-2' : ''}`} style={stagger(i)}>
              <article className="group glass edge flex h-full flex-col rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="icon-bob grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet/35 to-cyan/15 text-cyan-soft">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-dim">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold text-text">{group.name}</h3>
                <ul className={`mt-5 flex flex-wrap gap-2.5 ${i === 0 ? 'lg:mt-auto lg:pt-8' : ''}`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-xl border border-hairline bg-ink-950/50 px-3.5 py-2 text-sm text-text/90 transition-colors duration-300 hover:border-cyan/50 hover:text-white"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          )
        })}
      </div>

      {/* Soft skills and languages */}
      <div className="mt-6 grid gap-5 md:grid-cols-[1.4fr_1fr]">
        <div className="reveal glass edge rounded-3xl p-7">
          <div className="flex items-center gap-3">
            <MessagesSquare size={20} className="text-violet-soft" aria-hidden="true" />
            <h3 className="font-display text-lg font-bold text-text">Soft skills</h3>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {softSkills.map((s, i) => (
              <li
                key={s}
                className="rounded-full bg-gradient-to-r from-violet/20 to-cyan/10 px-4 py-2 text-sm font-medium text-text animate-in fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="reveal glass edge rounded-3xl p-7" style={stagger(1)}>
          <div className="flex items-center gap-3">
            <Languages size={20} className="text-cyan-soft" aria-hidden="true" />
            <h3 className="font-display text-lg font-bold text-text">Languages</h3>
          </div>
          <ul className="mt-5 divide-y divide-hairline">
            {languages.map((l) => (
              <li key={l.name} className="flex items-center justify-between py-3">
                <span className="font-semibold text-text">{l.name}</span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-text">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

export function Education() {
  return (
    <Section id="education">
      <SectionHeading eyebrow="Education" title="My Academic Journey." />
      <div className="relative">
        <div className="absolute left-[11px] top-0 h-full w-px bg-hairline md:left-0 md:right-0 md:top-[11px] md:h-px md:w-full" aria-hidden="true">
          <div className="timeline-line timeline-x h-full w-full bg-gradient-to-b from-violet via-cyan to-transparent md:bg-gradient-to-r" />
        </div>
        <ol className="grid gap-10 pl-10 md:grid-cols-2 md:pl-0 md:pt-12">
          {education.map((item, i) => (
            <li key={item.title} className="reveal relative" style={stagger(i)}>
              <span
                className={`absolute -left-10 top-1 grid h-6 w-6 place-items-center rounded-full border border-violet-soft/60 bg-ink-950 md:-top-12 md:left-0 ${item.current ? 'pulse-marker' : ''}`}
                aria-hidden="true"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-violet-soft shadow-[0_0_14px_#8b5cf6]" />
              </span>
              <article className="group glass edge h-full rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 md:p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="eyebrow">{item.level}</span>
                  <span className="font-mono text-sm text-muted-text">{item.duration}</span>
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <span className="icon-bob grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet/35 to-cyan/15 text-violet-soft">
                    <GraduationCap size={22} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold leading-snug text-text">{item.title}</h3>
                    <p className="mt-2 text-muted-text">{item.institution}</p>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

export function Certifications() {
  const published = certificates.filter((c) => c.published)

  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Certifications & simulations"
        title="Learning Never Stops."
        subtitle="Virtual internships, industry simulations and certificates that keep my skills growing."
      />

      <h3 className="reveal mb-6 flex items-center gap-3 font-display text-2xl font-bold text-text">
        <BadgeCheck className="text-cyan" size={22} aria-hidden="true" />
        Industry Learning &amp; Simulations.
      </h3>
      <div className="grid gap-5 md:grid-cols-3">
        {simulations.map((sim, i) => (
          <div key={sim.title} className="reveal" style={stagger(i)}>
            <article className="group glass edge relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1">
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-violet/30 to-cyan/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-60" aria-hidden="true" />
              <div className="relative flex items-center justify-between">
                <span className="font-display text-lg font-bold tracking-wide text-text">{sim.organization}</span>
                <span className="font-mono text-sm text-cyan-soft">{sim.year}</span>
              </div>
              <p className="relative mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">
                Virtual internship · Industry simulation
              </p>
              <h4 className="relative mt-5 text-lg font-semibold leading-snug text-text">{sim.title}</h4>
              <p className="relative mt-3 text-sm leading-relaxed text-muted-text">{sim.description}</p>
              {sim.certificateImage && (
                <img
                  src={cdn(sim.certificateImage, 640)}
                  alt={`${sim.organization} ${sim.title} certificate`}
                  loading="lazy"
                  className="relative mt-5 rounded-xl border border-hairline"
                />
              )}
              {sim.certificateUrl && (
                <a
                  href={sim.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-violet-soft hover:text-text"
                >
                  <Award size={16} aria-hidden="true" /> View certificate
                </a>
              )}
            </article>
          </div>
        ))}
      </div>

      {published.length > 0 && (
        <>
          <h3 className="reveal mb-6 mt-16 flex items-center gap-3 font-display text-2xl font-bold text-text">
            <Award className="text-violet-soft" size={22} aria-hidden="true" />
            Certificates
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {published.map((cert, i) => (
              <article key={cert.title} className="reveal group glass edge flex flex-col overflow-hidden rounded-3xl" style={stagger(i % 3)}>
                {cert.image && (
                  <div className="aspect-[4/3] overflow-hidden border-b border-hairline">
                    <img src={cdn(cert.image, 720)} alt={`${cert.title} certificate`} loading="lazy" className="zoom-img h-full w-full object-cover" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow !text-[0.65rem]">{cert.issuer}</p>
                  <h4 className="mt-3 text-lg font-semibold text-text">{cert.title}</h4>
                  <p className="mt-1 font-mono text-xs text-dim">{cert.date}</p>
                  <div className="mt-auto flex flex-wrap gap-4 pt-5 text-sm font-semibold">
                    {cert.fileUrl && (
                      <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-soft hover:text-text">
                        View certificate
                      </a>
                    )}
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" className="text-violet-soft hover:text-text">
                        Verify credential
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </Section>
  )
}

export function Resume() {
  if (!profile.resumeUrl) return null
  return (
    <section className="relative z-10 px-5 py-12 sm:px-8" aria-labelledby="resume-title">
      <div className="reveal mx-auto max-w-6xl">
        <div className="glass edge relative overflow-hidden rounded-[2rem] px-7 py-12 md:px-14 md:py-16">
          <div className="absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-violet/30 blur-[100px]" aria-hidden="true" />
          <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-cyan/10 blur-[80px]" aria-hidden="true" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-4 flex items-center gap-2">
                <FileText size={14} aria-hidden="true" /> Resume
              </p>
              <h2 id="resume-title" className="font-display text-4xl font-bold tracking-tight text-text md:text-5xl">
                Explore My Journey.
              </h2>
              <p className="mt-4 max-w-lg text-lg text-muted-text">
                Discover my education, experience, technical skills, and AI projects in detail.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <a href={profile.resumeUrl} download="Selva-Preethi-J-Resume.pdf" className="btn btn-primary">
                <Download size={18} aria-hidden="true" /> Download Resume
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Eye size={18} aria-hidden="true" /> Preview Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
