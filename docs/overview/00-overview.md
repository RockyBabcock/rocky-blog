# 00 — 系统总览

## 产品定位

Rocky Blog 是一个静态优先的个人博客，围绕内容呈现、文章阅读、系列组织、站内搜索和多语言访问构建。它不是包含账号、数据库和后台管理系统的在线出版平台。

产品目标、视觉原则和非目标见 [PRODUCT-SCOPE.md](../PRODUCT-SCOPE.md)；当前实现、维护者优先级、验证证据和 Agent 交接规则见 [PROJECT-STATUS.md](../PROJECT-STATUS.md)。本文说明当前代码结构。

## 技术基线

| 层 | 当前实现 |
| --- | --- |
| 静态站点框架 | Astro 7.1.x |
| 交互组件 | React 19 |
| 语言 | TypeScript |
| CSS | Tailwind CSS 4 + 项目 tokens |
| 动效 | Motion |
| 状态 | Nanostores + 浏览器本地存储 |
| 内容 | Astro Content Collections / Markdown / MDX |
| 搜索 | Pagefind 静态索引 |
| 图表 | Mermaid |
| 数学公式 | KaTeX |
| 部署 | 静态输出到 `dist/` |

精确版本以 `package.json` 和 `pnpm-lock.yaml` 为准。

## 构建流程

1. Astro 读取站点 YAML 配置和 Blog Content Collection。
2. 内容处理管线生成文章 HTML、代码高亮、目录、数学 / 图表增强与页面元信息。
3. 文件路由和语言页面镜像生成静态页面。
4. Pagefind 生成静态搜索索引。
5. 需要交互的区域以 React island 或轻量客户端脚本运行。
6. 最终输出 `dist/`，由静态托管平台提供。

常规阅读不需要应用服务器或数据库。浏览器本地存储负责部分阅读记录与用户偏好。

## 页面和体验模块

### 内容页面

- 首页：精选展示、最新文章、系列 / 周刊、主题分类和编辑式时间线。
- 文章详情、分类、标签、归档和分页。
- 配置定义的系列 / 周刊页面。
- About 页面。

### 全局体验

- 页面布局、导航、个人侧栏和移动端抽屉。
- 深浅主题、阅读设置和目录。
- Pagefind 搜索、命令面板与站内导航。
- Reading Shelf 个人阅读书架与本地收藏。
- 分类 / 归档列表内搜索和排序工具栏。
- 本地阅读历史、继续阅读和系列进度。
- 页面转场、滚动显现、樱花装饰和动效等级。

## 主要目录

```text
config/                 站点与内容翻译配置
docs/                   产品、架构、性能和诊断文档
public/                 静态资源
src/
  components/            Astro / React UI
  content/blog/          Markdown / MDX 内容与译文
  i18n/                  UI 字典和 locale 工具
  layouts/               页面布局与 HeadMeta
  lib/                   内容、配置、搜索、加密等逻辑
  pages/                 文件路由
  scripts/               构建辅助脚本
  store/                 Nanostores 与本地状态
  styles/                设计 tokens、主题和组件样式
  content.config.ts      Blog collection schema
```

## 架构边界

- **配置与代码分离：** 站点可调信息进入 YAML；解析、正规化和校验集中在 `src/lib/config/`。
- **内容与 UI 分离：** 文章来自 Content Collection；UI 文案来自 locale dictionaries。
- **静态与交互分离：** 默认由 Astro 输出 HTML，仅为交互区域加载客户端代码。
- **本地与云端分离：** 当前阅读历史、偏好、系列进度与书架收藏仅在浏览器持久化。
- **决策与实现分离：** RSS 已列为非目标并从当前代码清理；不得在用户文档或配置样例中重新描述为可用功能。

## 继续阅读

[架构](./01-architecture.md) · [内容](./02-content-system.md) · [路由](./03-routing.md) · [组件](./04-component-patterns.md) · [UI](./05-ui-components.md) · [状态](./06-state-management.md) · [主题](./07-theme-system.md) · [动效](./08-animation-system.md) · [样式](./09-styling.md) · [Markdown](./10-markdown-system.md) · [国际化与 SEO](./11-i18n-and-seo.md) · [构建](./12-astro-7-upgrade.md)
