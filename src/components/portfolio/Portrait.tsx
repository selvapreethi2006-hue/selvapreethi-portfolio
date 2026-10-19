import { profile } from '@/content/site'
import { cn } from '@/lib/utils'
import { cdn, cdnSrcSet } from './primitives'

/**
 * Portrait in a luminous violet–cyan frame. Uses `profile.portrait.src` from
 * `src/content/site.ts`; until a photo is set it shows the SP monogram avatar
 * (never a stand-in face).
 */
export function Portrait({ className, sizes = '(min-width: 1024px) 420px, 72vw' }: { className?: string; sizes?: string }) {
  const { src, alt } = profile.portrait

  return (
    <div className={cn('portrait-frame relative aspect-square rounded-full p-[2px]', className)}>
      <div className="relative h-full w-full overflow-hidden rounded-full bg-ink-900">
        {src ? (
          <img
            src={cdn(src, 640)}
            srcSet={cdnSrcSet(src, [360, 480, 640, 900])}
            sizes={sizes}
            alt={alt}
            width={640}
            height={640}
            className="h-full w-full object-cover object-[50%_25%]"
            fetchPriority="high"
          />
        ) : (
          <div
            role="img"
            aria-label={`${profile.name} monogram`}
            className="relative grid h-full w-full place-items-center bg-[radial-gradient(circle_at_35%_30%,rgba(56,225,240,0.22),transparent_55%),radial-gradient(circle_at_70%_75%,rgba(139,92,246,0.4),transparent_60%),#0b0820]"
          >
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
              {[
                [40, 60, 100, 40],
                [100, 40, 160, 70],
                [40, 60, 70, 120],
                [160, 70, 140, 130],
                [70, 120, 140, 130],
                [70, 120, 100, 165],
                [140, 130, 100, 165],
                [100, 40, 100, 100],
                [100, 100, 70, 120],
                [100, 100, 140, 130],
              ].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#pg)" strokeWidth="0.6" />
              ))}
              {[
                [40, 60],
                [100, 40],
                [160, 70],
                [70, 120],
                [140, 130],
                [100, 165],
                [100, 100],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="2.2" fill="#8af0f8" />
              ))}
              <defs>
                <linearGradient id="pg" x1="0" x2="1">
                  <stop offset="0" stopColor="#a78bfa" />
                  <stop offset="1" stopColor="#38e1f0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="relative bg-gradient-to-br from-white via-violet-soft to-cyan bg-clip-text font-display text-[clamp(4rem,12vw,8rem)] font-extrabold leading-none tracking-tighter text-transparent">
              {profile.initials}
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(5,4,10,0.6)]" />
      </div>
    </div>
  )
}
