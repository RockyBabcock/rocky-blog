# Rocky Blog

**语言：** **中文** · [English](./docs/README.en.md) · [日本語](./docs/README.ja.md)

Rocky Blog 是一个以内容阅读与发现为中心的静态个人博客，文章由外部 MuseAI 工作流统一撰写和翻译。项目基于 **Astro 7、React 19、TypeScript 与 Tailwind CSS 4**，采用静态构建和按需交互的架构；视觉方向为 **Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details**，以清晰的编辑式排版为基础，用克制的樱花、植物与星象细节建立识别度。

> 本仓库是 Rocky Blog 的独立项目。它参考并继承了部分上游实现与设计思路，但产品范围、内容、配置和后续维护以本仓库为准。

[快速开始](./GETTING-STARTED.md) · [产品范围](./docs/PRODUCT-SCOPE.md) · [项目状态与 Agent 交接](./docs/PROJECT-STATUS.md) · [架构文档](./docs/overview/00-overview.md) · [完整使用指南](./src/content/blog/tools/astro-koharu-guide.md)

## 产品概览

- **内容组织：** 首页精选内容、最新文章、系列 / 周刊、分类、标签、归档、时间线与分页。
- **阅读体验：** 深浅主题、阅读设置、阅读进度、目录、专注阅读模式、阅读历史与继续阅读入口。
- **站内发现：** Pagefind 静态全文搜索、命令面板与站内导航。
- **Personal Reading Shelf（个人阅读书架）：** 收藏文章，按待读 / 阅读中 / 已完成筛选，支持搜索、排序和网格 / 列表视图；分类和归档列表也支持集合内搜索 / 排序；数据仅保存在本地浏览器。
- **Markdown：** GFM、Shiki 代码高亮、KaTeX、Mermaid、Infographic，以及 Shoka 风格容器、标签页、折叠、注音和文本效果。
- **内容保护：** 整篇或局部 AES-256-GCM 静态加密；这不是服务端访问控制，详见[安全说明](./docs/PRODUCT-SCOPE.md)。
- **多语言：** 中文（默认）、English、日本語、Français。界面字典支持四种语言；文章是否有翻译取决于实际内容。
- **SEO 与静态发布：** canonical、Open Graph、hreflang、sitemap、robots 与静态部署。
- **视觉细节：** 响应式编辑式布局、樱花花瓣、页面转场与分级动效，并尊重系统减少动态效果设置。

本项目不提供账号系统、云端阅读历史同步、评论、统计分析、CMS 后台、全站音乐播放器或 RSS 订阅等产品功能。完整保留范围与明确非目标见[产品范围](./docs/PRODUCT-SCOPE.md)。

## 界面预览

下列截图来自历史版本，用于展示页面结构与部分交互方向，不保证与当前 `main` 的最新视觉实现完全一致。后续更新截图时请同步核对本节说明。

<table>
  <tr>
    <td width="50%"><img src="./docs/assets/showcase/home.webp" alt="Rocky Blog 首页布局历史截图" /><br /><sub>首页布局（历史截图）</sub></td>
    <td width="50%"><img src="./docs/assets/showcase/theme.webp" alt="深浅主题历史截图" /><br /><sub>主题切换（历史截图）</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./docs/assets/showcase/pages.webp" alt="内容页面切换历史截图" /><br /><sub>页面切换（历史截图）</sub></td>
    <td width="50%"><img src="./docs/assets/showcase/toc.webp" alt="文章目录历史截图" /><br /><sub>文章目录（历史截图）</sub></td>
  </tr>
</table>

## 本地开发

### 环境要求

- Node.js：`>=22.20.0`
- pnpm：`10.28.2`（仓库在 `package.json` 中声明）

### 启动

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

开发服务器默认使用 3000 端口，可通过 `BLOG_PORT` 环境变量覆盖。终端会显示实际访问地址。

### 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 生成生产静态站点 |
| `pnpm preview` | 本地预览生产构建 |
| `pnpm check` | Astro / TypeScript 检查 |
| `pnpm lint` | Biome 检查 |
| `pnpm test` | 运行核心测试套件 |
| `pnpm knip` | 检查未使用文件与依赖 |
| `pnpm generate:lqips` | 生成图片低质量占位资源 |

## MuseAI 内容接入

Rocky Blog 的文章全部由外部 MuseAI 工作流撰写和翻译。仓库不包含 CMS、浏览器写作室、文章管理后台或本地编辑器集成；文章以经过校验的 Markdown / MDX 文件进入内容集合。

Muse 应先遵循 [Muse 内容生产规范](./docs/muse/README.md)，其中包含 frontmatter schema、目录与分类映射、中文 / 英语 / 日语 / 法语路径约定、当前支持的 Markdown 语法、编辑标准、上传检查清单，以及新文章 / 翻译 / 审核修订 Prompt。

内容根目录为 `src/content/blog/`。中文文件放在分类目录下，译文镜像到 `en/`、`ja/` 或 `fr/`。Muse 上传后，由仓库的内容 schema 校验并通过静态构建发布。不要手工添加 schema 未定义的 frontmatter 字段。

## 配置与部署

- 站点名称、作者、域名、导航、语言、系列、主题与动效：`config/site.yaml`
- 分类名称到 URL slug 的映射：`categoryMap`（同一配置文件）
- 分类 / 系列等内容翻译：`config/i18n-content.yaml`
- 文章 schema：`src/content.config.ts`

执行 `pnpm build` 生成 `dist/`。该目录可部署到 GitHub Pages、Vercel、Netlify、Cloudflare Pages 或其他静态托管平台；无需 Node 服务端或数据库。

## 项目文档

| 文档 | 内容 |
| --- | --- |
| [产品范围](./docs/PRODUCT-SCOPE.md) | 保留功能、非目标、设计方向与安全边界 |
| [项目状态与 Agent 交接](./docs/PROJECT-STATUS.md) | 维护者需求、当前实现状态、验证基线和 Agent 工作流程 |
| [前端设计实施 Prompt](./docs/FRONTEND-DESIGN-PROMPT.md) | 面向 AI Studio / Gemini / Claude / Copilot 的视觉设计与实施规范 |
| [Editorial 设计参考与 Rocky 风格转译](./docs/design/EDITORIAL-REFERENCE-AND-ADAPTATION.md) | 开源博客、顶级出版物的设计研究及其对 Rocky 首页 / 文章页的具体应用 |
| [Muse 内容规范](./docs/muse/README.md) | Muse 文章生成、Markdown schema、目录结构、翻译、上传与 Prompt |
| [快速开始](./GETTING-STARTED.md) | 安装、配置、Muse 内容接入与部署 |
| [完整使用指南](./src/content/blog/tools/astro-koharu-guide.md) | 面向站点维护者的操作手册 |
| [架构总览](./docs/overview/00-overview.md) | 代码结构与系统边界 |
| [国际化与 SEO](./docs/overview/11-i18n-and-seo.md) | 四种语言、路由、hreflang 与索引 |
| [贡献指南](./CONTRIBUTING.md) | 分支、检查与提交约定 |
| [AI Agent 约定](./AGENTS.md) | 通用规范；Gemini、Claude Code 与 GitHub Copilot 使用各自入口文件统一指向该规范 |

## 许可与来源

本项目使用 [AGPL-3.0](./LICENSE)。项目的上游来源、许可证义务与致谢应以仓库许可文件及相关上游声明为准。
