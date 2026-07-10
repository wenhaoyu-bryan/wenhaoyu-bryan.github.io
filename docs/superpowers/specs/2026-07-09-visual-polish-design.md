# 视觉打磨包（Visual Polish Package）设计文档

日期：2026-07-09
状态：已确认设计，**尚未实施**——留待后续 session 执行
执行建议：单独开 `feature/visual-polish` 分支，按条目顺序逐项提交，`pnpm build` + `pnpm verify` 通过后开 PR

## 背景与原则

站主希望提升站点观感，但不能丢失专业感。共识原则：

- **动效只做"工艺感"，不做"表演感"**：只动 opacity 和 transform，时长 150–300ms，
  ease-out，由用户行为触发（hover、滚动入视口、页面切换）。禁止 parallax、
  弹簧回弹、大幅位移入场。
- **电影感动效的展示位是 AI PM Manifesto**（独立项目），本站保持克制——这个分工
  本身就是卖点，不要打破。
- 一切改动必须符合 `DESIGN.md`：单字体、单 accent、flat（**无阴影、无渐变、
  无 glass/blur**）、`border-b` 分节、既有圆角规范。
- 所有动效必须尊重 `prefers-reduced-motion`（站内已有先例，照做）。

## 改动条目（按优先级）

### 1. View Transitions 审计与调优

**现状**：`src/layouts/Layout.astro` 第 3 行已 import `ClientRouter`，第 176 行
已渲染 `<ClientRouter />`——即 Astro view transitions 已经启用，而不是"待开启"。

要做的是审计和调优，不是新增：

1. 手动走查主要路由（home → projects → 项目详情 → playbook → ai-stack → now →
   about，en 和 zh 各一遍），确认客户端导航时页面正常渐变切换、无闪白。
2. **重点排查内联脚本的生命周期**：`src/pages/index.astro` 底部的首页 reveal
   动画脚本（`querySelectorAll("#main-content > section")` 等）在 ClientRouter
   接管导航后可能不会在客户端导航返回首页时重新执行，导致 section 卡在
   `opacity-0` 或动画不重放。若确认有此问题，改为监听 `astro:page-load` 事件
   （Astro 官方推荐写法），并保证重复绑定安全（幂等）。
3. Header 的主题切换按钮、语言切换状态在页面切换后是否保持正常（必要时用
   `transition:persist`）。
4. 不追加花哨的 `transition:animate` 自定义——默认 crossfade 即可，符合克制原则。

### 2. 移除违反 flat design 的样式（bug 级修复）

`DESIGN.md` 明确"无阴影"，但现状违例：

- `src/pages/index.astro:131` 与 `src/pages/zh/index.astro:131`（hero 主按钮）：
  移除 `hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]` 与
  `dark:hover:shadow-[0_2px_8px_rgba(0,0,0,0.3)]`；同时移除 `hover:scale-105`。
  替代 hover 反馈：`hover:opacity-90`（已有 transition-opacity 先例）或
  accent 加深，二选一，保持与站内其他 accent 按钮一致。
- `src/pages/index.astro:333`（Toolbox 技能 pill）：移除 `hover:scale-105`，
  保留已有的 `hover:bg-accent/10 hover:border-accent`（颜色变化已足够）。
  注意 zh 首页无 Toolbox 区块，无需处理。
- 顺手全库 grep `scale-105`、`hover:shadow`、`drop-shadow`、`backdrop-blur`，
  确认无其他违例残留。

### 3. 微交互统一（全站一致性）

目标：同一类元素在所有页面有同一种 hover 反馈。以现有主流样式为基准统一：

- **文字链接**（`text-accent`）：统一 `hover:underline`（现状大部分已如此，
  排查漏网的）。underline 使用 `underline-offset-4` 提升观感（Breadcrumb 已有
  类似处理，对齐即可）。
- **卡片**（`border-border rounded-lg border`）：统一 hover 为
  `hover:border-accent/30 hover:bg-accent/5 transition-colors`（首页 topics
  卡片已是此样式，推广到 ai-stack / now / growth-lab 的卡片；纯展示性、不可
  点击的卡片**不加** hover 效果——hover 反馈只给可交互元素）。
- **边框按钮**（`border-border ... hover:bg-accent/10`）：现状已一致，仅核对。
- 所有过渡统一 `transition-colors`（150ms 默认），不用 `transition-all`
  （避免无意中动画 layout 属性）。

### 4. AI Stack 工作流 line-art 流程图

`DESIGN.md` 提倡"内容型视觉"（架构图、line-art），当前 `/ai-stack` 的
"The Workflow" 是五张纯文字卡片。新增一个横向流程图（SVG 内联或纯
HTML/CSS）：

- 五个节点：Ideation → Prototyping → Hard debugging → Frontend & CMS →
  Daily operations，节点间用带箭头的连线。
- 视觉语言：只用现有 design token（`border`、`muted-foreground`、`accent`），
  线框风格，无填充色块、无阴影。节点即小圆角矩形 + 文字。
- 移动端降级：窄屏改为纵向排列（或隐藏连线只留卡片序号——现有 01–05 编号
  已可承担此职责）。
- 放在现有五张卡片**之上**作为总览，卡片保留作为详情；zh 页面同步镜像
  （`src/pages/zh/ai-stack.astro`，节点文字用中文）。
- 若用 SVG，需给 `role="img"` + `aria-label` 描述流程，保证可访问性。

### 5. Vibe Coding Prototype Lab —— 并入 Playbook/Manifesto 叙事（站主已拍板）

**产品决策（2026-07-09，站主确认）**：不再作为独立项目保留，把它合并进
Playbook/Manifesto 的叙事线。它此前是五张项目卡片中唯一没有 thumbnail 的，
且与 Manifesto 的"vibe coding 能力证明"定位重叠。

执行步骤：

1. **内容迁移**：通读 `src/pages/projects/vibe-coding-prototype-lab.astro`
   （及 zh 镜像），把仍有价值、且 `playbook/vibe-coding` 尚未覆盖的内容段落
   合并进 `src/pages/playbook/vibe-coding.astro`（en + zh 同步）。重复内容
   直接舍弃，不硬塞。
2. **下架项目卡**：从 `src/data/projects.ts` 删除该项目条目（首页/项目页/
   zh 列表/llms.txt 都由此数据源驱动，会自动跟随）。项目数从 5 变 4。
3. **删除页面 + 重定向**：删除 en/zh 两个项目页文件，在 `astro.config.ts`
   的 `redirects` 中加 `/projects/vibe-coding-prototype-lab` →
   `/playbook/vibe-coding`（zh 路由同理），避免外部已收录链接 404。
4. **清理引用**：全库 grep `vibe-coding-prototype-lab`——已知引用点至少有:
   `src/pages/zh/index.astro` 的 featured 列表、`src/layouts/Layout.astro`
   的 `MIRRORED_ROUTES`。全部改指 `playbook/vibe-coding` 或移除。
5. 在 Manifesto 或 Playbook 的相关叙述中补一句衔接（如"原 Prototype Lab 的
   实验已并入本方法论页"），让老访客不迷路。

### 6. 排版与留白微调（低风险收尾）

- 检查各内容页 prose 的行宽（`app-prose` 的 max-width），确保长文行长不超过
  ~70ch，阅读舒适。
- 核对 h2/h3 上下间距节奏在 ai-stack、now、growth-lab 三个新页面与老页面一致
  （老页面 `mt-8`/`mt-6` 的用法为基准）。
- 不改字体、不改字号体系、不引入新颜色。

## 明确不做（out of scope）

- 不加 GSAP/Lenis/滚动叙事类库——那是 Manifesto 的领地。
- 不加 parallax、光标跟随、粒子背景等装饰性动效。
- 不改配色、不加新字体、不动主导航。
- 不做 GoatCounter 接入（等站主提供 site code，另行处理）。
- 不做 Experience 区块（等站主提供履历素材）。

## 验证清单（执行 session 必做）

1. `pnpm build` —— 0 errors, 0 warnings。
2. `pnpm verify` —— `scripts/verify-build.mjs` 21 项全过（含敏感词泄露扫描）。
3. `pnpm lint` 通过。
4. 手动走查：en/zh 双语首页 + ai-stack + now，light/dark 双主题，客户端导航
   往返首页确认 reveal 动画不坏（条目 1 的回归点）。
5. 开启系统 `prefers-reduced-motion` 复查一遍：无动画播放、内容完整可见。
6. 可访问性：新增 SVG 流程图有 aria-label；对比度不受改动影响（未引入新配色
   即天然满足）。

## 工程约定

- 分支：`feature/visual-polish`，走 PR 合并 `main`（合并即上线）。
  条目 5（项目合并）改动面较大，也可拆为独立分支 `feature/merge-prototype-lab`
  单独 PR，与视觉条目解耦。
- 每个条目独立 commit，便于单条回滚。
- 全部条目站主均已确认，可自主执行，无需再次询问。
