---
title: "Building a Reviewable Ontology Prototype"
author: "Wenhao Yu"
pubDatetime: 2026-04-20T00:00:00Z
modDatetime: 2026-10-25T00:00:00Z
slug: "building-ontology-os"
featured: false
draft: false
tags:
  - Ontology
  - AI Agents
  - Knowledge Graphs
description: "Product decisions from building Prompt-to-Ontology: typed data, four-state rule evidence, human review, and reversible graph changes."
---

## Why I built it

I wanted to understand what sits between enterprise data and an agent that can act on it. Public writing about ontology platforms gave me the concepts, but I needed a workflow I could inspect and question. [Prompt-to-Ontology](/projects/prompt-to-ontology/) became a learning project with one Pet Food sample domain, rather than an attempt to reproduce an enterprise platform.

The repository shows the runnable reference and its screens. Here are the product decisions that changed my understanding while building it.

## Define meaning before importing data

A CSV column is not automatically an object type. I used a declared YAML schema for object types, relationships, constraints, rules, and actions. The Data Pipeline profiles sample data and prepares a mapping, but the import plan waits for review before it changes the graph.

That extra step matters because an uncertain mapping becomes hard to notice once it looks like a valid graph object. I would rather expose the decision while it is still a candidate than ask someone to repair a convincing but incorrect graph later.

## A rule result needs a reason

A simple pass/fail result would hide two different situations: the rule could not be evaluated because data was missing, or the rule did not apply to this object. The reference uses four states: **triggered, passed, not evaluable, and not applicable**. Results carry evidence so someone can inspect what the rule actually used.

This is a product distinction, not just a technical enum. If a missing value quietly becomes “passed,” the interface can make an unsupported claim look safe.

## An agent suggestion is not a graph write

The Analyst Agent uses ontology tools to retrieve objects, follow relationships, evaluate rules, and record a structured trace. It can suggest an update, but the suggestion goes to the Review Queue. A person decides whether to apply it. The default demo works in deterministic fallback mode without an external LLM key, so the review boundary is testable without depending on model output.

I also added snapshots, diffs, and rollback. Review before a change and an audit trail after it answer different questions; both matter when a graph is used as working context.

## What this does and does not show

The Pet Food demo makes one end-to-end workflow inspectable. It has not been validated across industries, does not include enterprise identity and access management, and is not a production deployment. Those limits are part of the lesson: a useful reference implementation can surface design questions without pretending to have solved rollout at enterprise scale.

Explore the [project walkthrough](/projects/prompt-to-ontology/), the [method checklist](/playbook/prompt-to-ontology/), or the [source repository](https://github.com/wenhaoyu-bryan/Prompt-to-Ontology).
