---
title: "无自动编号目录（tocNumbering: false）配置示例"
link: toc-no-numbering
date: 2026-03-02 14:00:00
tocNumbering: false
categories:
  - 笔记
tags:
  - 目录
  - 配置
cover: /img/cover/8.webp
description: 当文章标题本身已包含自定义序号（如「一、」「二、」）时，可以关闭自动目录编号避免重复。
---

## 一、什么时候需要关闭目录自动编号

当文章采用中文序数词（如「一、」「二、」）或自定义章节代号撰写标题时，默认开启的 `1. / 1.1` 自动编号会让侧边栏目录显得重复。

## 二、如何按文章关闭编号

只需在当前文章的 Frontmatter 中添加一行配置即可：

```yaml
---
title: 我的文章
tocNumbering: false
---
```

## 三、目录高亮与平滑滚动

即使关闭了数字编号，侧边栏的激活指示条与滚动联动依然正常工作，点击任意目录项都能平滑滚动到对应段落。
