# AGENTS.md

Single-page personal portfolio for Selva Preethi J (AI & ML Intern, aspiring Generative AI Engineer). TanStack Start + React 19 + Tailwind v4, deployed on Netlify.

## Architecture

- `src/routes/index.tsx` — the only page. Composes all sections in order and owns the `ready` flag that starts the hero entrance once the intro lifts.
- `src/routes/__root.tsx` — document shell, metadata, Google Fonts (Syne display, Manrope body, JetBrains Mono labels), favicon, `<noscript>` fallback that un-hides reveal content.
- `src/content/site.ts` — **single source of truth for all content.** Components never hard-code personal data.
- `src/components/portfolio/`
  - `Intro.tsx` — ~1.7s first-load overlay, skippable, once per session (sessionStorage), skipped for reduced motion.
  - `Nav.tsx` — fixed nav, glass on scroll, active-section indicator, mobile menu.
  - `Hero.tsx`, `ParticleField.tsx`, `Portrait.tsx` — hero scene (CSS 3D orb/rings, canvas particles, pointer parallax) and the portrait frame.
  - `AboutExperience.tsx` — Statement band, About, Experience timeline.
  - `Projects.tsx` — project gallery with tilt cards and expandable problem/approach/learning.
  - `Sections.tsx` — Skills, Education, Certifications (simulations + certificate gallery), Resume.
  - `Contact.tsx` — contact channels, Netlify Forms contact form, footer.
  - `hooks.ts` — scroll reveal, active section, pointer parallax, tilt.
  - `primitives.tsx` — Section/SectionHeading/Tag/Monogram, brand SVG icons, Image CDN helpers, `stagger()`.
- `src/styles.css` — theme tokens and the whole motion system (`.reveal`, `.enter`, `.tilt`, `.orb-*`, `.ring-*`, `.timeline-line`, reduced-motion overrides).
- `public/img/` — generated project artwork (served through `/.netlify/images`, never directly).
- `public/resume/` — the real resume PDF.
- `public/contact-form.html` — static Netlify Forms registration for the `contact` form.

## Conventions and non-obvious decisions

- **Never invent facts.** No fabricated metrics, proficiency bars, certificate IDs, GitHub URLs or achievements. Optional fields left empty are hidden in the UI rather than shown as placeholders.
- **Portrait:** `profile.portrait.src` is empty until the owner adds a photo; the SP monogram avatar is shown instead. Never generate or substitute a face.
- Health (Sidayu) and legal (LexiAI) projects carry disclaimers via `note` — keep them.
- Simulations must be labelled as virtual internships / industry simulations, not employment.
- Motion: animate only `transform`/`opacity`; scroll reveals use `.reveal` + `stagger(n)`; don't put `.reveal` and `.tilt` on the same element (both own `transform`) — wrap instead.
- Pointer parallax and tilt are disabled for coarse pointers and `prefers-reduced-motion`.
- Images go through `cdn()` / `cdnSrcSet()` (Netlify Image CDN, WebP).
- Contact form posts URL-encoded data to `/contact-form.html` (not `/`, which SSR handles) and treats an echoed registration file as failure. Keep field names in sync with `public/contact-form.html`.
- `src/components/ui/` holds unused starter shadcn components; safe to use or remove.

## Commands

`pnpm dev` (Vite :3000) or `netlify dev --port 8889` for full Netlify emulation. The build is `vite build`, publishing `dist/client`.
