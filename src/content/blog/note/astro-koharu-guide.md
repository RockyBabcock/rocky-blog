---
title: Astro Koharu 主题架构与进阶使用指南
link: astro-koharu-guide
date: 2026-03-14 15:30:00
categories:
  - 笔记
tags:
  - Astro
  - 架构
  - 指南
cover: /img/cover/4.webp
description: 深入解析 Astro Koharu 的双栏布局、分类树、内容集合以及性能优化实践。
---

## 模块化与 Islands 架构

Astro Koharu 遵循严格的模块边界划分：页面与静态结构由 `.astro` 组件承担，交互逻辑拆分为独立的 React 岛屿组件，并通过 Nanostores 跨岛屿共享主题、弹窗与目录状态。

### 核心数据流

1. `config/site.yaml` 作为站点单一配置源，在构建期由 `src/lib/config/site.ts` 归一化解析。
2. `src/content/blog/` 下的文章通过 Astro Content Collections 的 `glob` 加载器进行强类型校验。
3. `src/lib/content/` 提供纯函数用于排序、分类树聚合、标签统计和按语言过滤。

## 多级分类树设计

你可以为文章指定单级分类，也可以指定多级嵌套分类路径：

```yaml
# 单级分类
categories: 工具

# 多级嵌套分类
categories:
  - [笔记, 前端, CSS]
```

归档页与分类页会自动将其折叠成清晰层级，方便读者顺着主题脉络延伸阅读。

## 写作室与本地草稿

访问顶部导航中的 **写作室 (`/editor`)** 即可在浏览器中直接编写 Markdown 文章并实时预览，所有更改都会自动暂存在 `localStorage` 中，支持一键复制或导出 `.md` 文件。
