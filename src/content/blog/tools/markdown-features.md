---
title: Markdown 排版、代码高亮与数学公式示例
link: markdown-features
date: 2026-03-10 09:20:00
categories:
  - 工具
tags:
  - Markdown
  - KaTeX
  - 代码高亮
cover: /img/cover/11.webp
description: 集中展示 Astro Koharu 内置的 GFM 表格、Shiki 双主题代码高亮、数学公式与引用排版效果。
---

## 代码块与双主题高亮

博客内置 Shiki 语法高亮，自动适配浅色（`github-light`）与深色（`github-dark`）主题，鼠标悬停在代码块右上角即可一键复制代码。

```ts
interface ArticleMeta {
  title: string;
  slug: string;
  readingMinutes: number;
}

export function formatReadingTime(meta: ArticleMeta): string {
  return `${meta.title} · 约 ${meta.readingMinutes} 分钟读完`;
}
```

## 数学公式（KaTeX）

行内公式示例：质能方程 $E = mc^2$ 与欧拉恒等式 $e^{i\pi} + 1 = 0$。

块级公式示例：

$$
\int_{-\infty}^{+\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

## 任务列表与引用块

- [x] 支持 GitHub Flavored Markdown 表格与任务清单
- [x] 自动为所有标题生成可点击锚点 ID
- [x] 响应深色模式与平滑目录定位

> 好的排版让文字自然呼吸，让读者把全部注意力留在内容本身。

## 表格示例

| 特性 | 默认状态 | 说明 |
| --- | --- | --- |
| Shiki 代码高亮 | 开启 | 自动随浅色/深色模式切换配色 |
| KaTeX 公式 | 开启 | 构建期渲染，无需客户端加载解析器 |
| 代码一键复制 | 开启 | 悬浮右上角即可复制 |
