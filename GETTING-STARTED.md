# 快速开始

欢迎使用 astro-koharu 博客主题！本文档将帮助你在 5 分钟内启动你的博客。

## 1. 环境准备

确保你的电脑已安装：

- **Node.js** 与 **pnpm**，版本要求见 [README](./README.md#本地启动)

如果没有安装 pnpm，运行：

```bash
npm install -g pnpm
```

## 2. 三步启动

### 第一步：获取代码

```bash
# 方式一：克隆仓库
git clone https://github.com/cosZone/astro-koharu.git
cd astro-koharu

# 方式二：使用 GitHub 模板（推荐）
# 点击仓库页面的 "Use this template" 按钮
```

### 第二步：安装依赖

```bash
pnpm install
```

### 第三步：启动开发服务器

```bash
pnpm dev
```

打开浏览器访问 http://localhost:4321 即可看到你的博客！

## 3. 配置你的博客

### 基本信息

编辑 `config/site.yaml`：

```yaml
site:
  title: 你的博客名称              # 网站标题
  alternate: myblog               # 英文短名，用于 logo
  subtitle: 你的副标题            # 副标题
  name: 你的名字                  # 作者名
  description: 博客简介            # 一句话介绍
  author: 你的名字                # 文章作者
  url: https://your-domain.com/   # 部署后的域名
  defaultOgImage: /img/avatar.webp # 默认 Open Graph 图片
  startYear: 2024                 # 建站年份
  avatar: /img/avatar.webp        # 头像路径
  showLogo: true                  # 是否显示 logo
  keywords:                       # SEO 关键词
    - 博客
    - 技术
```

### 替换头像

将你的头像图片替换到 `public/img/avatar.webp`

### 社交链接

在 `config/site.yaml` 中配置社交媒体链接：

```yaml
social:
  github:
    url: https://github.com/your-username
    icon: ri:github-fill
    color: '#191717'
  email:
    url: mailto:your@email.com
    icon: ri:mail-line
    color: '#55acd5'
  rss:
    url: /rss.xml
    icon: ri:rss-line
    color: '#ff6600'
  # 添加更多社交链接...
```

## 4. 写第一篇文章

在 `src/content/blog/` 目录下创建 Markdown 文件。

### 基础模板

```markdown
---
title: 我的第一篇文章
date: 2024-01-01 12:00:00
tags:
  - 标签1
  - 标签2
categories:
  - 分类名
cover: /img/cover/1.webp
---

文章正文内容...
```

### Frontmatter 字段说明

| 字段          | 必填 | 说明                            |
| ------------- | ---- | ------------------------------- |
| `title`       | ✅   | 文章标题                        |
| `date`        | ✅   | 发布日期                        |
| `tags`        | ❌   | 标签列表                        |
| `categories`  | ❌   | 分类，支持嵌套如 `[笔记, 前端]` |
| `cover`       | ❌   | 封面图片路径                    |
| `description` | ❌   | 文章摘要                        |
| `sticky`      | ❌   | 设为 `true` 置顶文章            |
| `draft`       | ❌   | 设为 `true` 标记为草稿          |

### 分类使用

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

## 5. 部署上线

### Vercel 一键部署（推荐）

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cosZone/astro-koharu&project-name=astro-koharu&repository-name=astro-koharu)

1. 点击上方按钮
2. 登录 GitHub 账号
3. 等待自动部署完成

### 自定义域名

1. 在 Vercel 项目设置中添加域名
2. 按照提示配置 DNS
3. 更新 `config/site.yaml` 中的 `site.url` 字段

### 静态部署

运行 `pnpm build` 生成 `dist/` 目录，可直接部署至 Vercel、Netlify、Cloudflare Pages 或任意静态托管平台。

## 6. 进阶功能

### 周刊/系列文章

在 `config/site.yaml` 中配置 `featuredSeries`：

```yaml
featuredSeries:
  categoryName: 周刊
  label: 我的周刊
  fullName: 我的技术周刊
  description: 每周技术分享
  cover: /img/weekly_header.webp
  enabled: true
  links:
    github: https://github.com/your-username/your-repo
    rss: /rss.xml
```

然后在 `src/content/blog/` 目录创建周刊文章。

### 多语言支持（i18n）

博客内置多语言支持。在 `config/site.yaml` 中配置：

```yaml
i18n:
  defaultLocale: zh        # 默认语言（URL 无前缀）
  locales:
    - code: zh
      label: 中文
    - code: en
      label: English
```

配置后，博客会自动生成带语言前缀的页面（如 `/en/post/xxx`），导航栏和移动端抽屉中会出现语言切换器。

**添加翻译文章**：将翻译文章放在 `src/content/blog/<locale>/` 目录下，保持与默认语言相同的路径结构：

```plain
src/content/blog/
├── tools/getting-started.md        # 默认语言 (zh)
└── en/tools/getting-started.md     # 英文翻译
```

没有对应翻译的文章会自动回退显示默认语言内容，并标注提示。

更多详细配置（内容翻译、添加新语言等）请参考 [完整使用指南的多语言配置章节](./src/content/blog/tools/astro-koharu-guide.md#多语言支持i18n)。

### 内容生成（可选）

使用内置脚本生成内容资产：

```bash
pnpm generate:lqips        # 生成 LQIP 图片占位符，提升加载体验
pnpm generate:similarities # 生成语义相似度向量，推荐相关文章
pnpm generate:summaries    # 生成 AI 摘要
pnpm generate:all          # 生成全部
```

## 常用命令

| 命令                        | 说明                               |
| --------------------------- | ---------------------------------- |
| `pnpm dev`                  | 启动开发服务器                     |
| `pnpm build`                | 构建生产版本                       |
| `pnpm preview`              | 预览生产构建                       |
| `pnpm check`                | Astro 类型检查                     |
| `pnpm test`                 | 运行单元测试                       |
| `pnpm lint`                 | Biome 代码检查                     |
| `pnpm generate:all`         | 生成 LQIP / 摘要 / 语义相似度资产  |

## 获取帮助

- 📖 [详细使用指南](./src/content/blog/tools/astro-koharu-guide.md)
- 🐛 [提交 Issue](https://github.com/cosZone/astro-koharu/issues)
- ⭐ [GitHub 仓库](https://github.com/cosZone/astro-koharu)

---

祝你搭建愉快！
