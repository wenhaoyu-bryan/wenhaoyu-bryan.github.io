import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";
import { readFileSync } from "node:fs";

// Local builds work offline with this last known roster. The Pages workflow
// supplies an updated roster generated from the separately deployed project.
const defaultAgentAnatomyPaths = [
  "/agent-anatomy/",
  "/agent-anatomy/episodes/how-an-agent-works/",
  "/agent-anatomy/episodes/where-agents-go-wrong/",
  "/agent-anatomy/episodes/how-ai-reads-the-web/",
  "/agent-anatomy/episodes/how-agents-remember/",
  "/agent-anatomy/episodes/how-agents-work-together/",
];

const rosterFile = process.env.AGENT_ANATOMY_SITEMAP_FILE;
const agentAnatomyPaths: string[] = rosterFile
  ? JSON.parse(readFileSync(rosterFile, "utf8"))
  : defaultAgentAnatomyPaths;
if (
  !Array.isArray(agentAnatomyPaths) ||
  !agentAnatomyPaths.includes("/agent-anatomy/") ||
  !agentAnatomyPaths.some(path =>
    /^\/agent-anatomy\/episodes\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(path)
  ) ||
  agentAnatomyPaths.some(
    path =>
      typeof path !== "string" ||
      (path !== "/agent-anatomy/" &&
        !/^\/agent-anatomy\/episodes\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(path))
  )
) {
  throw new Error("Invalid Agent Anatomy sitemap roster");
}

export default defineConfig({
  site: config.site.url,
  devToolbar: {
    enabled: false,
  },
  // Vibe Coding Prototype Lab was folded into the Vibe Coding playbook page;
  // keep old inbound links alive.
  redirects: {
    "/projects/vibe-coding-prototype-lab": "/playbook/vibe-coding",
    "/zh/projects/vibe-coding-prototype-lab": "/zh/playbook/vibe-coding",
    // Professional roles moved from /projects/ to the /work/ section.
    "/projects/enterprise-agent-platform": "/work/enterprise-agent-platform",
    "/projects/ai-sop-assistant": "/work/ai-sop-assistant",
    "/zh/projects/enterprise-agent-platform":
      "/zh/work/enterprise-agent-platform",
    "/zh/projects/ai-sop-assistant": "/zh/work/ai-sop-assistant",
    // The paginated posts list was replaced by the /posts/ Writing hub; keep the
    // old page-2 URLs alive.
    "/posts/2": "/posts",
    "/zh/posts/2": "/zh/posts",
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      customPages: agentAnatomyPaths.map(
        path => new URL(path, config.site.url).href
      ),
      filter: page => {
        const pathname = new URL(page).pathname;
        const utilityPage = /^\/(?:zh\/)?(?:search|tags|archives)(?:\/|$)/;
        return !utilityPage.test(pathname);
      },
    }),
  ],
  i18n: {
    locales: ["en", "zh"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
