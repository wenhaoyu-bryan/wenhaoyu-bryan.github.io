import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { getWork, getBuilds } from "@/data/projects";
import config from "@/config";

/**
 * llms.txt — a concise, machine-readable index of the site, following the
 * llmstxt.org convention. Points AI answer engines at the key pages and at
 * llms-full.txt for the complete content.
 */
export const GET: APIRoute = async () => {
  const base = config.site.url.replace(/\/$/, "");
  const work = getWork("en");
  const builds = getBuilds("en");
  const posts = getSortedPosts(await getCollection("posts"));

  const lines: string[] = [];

  lines.push("# Wenhao Yu (Bryan) — AI Product Manager");
  lines.push("");
  lines.push(
    "> AI Product Manager building agentic workflows, ontology-driven systems, " +
      "and AI-native product tools. This site is a portfolio and knowledge hub: " +
      "case studies, an AI PM methodology playbook, growth experiments, and writing."
  );
  lines.push("");
  lines.push(
    "Wenhao took an enterprise agent platform from 0 to 1 as its product manager, " +
      "holds a Master of Engineering from Cornell University, and works in the messy " +
      "middle between business problems, product systems, and working software. " +
      "For the complete, detailed content of this site in one file, see " +
      `${base}/llms-full.txt`
  );
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [About](${base}/about): Who Wenhao is and how he works.`);
  lines.push(
    `- [My AI Stack](${base}/ai-stack): How he orchestrates coding agents, chat models, and self-built tools, plus 0-to-1 agent platform product design and honest capability boundaries.`
  );
  lines.push(
    `- [Work](${base}/work): Professional roles — a current 0-to-1 enterprise agent platform and a concluded AI-SOP assistant case study at AB InBev.`
  );
  lines.push(
    `- [Projects](${base}/projects): Self-directed builds shipped in the open — ontology systems, interactive explainers, an AI PM toolkit, and growth experiments.`
  );
  lines.push(
    `- [Playbook](${base}/playbook): AI PM methodology — vibe coding, harness engineering, loop engineering, AI-native PRD, agent product design, ontology systems.`
  );
  lines.push(
    `- [Growth Lab](${base}/growth-lab): A public lab notebook of SEO and GEO growth experiments, run in the open — with this site as Experiment 01.`
  );
  lines.push(`- [Now](${base}/now): What Wenhao is focused on right now.`);
  lines.push("");

  // Focus areas — mirrors the "What I Work On" pillars on the homepage.
  lines.push("## Focus Areas");
  lines.push(
    `- Agentic Workflows: Designing agent systems with tools, memory, and governance. Proof: Agent Anatomy (https://wenhaoyu-bryan.github.io/agent-anatomy/).`
  );
  lines.push(
    `- Ontology-Driven AI Products: Knowledge graphs and structured ontologies that make enterprise AI reliable. Proof: ${base}/projects/prompt-to-ontology.`
  );
  lines.push(
    `- AI-Assisted Delivery: Harness Engineering, Loop Engineering, and Vibe Coding — the systems through which PMs ship with coding agents. Proof: ${base}/posts/three-frameworks-ai-assisted-product-delivery, ${base}/playbook.`
  );
  lines.push(
    `- Industrial & B2B AI: Enterprise adoption, industrial operations, and B2B product contexts. Proof: ${base}/work/enterprise-agent-platform.`
  );
  lines.push(
    `- SEO/GEO Growth: How generative engines reshape organic growth — experiments in machine-readable content, structured data, and answer-engine optimization. Proof: ${base}/growth-lab.`
  );
  lines.push("");

  lines.push("## Work");
  for (const p of work) {
    const url = p.external ? p.href : `${base}${p.href}`;
    lines.push(`- [${p.title}](${url}) — ${p.status}: ${p.description}`);
  }
  lines.push("");

  lines.push("## Projects");
  for (const p of builds) {
    const url = p.external ? p.href : `${base}${p.href}`;
    const repo = p.repo ? ` Source: ${p.repo}` : "";
    lines.push(`- [${p.title}](${url}): ${p.description}${repo}`);
  }
  lines.push("");

  lines.push("## Writing");
  for (const post of posts) {
    const url = `${base}${getPostUrl(post.id, post.filePath, "en")}`;
    lines.push(`- [${post.data.title}](${url}): ${post.data.description}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
