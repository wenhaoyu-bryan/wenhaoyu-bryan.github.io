---
name: Wenhao Yu — AI PM
description: A personal portfolio and blog site for an AI Product Manager. Professional, minimal, code-native. Clean typography-driven layout with light/dark mode, subtle borders, and a single accent color per theme.
colors:
  primary: "#006cac"
  on-primary: "#ffffff"
  secondary: "#6b7280"
  surface: "#fdfdfd"
  on-surface: "#282728"
  surface-container: "#e6e6e6"
  outline: "#ece9e9"
typography:
  display:
    fontFamily: Google Sans Code
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: Google Sans Code
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.01em"
  title:
    fontFamily: Google Sans Code
    fontSize: 18px
    fontWeight: 500
    fontStyle: italic
    lineHeight: 1.4
  body-lg:
    fontFamily: Google Sans Code
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: Google Sans Code
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Google Sans Code
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: Google Sans Code
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.3
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  gutter: 16px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  card:
    backgroundColor: transparent
    rounded: "{rounded.lg}"
    padding: 20px
  tag:
    backgroundColor: transparent
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
---

## Overview

Wenhao Yu's personal site (wenhaoyu-bryan.github.io) is an AI PM portfolio and
knowledge hub built with the **AstroPaper** theme on Astro + Tailwind v4. The
design is **professional minimalism with a code-native edge** — a single Google
Sans Code typeface handles everything from display titles to body copy to code
fragments, creating a consistent, engineering-honest reading experience.

The brand sits at the intersection of **AI product management, knowledge
engineering, and prototyping culture**. The design doesn't try to sell — it
documents, demonstrates, and invites collaboration. Borders are thin, spacing
is generous, and the accent color is the only source of visual punctuation.

**Target audience**: hiring managers, AI PM peers, technical founders, and
engineering collaborators who value substance over flash.

## Colors

The site uses **CSS custom properties** to switch between light and dark themes
at the `:root` / `[data-theme="dark"]` level. Theme is persisted in
localStorage with system preference as default.

### Light theme

- **Background (#fdfdfd):** Pure off-white. Clean, open, readable. Never pure
  white (`#ffffff`) to avoid eye strain at high brightness.
- **Foreground (#282728):** Soft charcoal. NOT pure black — retains a subtle
  warmth that pairs with the code-native typeface.
- **Accent (#006cac):** Professional blue. Used for: primary buttons, link
  hover states, list markers, focus outlines, active nav decoration. The only
  color calling for attention on a light page.
- **Muted (#e6e6e6):** Light gray fill for secondary surfaces like code block
  backgrounds and subtle dividers.
- **Muted foreground (#6b7280):** Mid-gray for secondary text — metadata,
  dates, descriptions, breadcrumb segments.
- **Border (#ece9e9):** Hairline warm-gray for all borders and section
  separators. Thin, never heavy.

### Dark theme

- **Background (#212737):** Deep navy blue. Provides visual relief in dim
  environments without the high contrast of pure black.
- **Foreground (#eaedf3):** Warm off-white. Carries all text, keeping
  readability high against the dark backdrop.
- **Accent (#ff6b01):** Sunset orange. Replaces blue as the sole accent.
  Striking against navy — used for CTAs, hover, links, and the active nav
  wavy-underline.
- **Muted (#343f60):** Slate blue for code block backgrounds and secondary
  fills.
- **Muted foreground (#afb9ca):** Muted steel for metadata, dates,
  descriptions.
- **Border (#ab4b08):** Oxidized orange-brown — borders shift to a warm
  accent-adjacent tone in dark mode, tying the UI together.

### Usage rules

- **Accent is exclusive.** It appears on exactly: primary buttons (bg), link
  hovers, list item markers (`::marker`), focus/active outlines, active nav
  decoration. Do NOT use accent on borders, icons, or decorative flourishes.
- **Accent never appears at full opacity on text.** Links are foreground-color
  by default and shift to accent on hover or focus.
- **Borders are subtle.** `--border` is always one step away from the
  background, never a hard frame.

## Typography

A deliberate **single-typeface system**: Google Sans Code. This is not a
typical body font — its monospace-influenced character (wide proportions,
distinctive letterforms, even spacing) gives the site an engineering-authentic
voice. It signals "this is a builder's site" without resorting to code widgets
or terminal aesthetics.

### Type scale

| Token | Size | Weight | Style | Line H. | Letter Sp. | Use |
|-------|------|--------|-------|---------|------------|-----|
| h1 (display) | 48px (3rem) | 700 | normal | 1.1 | -0.02em | Page title on homepage hero |
| h2 (section) | 24px (1.5rem) | 600 | normal | 1.3 | 0.01em | Section headings (Projects, Featured, What I Work On, Latest) |
| h3 (card) | 18px (1.125rem) | 500 | *italic* | 1.4 | — | Card titles, post titles in lists |
| body-lg | 18px (1.125rem) | 400 | normal | 1.6 | — | Hero subtitle, intro paragraphs |
| body-md | 16px (1rem) | 400 | normal | 1.6 | — | Primary reading text, card descriptions |
| label-sm | 14px (0.875rem) | 500 | normal | 1.4 | — | Button labels, tags, chip text |
| caption-xs | 12px (0.75rem) | 400 | normal | 1.3 | — | Post dates, metadata, breadcrumb |

### Key rules

- **h3 is italic.** This is a deliberate departure: card and post titles in
  lists are italicized, creating a gentle visual rhythm against the upright h1/h2.
- **No sans-serif fallback.** The entire site — headlines, body, code blocks,
  labels — uses one typeface. This is unconventional but intentional: it
  eliminates visual hierarchy battles and lets content structure (size, weight,
  spacing) do the work.
- **Font weights are restrained.** Only 300 (thin, for light backgrounds),
  400 (regular), 500 (medium), 600 (semibold), and 700 (bold) are used. 400 is
  the default for body copy; 500 for labels; 600+ for headings.
- **Prose line length is bounded.** Content is constrained to `max-w-3xl`
  (~768px / ~66 characters per line), the canonical measure for readable
  typography on the web.
- **h3 in prose content** (articles/blog posts) is also italic, tying the
  reading experience back to the list views.

## Layout & Spacing

The layout follows a **centered single-column** pattern with strict 4px/8px
spacing rhythm.

### Grid & width

- **Content container (`app-layout`):** `max-w-3xl mx-auto w-full px-4`
- **Narrow content** maintains the same container — there are no sidebar,
  two-column, or full-bleed layouts
- **Responsive breakpoints:** mobile-first. `sm:` kicks in at 640px for
  multi-column grids (2-col cards, horizontal nav)

### Spacing scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Micro spacing inside tags, between icon and text |
| sm | 8px | Gap between nav items, small element spacing |
| md | 16px | Card internal gaps, between content blocks |
| lg | 24px | Gutter between cards in grids, button padding |
| xl | 40px | Section spacing (mobile: `py-10`) |
| xxl | 64px | Section spacing (desktop: `py-14`) |
| gutter | 16px | Column gap in card grids |
| margin | 16px | Page padding on mobile |

### Section rhythm

- **Sections are separated by `border-b`** with `py-10` (mobile) / `py-14`
  (desktop). The border is the only section divider — no background alternation,
  no colored panels.
- **Header** has `py-4` / `py-6` with `border-b`.
- **Footer** has `py-6` / `py-4` with `border-t` and social icons in a
  reversed flex row.
- **Homepage hero** uses `pt-8 pb-10` / `pt-12 pb-14` with `border-b` — the
  largest vertical spacing on the page.
- **Project card grids** use `gap-4` with `sm:grid-cols-2`.
- **Topic card grids** use `gap-4` with `sm:grid-cols-2 lg:grid-cols-3`.

## Elevation & Depth

The site is **fundamentally flat** with no shadows, glass effects, or
z-index layering.

Depth is communicated entirely through:
1. **Borders** — `border` separates surfaces, `border-b` separates sections
2. **Hover state shifts** — cards and buttons shift background or text color on
   interaction, signaling affordance without physical lift
3. **Color contrast** — foreground vs muted-foreground vs background creates
   implicit depth between primary content, secondary content, and the page canvas

Do NOT add drop shadows, box shadows, backdrop blur, or gradient overlays.
The design's character comes from its restraint.

## Shapes

- **Base rounded:** `rounded-sm` (4px — code blocks, inline code)
- **Default rounded:** `rounded-md` (8px — primary and outline buttons)
- **Card/container rounded:** `rounded-lg` (12px — project cards, topic cards)
- **Full rounded:** `rounded-full` (9999px — tag pills, status badges)

### Rules
- **Buttons** use `rounded-md` (8px) — enough softness to feel modern, not so
  much that they look playful
- **Cards** use `rounded-lg` (12px) — slightly more relaxed than buttons,
  establishing visual hierarchy
- **Tags and badges** use `rounded-full` (pill shape) — conventional, readable
- **No mixing** of rounded and sharp corners in the same component group

## Components

### Primary Button
- Background: accent color (`#006cac` / `#ff6b01`)
- Text: accent-foreground (`#ffffff`)
- Typography: label-sm (14px, medium weight)
- Shape: rounded-md (8px)
- Padding: 10px horizontal, 20px vertical (`px-5 py-2.5`)
- Icon: trailing `IconArrowRight` at 16px (`size-4`)
- Hover: `opacity-90` transition — subtle dim, no lift or color shift
- Used for: "View Projects", primary CTAs only

### Outline Button
- Background: transparent
- Text: foreground color
- Border: border color, 1px solid (`border`)
- Shape: rounded-md (8px)
- Padding: 10px horizontal, 20px vertical
- Hover: `bg-accent/10` — accent-tinted background at 10% opacity
- Transition: 150ms ease-in-out (`transition-colors`)
- Used for: secondary actions ("Read My Writing", "Open Playbook", social links,
  featured content links)

### Project Card
- Container: `border-border rounded-lg border p-5`
- Title: h3-card styling (18px, medium, italic), shifts to accent color on card
  hover via `group-hover:text-accent`
- Description: `text-muted-foreground mt-2 text-sm`
- Status badge: `rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground`
- Hover: `hover:bg-accent/5` — very subtle tint, no lift or shadow

### Topic Card (What I Work On)
- Same card shape as Project Card but non-interactive (no hover effect, no link)
- Title: `font-medium` (16px)
- Description: `text-muted-foreground mt-1.5 text-sm`

### Tag Pill (Status badge, featured content chip)
- Shape: `rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground`
- Thin and unobtrusive — never the focal point
- Used for: project status indicators, featured link tags

### Link Button (text-only navigation link)
- Inline flex with `gap-1` between icon and text
- No border, no background — just text
- Hover: `hover:text-accent` — text color shifts only
- Used for: "All Posts →" links, read-more links

### Inline Link
- Color: foreground (not accent)
- Decoration: `underline decoration-dashed underline-offset-4`
- Hover: shifts to accent color
- Focus visible: `outline-accent outline-2 outline-dashed outline-offset-1`

### Active Navigation
- `underline decoration-wavy decoration-2 underline-offset-8` — a wavy underline
  is the only visual indicator for the current nav section
- Distinctive, memorable, unusual — matches the site's unconventional character

### Breadcrumb
- `font-light`, `opacity-80` for links, `opacity-70` for current page
- Separator: `»` entity
- Location: `mt-8 mb-1` on inner pages

### Code Block
- Syntax highlighting via Shiki: `min-light` (light) / `night-owl` (dark)
- Base: `outline-border flex border` with Shiki background
- File name header via transformer
- Line highlighting, diff markers, word highlighting via Shiki transformers
- Inline code: `bg-muted/75 text-foreground rounded p-1` with suppressed
  prose pseudo-elements

### Blockquote
- Left border: `border-s-accent/80` — accent-tinted
- Opacity: 80% — slightly receded from body text

## Do's and Don'ts

- **Do** use borders as the only section separator. No background color panels,
  no shadow-based separation.
- **Don't** add shadows, drop shadows, box shadows, or backdrop blur anywhere.
- **Don't** add rounded corners larger than 12px except for pill badges.
- **Don't** use accent color as text color by default — use it only for hover
  states, active states, and primary button backgrounds.
- **Do** keep section spacing consistent: all sections use `py-10 sm:py-14`.
- **Don't** add animations or transitions longer than 150ms for interactive
  elements.
- **Do** respect `prefers-reduced-motion`: the site already uses minimal
  animation (just `transition-colors` and `transition-opacity`).
- **Don't** introduce a second font family. Google Sans Code is the only
  typeface for all roles.
- **Don't** use bold weight (700) outside of display headings. Semibold (600)
  is the maximum for section headings.
- **Do** use the wavy underline for active nav — it's a signature detail.
- **Don't** use gradients, glass effects, or any atmospheric texture.
- **Do** show a "Copy email" interaction for the email button rather than a
  `mailto:` link.
