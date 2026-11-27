---
title: Rocky Blog 使用指南
link: astro-koharu-guide
catalog: true
date: 2025-12-29 21:55:00
updated: 2026-11-27 00:00:00
math: true
description: Rocky Blog 的内容写作、站点配置、多语言、Markdown、阅读体验与静态部署指南
tags:
  - Astro
  - 博客
  - 使用指南
categories:
  - 工具
---

这份指南介绍如何维护 Rocky Blog：配置站点、编写文章、组织分类和系列、发布多语言内容，并理解阅读、搜索和加密功能的边界。

Rocky Blog 是一个以 **Astro 7 + React 19 + TypeScript + Tailwind CSS 4** 构建的静态个人博客。内容以 Markdown / MDX 和 YAML 配置管理，生产构建输出为静态文件，不依赖 CMS、数据库或应用服务器。

## 1. 产品定位与功能范围

Rocky Blog 以 **Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details** 为视觉方向：编辑式排版、明确的信息层级、舒适留白与克制的樱花、植物和星象装饰。

当前功能包括：

- 首页精选内容、最新文章、系列 / 周刊、主题分类和编辑式时间线。
- 文章详情、分类、标签、归档、分页、系列和 About 页面。
- Pagefind 静态全文搜索、命令面板、最近阅读与继续阅读。
- 个人 Reading Shelf：收藏文章，并按待读 / 阅读中 / 已完成筛选，支持搜索、排序和网格 / 列表视图。
- 深浅主题、阅读设置、目录、阅读进度、专注阅读、本地阅读历史和系列进度。
- GFM、Shiki、KaTeX、Mermaid、Infographic 与 Shoka 风格 Markdown 扩展。
- 响应式图片、懒加载、LQIP、图片灯箱 / 缩放。
- 四语 UI（中文、英语、日语、法语）和多语言路由。
- canonical、Open Graph、hreflang、sitemap、robots 等静态 SEO 能力。

产品明确不提供友链、CMS / 写作室、评论、统计分析、全站音乐播放器、追番、Moments、Docker 部署、RSS、AI 摘要、语义相似推荐、文章自定义音视频播放器、Quiz 或外链 OG 预览卡。完整边界以仓库的 `docs/PRODUCT-SCOPE.md` 为准。

## 2. 本地运行

环境要求：

- Node.js `>=22.20.0`
- pnpm `10.28.2`

首次运行：

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

开发服务默认端口为 3000，可通过 `BLOG_PORT` 环境变量修改。其他常用命令：

| 命令 | 作用 |
| --- | --- |
| `pnpm dev` | 启动开发服务器 |
| `pnpm check` | Astro / TypeScript 检查 |
| `pnpm lint` | Biome 检查 |
| `pnpm test` | 运行核心测试 |
| `pnpm knip` | 检查未使用文件和依赖 |
| `pnpm build` | 生产静态构建 |
| `pnpm preview` | 预览生产构建 |
| `pnpm generate:lqips` | 生成低质量图片占位资源 |

## 3. 配置站点

主要配置文件是 `config/site.yaml`。修改后重启开发服务器或重新构建。

### 站点基础信息

常用字段包括：

- `site.title`：站点名称。
- `site.alternate`：用于简短标识的英文名称。
- `site.name`、`site.author`：站点 / 文章作者名称。
- `site.description`：站点描述。
- `site.url`：最终部署域名，影响 canonical 与 SEO 地址。
- `site.avatar`：头像资源路径。
- `site.defaultOgImage`：默认 Open Graph 图片。
- `site.timezone`：IANA 时区，影响日期解析和显示。
- `site.startYear`：站点起始年份。

部署前一定要将 `site.url` 替换为真实域名，检查头像与 OG 图片确实存在。

### 语言

当前语言配置为：

```yaml
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

中文默认路由没有语言前缀；英语、日语、法语分别使用 `/en/`、`/ja/`、`/fr/`。不要增加韩语，除非产品范围重新得到维护者批准。

### 分类与首页精选内容

- `categoryMap`：将分类名称映射为 URL slug。
- `featuredCategories`：控制首页精选分类。
- `featuredSeries`：配置周刊或其他系列入口。

分类 / 系列的多语言展示文案位于 `config/i18n-content.yaml`。新增分类时检查映射、内容文案和对应页面，不要只修改首页卡片标签。

### 内容处理与动效

`content` 配置控制 Shoka 语法、数学公式与代码块等能力；`motion` 配置默认动效强度及樱花特效；`postActions` 控制公开 Markdown 的复制 / 下载操作。系统启用 prefers-reduced-motion 时必须优先降低动效。

不要照搬旧配置文件中的 RSS、Umami、评论或 CMS 样例。这些都不属于当前产品目标。

## 4. 创建和维护文章

在 `src/content/blog/` 下新建 Markdown / MDX 文件。

```markdown
---
title: 我的第一篇文章
description: 这是一段简短摘要
date: 2026-11-27 10:00:00
updated: 2026-11-27 12:00:00
link: my-first-article
cover: /img/cover/1.webp
tags:
  - Astro
  - 随笔
categories:
  - [笔记, 前端]
sticky: false
draft: false
catalog: true
tocNumbering: true
math: true
keywords:
  - Rocky Blog
translationKey: my-first-article
---

文章正文。
```

文章 schema 定义在 `src/content.config.ts`。字段包括：

| 字段 | 说明 |
| --- | --- |
| `title` | 必填标题 |
| `date` | 必填日期，按站点时区解析 |
| `description` | 摘要 |
| `link` | 自定义 URL slug |
| `updated` | 更新时间 |
| `cover` | 封面图片 |
| `tags` | 标签数组 |
| `categories` | 分类，支持嵌套数组 |
| `subtitle` | 兼容历史文章的副标题字段 |
| `catalog` | 是否生成目录，默认 true |
| `sticky` | 是否置顶 |
| `draft` | 是否标记为草稿 |
| `tocNumbering` | 目录标题是否编号，默认 true |
| `math` | 文章数学公式相关开关 |
| `password` | 整篇文章加密配置 |
| `keywords` | SEO 关键词数组 |
| `translationKey` | 多语言文章关联标识 |

### 使用稳定 URL

公开文章发布后，尽量不要修改 `link`，否则外部链接和搜索引擎索引可能失效。需要迁移 URL 时，同时规划旧链接跳转或兼容策略。

### 分类

单层分类：

```yaml
categories:
  - 随笔
```

嵌套分类：

```yaml
categories:
  - [笔记, 前端]
```

分类 URL 由 `categoryMap` 决定。分类名称可保持中文，URL slug 建议使用稳定的 ASCII 字符。

## 5. 多语言文章

默认语言内容放在根目录，翻译放在对应语言子目录并镜像相对路径：

```text
src/content/blog/
├── tools/example.md
├── en/tools/example.md
├── ja/tools/example.md
└── fr/tools/example.md
```

维护规则：

1. 保持译文的 `link` 与默认文章一致。
2. 同一篇文章的译文可使用相同 `translationKey`。
3. UI 文案维护在 `src/i18n/`，分类 / 系列文案维护在 `config/i18n-content.yaml`。
4. 发布后检查语言切换、canonical、hreflang 与实际译文路由。
5. 文章翻译不是自动生成的；没有译文时会按当前实现回退默认语言内容。

详细规则见 [国际化与 SEO 文档](https://github.com/RockyBabcock/rocky-blog/blob/main/docs/overview/11-i18n-and-seo.md)。

## 6. Markdown 能力

### 标准语法和代码

项目支持 GFM、Shiki 语法高亮、代码块复制 / 全屏 / 折叠等已有增强。语法高亮在构建阶段生成，普通文章正文不需要额外客户端框架。

### 数学公式

KaTeX 支持行内与块级公式。示例：

```markdown
行内公式：$E = mc^2$

$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

需要使用数学公式的文章应根据当前 schema 设置 `math: true`，并检查站点 `content.enableMath` 配置。

### Mermaid 和 Infographic

Mermaid 支持流程图、时序图等定义。Infographic 用于受支持的信息图语法。图表源码视图必须读取原始图表定义，不能从渲染后的 SVG textContent 还原。

### Shoka 风格扩展

当前管线保留容器 / 提示块、标签页、折叠、文本效果、隐藏文字和 Ruby 注音。具体 directive 语法以当前 Markdown 处理插件和配置为准。请参考站内 Markdown 功能演示文章，不要从旧版文档复制已经移除的语法扩展。

## 7. 搜索、阅读和图片

- **Pagefind：** 构建时生成静态索引，不依赖搜索服务器。
- **Reading Shelf：** 在 `/shelf` 管理已收藏文章，支持状态筛选、搜索、排序和网格 / 列表视图。
- **集合工具栏：** 分类和归档列表支持当前内容集合内搜索 / 排序。
- **Command Palette：** 用于快速导航和站内发现。
- **Reading History：** 本地记录近期阅读。
- **Continue Reading / Series Progress：** 提供本地继续阅读入口和系列进度。
- **Focus Mode：** 减少页面干扰，集中阅读正文。
- **Reader Settings：** 调整内置字体预设、字号、行高、版心与对齐。
- **图片灯箱：** 点击支持的文章图片进入放大 / 缩放交互。
- **LQIP：** 图片加载前使用低质量占位信息改善视觉连续性。

阅读历史、偏好、系列进度和收藏记录保存在浏览器本地，不会自动同步到其他设备。书架最多保存 120 条文章元数据，阅读状态从既有阅读历史推导；收藏数据不保存正文或解密内容，也不会发送到外部服务器。清除站点存储可能清空这些数据。

## 8. 内容加密的安全说明

项目支持整篇文章和局部内容块的 AES-256-GCM 构建期加密。它适合对静态发布内容增加一道基于口令的阅读门槛，但有重要限制：

- 密文与公开派生参数随静态页面发布。
- 任何人都可以下载密文并离线尝试口令。
- 口令强度和密钥派生参数会影响实际保护能力。
- 这不是服务器端鉴权、DRM 或真正的私密文件存储。

不要用此机制保存密码、密钥、个人身份信息或其他必须严格保密的数据。

## 9. 构建与部署

执行：

```bash
pnpm build
pnpm preview
```

Astro 将生成静态站点到 `dist/`。可部署到 GitHub Pages、Vercel、Netlify、Cloudflare Pages 或任意静态托管平台。无需 Docker、数据库或常驻应用进程。

上线检查：

- [ ] `site.url` 是最终域名。
- [ ] 头像、封面和默认 OG 图片资源可访问。
- [ ] 中文 / 英语 / 日语 / 法语路由行为正确。
- [ ] canonical、hreflang、Open Graph 正确。
- [ ] sitemap 与 robots 输出符合预期。
- [ ] Pagefind 搜索索引已生成。
- [ ] 文章图片、图表、数学公式和加密内容均可用。

## 10. 维护原则

- 以当前源码和配置为准，旧版 astro-koharu 教程不能代替当前实现。
- 不新增产品范围中列为非目标的 CMS、评论、analytics、RSS、音乐播放器或推荐系统。
- 不删除已有首页模块或用户能力来换取视觉简化。
- 更改 UI 时同步维护中文、英语、日语和法语文案。
- 详细的设计、架构和功能边界见仓库的 `docs/` 文档。

相关入口：

- [Rocky Blog 源码](https://github.com/RockyBabcock/rocky-blog)
- [Astro 官方文档](https://docs.astro.build/)
- [React 官方文档](https://react.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Pagefind 文档](https://pagefind.app/)
