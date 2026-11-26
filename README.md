# Rocky Blog

**Language:** **中文** | [English](./docs/README.en.md) | [日本語](./docs/README.ja.md)

基于 **Astro 7 + React 19 + TypeScript + Tailwind CSS 4** 构建的静态个人博客，衍生自开源主题 [astro-koharu](https://github.com/cosZone/astro-koharu)（设计灵感来自 Hexo [Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)），保留温暖的粉蓝配色、樱花动效与舒适的阅读体验，并精简为专注写作与阅读的轻量静态站架构。

[快速开始](./GETTING-STARTED.md) · [完整使用指南](./src/content/blog/tools/astro-koharu-guide.md) · [GitHub 仓库](https://github.com/RockyBabcock/rocky-blog)

> **许可证：AGPL-3.0。** 使用、修改和部署前请阅读 [LICENSE](./LICENSE)。

- 基于 **Astro 7**，纯静态输出，加载轻快
- 温暖粉蓝配色与夜樱深色主题，保留完整的樱花飘落、点击花瓣迸发、丝线目录与平滑页面转场
- 支持多级分类、标签、归档与特色系列（周刊）
- 使用 Pagefind 实现无后端全站静态搜索
- LQIP（低质量图片占位符），图片加载前显示渐变色占位
- 内置中文、英文、日文、韩文四语界面与多语言文章路由

## 页面与动效

以下动图展示核心界面与交互动效：

<table>
  <tr>
    <td width="50%"><img src="./docs/assets/showcase/home.webp" alt="封面樱花飘落，下滑后头部收成浮动胶囊" /><br /><sub>封面樱花飘落，下滑后头部收成浮动胶囊</sub></td>
    <td width="50%"><img src="./docs/assets/showcase/theme.webp" alt="圆形扩散，切换到夜樱深色主题" /><br /><sub>圆形扩散，切换到夜樱深色主题</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./docs/assets/showcase/pages.webp" alt="点击导航时花瓣迸发、指示条滑动，归档、分类与周刊之间平滑过渡" /><br /><sub>点击导航时花瓣迸发、指示条滑动，归档、分类与周刊之间平滑过渡</sub></td>
    <td width="50%"><img src="./docs/assets/showcase/toc.webp" alt="丝线目录跟随阅读进度" /><br /><sub>丝线目录跟随阅读进度</sub></td>
  </tr>
</table>

## 核心功能

| 场景 | 功能与入口 |
| --- | --- |
| 写丰富的正文 | GFM、Shiki 代码高亮、KaTeX 数学公式、Mermaid、Infographic、OG 链接卡片；Shoka 提醒块、折叠、标签卡、文字特效、隐藏文字、注音、练习题与文章内音视频（支持 Meting）；见[语法指南](./src/content/blog/tools/astro-koharu-guide.md#markdown-增强) |
| 分享文章原文 | 文章操作支持一键复制或下载公开文章的完整 Markdown 源码（加密文章自动屏蔽原文输出） |
| 组织内容 | 多级分类、标签、归档、草稿、置顶；[特色系列](./src/content/blog/tools/astro-koharu-guide.md#系列文章系统)提供独立页面与首页高亮，自定义页面可直接放在 `src/pages/` |
| 舒适阅读 | 深浅主题切换、阅读设置（内置 4 套字体预设、字号、行高、版心与对齐）、移动端章节标题与目录、阅读进度与时长、灯箱；Pagefind 静态搜索、LQIP 图片占位；`motion` 提供三档动效并尊重系统减少动态效果设置 |
| 多语言发布 | 内置中文、英文、日文、韩文 UI 字典；内容翻译、语言切换、hreflang、按语言订阅 RSS；见 [i18n 配置](./src/content/blog/tools/astro-koharu-guide.md#多语言支持i18n) |
| 内容资产脚本 | 按需运行脚本生成 LQIP 图片占位、语义相似度相关文章推荐与 AI 摘要 |
| 内容加密 | 支持整篇或局部 AES-256-GCM 静态加密，密码仅在构建期使用 |

## 写作与管理

在 `src/content/blog/` 目录下直接新建 Markdown 文件即可发布文章：

```markdown
---
title: 我的第一篇文章
date: 2026-10-09
link: hello-rocky-blog
tags: [生活]
---

今天开始记录一点有意思的事。
```

运行 `pnpm dev` 后访问 `/post/hello-rocky-blog` 即可预览。

## 本地启动

需要 **Node.js ≥ 22.20.0** 和 **pnpm 10.28.2**（以 [package.json](./package.json) 为准）。

```bash
pnpm install
pnpm dev
```

修改 [config/site.yaml](./config/site.yaml) 中的站点名称、作者、域名、头像与导航即可定制站点。配置修改后需重启开发服务器或重新构建；详细步骤见[快速开始](./GETTING-STARTED.md)。

## 部署

```bash
pnpm build
pnpm preview
```

本站点为纯静态博客，可将 `dist/` 直接部署到 GitHub Pages、Vercel、Netlify、Cloudflare Pages 或任意静态托管平台，无需后端服务。

## 配置与文档

| 想调整什么 | 去哪里看 |
| --- | --- |
| 站点信息、导航、动效与可选功能 | [站点配置](./config/site.yaml) 与 [完整使用指南](./src/content/blog/tools/astro-koharu-guide.md) |
| 分类与系列的多语言文案 | [内容翻译配置](./config/i18n-content.yaml)；翻译文章放在 `src/content/blog/<locale>/` |
| 链接预览卡片与 OG 元数据缓存 | [链接预览说明](./docs/features/link-embedding.md) |
| 参与开发与代码规范 | [AGENTS.md](./AGENTS.md) · [CONTRIBUTING.md](./CONTRIBUTING.md) |

## 使用前了解

- **原文与加密**：启用文章操作时，公开 Markdown 包含 frontmatter；整篇加密或含加密块的文章不提供原文。AES-256-GCM 密码仅在构建时用于加密，不传给客户端；读者需自行输入密码解锁。
- **内容资产脚本**：LQIP（`pnpm generate:lqips`）、语义相似度（`pnpm generate:similarities`）和 AI 摘要（`pnpm generate:summaries`）均为可选构建前脚本。

## 鸣谢与上游归属

本项目衍生自 [cosZone/astro-koharu](https://github.com/cosZone/astro-koharu)（AGPL-3.0），设计灵感与参考来源于：

- [astro-koharu](https://github.com/cosZone/astro-koharu)
- [Hexo 主题 Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- 字体：[寒蝉全圆体](https://chinese-font.netlify.app/zh-cn/fonts/hcqyt/ChillRoundFRegular) 与霞鹜文楷

## License

[GNU Affero General Public License version 3 (AGPL-3.0)](./LICENSE)
