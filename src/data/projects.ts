import { getRelativeLocaleUrl } from "astro:i18n";
import ontologyThumb from "@/assets/projects/prompt-to-ontology/dashboard.png";
import playbookThumb from "@/assets/projects/ai-pm-operating-playbook/homepage.png";
import manifestoThumb from "@/assets/projects/ai-pm-manifesto/hero.png";
import agentAnatomyThumb from "@/assets/projects/agent-anatomy/hero.png";

type Locale = "en" | "zh";

export interface Project {
  title: string;
  description: string;
  status:
    | "Public"
    | "Public Tool"
    | "Ongoing"
    | "Public · Ep. 01"
    | "Current Work";
  icon: "Network" | "Book" | "Code" | "TrendingUp" | "Activity" | "Bot";
  href: string;
  external: boolean;
  tags: string[];
  /** Source repository, surfaced in llms.txt / structured data */
  repo?: string;
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
  /** Source repository, surfaced in llms.txt / structured data */
  repo?: string;
  description: Record<Locale, string>;
  tags: Record<Locale, string[]>;
  thumbnail?: ImageMetadata;
  thumbnailAlt?: string;
}

const defs: ProjectDef[] = [
  {
    title: "Enterprise Agent Platform (0 → 1)",
    icon: "Bot",
    status: "Current Work",
    path: "projects/enterprise-agent-platform",
    description: {
      en: "Leading an enterprise agent platform from 0 to 1 in advanced manufacturing as its product manager — a dual-mode design over configurable agents, an AI-co-created skill lifecycle, and governance by design (sandboxing, approval gates, audited runs). Methodology described; internals abstracted.",
      zh: "以产品经理身份，把一个面向先进制造的企业级 Agent 平台从 0 到 1 做起来：覆盖可配置 Agent 的双模设计、AI 共创的 skill 生命周期，以及「治理即设计」（沙箱、审批门、可审计运行）。方法论可公开，内部细节已抽象。",
    },
    tags: {
      en: [
        "Agent Platform",
        "Enterprise AI",
        "0 → 1",
        "Governance",
        "Industrial",
      ],
      zh: ["Agent 平台", "企业 AI", "0 → 1", "治理", "工业场景"],
    },
  },
  {
    title: "Agent Anatomy",
    icon: "Activity",
    status: "Public",
    url: "https://wenhaoyu-bryan.github.io/agent-anatomy/",
    repo: "https://github.com/wenhaoyu-bryan/agent-anatomy",
    thumbnail: agentAnatomyThumb,
    thumbnailAlt: "Agent Anatomy — interactive explainer series landing page",
    description: {
      en: "An interactive visual essay series on how AI systems actually work. Episode 01 replays an agent run — the loop, the context window filling in real time, a broken page healing fix by fix. Ships with an open trace format anyone can write to. Built with React Three Fiber and GSAP.",
      zh: "一个关于 AI 系统如何真正运作的交互式视觉长文系列。Episode 01 回放一次 agent 运行：循环、实时填充的上下文窗口、一个被逐步修复的破损页面。附带一个任何人都能编写的开放 trace 格式。基于 React Three Fiber 与 GSAP 构建。",
    },
    tags: {
      en: [
        "Interactive Explainer",
        "React Three Fiber",
        "GSAP",
        "WebGL",
        "Trace Format",
      ],
      zh: ["交互式解释", "React Three Fiber", "GSAP", "WebGL", "Trace 格式"],
    },
  },
  {
    title: "Prompt-to-Ontology",
    icon: "Network",
    status: "Public",
    path: "projects/prompt-to-ontology",
    thumbnail: ontologyThumb,
    thumbnailAlt: "Prompt-to-Ontology operational runtime dashboard",
    description: {
      en: "A public experiment turning messy requirements and business concepts into ontology assets: entities, relationships, constraints, and action-ready knowledge graphs for enterprise AI systems. The working demo runs a live pipeline of 46 ontology objects, 116 relations, and 324 review items — large enough to surface real review-queue and conflict-resolution problems rather than a toy graph.",
      zh: "把模糊需求、业务概念和表格数据转化为结构化本体资产和知识图谱的公开实验。可运行的 Demo 跑通完整流程：46 个本体对象、116 条关系、324 条待审项——规模足以暴露真实的审查队列与冲突消解问题，而不是一个玩具图谱。",
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
      en: "A cinematic single-page manifesto on how AI products should be built — the point of view behind everything else here. Built with Astro, GSAP, and Lenis.",
      zh: "一个电影感的单页宣言，讲述 AI 产品应该如何被构建——这里其他一切背后的观点。基于 Astro、GSAP、Lenis 构建。",
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
    repo: def.repo,
    thumbnail: def.thumbnail,
    thumbnailAlt: def.thumbnailAlt,
  }));
}
