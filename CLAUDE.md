# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What This Site Is

Personal profile site for **Wenhao Yu (Bryan)**, an AI Product Manager. It is a
portfolio + knowledge hub, not a traditional blog. Its job is to build
credibility with four audiences: **hiring managers/HR, fellow AI PMs, VCs, and
potential co-founders**. Every change should be judged by one question: *does
this make a first-time visitor trust that Wenhao deeply understands AI
products?*

Live at <https://wenhaoyu-bryan.github.io>, deployed to GitHub Pages via
GitHub Actions on push to `main`.

## Tech Stack

- **Astro 6** static site, based on the **AstroPaper** theme (heavily customized)
- **Tailwind CSS v4** (via `@tailwindcss/vite`; theme tokens in `src/styles/theme.css`)
- **Pagefind** static search (built into `dist/`, then copied back to `public/pagefind/` for dev — those files in `public/` are build artifacts, do not hand-edit)
- **lucide-astro** for icons; **satori + sharp** for dynamic OG images
- pnpm, Node ≥ 22

## Commands

```sh
pnpm dev            # dev server
pnpm build          # astro check + build + pagefind index
pnpm lint           # eslint
pnpm format         # prettier --write
```

Always run `pnpm build` before declaring a change done — `astro check` catches
type errors in `.astro` frontmatter.

## Configuration Layers

1. `astro-paper.config.ts` — **edit this one**: site metadata, socials, features
2. `src/config.ts` — resolves defaults on top of it; rarely touched
3. `astro.config.ts` — Astro integrations, i18n locales, markdown/shiki, fonts

## Structure

```
src/
  pages/            # en routes (default locale, no /en prefix)
    index.astro     # homepage: hero → projects → featured → topics → writing
    about.astro     # renders src/content/pages/about.md
    projects.astro  + projects/<slug>.astro   # case-study pages
    playbook.astro  + playbook/<slug>.astro   # methodology pages (hand-authored .astro)
    growth-lab.astro
    posts/          # blog routes driven by the posts collection
    zh/             # Chinese mirror of the above (partial — see i18n notes)
  content/
    posts/          # blog posts (markdown, posts collection)
    pages/about.md
  components/       # AstroPaper components (Card, Header, Footer, ...)
  layouts/          # Layout.astro (head/meta), PostLayout.astro
  data/             # shared page data (projects list, etc.)
  i18n/             # locale strings (en only so far; zh pages hand-translate inline)
```

**Content model:** blog posts are a content collection
(`src/content.config.ts`); Playbook and Project pages are hand-authored
`.astro` files. Projects shown on home/projects pages should come from the
shared data module rather than being duplicated per page.

## i18n Rules

- Locales: `en` (default, unprefixed) and `zh` (under `/zh/`)
- Every new en page needs a decision: mirror it under `src/pages/zh/`, or make
  the zh index link to the en version. **Never link to a zh route that doesn't
  exist** — check `src/pages/zh/` before adding zh links.
- Site chrome strings come from `src/i18n/`; page copy is translated inline in
  the zh page files.

## Design System — read DESIGN.md before any UI change

`DESIGN.md` is the source of truth. The non-negotiables:

- Single typeface (Google Sans Code) for everything; no second font
- One accent color per theme (blue light / orange dark); accent only on
  buttons, hovers, markers, focus, active-nav
- Flat design: **no shadows, gradients, glass, or backdrop blur**
- Sections separated by `border-b` only; spacing rhythm `py-10 sm:py-14`
- Cards `rounded-lg`, buttons `rounded-md`, pills `rounded-full`
- Visuals should be *content* visuals (architecture diagrams, screenshots,
  charts) in line-art style using border/muted/accent tokens — not decorative
  imagery

## Writing Style (site copy)

- Confident, concrete, engineering-honest. Show evidence over adjectives.
- Case studies follow: **Problem → My Role → Approach → Outcome/Signals**.
- Blog post frontmatter requires `title`, `description`, `pubDatetime`, `tags`;
  add `ogImage` when a custom image exists.

## Git Workflow

- **Never commit directly to `main`.** All work happens on `feature/*` branches.
- No destructive operations: no `reset --hard`, no force-push, no orphan
  branches, never overwrite the working tree.
- Push to `main` (via merged PR) triggers production deploy — treat merges as
  releases.

## Known Constraints

- `features.dynamicOgImage` in `astro-paper.config.ts` requires Google Fonts to
  be reachable at build time (satori loads the font); it was temporarily
  disabled for offline builds. Verify `pnpm build` passes before toggling.
- GitHub Pages project is a **user site** served from the domain root — keep
  `site.url` and absolute links consistent with that.
