# 12 — Astro 7 运行环境与构建说明

本文记录当前 Rocky Blog 的运行基线和日常验证方式，不是 Docker 部署指南，也不是上游 astro-koharu 的迁移说明。

## 版本基线

以仓库锁文件和 package manifest 为准。当前主要版本声明：

- Astro：`7.1.3`
- React：`19.2.x`
- Tailwind CSS：`4.3.x`
- Vite：`8.1.x`
- Node.js：`>=22.20.0`
- pnpm：`10.28.2`

依赖升级需要一起检查 Astro integration、Vite plugin、Markdown pipeline、Pagefind、React islands 和静态输出。

## 开发

```bash
pnpm install --frozen-lockfile
pnpm dev
```

## 验证与构建

```bash
pnpm lint
pnpm check
pnpm test
pnpm build
pnpm preview
```

- `pnpm lint` 使用 Biome。
- `pnpm check` 运行 Astro 检查。
- `pnpm test` 执行核心 node:test 套件。
- 浏览器专项测试单独执行，要求 Playwright 浏览器环境。
- `pnpm build` 生成静态站点和 Pagefind 索引。
- `pnpm preview` 用于本地检查生产产物。

## 构建输出

默认输出为 `dist/`，由静态托管服务提供。运行站点不需要 Node adapter、长期运行的 Node server、Docker、容器编排或数据库。

## 环境变量与端口

开发服务器默认使用 3000 端口，可通过 `BLOG_PORT` 覆盖。其他环境变量和具体 Vite / Astro 行为以当前配置文件为准；不要在文档中臆造部署密钥或服务端配置。

## 依赖升级检查点

升级核心依赖时至少验证：

- 首页、文章页、系列、分类、标签和归档路由。
- 四种语言的路由镜像与翻译回退。
- Pagefind 搜索。
- GFM、Shiki、KaTeX、Mermaid、Infographic 和加密内容。
- 浅色 / 深色主题、移动端抽屉、目录、阅读设置和 reduced-motion。
- sitemap、robots、canonical、Open Graph 与 hreflang。
- 静态输出目录和部署平台行为。

## 历史配置清理

旧文档中关于 Umami、Docker、CMS、评论、RSS 和上游 CLI 的配置说明不代表当前产品功能。不要在本文件重新引入这些服务。RSS 的代码残留状态见 [产品范围](../PRODUCT-SCOPE.md)。
