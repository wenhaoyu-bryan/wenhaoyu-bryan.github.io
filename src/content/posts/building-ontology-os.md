---
title: "Building Ontology OS: Reverse-Engineering Palantir AIP Through Vibe Coding"
author: "Wenhao Yu"
pubDatetime: 2026-04-20T00:00:00Z
modDatetime: 2026-04-20T00:00:00Z
slug: "building-ontology-os"
featured: false
draft: false
tags:
  - AI PM
  - Ontology
  - AI Agents
  - Knowledge Graphs
  - Vibe Coding
  - Palantir
description: "How a product manager used LLM pair programming to build and understand a full-stack ontology platform."
---

## The Question That Started It All

As an AI Product Manager working in advanced manufacturing, I needed to understand how enterprise AI platforms like Palantir AIP and Foundry actually work under the hood. Not the whitepaper version — the real version.

So I decided to build one myself.

## What Is Ontology OS?

Ontology OS transforms raw CSV data into interactive knowledge graphs. Upload your data, and an LLM infers the ontology schema — entities, relationships, constraints — then writes it all into a Neo4j graph database. A ReAct agent sits on top, ready to query the graph and suggest business actions with human-in-the-loop approval.

The key architectural insight: **Neo4j is the data source, NetworkX is the compute engine, and the LLM is the reasoning layer.** Three decoupled systems that can be independently replaced.

## The Vibe Coding Experiment

This was a PM-led rapid prototyping experiment: I defined product intent, architecture boundaries, and design constraints, while using LLM pair programming (Claude) to accelerate implementation, debugging, and iteration.

The most valuable output isn't code. It's the cognitive framework for understanding ontology-driven systems: the difference between data models, schemas, and ontologies; the distinction between "viewing a graph" and "operating a business through a graph."

## Key Technical Decisions

**Fact tables are nodes, not edges.** An order isn't a relationship between a customer and a product — it's an independent entity connected to both via separate edges. Get this wrong and your entire graph topology collapses.

**Actions over visualization.** A knowledge graph without action buttons is just a pretty picture. Every node type has context-sensitive operations calculated from its current state — a low inventory node lights up a "Create Purchase Order" button.

Read the full architecture and code on [GitHub](https://github.com/wenhaoyu-bryan/prompt-to-ontology).
