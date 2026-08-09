---
title: "SEO to GEO: How AI Search Changes Growth Strategy"
author: "Wenhao Yu"
pubDatetime: 2026-04-10T00:00:00Z
modDatetime: 2026-04-10T00:00:00Z
slug: "seo-to-geo-how-ai-search-changes-growth"
featured: false
draft: false
tags:
  - SEO
  - GEO
  - Growth
  - AI Search
description: "A practical, evidence-aware view of SEO to GEO: what AI search changes, what remains ordinary technical SEO, and how I am measuring the difference."
---

## What GEO Means Here

GEO — Generative Engine Optimization — is a useful name for the work of making
content understandable and discoverable in generative answers. I do not treat it
as a replacement for SEO, or as a promise that a particular model will cite a
page. The practical goal is simpler: make the entity, the claim, the evidence, and
the next useful page easy to identify.

Google's guidance for AI features says the existing fundamentals still apply:
helpful content, crawlability, internal links, visible text, and structured data
that matches the page. That is a more useful starting point than inventing a second
optimization discipline. See [Google's guidance on AI features and your
website](https://developers.google.com/search/docs/appearance/ai-features).

## What Changes in the Work

### 1. Entity clarity becomes part of information architecture

An answer engine needs to distinguish the person, the work, the projects, and the
ideas on a site. A clear About page, consistent author identity, focused topic
clusters, and explicit links between a method and its example reduce that
ambiguity. This is not a hidden signal; it is a reader-facing design decision.

### 2. Structure should serve retrieval, not decoration

Use headings that state what a section is about, definitions before conclusions,
and internal links that explain where the reader can go next. JSON-LD can describe
the same entities, but it should not introduce facts that are absent from the
visible page. Google's [structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
also make clear that structured data is not a guarantee of a search feature.

### 3. Evidence matters more than confident language

Claims about how AI systems behave should be marked as observations, hypotheses,
or documented guidance. A page that says “this always works” without showing the
conditions is less useful than a page that states the method, the limitation, and
the test. For this site, that means separating public facts from experiments and
never publishing confidential work metrics.

### 4. Measurement has to be query-level

Impressions and clicks remain useful for ordinary search. For AI answers, I also
need a dated prompt set: query, engine, cited URL, citation context, factual
accuracy, and the next action. Bing's [AI Performance
report](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c) is one
example of a tool that exposes citation-oriented observations; it should still be
read as measurement, not proof of causality.

## What Does Not Count as Proof

An `llms.txt` endpoint is a useful way to publish a concise index for tools that
choose to read it, but the format is still a proposal rather than a universal
search requirement. See the [llms.txt proposal](https://llmstxt.org/). It cannot
substitute for crawlable pages, useful content, or a coherent site structure.

Likewise, adding FAQ or schema markup everywhere does not create authority by
itself. The markup should describe what a visitor can actually see, and its effect
should be measured rather than assumed. A pre-filled “ask an AI” link is a
convenience for a reader; it is not evidence that the provider fetched the source
or that the site gained visibility.

## My Experiment

I am using this site as a controlled, public testbed. The build now provides
canonical metadata, a sitemap, page-level structured data, an internal search
index, and machine-readable content endpoints. The current status is
**instrumented and collecting a baseline**, not “GEO proven.”

The [Growth Lab](/growth-lab) records what was built, what is being measured, and
which questions remain open. When the log contains observations, I can update this
page with the query set, the cited pages, and the limits of the result. Until then,
the honest conclusion is that good SEO foundations make the site easier to crawl
and understand; the incremental effect of any individual GEO technique remains an
empirical question.
