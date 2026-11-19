---
title: "From PRD to Prototype: An AI PM Workflow"
author: "Wenhao Yu"
pubDatetime: 2026-04-15T00:00:00Z
modDatetime: 2026-11-19T01:36:19Z
slug: "from-prd-to-prototype-new-workflow"
featured: false
draft: false
tags:
  - Product Management
  - AI Agents
  - Vibe Coding
  - PRD
description: "A product workflow that pairs domain modeling, an inspectable AI-assisted prototype, and engineering review."
---

For a domain-heavy AI product, I use a short loop: clarify the relevant domain,
build a prototype of the core workflow, and review its behavior and limits with
engineering. The prototype makes assumptions testable; it is not proof that a
production system is ready.

## The Problem with Traditional PRDs

A PRD describes the problem, requirements, and desired behavior. In AI product
work, some of those requirements depend on model capabilities that need to be
tested and can change. A static document alone may leave important assumptions
about data, model behavior, and failure handling unresolved.

## A Better Workflow

I use a three-step loop alongside the PRD to make those assumptions easier to
inspect:

### 1. Define the Ontology First

For domain-heavy workflows, identify the concepts needed for the first
scenario: what entities exist, which relationships matter, and what operations
are allowed? This provides a starting language for product and engineering; the
model can evolve as the team tests it.

### 2. Prototype with Vibe Coding

Use a coding agent to build a working prototype that demonstrates the core
workflow. Test the data flow, the agent behavior, and the interaction against
explicit examples. A prototype may use synthetic data or simplified services,
so it does not establish production reliability or integration readiness.

### 3. Iterate with Engineering

Bring the prototype, domain model, and unresolved questions to engineering
review. Show what was tested, what was simulated, and what still needs a
decision.

### An illustrative example

Suppose the team is exploring an assistant for operating procedures:

1. **Model:** identify a procedure, its source, and the equipment it applies to.
2. **Prototype:** let a user ask a question and inspect the returned source.
3. **Check:** try a question for which the source is missing and expect the
   prototype to say so, rather than invent an answer.
4. **Review:** show the result to engineering and discuss access control,
   evaluation, and integration work that the prototype has not established.

This is an illustrative scenario, not a reported project result.

## Why This Works

The prototype gives the team something concrete to inspect; the domain model
makes its assumptions visible. Together they can expose ambiguity earlier, but
they do not replace user research, engineering validation, or production
testing.

This is how [Prompt-to-Ontology](/projects/prompt-to-ontology) was built — ontology first, prototype through vibe coding, then iteration.
