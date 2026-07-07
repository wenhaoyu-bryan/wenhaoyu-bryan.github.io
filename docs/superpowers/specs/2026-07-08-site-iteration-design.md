# 站点迭代设计：AI Stack / Now / llms.txt 问答入口 / 访问分析

日期：2026-07-08
状态：已与站主确认方向，AI Stack 初稿待脱敏审校

## 背景与目标

站点核心标准（CLAUDE.md）：让第一次访问的人相信站主深懂 AI 产品。
本次迭代补三类信号：AI 工具编排的实证（AI Stack）、活跃 builder 信号（Now）、
站点级 AI 交互与 GEO（llms.txt + 一键提问），并补上访问数据（GoatCounter）。

明确不做：Social proof 推荐语（暂无真实素材）、Experience 履历区块（等待站主
提供）、博客中文化、Vibe Coding Prototype Lab 去留（另议）。

## 1. `/ai-stack` 页面（en + zh 镜像）

独立页面，不进主导航。入口：About 页 Tool Stack 段落链接、首页 What I Work On
区块 Toolbox 下方一行链接、llms.txt 索引。

页面结构：

1. 工作流总览 —— 构思 → 原型 → Debug → 前端/CMS → 提交评审 的流程展示，
   line-art 风格（border/muted/accent token），无装饰图
2. 编程工具矩阵 —— Claude Code CLI（主力）/ Cursor（辅助）/ Codex（前端+CMS）
3. 模型分工策略 —— 哪类模型干哪类活、为什么（不写具体版本号，保持长青）
4. 构建栈 —— 前端 / 企业级中台 / 后端 / 动画与 3D / 部署
5. 编码之外 —— 自建 Agent、双轨知识库、MCP、企业 AI 培训、API 自动化
6. 能力边界 —— 诚实写"熟练什么、边界在哪、下一步"，符合 engineering-honest 文风

### 脱敏硬规则

页面上只允许出现两类名字：

- (a) 站点已公开的项目：Prompt-to-Ontology、AI PM Operating Playbook、
  AI PM Manifesto、个人主页、Growth Lab
- (b) 通用工具 / 技术 / 公开产品名：Claude Code、Cursor、ChatGPT、Astro、
  Vue、Neo4j、GSAP 等

必须隐去并泛化：雇主与公司名、内部/私有项目名、自建工具名、电商与供应链业务
细节、培训对象的公司信息、内部数据规模的精确数字（可用"80+"等模糊表述）、
部署位置。模型只写产品线不写版本号。

初稿完成后由站主人工审校脱敏是否到位，确认后方可合并。

## 2. `/now` 页面（en + zh 镜像）

nownownow.com 惯例：正在构建 / 正在探索 / 最近上线 三段 + 最后更新日期。
入口：首页 hero 下方一行链接、About 页链接。初稿由 Claude 从公开信息起草，
站主审阅后合并。

## 3. llms.txt + 「用 AI 了解我」入口（零后端）

- `/llms.txt`：llmstxt.org 规范的站点索引（Astro endpoint，仿 robots.txt.ts）
- `/llms-full.txt`：全量公开内容（about、项目案例、playbook 摘要、博文正文），
  构建时从数据源拼装，自动随站点更新
- 首页 Get in Touch + About 页放「Ask Claude / ChatGPT about me」按钮，
  跳转对方聊天页并预填指向 llms-full.txt 的 prompt
- 架构决策：不做 Worker 代理真对话（成本与维护），选零后端方案；
  llms.txt 本身即 GEO 实践，可在 Growth Lab 补一条实验记录

## 4. 访问分析：GoatCounter

免费、无 cookie、无需同意横幅。一行 script 进 Layout.astro。
依赖站主注册 goatcounter.com 站点代码后接入。

## 工程约定

- 全部走 feature/* 分支 + PR；每个功能独立分支；`pnpm build` 通过才算完成
- 新页面均做 zh 镜像；不链接不存在的 zh 路由
- UI 遵循 DESIGN.md：单字体、单 accent、flat、border-b 分节

## 实施顺序

1. feature/ai-stack —— 本文档 + /ai-stack en/zh + 入口链接（待脱敏审校）
2. feature/now-page —— /now en/zh + 入口链接（待内容审阅）
3. feature/llms-txt —— llms.txt 端点 + 提问按钮 + Growth Lab 实验记录
4. feature/analytics —— GoatCounter（等站点代码）
