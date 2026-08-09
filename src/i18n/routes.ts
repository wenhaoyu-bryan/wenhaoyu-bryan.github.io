/**
 * Routes that have authored pages in both locales.
 *
 * Keep this list as the single source of truth for the language switcher and
 * hreflang output. English blog posts, tag archives, and the interactive
 * ontology graph intentionally fall back to the nearest localized hub.
 */
export const MIRRORED_ROUTES = [
  "/",
  "/about/",
  "/ai-stack/",
  "/now/",
  "/work/",
  "/work/enterprise-agent-platform/",
  "/work/ai-sop-assistant/",
  "/projects/",
  "/projects/prompt-to-ontology/",
  "/playbook/",
  "/playbook/agent-product-design/",
  "/playbook/ai-native-prd/",
  "/playbook/harness-engineering/",
  "/playbook/loop-engineering/",
  "/playbook/prd-to-prototype/",
  "/playbook/prompt-to-ontology/",
  "/playbook/seo-to-geo/",
  "/playbook/vibe-coding/",
  "/growth-lab/",
  "/posts/",
  "/search/",
] as const;

export function normalizeRoutePath(path: string): string {
  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  const normalized = withLeadingSlash.replace(/\/+/g, "/");
  if (normalized === "/") return "/";
  return `${normalized.replace(/\/+$/, "")}/`;
}

export function isMirroredRoute(path: string): boolean {
  const normalized = normalizeRoutePath(path);
  return MIRRORED_ROUTES.some(route => route === normalized);
}

/** Return a localized hub instead of manufacturing a broken language link. */
export function getLocaleFallbackPath(path: string): string {
  const normalized = normalizeRoutePath(path);

  if (
    normalized.startsWith("/posts/") ||
    normalized.startsWith("/tags/") ||
    normalized.startsWith("/archives/")
  ) {
    return "/posts/";
  }

  if (normalized.startsWith("/projects/")) return "/projects/";

  return "/";
}
