---
title: Tailwind CSS v4 与樱花粉配色定制笔记
link: theme-customization
date: 2026-03-06 20:15:00
categories:
  - [笔记, 前端]
tags:
  - CSS
  - Tailwind
  - 主题
cover: /img/cover/6.webp
description: 记录如何利用 CSS 自定义属性与 Tailwind CSS v4 打造柔和克制的浅色/深色双主题视觉系统。
---

## 设计变量与语义化令牌

Astro Koharu 使用语义化的 CSS 变量驱动全站外观，只需在 `src/styles/index.css` 中微调 `--primary`、`--background` 与 `--card` 即可完成整体换肤。

```css
:root {
  --primary: #e9546b;
  --background: #f6f7f9;
  --card: #ffffff;
}

html.dark {
  --primary: #f07285;
  --background: #17181d;
  --card: #1f2128;
}
```

## 无闪烁深色模式切换

为了彻底杜绝首屏加载时的白色闪烁（FOUC），我们在 `<head>` 中嵌入了极简同步脚本：在浏览器绘制第一帧之前读取 `localStorage` 中的主题偏好，并立即为 `<html>` 节点添加或移除 `.dark` 类名。

## 动效分级控制

在设置面板中，读者可以自由选择「灵动」「克制」或「关闭动效」三种动效等级，同时主题也会自动尊重操作系统的 `prefers-reduced-motion` 偏好。
