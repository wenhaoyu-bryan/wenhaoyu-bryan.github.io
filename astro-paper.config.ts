import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://wenhaoyu-bryan.github.io",
    title: "Wenhao Yu — AI PM",
    description: "AI Product Manager building agentic workflows, ontology systems, AI PM playbooks, and SEO/GEO growth experiments.",
    author: "Wenhao Yu",
    profile: "https://wenhaoyu-bryan.github.io",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Shanghai",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: false, // temporarily disabled for offline build; re-enable when fonts are reachable
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/wenhaoyu-bryan" },
    { name: "x",        url: "https://x.com/WENHAOYU8" },
    { name: "linkedin", url: "https://www.linkedin.com/in/wenhaoyu-bryan/" },
    { name: "medium",   url: "https://medium.com/@bryanyuwh" },
    { name: "mail",     url: "mailto:bryanyuwh@gmail.com" },
  ],
  shareLinks: [
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
