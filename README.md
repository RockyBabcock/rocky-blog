# astro-koharu

**Language:** **中文** | [English](./docs/README.en.md) | [日本語](./docs/README.ja.md)

![astro-koharu 粉蓝配色博客预览](https://r2.cosine.ren/i/2026/01/94383107ba4586f773938ed4dae34ff1.webp)

一个萌系 / 二次元 / 粉蓝配色的博客主题，适合 ACG、前端、手账向个人站，性能优异。

> 命名灵感来源于 “小春日和”（こはるびより）指的是晚秋到初冬这段时期，持续的一段似春天般温暖的晴天。也就是中文中的"小阳春"。

博客整体设计灵感来自 Hexo 的 [Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/) 主题，用更现代的技术栈打造属于你的个人博客。

本仓库已清理为示例仓库，主题开发者的博客可查看 https://blog.cosine.ren/ 喜欢的话欢迎 star ～

[快速开始](./GETTING-STARTED.md) · [完整使用指南](./src/content/blog/tools/astro-koharu-guide.md) · [反馈与建议](https://github.com/cosZone/astro-koharu/issues)

> **许可证：AGPL-3.0。** 使用、修改和部署前请阅读 [LICENSE](./LICENSE)。

持续迭代中

- 基于 **Astro**，静态输出，加载轻快
- 萌系 / 二次元 / 粉蓝配色，适合 ACG、前端、手账向个人站
- 支持多分类、多标签，但不会强迫你用复杂信息架构
- 尽可能的减少性能开销
- 使用 pagefind 实现无后端的全站搜索
- LQIP（低质量图片占位符），图片加载前显示渐变色占位

## 页面与动效

以下动图录自本仓库的示例站点。

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

## 能用它做什么

| 场景 | 功能与入口 |
| --- | --- |
| 写丰富的正文 | GFM、代码高亮、数学公式、Mermaid、Infographic、链接卡片；Shoka 提醒块、折叠、标签卡、文字特效、隐藏文字、注音、练习题和文章内音视频，可按需开关；见[语法指南](./src/content/blog/tools/astro-koharu-guide.md#markdown-增强) |
| 标注与分享文章 | [文章落款](./src/content/blog/tools/astro-koharu-guide.md#文章落款)标注创作方式、剧透或过时提醒，支持归档筛选；文章操作支持复制或下载完整 Markdown 源码 |
| 组织内容 | 多级分类、标签、归档、草稿、置顶；[特色系列](./src/content/blog/tools/astro-koharu-guide.md#系列文章系统)有独立页面与首页高亮，自定义页面可直接放在 `src/pages/` |
| 舒适阅读 | 深浅主题、移动端章节标题与目录、阅读进度和时长；Pagefind 搜索、LQIP 图片占位；`motion` 提供三档动效、樱花效果，并尊重系统减少动态效果设置 |
| 多语言发布 | 内置中文、英文、日文、韩文 UI 字典；内容翻译、语言切换、hreflang、按语言订阅 RSS；见 [i18n 配置](./src/content/blog/tools/astro-koharu-guide.md#多语言支持i18n) |
| 公告与内容资产 | 支持站点公告系统，以及按需运行的脚本生成 LQIP、语义相似度推荐与 AI 摘要 |
| 内容加密 | 支持整篇或局部 AES-256-GCM 加密 |

## 写作与管理

在 `src/content/blog/` 目录下直接新建 Markdown 文件即可发布文章：

```markdown
---
title: 我的第一篇文章
date: 2026-10-09
link: hello-koharu
tags: [生活]
---

今天开始记录一点有意思的事。
```

运行 `pnpm dev` 后访问 `/post/hello-koharu` 即可预览。

## 本地启动

需要 **Node.js ≥ 22.20.0** 和 **pnpm 10.28.2**（以 [package.json](./package.json) 为准）。

```bash
pnpm install
pnpm dev
```

接着修改 [config/site.yaml](./config/site.yaml) 中的站点名称、作者、域名、头像与导航，用自己的内容替换示例文章。配置修改后需重启开发服务器或重新构建；步骤见[快速开始](./GETTING-STARTED.md)。

## 部署

```bash
pnpm build
pnpm preview
```

本站点为纯静态博客，可将 `dist/` 直接部署到 Vercel、Netlify、Cloudflare Pages 或任意静态托管平台，无需后端服务。

## 配置与文档

| 想调整什么 | 去哪里看 |
| --- | --- |
| 站点信息、导航、动效与可选功能 | [站点配置](./config/site.yaml)与[完整使用指南](./src/content/blog/tools/astro-koharu-guide.md) |
| 分类、系列和落款的多语言文案 | [内容翻译配置](./config/i18n-content.yaml)；翻译文章放在 `src/content/blog/<locale>/` |
| 链接嵌入与元数据缓存 | [链接嵌入说明](./docs/features/link-embedding.md) |
| 参与主题开发 | [贡献指南](./CONTRIBUTING.md) |

## 使用前了解

- **原文与加密**：启用文章操作时，公开 Markdown 包含 frontmatter；整篇加密或含加密块的文章不提供原文。AES-256-GCM 密码只在构建时用于加密，不传给客户端；读者需自行输入密码。
- **内容资产脚本**：LQIP（`pnpm generate:lqips`）、语义相似度（`pnpm generate:similarities`）和 AI 摘要（`pnpm generate:summaries`）均为可选生成步骤。
- **性能**：下方截图是历史示例，效果会受内容、配置与部署影响。请对自己的站点重新测量。

## 界面预览

以下保留原有演示图，部分截图早于当前版本。

![博客交互演示](https://r2.cosine.ren/i/2025/12/417b098dffce2ced9c0ff6009e5213df.gif)

[性能优异](https://pagespeed.web.dev/analysis/https-blog-cosine-ren/w6qzrwbp9b?hl=zh-cn&form_factor=desktop)：目标是 PC 的全绿，但是随着功能迭代不可避免的需要反复检查！

![历史性能报告（2025 年 12 月）](https://r2.cosine.ren/i/2025/12/e93f40c340a626c4ab72212a84cf6d5d.webp)

欢迎在 [issue 区域](https://github.com/cosZone/astro-koharu/issues)提 issue，不过这毕竟是个人项目，喜欢的也欢迎 fork 出去改。

![博客页面预览一](https://r2.cosine.ren/i/2026/01/f1c239b4adf7771f10b954c389d87a74.webp)
![博客页面预览二](https://r2.cosine.ren/i/2026/01/c962f82503abf68eb1f21b835873f241.webp)

## 特色功能演示图片

- 图片加载前显示渐变色占位，提升视觉体验 - [介绍文章](https://blog.cosine.ren/post/astro-lqip-implementation)
  ![LQIP](https://r2.cosine.ren/i/2025/12/40e44c8ac166183d5f823d7aa81fa792.webp)
- 使用 view-transition 实现的流畅的深色模式切换主题过渡动画。
  ![主题过渡动画](https://r2.cosine.ren/i/2025/12/418c7602ce115660bed9db66739370d5.gif)
- Markdown 增强 - 链接嵌入功能 - [示例](https://blog.cosine.ren/post/my-claude-code-record-2)
  ![链接嵌入功能](https://r2.cosine.ren/i/2026/01/6804aa167fd4cf7022a9b511d52017ce.webp)
- Markdown 增强 - 使用 [@antv/infographic](https://github.com/antvis/Infographic) 创建各种精美的信息图表。
  [Infographic 信息图指南](https://koharu.cosine.ren/post/infographic-guide)
  ![信息图语法](https://r2.cosine.ren/i/2026/01/581893e18557bcb837177cb2d6fb7af7.webp)
- 有样式的 RSS 订阅源链接 - [示例](https://blog.cosine.ren/rss.xml)
  ![RSS 订阅源链接](https://r2.cosine.ren/i/2026/01/4476f67d1acea2e0991cc70d1d3cf6a1.webp)
- 公告系统
- Shoka 兼容 Markdown 语法 - 提醒块、折叠块、标签卡、文字特效、隐藏文字、注音标注、练习题等
- 音视频播放器 - 支持音乐歌单和视频播放，通过 [Meting](https://github.com/metowolf/meting) API 解析，推荐自部署

## 使用本主题的博客

> 学习[纸鹿的博客](https://github.com/L33Z22L11/blog-v3)，我也弄一个放谁在用我的主题的区域。\
> 欢迎加入 Q 群 598022684 进行讨论，或者在我的[前端频道](https://t.me/cosine_front_end)的评论区群聊讨论。

| 博客名称                                  | 作者       | 仓库                                                            | 特色功能 or 备注             |
| ----------------------------------------- | ---------- | --------------------------------------------------------------- | ---------------------------- |
| **[余弦の博客](http://blog.cosine.ren/)** | **cosine** | [cosZone/astro-koharu](https://github.com/cosZone/astro-koharu) | 本主题                       |
| [雪花的博客](https://xhblog.top/)         | XueHua-s   | [XueHua-s/astro-snow](https://github.com/XueHua-s/astro-snow)   | 精简了很多功能，增加了起始页 |
| [Ksable's 小屋](https://blog.ksable.top/) | Ksable    | [God-2077/astro-blog](https://github.com/God-2077/astro-blog) | 修改 / 新增了部分功能 |

## 🙏 鸣谢

使用字体[寒蝉全圆体](https://chinese-font.netlify.app/zh-cn/fonts/hcqyt/ChillRoundFRegular)

感谢以下项目对 astro-koharu 的开发提供的灵感及参考：

- [mx-space](https://github.com/mx-space)
- [Hexo 主题 Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- [waterwater.moe](https://github.com/lawvs/lawvs.github.io)
- [yfi.moe](https://github.com/yy4382/yfi.moe)
- [4ark.me](https://github.com/gd4Ark/gd4Ark.github.io)
- [纸鹿摸鱼处](https://blog.zhilu.site/)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=cosZone/astro-koharu&type=date&legend=top-left)](https://www.star-history.com/#cosZone/astro-koharu&type=date&legend=top-left)

## License

[GNU Affero General Public License version 3 (AGPL-3.0)](./LICENSE)
