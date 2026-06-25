---
title: "Three Frameworks for AI-Assisted Product Delivery"
author: "Wenhao Yu"
pubDatetime: 2026-06-26T00:00:00Z
modDatetime: 2026-06-26T00:00:00Z
slug: "three-frameworks-ai-assisted-product-delivery"
featured: false
draft: false
tags:
  - AI Product Management
  - Harness Engineering
  - Loop Engineering
  - Vibe Coding
  - Claude Code
description: "Three practical frameworks — Harness Engineering, Loop Engineering, and Vibe Coding — for working with AI coding agents as a product manager."
---

## Why PMs Need New Frameworks

AI coding agents change how products get built. Claude Code, Cursor, and similar tools let PMs prototype ideas, generate structured handoffs, and validate workflows without waiting for a sprint cycle. But most PMs interact with these tools without a framework. They prompt, get output, and hope for the best.

I have been developing three frameworks to make this work more structured. None of these are established industry terms — they are working concepts I use when thinking about AI-assisted product delivery. Here is a summary of each.

## 1. Harness Engineering: Designing the Agent's Environment

The model generates. The agent loop decides what to do next. But the harness — the environment around the agent — determines whether the output is useful.

Harness engineering means designing five things:

- **Context**: What does the agent see? Project structure, conventions, domain knowledge, the specific task.
- **Tools**: What can the agent do? File read/write, API calls, test execution. Every tool is a capability and a risk.
- **Constraints**: What must the agent not do? Scope limits, security rules, style guides.
- **Tests and feedback**: How does the agent know it succeeded? Linting, type checks, test suites, human review.
- **State and handoff**: How does work persist across sessions? CLAUDE.md files, structured documentation, Git history.

The PM's role is defining what context matters, scoping tool access, setting product-level guardrails, and writing acceptance criteria. Engineers define the implementation-level details. Harness engineering is a shared discipline.

[Read the full framework: Harness Engineering for AI-Assisted Product Delivery](/playbook/harness-engineering)

## 2. Loop Engineering: Designing How Things Improve

One-shot prompting produces first drafts. Real products improve through iteration. Loop engineering is about designing the feedback loops that make each iteration better than the last.

I think about five loops:

- **Product loop**: Idea, framing, prototype, evaluation, feedback, updated context, next iteration.
- **Implementation loop**: Code generation, test, review, fix, commit.
- **Evaluation loop**: Metrics, measurement, analysis, adjustment.
- **User-feedback loop**: Usage, observation, insight, product update.
- **Context update loop**: Learnings, updated docs, better next iteration.

The critical pattern: each loop must produce artifacts that feed into the next cycle. Without artifacts, every iteration starts from zero. The most common failure mode is loops that do not close — teams generate output but never feed results back into the process.

[Read the full framework: Loop Engineering for AI Product Development](/playbook/loop-engineering)

## 3. Vibe Coding for Product Discovery

Vibe coding, in the context I use it, means PM-led, coding-agent-assisted prototyping for discovery. Not shipping production code — exploring ideas through working prototypes.

What it is good for: early-stage ideas where you need to see a working interface, workflow validation before writing a detailed spec, stakeholder communication through clickable prototypes, and technical feasibility checks before requesting engineering time.

What it is not good for: production engineering, architecture decisions, security review, scalability. Discovery prototypes are disposable. The value is in the learning, not the code.

The most important skill is not prompt crafting — it is product definition. Before prompting the agent, you need to know the user problem, the happy path, the data model, and what "good enough" looks like for a discovery prototype.

[Read the full framework: Vibe Coding for Product Discovery](/playbook/vibe-coding)

## How They Connect

These three frameworks operate at different levels:

- **Harness engineering** designs the environment for a single agent run.
- **Loop engineering** designs how that environment evolves over repeated iterations.
- **Vibe coding** is a specific application — discovery prototyping — that benefits from both.

The AI PM Operating Playbook's interactive tools operationalize these ideas. The Coding-Agent Handoff tool generates the structured context documents that harness engineering requires. The Evaluation step supports the evaluation loop. The product brief workflow supports vibe coding from idea to structured handoff.

## Start Here

If you are a PM working with AI coding agents, try this sequence:

1. Write a CLAUDE.md for your project (harness engineering).
2. Prototype one product idea with a coding agent, using clear acceptance criteria (vibe coding).
3. After the prototype, document what you learned and update your project context (loop engineering).

The frameworks are practical tools, not theory. Use them to make your AI-assisted work more structured and your outputs more reusable.
