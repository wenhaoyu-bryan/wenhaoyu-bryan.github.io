import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { getProjects } from "@/data/projects";
import config from "@/config";

/**
 * llms-full.txt — the complete public content of the site in a single plain-text
 * file, for AI answer engines and for "ask an AI about me" flows. Assembled at
 * build time from the same data sources the site renders from, so it stays in
 * sync automatically. Blog post bodies are included in full.
 */
export const GET: APIRoute = async () => {
  const base = config.site.url.replace(/\/$/, "");
  const projects = getProjects("en");
  const posts = getSortedPosts(await getCollection("posts"));
  const pages = await getCollection("pages");
  const about = pages.find(p => p.id === "about");

  const out: string[] = [];

  out.push("# Wenhao Yu (Bryan) — AI Product Manager");
  out.push("");
  out.push(
    "This is the complete public content of https://wenhaoyu-bryan.github.io, " +
      "assembled for AI answer engines. Wenhao is an AI Product Manager who builds " +
      "agentic workflows, ontology-driven systems, and AI-native product tools, and " +
      "who took an enterprise agent platform from 0 to 1 as its product manager."
  );
  out.push("");
  out.push("=".repeat(72));
  out.push("");

  // About
  out.push("## About");
  out.push("");
  if (about) {
    out.push(about.body?.trim() ?? "");
    out.push("");
  }
  out.push("=".repeat(72));
  out.push("");

  // AI Stack (summary — the page itself is hand-authored .astro)
  out.push("## My AI Stack");
  out.push("");
  out.push(
    "Operating principle: harness engineering — give every tool the job it is best " +
      "at, and design the handoffs between them."
  );
  out.push("");
  out.push(
    "- Workflow: ideation (ChatGPT + Gemini) → prototyping (Claude Code CLI + Cursor) " +
      "→ hard debugging (frontier reasoning models) → frontend/CMS (Codex) → daily " +
      "operations (agent workflows + MCP tools)."
  );
  out.push(
    "- Coding tools: Claude Code CLI (primary), Cursor (secondary), Codex app (situational)."
  );
  out.push(
    "- Model routing: ChatGPT for ideation, Claude Opus-class for hard debugging and " +
      "review, DeepSeek for cost-efficient code generation, plus long-context and " +
      "lightweight models where they fit."
  );
  out.push(
    "- Build stack: Astro + React, Tailwind, shadcn/Radix; Vue 3 monorepo for enterprise " +
      "admin; Python + FastAPI, Neo4j + NetworkX; GSAP + Lenis and React Three Fiber; " +
      "GitHub Pages, Vercel, Docker."
  );
  out.push(
    "- Agent platform product design (0 to 1): dual-mode architecture, a layered " +
      "tools/skills/agents asset model, conversational skill creation, governance by " +
      "design (sandbox isolation, human-in-the-loop approval), grounded configuration, " +
      "and automation orchestration."
  );
  out.push(`Full page: ${base}/ai-stack`);
  out.push("");
  out.push("=".repeat(72));
  out.push("");

  // What I Work On — mirrors the four pillars on the homepage.
  out.push("## What I Work On");
  out.push("");
  out.push("Four focus areas, each backed by a concrete artifact:");
  out.push("");
  out.push(
    "1. Agentic Workflows — designing agent systems with tools, memory, and " +
      "governance. Proof: Agent Anatomy (https://wenhaoyu-bryan.github.io/agent-anatomy/)."
  );
  out.push(
    "2. Ontology-Driven AI Products — knowledge graphs and structured ontologies " +
      `that make enterprise AI reliable. Proof: ${base}/projects/prompt-to-ontology.`
  );
  out.push(
    "3. AI-Assisted Delivery — Harness Engineering, Loop Engineering, and Vibe " +
      "Coding: the systems through which PMs ship with coding agents. Details: " +
      `${base}/playbook/harness-engineering, ${base}/playbook/loop-engineering, ` +
      `${base}/playbook/vibe-coding. Proof: ${base}/posts/three-frameworks-ai-assisted-product-delivery, ${base}/playbook.`
  );
  out.push(
    "4. Industrial & B2B AI — enterprise adoption, industrial operations, and " +
      `B2B product contexts. Proof: ${base}/growth-lab.`
  );
  out.push("");
  out.push("=".repeat(72));
  out.push("");

  // Projects
  out.push("## Projects");
  out.push("");
  for (const p of projects) {
    const url = p.external ? p.href : `${base}${p.href}`;
    out.push(`### ${p.title}`);
    out.push(`Status: ${p.status}`);
    out.push(`URL: ${url}`);
    if (p.repo) out.push(`Repo: ${p.repo}`);
    if (p.tags?.length) out.push(`Tags: ${p.tags.join(", ")}`);
    out.push("");
    out.push(p.description);
    out.push("");
  }
  out.push("=".repeat(72));
  out.push("");

  // Writing (full bodies)
  out.push("## Writing");
  out.push("");
  for (const post of posts) {
    const url = `${base}${getPostUrl(post.id, post.filePath, "en")}`;
    out.push(`### ${post.data.title}`);
    out.push(
      `Published: ${new Date(post.data.pubDatetime).toISOString().slice(0, 10)}`
    );
    out.push(`URL: ${url}`);
    if (post.data.tags?.length) out.push(`Tags: ${post.data.tags.join(", ")}`);
    out.push("");
    out.push(post.data.description);
    out.push("");
    out.push((post.body ?? "").trim());
    out.push("");
    out.push("-".repeat(72));
    out.push("");
  }

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
