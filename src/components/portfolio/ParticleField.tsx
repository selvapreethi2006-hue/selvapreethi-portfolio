import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './hooks'

/** Lightweight canvas of drifting particles with faint neural links. Pauses offscreen. */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = prefersReducedMotion()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0
    let frame = 0
    let running = true
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number }
    let particles: P[] = []

    const resize = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(70, (width * height) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18 - 0.05,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random() > 0.55 ? 186 : 262,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = dx * dx + dy * dy
          if (dist < 12000) {
            ctx.strokeStyle = `hsla(${a.hue}, 90%, 70%, ${0.09 * (1 - dist / 12000)})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        ctx.fillStyle = `hsla(${a.hue}, 90%, 75%, 0.75)`
        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const tick = () => {
      if (!running) return
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
      }
      draw()
      frame = requestAnimationFrame(tick)
    }

    resize()
    if (reduced) {
      draw()
    } else {
      frame = requestAnimationFrame(tick)
    }

    const visibility = new IntersectionObserver(([entry]) => {
      if (reduced) return
      running = entry.isIntersecting
      cancelAnimationFrame(frame)
      if (running) frame = requestAnimationFrame(tick)
    })
    visibility.observe(canvas)
    window.addEventListener('resize', resize)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      visibility.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
