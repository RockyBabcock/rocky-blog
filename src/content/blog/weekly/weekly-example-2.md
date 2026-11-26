---
title: 示例周刊 Vol.2 | 把手边的工具用顺
link: weekly-example-2
catalog: true
date: 2025-03-14 20:30:00
description: 第二期示例周刊：聊聊静态搜索、代码格式化和博客备份这些不起眼但天天在用的东西，顺便演示系列文章的上一期、下一期导航。
cover: /img/cover/6.webp
tags:
  - 周刊
  - 工具
categories:
  - 周刊
---

这一期没有大新闻，主要聊几样每天都在用、但很少专门写的工具。顺带一提，从这一期开始，系列页面会把每期标题里 `Vol.N` 之后的部分当作本期标题，所以标题写成「示例周刊 Vol.2 | 把手边的工具用顺」这样就行。

## 本期推荐

### 本博客主题

先放一个项目链接，纯文本 URL 会自动识别为可点击的超链接：

https://github.com/cosZone/astro-koharu

### React 生态参考

https://github.com/vercel/react-tweet

一个轻量的 React 推文渲染组件库，适合在需要静态或按需嵌入推文的 React 项目中参考。

## 工具

### 静态搜索

[Pagefind](https://pagefind.app/) 在构建后扫描生成的 HTML，产出分片的索引文件。访客搜索时只下载需要的那几片，不需要任何服务端。对于几百篇文章的博客来说，这个方案几乎没有维护成本。

### 格式化与检查

仓库用 [Biome](https://biomejs.dev/) 同时负责格式化和 lint。提交前跑一次：

```bash command:("$":1)
pnpm lint:fix
```

### 备份

升级主题前先备份一下内容和配置：

```bash command:("$":1-2)
pnpm koharu backup
pnpm koharu list
```

## 一句话

> 工具顺手的标志是你忘了它的存在。

下一期聊聊写作环境本身。
