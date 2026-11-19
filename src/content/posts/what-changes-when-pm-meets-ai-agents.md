---
title: "What Changes When a Product Manager Meets AI Agents"
author: "Wenhao Yu"
pubDatetime: 2026-05-01T00:00:00Z
modDatetime: 2026-11-19T01:36:19Z
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

An AI agent changes a product manager's work because the product can choose
among actions, use tools, and encounter uncertain results. Alongside features,
the PM must define boundaries, evaluation, and when a person should review an
action. My perspective comes from designing agent workflows for industrial
settings, where the cost of an unsuitable recommendation matters.

## The Traditional PM Playbook Breaks

Traditional product work still matters: define the user problem, design a
workflow, and test the result. An agent adds uncertainty in how it interprets
context and chooses actions, so the team also needs to decide what behavior is
acceptable and how failures will be handled.

## What Actually Changes

**Requirements include constraints.** Alongside specifying what a system
should do, define what it may do, what it must not do, and what requires
approval. These boundaries complement feature specifications rather than
replace them.

**Error handling becomes product design.** What happens when an agent makes
an unsuitable recommendation? In semiconductor manufacturing, an error can
have serious operational consequences. For consequential actions, a
human-in-the-loop approval flow can give an expert a chance to inspect the
evidence before proceeding. [OpenAI's practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
also recommends human oversight for high-risk actions.

**The domain model is part of the product.** How entities and relationships
are modeled affects the context an agent receives. A clearer ontology can make
the workflow easier to design and inspect, but it does not build or validate
the agent by itself.

## Three Things I've Learned

1. **Make the domain explicit.** Map the concepts and relationships relevant to
   the workflow, and use early interface sketches to test them with people.
2. **Treat prompts as product decisions.** Prompt changes can affect behavior;
   evaluate them against representative examples instead of assuming an outcome.
3. **Use coding agents to explore.** A PM can use them to build a prototype more
   independently; production engineering and review still need the right team.

## The Bigger Picture

The AI product manager's role builds on product fundamentals while adding
responsibility for context, boundaries, evaluation, and human oversight.

For a concrete build, see [Ontology OS](https://github.com/wenhaoyu-bryan/prompt-to-ontology) — the project that taught me most of this.
