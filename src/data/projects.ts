import { getRelativeLocaleUrl } from "astro:i18n";
import ontologyThumb from "@/assets/projects/prompt-to-ontology/dashboard.png";
import playbookThumb from "@/assets/projects/ai-pm-operating-playbook/homepage.png";
import manifestoThumb from "@/assets/projects/ai-pm-manifesto/hero.png";

type Locale = "en" | "zh";

export interface Project {
  title: string;
  description: string;
  status: "Public" | "Public Tool" | "Ongoing";
  icon: "Network" | "Book" | "Code" | "TrendingUp";
  href: string;
  external: boolean;
  tags: string[];
  thumbnail?: ImageMetadata;
  thumbnailAlt?: string;
}

interface ProjectDef {
  title: string;
  icon: Project["icon"];
  status: Project["status"];
  /** Internal path relative to the locale root (mutually exclusive with url) */
  path?: string;
  /** External URL */
  url?: string;
  /** Page exists only in English; zh listings link to the en route. */
  enOnly?: boolean;
  description: Record<Locale, string>;
  tags: Record<Locale, string[]>;
  thumbnail?: ImageMetadata;
  thumbnailAlt?: string;
}

const defs: ProjectDef[] = [
  {
    title: "Prompt-to-Ontology",
    icon: "Network",
    status: "Public",
    path: "projects/prompt-to-ontology",
    thumbnail: ontologyThumb,
    thumbnailAlt: "Prompt-to-Ontology operational runtime dashboard",
    description: {
      en: "A public experiment turning messy requirements and business concepts into ontology assets: entities, relationships, constraints, and action-ready knowledge graphs for enterprise AI systems. The working demo runs a live pipeline of 46 ontology objects, 116 relations, and 324 review items.",
      zh: "把模糊需求、业务概念和表格数据转化为结构化本体资产和知识图谱的公开实验。可运行的 Demo 跑通完整流程：46 个本体对象、116 条关系、324 条待审项。",
    },
    tags: {
      en: ["Ontology", "Knowledge Graphs", "Neo4j", "NetworkX", "ReAct Agent"],
      zh: ["Ontology", "Knowledge Graphs", "Neo4j", "NetworkX", "ReAct Agent"],
    },
  },
  {
    title: "AI PM Operating Playbook",
    icon: "Book",
    status: "Public Tool",
    url: "https://wenhaoyu-bryan.github.io/AI-PM-Operating-Playbook/",
    thumbnail: playbookThumb,
    thumbnailAlt: "AI PM Operating Playbook landing page and workbench",
    description: {
      en: "A methodology-driven toolkit that turns ambiguous AI product ideas into structured product briefs, workflow specifications, evaluation plans, and coding-agent handoff materials.",
      zh: "面向 AI 产品经理的方法论工具集，将模糊的 AI 产品想法转化为结构化产品简报、工作流规格、评估计划和编码智能体交接材料。",
    },
    tags: {
      en: ["AI PM", "Methodology", "Interactive Tools", "Frameworks"],
      zh: ["AI PM", "方法论", "交互工具", "框架"],
    },
  },
  {
    title: "AI PM Manifesto",
    icon: "Code",
    status: "Public",
    url: "https://wenhaoyu-bryan.github.io/AI-PM-Manifesto/",
    thumbnail: manifestoThumb,
    thumbnailAlt: "AI PM Manifesto — dark cinematic scroll page hero",
    description: {
      en: "A dark, cinematic single-page manifesto on building AI products with AI — and a frontend / UI-UX craft showcase. Built with Astro, GSAP, and Lenis.",
      zh: "一个暗色电影感的单页宣言：用 AI 构建 AI 产品，同时展示前端 / UI-UX 设计能力。基于 Astro、GSAP、Lenis 构建。",
    },
    tags: {
      en: ["Frontend", "Motion", "GSAP", "Astro", "UI/UX"],
      zh: ["前端", "动效", "GSAP", "Astro", "UI/UX"],
    },
  },
  {
    title: "SEO/GEO Growth Experiments",
    icon: "TrendingUp",
    status: "Ongoing",
    path: "growth-lab",
    description: {
      en: "Experiments on content systems, B2B websites, and AI-search-aware growth loops — connecting SEO fundamentals with GEO visibility.",
      zh: "关于内容系统、B2B 网站增长和 AI 搜索可见性的长期笔记与实验空间。",
    },
    tags: {
      en: ["SEO", "GEO", "B2B", "Content Systems"],
      zh: ["SEO", "GEO", "B2B", "Content Systems"],
    },
  },
];

export function getProjects(locale: string): Project[] {
  const loc: Locale = locale === "zh" ? "zh" : "en";
  return defs.map(def => ({
    title: def.title,
    icon: def.icon,
    status: def.status,
    description: def.description[loc],
    tags: def.tags[loc],
    href: def.url ?? getRelativeLocaleUrl(def.enOnly ? "en" : loc, def.path),
    external: Boolean(def.url),
    thumbnail: def.thumbnail,
    thumbnailAlt: def.thumbnailAlt,
  }));
}
