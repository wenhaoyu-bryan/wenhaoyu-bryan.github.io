---
title: "What Changes When a Product Manager Meets AI Agents"
author: "Wenhao Yu"
pubDatetime: 2026-05-01T00:00:00Z
modDatetime: 2026-05-01T00:00:00Z
slug: "what-changes-when-pm-meets-ai-agents"
featured: true
draft: false
tags:
  - AI PM
  - AI Agents
  - Product Management
  - Career
  - Semiconductor
description: "Reflections from building agent systems in semiconductor manufacturing — how the PM role evolves when your product can reason."
---

## The Traditional PM Playbook Breaks

In traditional software, the PM defines requirements, engineers build, users use. The system does exactly what it's told. When you introduce AI agents — systems that reason, plan, and take actions — every assumption in that playbook needs to be rethought.

## What Actually Changes

**Requirements become constraints.** Instead of specifying "the system should do X," you define boundaries: "the system may do X, Y, or Z, but never W." You're writing guardrails, not feature specs.

**Error handling becomes product design.** When an agent makes a wrong decision, what happens? In my semiconductor fab context, a wrong recommendation could mean millions in wafer damage. The HITL (Human-in-the-Loop) approval flow isn't a nice-to-have — it's the core product experience.

**The ontology IS the product.** The most impactful product decision isn't which buttons to show — it's how to model the domain. Define the wrong entity types, and your agent reasons about a fictional business. Get the ontology right, and the agent almost builds itself.

## Three Things I've Learned

1. **Start with the ontology, not the UI.** Map the domain before writing a single wireframe.
2. **Prompt engineering is product design.** Every prompt is a product decision with measurable outcomes.
3. **Vibe Coding changes what PMs can ship.** A PM who can define architecture and iterate with an LLM can deliver full-stack prototypes without an engineering team.

## The Bigger Picture

The AI Product Manager role isn't just "PM + AI knowledge." It's a fundamentally different way of thinking about products — one where you design systems that think, not just systems that execute.

More reflections coming soon. In the meantime, check out [Ontology OS](https://github.com/wenhaoyu-bryan/prompt-to-ontology) — the project that taught me most of this.
