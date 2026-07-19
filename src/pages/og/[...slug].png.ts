import type { APIRoute } from "astro";
import { renderTitledOgImage } from "@/utils/renderTitledOgImage";
import config from "@/config";

/**
 * Per-page Open Graph images for the top static pages and project case studies,
 * generated with the same satori renderer as blog posts so every share card is
 * on-brand. Blog posts have their own route (`posts/[...slug]/index.png.ts`).
 *
 * To add a page: add a `slug: title` entry below, then pass
 * `ogImage="/og/<slug>.png"` to that page's <Layout>. The English title is used
 * for both locales here — project titles are brand names, and the zh chrome
 * pages keep the shared default OG image.
 */
const PAGE_TITLES: Record<string, string> = {
  home: "Wenhao Yu — AI Product Manager",
  projects: "Projects — Wenhao Yu",
  playbook: "AI PM Operating Playbook",
  "growth-lab": "Growth Lab — Wenhao Yu",
  about: "About — Wenhao Yu",
  "prompt-to-ontology": "Prompt-to-Ontology",
  "enterprise-agent-platform": "Enterprise Agent Platform · Current Work",
};

export function getStaticPaths() {
  if (!config.features.dynamicOgImage) return [];
  return Object.keys(PAGE_TITLES).map(slug => ({
    params: { slug },
    props: { title: PAGE_TITLES[slug] },
  }));
}

export const GET: APIRoute = async ({ props, url }) => {
  if (!config.features.dynamicOgImage) {
    return new Response(null, { status: 404, statusText: "Not found" });
  }

  const pngBuffer = await renderTitledOgImage({
    title: (props as { title: string }).title,
    url,
  });

  return new Response(new Uint8Array(pngBuffer), {
    headers: { "Content-Type": "image/png" },
  });
};
