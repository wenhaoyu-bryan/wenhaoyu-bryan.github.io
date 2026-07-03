import { getRelativeLocaleUrl } from "astro:i18n";

type Locale = "en" | "zh";

export interface Project {
  title: string;
  description: string;
  status: "Public" | "Public Tool" | "Ongoing";
  icon: "Network" | "Book" | "Code" | "TrendingUp";
  href: string;
  external: boolean;
  tags: string[];
}

interface ProjectDef {
  title: string;
  icon: Project["icon"];
  status: Project["status"];
  /** Internal path relative to the locale root (mutually exclusive with url) */
  path?: string;
  /** External URL */
  url?: string;
  description: Record<Locale, string>;
  tags: Record<Locale, string[]>;
}

const defs: ProjectDef[] = [
  {
    title: "Prompt-to-Ontology",
    icon: "Network",
    status: "Public",
    path: "projects/prompt-to-ontology",
    description: {
      en: "A public experiment turning messy requirements and business concepts into ontology assets: entities, relationships, constraints, and action-ready knowledge graphs for enterprise AI systems.",
      zh: "把模糊需求、业务概念和表格数据转化为结构化本体资产和知识图谱的公开实验。",
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
    title: "Vibe Coding Prototype Lab",
    icon: "Code",
    status: "Public",
    path: "projects/vibe-coding-prototype-lab",
    description: {
      en: "A public lab showing how PM-led LLM pair programming can turn ambiguous ideas into prototypes, specs, and reusable product workflows.",
      zh: "展示 AI 产品经理如何借助 Claude Code、Cursor 和 LLM Pair Programming 把想法转化为原型和可复用流程。",
    },
    tags: {
      en: ["Claude Code", "Cursor", "Prototyping", "LLM Pair Programming"],
      zh: ["Claude Code", "Cursor", "Prototyping", "LLM Pair Programming"],
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
    href: def.url ?? getRelativeLocaleUrl(loc, def.path),
    external: Boolean(def.url),
  }));
}
