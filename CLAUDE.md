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
    zh/             # Chinese mirror — complete for all non-blog pages (home,
                    # about, projects + case studies, all playbook pages,
                    # growth-lab). Blog posts are en-only (see i18n notes).
  content/
    posts/          # blog posts (markdown, posts collection)
    pages/about.md
  components/       # AstroPaper components (Card, Header, Footer, ...)
  layouts/          # Layout.astro (head/meta), PostLayout.astro
  data/             # shared page data (projects list, etc.)
  i18n/             # site-chrome locale strings; page copy is hand-translated
                    # inline in each src/pages/zh/ file (mirrors the en page)
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

## Confidentiality & Fact-Lock

This site is public and read by hiring managers, VCs, and AI answer engines.
Some work is under NDA or involves clients, so several pages are **fact-locked**.
Never add, embellish, or infer beyond the facts already on the page or permitted
here.

- **Enterprise Agent Platform** (`projects/enterprise-agent-platform`, both
  locales) is **fact-locked — no additions.** Describe methodology and
  capabilities only; never expose internal systems, data, identities, customer
  names, or metrics. It is framed as _Current Work / 当前工作_.
- **Leiga** — permitted facts: the name; "AI-powered project management SaaS"
  (leiga.com); the role and dates (Product Growth & Development, May–Aug 2024);
  that the **SEO foundations/infrastructure** were built and are "still live";
  and the **confirmed work items** below (documented as _Experiment 00_ in the
  Growth Lab). Use past tense. The confirmed work items — this list is the
  permanent boundary; do not add, embellish, or infer beyond it:
  - Technical SEO groundwork: sitemap/robots configuration, canonical URLs,
    redirect hygiene, crawlability and indexation fixes.
  - Metadata systems: title/description patterns and Open Graph across page types.
  - Structured data (schema.org) on key page types.
  - Content architecture: URL structure, internal linking, page-type taxonomy
    (Use-case pages, the Features page, Resources, and Comparison pages — in the
    site's nav order; capitalize the page-type names; the resources hub is
    "Resources," not "blog").
  - Documentation site: rebuilt Leiga's product guide / help center
    (guide.leiga.com).
  - Programmatic landing-page infrastructure: templated page systems scaling
    across keyword families (e.g., the free-tools pages). The free-tools content
    and tool-name keyword planning were done **with the dev team** — describe as
    collaborative, not solo.
  - Keyword research and keyword-to-page mapping.
  - Content distribution: ran social-media promotion of published articles.
  - Measurement setup: Search Console / analytics instrumentation (the SETUP
    only — never what the data showed).
  - **Public-evidence links (newly permitted, narrow):** may link to publicly
    accessible leiga.com / guide.leiga.com pages as live examples of a confirmed
    work item's page type. Verified live examples currently in use:
    `/use-case-product-manager`, `/compare`, `/feature`, `/resources`,
    `/free-tools`, and `guide.leiga.com`. Before shipping any such link, verify
    it currently resolves (fetch it; expect HTTP 200 and the described content) —
    if it can't be verified, omit it, never link on assumption. Frame links as
    "a live example of this page type," not as a claim about current performance
    or ownership.
  - **Forbidden (unchanged and absolute):** any traffic / ranking / conversion /
    revenue numbers; analytics screenshots or Search Console data; internal
    strategy, roadmaps, or keyword lists; customer names; credit for anything
    published after Aug 2024; and third-party traffic estimates (Semrush /
    Ahrefs / SimilarWeb or similar) anywhere. Never write "grew traffic by X."
    This includes any reach, views, or engagement figures from the
    social-distribution work — describe the responsibility only, never a metric.
- **No other ventures** — no e-commerce, packaging, storefront, or outside
  client work anywhere on the site, including code comments and commit messages.
  Remove any such reference if found.
- Growth Lab and any case studies use anonymized, normalized, or redrawn
  examples — never raw client data, dashboards, keyword lists, or private
  metrics.
- Terminology: always **"orchestrator–worker,"** never "master–slave."

## Writing Style (site copy)

- Confident, concrete, engineering-honest. Show evidence over adjectives.
- Write in **prose and first person**, not marketing fluff or bullet-salad;
  full sentences with a real voice.
- Case studies follow: **Problem → My Role → Approach → Outcome/Signals**.
- Blog post frontmatter requires `title`, `description`, `pubDatetime`, `tags`;
  add `ogImage` when a custom image exists.
- **No visible placeholders may ship.** No `PLACEHOLDER`, no `TODO(Bryan)`, no
  lorem, no "coming soon" stubs in shipped output. If a fact isn't known, omit
  the line rather than inventing or stubbing it.
- **Bilingual mirroring:** every user-facing `en` change gets a natural (not
  literal) `zh` mirror under `src/pages/zh/` — match the meaning and tone, not
  the word order. Keep `<title>`/`og:title` matching each page's H1, and keep
  the ` — Wenhao Yu` brand suffix. (Blog posts are en-only.)
- **Build-time data flow:** page content — project/topic lists, `llms.txt` /
  `llms-full.txt`, OG images, JSON-LD — is assembled at build time from shared
  data/config, not hand-duplicated per page. Change the data source, and keep
  `llms-full.txt` and structured data consistent with what the pages render.

## Workflow Before Committing

- Run `pnpm format` (prettier) on changed files.
- Verify affected routes on the **dev server** in both locales before
  committing — `astro check`/static build can stall locally, so drive the dev
  server (Node 22.20.0 via `fnm exec --using 22.20.0`) and fetch the routes.
- Commit per logical task with conventional messages; do not push. Pushing to
  `main` is a production deploy (see Git Workflow).

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
