# 快速开始与站点维护

本文说明如何运行和维护 Rocky Blog。产品范围以 [PRODUCT-SCOPE.md](./docs/PRODUCT-SCOPE.md) 为准，字段定义以 `src/content.config.ts` 为准。

## 环境

- Node.js：`>=22.20.0`
- pnpm：`10.28.2`

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

开发服务默认端口为 3000，可通过 `BLOG_PORT` 环境变量修改。

## 站点配置

编辑 `config/site.yaml`。修改后重启开发服务器或重新构建。

```yaml
site:
  title: Rocky Blog
  author: Rocky
  description: 技术笔记与生活随笔
  url: https://your-domain.example
  timezone: Asia/Shanghai

i18n:
  defaultLocale: zh
  locales:
    - code: zh
      label: 中文
    - code: en
      label: English
    - code: ja
      label: 日本語
    - code: fr
      label: Français
```

分类映射、精选分类、系列、导航、内容增强、动效与 SEO 机器人策略也位于该配置文件。分类和系列翻译在 `config/i18n-content.yaml`。

## MuseAI 内容上传

Rocky Blog 的文章由外部 MuseAI 工作流统一撰写、翻译和修订。仓库没有 CMS、浏览器写作室或在线文章编辑后台；不要将普通的 Markdown 文件维护理解为站内写作功能。

开始前先阅读 [Muse 内容生产规范](./docs/muse/README.md)。核心文件：

- `docs/muse/CONTENT-SCHEMA.md`：与 `src/content.config.ts` 对齐的 frontmatter 字段和模板。
- `docs/muse/CONTENT-STRUCTURE.md`：现有分类、目录位置、slug、资源和多语言镜像。
- `docs/muse/MARKDOWN-SPEC.md`：当前可用的 GFM、Shiki、KaTeX、Mermaid、Infographic 与 Shoka 语法。
- `docs/muse/EDITORIAL-STANDARDS.md`：事实核查、引用、结构和语言质量。
- `docs/muse/UPLOAD-CHECKLIST.md`：上传与构建验收。
- `docs/muse/prompts/`：新文章、翻译、审核修订三类可复制 Prompt。

中文主稿放入 `src/content/blog/<category-path>/<slug>.md`。译文镜像同一相对路径到 `en/`、`ja/`、`fr/`。上传 Markdown 和真实图片资源后，从仓库根目录运行：

```bash
pnpm lint-md
pnpm check
pnpm build
```

schema 以 `src/content.config.ts` 为准，分类映射以 `config/site.yaml` 为准。不要自行增加字段、分类或语言目录。

## 多语言文章

支持的 UI 语言为中文（默认）、英语、日语和法语。默认内容放在根目录，译文镜像相同相对路径：

```text
src/content/blog/tools/example.md
src/content/blog/en/tools/example.md
src/content/blog/ja/tools/example.md
src/content/blog/fr/tools/example.md
```

可通过一致的 `link` 和 `translationKey` 关联译文。 Muse 的完整翻译交付步骤见 [翻译 Prompt](./docs/muse/prompts/TRANSLATE.md)。UI 字典、路由和 SEO 规则见 [国际化与 SEO](./docs/overview/11-i18n-and-seo.md)。并非每篇文章都有所有语言的译文；缺少时按实现回退默认语言。

## 命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 开发服务器 |
| `pnpm check` | Astro / TypeScript 检查 |
| `pnpm lint` | Biome 检查 |
| `pnpm test` | 核心测试套件 |
| `pnpm knip` | 未使用文件和依赖检查 |
| `pnpm build` | 生成静态站点 |
| `pnpm preview` | 预览生产构建 |
| `pnpm generate:lqips` | 生成图片占位资源 |

专项浏览器测试使用 `package.json` 中的 `test:*:browser` 脚本，需要对应 Playwright 浏览器环境。`pnpm lint:fix` 会改写文件，不是只读检查。

## 构建和发布

```bash
pnpm build
pnpm preview
```

部署生成的 `dist/` 到 GitHub Pages、Vercel、Netlify、Cloudflare Pages 或任意静态托管服务。当前静态部署流程不需要应用服务器、数据库或 Docker；Docker / Docker Compose 是否作为额外交付方式支持仍待维护者决策。Vercel 可自动识别 Astro 静态构建；不要添加指向不存在的 `api/` 文件的 Serverless Function 配置。

上线前确认 `site.url`、头像和 OG 图片路径、语言路由、canonical、hreflang、sitemap、robots 与 Pagefind 搜索。

## Reading Shelf 与集合筛选

文章页、文章卡片和支持的位置提供收藏操作。访问 `/shelf`（英语、日语和法语页面分别为 `/en/shelf`、`/ja/shelf`、`/fr/shelf`）管理收藏文章。书架支持待读 / 阅读中 / 已完成筛选、关键词搜索、排序和网格 / 列表视图。归档和分类文章列表也提供当前集合内搜索 / 排序工具栏。

收藏记录仅保存在当前浏览器，不会上传到服务端。状态由已有阅读历史推导，不建立重复的进度记录。

## 本地数据与加密

阅读历史、读者设置、系列进度和 Reading Shelf 收藏均保存在浏览器本地，不跨设备同步。Reading Shelf 使用版本化存储，最多保留 120 条文章元数据；清除浏览器站点数据可能清除这些记录。

AES-256-GCM 是构建期静态加密。密文及公开派生参数会随页面交付，读者可以离线猜测密码；它不是服务器鉴权、DRM 或私有文件存储。不要用它保护高敏感信息。

## 参考

- [产品范围](./docs/PRODUCT-SCOPE.md)
- [架构文档](./docs/overview/00-overview.md)
- [完整使用指南](./src/content/blog/tools/astro-koharu-guide.md)
- [贡献指南](./CONTRIBUTING.md)
- [项目状态与 Agent 交接](./docs/PROJECT-STATUS.md)
- [前端设计实施 Prompt](./docs/FRONTEND-DESIGN-PROMPT.md)
- [Muse 内容规范](./docs/muse/README.md)
