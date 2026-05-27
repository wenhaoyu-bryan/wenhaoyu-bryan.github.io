# phases.md

## Execution Plan for Astro Paper AI PM Personal Brand Website

This document gives Claude Code a phased execution plan for building a personal brand website on top of Astro Paper.

The goal is not to create a traditional online CV. The goal is to create a high-signal display page for HR, investors, collaborators, and future partners.

The first version should be simple, polished, buildable, and easy to extend.

---

## Phase 0 — Understand the Existing Astro Paper Codebase

### Objective

Inspect the current Astro Paper project and understand how the theme manages configuration, layout, navigation, posts, tags, SEO metadata, and static pages.

### Tasks

1. Inspect the repository structure.
2. Identify:
   - Site config
   - Navigation config
   - Layout components
   - Blog / post content directory
   - Page directory
   - SEO / metadata components
   - RSS / sitemap support
   - Styling files
   - Package scripts
3. Run the existing build command if dependencies are installed.
4. Do not modify content yet unless required to make the project build.

### Deliverable

Create a short internal implementation note or commit summary:

```txt
Astro Paper structure understood:
- pages live in ...
- posts live in ...
- config lives in ...
- SEO is handled by ...
- build command is ...
```

### Acceptance Criteria

- Project structure is understood.
- Build command is identified.
- No unnecessary changes are made.
- Existing site still builds.

---

## Phase 1 — Convert Site Identity from Blog Theme to Personal Brand Site

### Objective

Update the Astro Paper defaults into Bryan / Wenhao's AI PM personal brand site.

### Tasks

1. Update site title.
2. Update site description.
3. Update author name.
4. Update default SEO description.
5. Update social links if available.
6. Remove or replace default theme content that does not match the new positioning.
7. Add or update navigation:

```txt
Home
Projects
Playbook
Writing
Growth Lab
About
```

8. If Astro Paper uses `Blog` internally, keep the route if necessary but label it as `Writing` in the UI.
9. Ensure dark/light mode and existing theme utilities still work.

### Recommended Site Title

```txt
Bryan Yu — AI Product Manager
```

or

```txt
Wenhao Yu — AI Product Manager
```

### Recommended Site Description

```txt
AI Product Manager building agentic workflows, ontology systems, AI PM playbooks, and SEO/GEO growth experiments.
```

### Acceptance Criteria

- Site identity no longer looks like a default Astro Paper blog.
- Navigation matches the intended structure.
- Site builds successfully.

---

## Phase 2 — Rewrite the Homepage as a Landing Page

### Objective

Make the homepage catch attention quickly and communicate the core positioning.

The homepage should not be a chronological resume. It should feel like a personal product landing page.

### Tasks

Create or modify homepage sections:

1. Hero
2. Featured Projects
3. What I Work On
4. AI PM Playbook CTA
5. Latest Writing
6. Growth Lab Preview
7. Contact / Connect CTA

### Hero Copy

Use or adapt:

```txt
AI Product Manager building agentic workflows, ontology systems, and growth experiments.
```

Subheadline:

```txt
I explore how product managers can use AI coding tools, ontology thinking, and SEO/GEO growth systems to turn ambiguous business problems into working prototypes and public playbooks.
```

### CTA Buttons

```txt
View Projects
Read AI PM Playbook
Contact
```

### Featured Project Cards

Create cards for:

1. Prompt-to-Ontology
2. AI PM Playbook
3. Vibe Coding Prototype Lab
4. SEO/GEO Growth Experiments

Each card should include:

- Title
- One-line description
- Status label
- Link

### What I Work On Cards

Use:

```txt
Agentic Workflows
Ontology-Driven AI Products
AI PM Playbooks
Vibe Coding for PMs
SEO/GEO Growth
Industrial & B2B AI
```

### Acceptance Criteria

- Homepage communicates the positioning within 5 seconds.
- It does not look like a resume.
- It has clear CTAs.
- It links to Projects, Playbook, Writing, Growth Lab, and About.
- Site builds successfully.

---

## Phase 3 — Build the Projects System

### Objective

Create a Projects section that works as a case study hub, not just a GitHub repo list.

### Tasks

1. Create `/projects` index page.
2. Create reusable project card component if useful.
3. Create individual project pages or Markdown/MDX entries for:
   - Prompt-to-Ontology
   - AI PM Playbook
   - Vibe Coding Prototype Lab
   - SEO/GEO Growth Experiments
4. Add internal links between projects and related writing.

### `/projects` Page Structure

```txt
H1: Projects

Intro:
A collection of public projects, prototypes, and experiments around AI product management, ontology-driven systems, vibe coding, and growth.

Sections:
- Featured Projects
- Public Projects
- Experiments
- Private Work, Public Methodology
```

### Project Page Template

Each project should follow:

```txt
Title
One-line positioning
Status
Problem
Why it matters
What I built / explored
Product thinking
Current status
What I learned
Related links
```

### Prompt-to-Ontology Page Direction

Positioning:

```txt
A public experiment on transforming messy product requirements, prompts, and business concepts into structured ontology assets for enterprise AI systems.
```

### AI PM Playbook Page Direction

Positioning:

```txt
A living public playbook for AI Product Managers working with agents, prototypes, PRDs, ontology, and AI-native workflows.
```

### Vibe Coding Prototype Lab Page Direction

Positioning:

```txt
A public and sanitized collection of experiments showing how AI PMs can use Claude Code, Cursor, and modern AI coding workflows to turn ideas into prototypes.
```

Important:

- Do not expose internal company projects.
- Do not name confidential internal systems.
- Do not include company screenshots.
- Keep it methodology-focused.

### SEO/GEO Growth Experiments Page Direction

Positioning:

```txt
Experiments on building content systems, B2B websites, and AI-search-aware growth loops.
```

### Acceptance Criteria

- `/projects` exists and is linked in nav.
- At least 2 project pages are complete enough for V1.
- Other projects can be stubs.
- Project pages are not resume bullets.
- No confidential content.
- Site builds successfully.

---

## Phase 4 — Create the AI PM Playbook Page

### Objective

Build the Playbook page as the central public methodology hub.

### Tasks

1. Create `/playbook`.
2. Add category sections.
3. Link to related blog posts and projects.
4. Create at least 5 playbook item stubs.

### Suggested Intro

```txt
The AI PM Playbook is my living operating system for product work in the AI-native era. It collects frameworks, workflows, and notes on agents, ontology, PRD-to-prototype, vibe coding, and growth.
```

### Categories

1. AI PM Foundations
2. PRD to Prototype
3. Agent Product Design
4. Ontology and Knowledge Systems
5. Growth and Distribution

### Initial Playbook Items

```txt
What makes AI PM different from traditional PM
PRD to prototype workflow
Vibe coding for product managers
Agent product design basics
Prompt-to-Ontology method
Human-in-the-loop product design
SEO to GEO growth thinking
```

### Acceptance Criteria

- `/playbook` exists.
- It reads like a public framework, not a resume.
- It links to Prompt-to-Ontology and Writing.
- It can grow over time.
- Site builds successfully.

---

## Phase 5 — Reframe Blog as Writing

### Objective

Turn the Astro Paper blog into a writing system around AI PM, agent, ontology, vibe coding, and SEO/GEO.

### Tasks

1. Rename the blog navigation label to `Writing`.
2. Keep existing Astro Paper blog mechanics if useful.
3. Create categories or tags:
   - AI Product Management
   - Agent & Ontology
   - Vibe Coding
   - SEO / GEO
   - Building in Public
   - Career Notes
4. Add at least 3 starter posts or drafts.
5. Ensure posts have title, date, description, tags, and internal links.

### Starter Posts

Create article stubs for:

1. `Why AI PMs Should Learn Vibe Coding`
2. `From PRD to Prototype: A New Workflow for AI Product Managers`
3. `Prompt-to-Ontology: Why Ontology Matters for Enterprise AI`
4. Optional: `SEO to GEO: How AI Search Changes Growth Strategy`
5. Optional: `My AI PM Tool Stack`

### Post Style

Each post should be:

- Clear
- Practical
- Specific
- Short enough to finish
- Linked to projects and playbook pages

Avoid generic AI hype.

### Acceptance Criteria

- Writing/blog index works.
- At least 3 article stubs exist.
- Tags work if supported by theme.
- Internal links exist.
- Site builds successfully.

---

## Phase 6 — Build the Growth Lab Page

### Objective

Create a differentiated section for SEO/GEO, Kubo Technology, B2B growth, SaaS tool-site ideas, and independent website experiments.

### Tasks

1. Create `/growth-lab`.
2. Add sections:
   - SEO / GEO Notes
   - Kubo Technology
   - B2B Website Experiments
   - SaaS Tool Site Ideas
   - Shopify / Independent Site Exploration
   - Experiment Log
3. Create a simple experiment card layout.

### Suggested Intro

```txt
Growth Lab is where I document experiments around SEO, GEO, AI search visibility, B2B websites, SaaS tool sites, and independent growth systems.
```

### Experiment Card Format

Use:

```txt
Hypothesis
What I built
What I measured
What I learned
Next step
```

### Important Positioning

This page should show distribution thinking.

The message:

```txt
I care not only about building AI products, but also about how products are discovered, trusted, and adopted.
```

### Acceptance Criteria

- `/growth-lab` exists.
- It clearly differentiates Bryan from AI PMs who only discuss product and models.
- It links to Writing and Projects.
- No overclaiming.
- Site builds successfully.

---

## Phase 7 — Rewrite the About Page

### Objective

Create a concise narrative About page that is not a full CV.

### Tasks

1. Create or modify `/about`.
2. Remove any default biography that feels generic.
3. Avoid chronological resume formatting.
4. Add:
   - Short intro
   - What I build
   - What I am exploring
   - Selected background
   - Tool stack
   - Contact

### Suggested Intro

```txt
I am an AI Product Manager interested in agentic workflows, ontology-driven AI systems, and growth experiments. My work sits between product strategy, technical prototyping, enterprise AI adoption, and distribution.
```

### Selected Background Copy

Use or adapt:

```txt
My background combines AI product work, industrial operations, data-driven growth, and engineering-oriented education. I have worked across industrial AI, SEO growth, product investment analysis, and B2B product contexts.
```

### Tool Stack

```txt
Claude Code
Cursor
Astro
Tailwind
React
FastAPI
Neo4j
NetworkX
WordPress
GitHub Pages
SEO/GEO research tools
```

### Contact

Use public contact channels:

```txt
Email
GitHub
LinkedIn
Optional: X
```

Do not include phone number.

### Acceptance Criteria

- About page feels like a thoughtful personal intro.
- It does not copy the resume.
- It does not list every job chronologically.
- It supports the site positioning.
- Site builds successfully.

---

## Phase 8 — SEO, Metadata, and Internal Linking

### Objective

Make the site SEO-aware from V1.

### Tasks

1. Add or update metadata for:
   - Home
   - Projects
   - Playbook
   - Writing
   - Growth Lab
   - About
2. Ensure each page has:
   - H1
   - Meta title
   - Meta description
   - Internal links
   - Open Graph data if supported
3. Confirm sitemap/RSS still work if Astro Paper supports them.
4. Add keyword-aware but natural descriptions.

### Suggested Meta Descriptions

Home:

```txt
Bryan Yu is an AI Product Manager building agentic workflows, ontology-driven systems, AI PM playbooks, and SEO/GEO growth experiments.
```

Projects:

```txt
Public projects and experiments around AI product management, Prompt-to-Ontology, vibe coding prototypes, and SEO/GEO growth systems.
```

Playbook:

```txt
A living AI PM playbook for agent product design, PRD-to-prototype workflows, ontology thinking, vibe coding, and growth.
```

Growth Lab:

```txt
Experiments and notes on SEO, GEO, AI search visibility, B2B websites, SaaS tool sites, and independent growth systems.
```

About:

```txt
About Bryan Yu, an AI Product Manager focused on agentic workflows, ontology-driven AI products, vibe coding, and growth experiments.
```

### Acceptance Criteria

- Main pages have SEO metadata.
- Internal linking is clear.
- No keyword stuffing.
- Build succeeds.

---

## Phase 9 — Visual Polish and Responsiveness

### Objective

Make the site look polished while preserving Astro Paper's minimal reading experience.

### Tasks

1. Improve spacing and visual hierarchy.
2. Ensure project cards look clean on desktop and mobile.
3. Ensure homepage sections are scannable.
4. Make CTAs visually clear.
5. Check dark mode if supported.
6. Avoid heavy animation and unnecessary dependencies.

### Style Direction

- Minimal
- Serious
- Builder-like
- Readable
- Fast
- Not overly corporate
- Not overly futuristic
- Not designer-portfolio-heavy

### Acceptance Criteria

- Site looks credible on desktop.
- Site looks good on mobile.
- Homepage is easy to scan.
- Project cards are readable.
- Build succeeds.

---

## Phase 10 — Deployment Readiness

### Objective

Prepare the site for GitHub Pages or another static host.

### Tasks

1. Confirm build output.
2. Confirm static mode works.
3. Check base path if deploying to `username.github.io` or custom domain.
4. Add deployment instructions to README if helpful.
5. Ensure no broken internal links.
6. Ensure no placeholder text remains on homepage.
7. Ensure no confidential content is included.

### Acceptance Criteria

- Production build succeeds.
- Site is ready for GitHub Pages / Vercel / Netlify.
- README or deployment note exists.
- No sensitive content.
- No resume dump.
- V1 is ready to share privately for feedback.

---

## Phase 11 — V1 Content Review Checklist

### Objective

Review the website from the perspective of HR, investors, and collaborators.

### Checklist

Ask:

1. Can a visitor understand Bryan's positioning in 5 seconds?
2. Does the site make him look like an AI PM with product taste?
3. Does it show project evidence without exposing private company data?
4. Does it show growth/SEO/GEO ability?
5. Does it avoid looking like a resume?
6. Are the CTAs clear?
7. Does the site make someone want to contact him?
8. Does it feel honest and not exaggerated?
9. Does it have enough public content for a V1?
10. Is it easy to update later?

### Acceptance Criteria

- The website passes the checklist.
- If it fails, revise copy and layout before deployment.

---

## Suggested Implementation Order Summary

Use this order:

```txt
0. Understand Astro Paper
1. Site identity and navigation
2. Homepage
3. Projects
4. Playbook
5. Writing
6. Growth Lab
7. About
8. SEO metadata and internal links
9. Visual polish
10. Deployment readiness
11. V1 content review
```

Do not attempt to perfect all content in one pass. Create a polished structure first, then improve content iteratively.
