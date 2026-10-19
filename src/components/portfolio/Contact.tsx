import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '@/content/site'
import { LinkedInIcon, Monogram, Section, SectionHeading, stagger } from './primitives'

type FormState = 'idle' | 'pending' | 'success' | 'error'

// Field names must stay in sync with public/contact-form.html (Netlify Forms registration).
function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const form = event.currentTarget
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/contact-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      // A plain static server echoes the registration file back instead of processing it.
      if (/\bdata-netlify\s*=/i.test(await response.text())) throw new Error('Form handling unavailable')
      form.reset()
      setState('success')
    } catch {
      setState('error')
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/contact-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => state !== 'pending' && state !== 'idle' && setState('idle')}
      className="glass edge reveal rounded-[1.75rem] p-7 md:p-9"
      style={stagger(1)}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="space-y-5">
        <legend className="mb-2 font-display text-xl font-bold text-text">Send a message</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted-text">Name</span>
            <input name="name" required maxLength={100} autoComplete="name" className="field" placeholder="Your name" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-muted-text">Email</span>
            <input name="email" type="email" required maxLength={254} autoComplete="email" className="field" placeholder="you@example.com" />
          </label>
        </div>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-muted-text">Message</span>
          <textarea
            name="message"
            required
            maxLength={2000}
            rows={5}
            className="field resize-none"
            placeholder="Tell me about the opportunity or project…"
          />
        </label>
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          {state === 'pending' ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              Send message <Send size={17} className="arrow" aria-hidden="true" />
            </>
          )}
        </button>
      </fieldset>
      <div aria-live="polite" className="mt-5 text-sm">
        {state === 'success' && (
          <p role="status" className="rounded-xl border border-cyan/30 bg-cyan/10 px-4 py-3 text-cyan-soft">
            Thank you — your message was received. I&apos;ll get back to you soon.
          </p>
        )}
        {state === 'error' && (
          <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-red-200">
            Your message couldn&apos;t be sent right now. Your details are still here — please try again, or email me
            directly.
          </p>
        )}
      </div>
    </form>
  )
}

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: Mail, external: false },
  { label: 'Phone', value: profile.phoneDisplay, href: profile.phoneHref, Icon: Phone, external: false },
  { label: 'LinkedIn', value: 'Connect on LinkedIn', href: profile.linkedin, Icon: LinkedInIcon, external: true },
]

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's Build Something Intelligent."
            subtitle="Interested in AI, Generative AI, or collaborative projects? Let's connect."
          />
          <ul className="space-y-3">
            {channels.map(({ label, value, href, Icon, external }, i) => (
              <li key={label} className="reveal" style={stagger(i)}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group glass edge flex items-center gap-4 rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span className="icon-bob grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet/35 to-cyan/15 text-cyan-soft">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-dim">{label}</span>
                    <span className="block truncate font-semibold text-text">{value}</span>
                  </span>
                  <ArrowUpRight size={18} className="text-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li className="reveal flex items-center gap-3 px-4 pt-3 text-muted-text" style={stagger(3)}>
              <MapPin size={18} className="text-violet-soft" aria-hidden="true" />
              {profile.location}
            </li>
          </ul>
        </div>
        <ContactForm />
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-hairline px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Monogram className="h-11 w-11 text-sm" />
          <div>
            <p className="font-display font-semibold text-text">{profile.name}</p>
            <p className="text-sm text-muted-text">{profile.headline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-muted-text transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Send an email"
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-muted-text transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <Mail size={17} />
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl font-mono text-xs text-dim">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>
    </footer>
  )
}
