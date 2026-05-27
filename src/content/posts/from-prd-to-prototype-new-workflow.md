---
title: "From PRD to Prototype: A New Workflow for AI Product Managers"
author: "Wenhao Yu"
pubDatetime: 2026-04-15T00:00:00Z
modDatetime: 2026-04-15T00:00:00Z
slug: "from-prd-to-prototype-new-workflow"
featured: false
draft: false
tags:
  - Product Management
  - AI Agents
  - Vibe Coding
  - PRD
description: "The traditional PRD-to-engineering handoff breaks down in AI-native product work. Here's a workflow that actually works."
---

## The Problem with Traditional PRDs

A traditional PRD describes what to build. In AI product work, the "what" depends heavily on "what the model can do" — which changes every month. Static PRDs become obsolete before engineering finishes reading them.

## A Better Workflow

Instead of writing a PRD and handing it off, I've started using a three-step loop:

### 1. Define the Ontology First

Before writing any requirements, model the domain. What entities exist? What relationships matter? What operations are possible? This becomes the shared language between PM, engineering, and the AI system.

### 2. Prototype with Vibe Coding

Use Claude Code or Cursor to build a working prototype that demonstrates the core workflow. Not a mockup — a functional system that proves the data flow, the agent logic, and the user interaction pattern.

### 3. Iterate with Engineering

Bring the prototype and ontology to engineering reviews. Instead of debating requirements in the abstract, you're discussing a working system with real data models.

## Why This Works

The prototype makes requirements concrete. The ontology makes the domain explicit. Together, they eliminate the ambiguity that kills AI product timelines.

This is how [Prompt-to-Ontology](/projects/prompt-to-ontology) was built — ontology first, prototype through vibe coding, then iteration.
