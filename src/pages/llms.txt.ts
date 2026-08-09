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
  const toCanonicalUrl = (path: string) => {
    if (/^https?:\/\//.test(path)) return path;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${base}${normalized.endsWith("/") ? normalized : `${normalized}/`}`;
  };
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
  lines.push(
    `- [About](${toCanonicalUrl("/about/")}): Who Wenhao is and how he works.`
  );
  lines.push(
    `- [My AI Stack](${toCanonicalUrl("/ai-stack/")}): How he orchestrates coding agents, chat models, and self-built tools, plus 0-to-1 agent platform product design and honest capability boundaries.`
  );
  lines.push(
    `- [Work](${toCanonicalUrl("/work/")}): Professional roles — a current 0-to-1 enterprise agent platform and a concluded AI-SOP assistant case study at AB InBev.`
  );
  lines.push(
    `- [Projects](${toCanonicalUrl("/projects/")}): Self-directed builds shipped in the open — ontology systems, interactive explainers, an AI PM toolkit, and growth experiments.`
  );
  lines.push(
    `- [Thinking](${toCanonicalUrl("/posts/")}): The thinking hub — the AI PM Methodology section, the Growth Lab, and essays and working notes, in one place.`
  );
  lines.push(
    `- [Methodology](${toCanonicalUrl("/playbook/")}): AI PM methodology — vibe coding, harness engineering, loop engineering, AI-native PRD, agent product design, ontology systems.`
  );
  lines.push(
    `- [Growth Lab](${toCanonicalUrl("/growth-lab/")}): A public lab notebook of SEO and GEO growth experiments, run in the open — with this site as Experiment 01.`
  );
  lines.push(
    `- [Now](${toCanonicalUrl("/now/")}): What Wenhao is focused on right now.`
  );
  lines.push("");

  lines.push("## Language Scope");
  lines.push(
    "- Core portfolio, work, project, and methodology pages are available in English and Chinese."
  );
  lines.push(
    "- Posts are currently published in English; the Chinese Thinking hub links to those English originals."
  );
  lines.push("");

  // Focus areas — mirrors the "What I Work On" pillars on the homepage.
  lines.push("## Focus Areas");
  lines.push(
    `- Agentic Workflows: Designing agent systems with tools, memory, and governance. Proof: Agent Anatomy (https://wenhaoyu-bryan.github.io/agent-anatomy/).`
  );
  lines.push(
    `- Ontology-Driven AI Products: Knowledge graphs and structured ontologies that make enterprise AI reliable. Proof: ${toCanonicalUrl("/projects/prompt-to-ontology/")}`
  );
  lines.push(
    `- AI-Assisted Delivery: Harness Engineering, Loop Engineering, and Vibe Coding — the systems through which PMs ship with coding agents. Proof: ${toCanonicalUrl("/posts/three-frameworks-ai-assisted-product-delivery/")}, ${toCanonicalUrl("/playbook/")}`
  );
  lines.push(
    `- Industrial & B2B AI: Enterprise adoption, industrial operations, and B2B product contexts. Proof: ${toCanonicalUrl("/work/enterprise-agent-platform/")}`
  );
  lines.push(
    `- SEO/GEO Growth: How generative engines reshape organic growth — experiments in machine-readable content, structured data, and answer-engine optimization. Proof: ${toCanonicalUrl("/growth-lab/")}`
  );
  lines.push("");

  lines.push("## Work");
  for (const p of work) {
    const url = toCanonicalUrl(p.href);
    lines.push(`- [${p.title}](${url}) — ${p.status}: ${p.description}`);
  }
  lines.push("");

  lines.push("## Projects");
  for (const p of builds) {
    const url = toCanonicalUrl(p.href);
    const repo = p.repo ? ` Source: ${p.repo}` : "";
    lines.push(`- [${p.title}](${url}): ${p.description}${repo}`);
  }
  lines.push("");

  lines.push("## Posts");
  for (const post of posts) {
    const url = toCanonicalUrl(getPostUrl(post.id, post.filePath, "en"));
    lines.push(`- [${post.data.title}](${url}): ${post.data.description}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
