import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navItems, profile } from '@/content/site'
import { cn } from '@/lib/utils'
import { Monogram } from './primitives'
import { useActiveSection } from './hooks'

const sectionIds = navItems.map((item) => item.id)

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="nav-shell fixed inset-x-0 top-0 z-50" data-scrolled={scrolled || open}>
      <nav aria-label="Primary" className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="#home" className="group flex items-center gap-3" aria-label={`${profile.name} — back to top`}>
          <Monogram className="h-10 w-10 text-sm transition-transform duration-500 group-hover:rotate-[-8deg]" />
          <span className="hidden font-display text-sm font-semibold tracking-wide text-text sm:block">
            {profile.name}
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'nav-link rounded-full px-3 py-2 text-[0.84rem] font-medium transition-colors',
                  active === item.id ? 'text-text' : 'text-muted-text hover:text-text',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-text lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-hairline bg-ink-950/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex max-h-[calc(100dvh-4.5rem)] max-w-6xl flex-col gap-1 overflow-y-auto px-5 py-6">
          {navItems.map((item, i) => (
            <li key={item.id} className="animate-in fade-in slide-in-from-top-2" style={{ animationDelay: `${i * 30}ms` }}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-xl font-semibold',
                  active === item.id ? 'bg-ink-800 text-text' : 'text-muted-text',
                )}
              >
                {item.label}
                <span className="font-mono text-xs text-dim">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
