import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { getProjects } from "@/data/projects";
import config from "@/config";

/**
 * llms.txt — a concise, machine-readable index of the site, following the
 * llmstxt.org convention. Points AI answer engines at the key pages and at
 * llms-full.txt for the complete content.
 */
export const GET: APIRoute = async () => {
  const base = config.site.url.replace(/\/$/, "");
  const projects = getProjects("en");
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
    `- [Projects](${base}/projects): Case studies of shipped AI product work.`
  );
  lines.push(
    `- [Playbook](${base}/playbook): AI PM methodology — vibe coding, harness engineering, loop engineering, AI-native PRD, agent product design, ontology systems.`
  );
  lines.push(
    `- [Growth Lab](${base}/growth-lab): SEO, GEO, and AI-search-aware growth experiments.`
  );
  lines.push(`- [Now](${base}/now): What Wenhao is focused on right now.`);
  lines.push("");

  lines.push("## Projects");
  for (const p of projects) {
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
