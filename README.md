# Selva Preethi J — AI Engineer Portfolio

A cinematic, 3D-inspired single-page portfolio for **Selva Preethi J**, an Artificial Intelligence and Data Science student, AI & Machine Learning Intern at SURE ProEd, and aspiring AI / Generative AI Engineer.

The site presents her real experience, projects, education, skills, virtual internships and contact details in a dark "AI laboratory" visual language: midnight violet gradients, electric cyan highlights, glass cards, a floating AI orb with orbital rings, a drifting particle network and tasteful scroll-driven motion.

## Sections

Home (hero + intro) · Personal statement · About · Experience timeline · Featured projects · Technical toolkit, soft skills & languages · Academic journey · Certifications & industry simulations · Resume download/preview · Contact (with a working form) · Footer

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19, deployed on Netlify
- Tailwind CSS v4 with a custom theme in `src/styles.css`
- CSS 3D transforms + a lightweight `<canvas>` particle field (no heavy 3D libraries)
- Netlify Forms for contact-form delivery
- Netlify Image CDN for responsive WebP project images
- Project preview artwork generated with Gemini through Netlify AI Gateway

## Editing content

Everything shown on the site lives in **`src/content/site.ts`** — text, links, skills, projects, simulations and certificates. Empty optional fields are hidden automatically, so nothing unverified is published.

| To… | Do this |
| --- | --- |
| **Add your portrait** | Put the photo in `public/img/` (e.g. `portrait.jpg`) and set `profile.portrait.src = '/img/portrait.jpg'`. Until then the hero shows an SP monogram avatar. |
| Update availability | Edit `profile.availability` (set to `''` to hide the badge). |
| Replace the resume | Overwrite `public/resume/selva-preethi-j-resume.pdf` (or change `profile.resumeUrl`). |
| Add GitHub links | Fill `github` on a project, or `profile.github`. |
| Add simulation certificates | Fill `certificateUrl` / `certificateImage` on an entry in `simulations`. |
| Add certificates | Put files in `public/certificates/` and add entries to `certificates` with `published: true`. |
| Add skills | Append to the relevant group in `skillGroups`. |

## Running locally

```bash
pnpm install
netlify dev        # full Netlify emulation (forms, image CDN) on :8888
# or
pnpm dev           # Vite only on :3000
```

Contact-form submissions only reach Netlify when deployed (or under `netlify dev`); they appear in the Netlify dashboard under **Forms → contact**, where email notifications can be turned on.

## Before publishing

- Add the real portrait photo (see above).
- Add certificate files/links as they become available.
- Optionally add GitHub repository links for each project.
