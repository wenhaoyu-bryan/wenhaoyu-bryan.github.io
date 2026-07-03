# Wenhao Yu — AI Product Manager

Personal profile site and knowledge hub for Wenhao Yu (Bryan): AI PM case
studies, an AI-native product playbook, blog posts, and growth experiments.

**Live site:** <https://wenhaoyu-bryan.github.io>

## What's Inside

| Section    | Route         | Content                                                                                  |
| ---------- | ------------- | ---------------------------------------------------------------------------------------- |
| Home       | `/`           | Hero, featured case studies, focus areas, latest writing                                 |
| Projects   | `/projects`   | Case studies (Problem → Role → Approach → Outcome)                                       |
| Playbook   | `/playbook`   | AI PM methodology pages (vibe coding, harness/loop engineering, AI-native PRD, ontology) |
| Writing    | `/posts`      | Blog posts (markdown content collection)                                                 |
| Growth Lab | `/growth-lab` | SEO/GEO experiments                                                                      |
| About      | `/about`      | Narrative intro and background                                                           |
| 中文       | `/zh/...`     | Chinese versions of core pages                                                           |

Companion project: [AI PM Operating Playbook](https://wenhaoyu-bryan.github.io/AI-PM-Operating-Playbook/) — interactive tools that apply the playbook methods.

## Tech Stack

- [Astro 6](https://astro.build) — static site framework
- [AstroPaper](https://github.com/satnaing/astro-paper) — base theme, heavily customized
- [Tailwind CSS v4](https://tailwindcss.com) — styling (design tokens in `src/styles/theme.css`, rules in `DESIGN.md`)
- [Pagefind](https://pagefind.app) — static search
- [lucide-astro](https://lucide.dev) — icons; satori + sharp for OG images
- GitHub Pages + GitHub Actions — hosting and deploy

## Development

Requires Node ≥ 22 and pnpm.

```sh
pnpm install
pnpm dev        # local dev server
pnpm build      # type-check, build, and index search
pnpm lint       # eslint
pnpm format     # prettier
```

## Project Layout

```
src/
  pages/           # routes (en at root, zh under /zh/)
  content/posts/   # blog posts (markdown)
  content/pages/   # about page content
  components/      # UI components
  layouts/         # page + post layouts
  data/            # shared page data
  styles/          # theme tokens, global css, typography
astro-paper.config.ts   # site config: metadata, socials, features
DESIGN.md               # design system — read before UI changes
CLAUDE.md               # working conventions for AI-assisted development
```

## Deployment

Merging to `main` triggers `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages. Development happens on `feature/*`
branches.

## Credits

Built on [AstroPaper](https://github.com/satnaing/astro-paper) by
[Sat Naing](https://satnaing.dev), licensed under the [MIT License](LICENSE).
