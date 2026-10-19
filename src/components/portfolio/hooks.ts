import { useEffect, useRef, useState } from 'react'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Adds `is-visible` to every `.reveal` / `.timeline-line` element once it scrolls into view. */
export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('.reveal, .timeline-line')
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )
    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

/** Tracks the section currently in view, for the nav's active indicator. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids])
  return active
}

/** Writes normalized pointer position (-1..1) to `--px` / `--py` on the element for parallax layers. */
export function usePointerParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--px', (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3))
        el.style.setProperty('--py', (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3))
      })
    }
    const onLeave = () => {
      el.style.setProperty('--px', '0')
      el.style.setProperty('--py', '0')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [])
  return ref
}

/** Perspective tilt that follows the pointer. Disabled for touch and reduced motion. */
export function useTilt<T extends HTMLElement>(max = 6) {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return
    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      el.style.setProperty('--ry', `${((x - 0.5) * max * 2).toFixed(2)}deg`)
      el.style.setProperty('--rx', `${((0.5 - y) * max * 2).toFixed(2)}deg`)
      el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
    }
    const onLeave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [max])
  return ref
}
