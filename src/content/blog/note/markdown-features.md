---
title: Markdown 增强功能演示
link: markdown-features
catalog: true
date: 2024-01-02 00:00:00
description: 展示 astro-koharu 支持的所有 Markdown 增强功能，包括代码高亮、Mermaid 图表、GFM 表格、Shoka 兼容语法等。
tags:
  - Markdown
  - 教程
categories:
  - 笔记
---

本文展示 astro-koharu 支持的所有 Markdown 增强功能。

## 外部链接示例

支持标准 Markdown 链接和 GFM 自动链接，外部链接会自动在新窗口打开。

### 社交与演示链接

下面是一条 Twitter / X 链接，以普通超链接形式展示：

[Vercel Tweet on Twitter](https://twitter.com/vercel_dev/status/1997059920936775706)

这是普通段落中的链接 [Vercel Tweet](https://twitter.com/vercel_dev/status/1997059920936775706)，保持行内链接样式。

使用 x.com 域名的链接示例：

[Vercel Tweet on X](https://x.com/vercel_dev/status/1997059920936775706)

### 裸链接与自动识别

这是段落中的链接 [react-tweet](https://github.com/vercel/react-tweet)，保持标准行内链接样式。

独行裸链接会自动识别为普通超链接：

https://github.com/vercel/react-tweet

https://react-tweet.vercel.app/

https://zhuanlan.zhihu.com/p/1900483903984243480

### CodePen 链接示例

[CodePen Demo](https://codepen.io/botteu/pen/YPKBrJX/)

## 代码高亮

支持多种编程语言的语法高亮，并自动跟随主题切换。

### JavaScript

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return {
    message: "Welcome to astro-koharu",
    timestamp: Date.now(),
  };
}

greet("World");
```

### TypeScript

```typescript
interface BlogPost {
  title: string;
  date: Date;
  tags: string[];
  content: string;
}

const post: BlogPost = {
  title: "My First Post",
  date: new Date(),
  tags: ["astro", "blog"],
  content: "Hello World!",
};
```

### Python

```python
def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]

    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib

print(fibonacci(10))
```

### Bash

```bash
#!/bin/bash
# Start development server
pnpm install
pnpm dev

echo "Server is running at http://localhost:4321"
```

## GFM 表格

| 功能     | 支持状态 |         说明 |
| :------- | :------: | -----------: |
| 表格     |    ✅    |     支持对齐 |
| 任务列表 |    ✅    |       复选框 |
| 删除线   |    ✅    | ~~删除文本~~ |
| 自动链接 |    ✅    | 自动识别 URL |

## 任务列表

- [x] 安装 astro-koharu
- [x] 配置站点信息
- [ ] 写第一篇文章
- [ ] 部署到 Vercel

## Mermaid 图表

### 流程图

```mermaid
flowchart LR
    A[编写文章] --> B[本地预览]
    B --> C{满意吗?}
    C -->|是| D[推送代码]
    C -->|否| A
    D --> E[自动部署]
    E --> F[上线成功]
```

### 时序图

```mermaid
sequenceDiagram
    participant U as 用户
    participant B as 浏览器
    participant S as 服务器

    U->>B: 访问博客
    B->>S: 请求页面
    S-->>B: 返回 HTML
    B-->>U: 渲染页面
```

### 饼图

```mermaid
pie title 博客内容分布
    "技术笔记" : 45
    "生活随笔" : 25
    "项目分享" : 20
    "其他" : 10
```

## 文本样式

- **粗体文本**
- _斜体文本_
- ~~删除线~~
- `行内代码`
- [链接文本](https://github.com/cosZone/astro-koharu)

## 引用

> 这是一段引用文本。
>
> astro-koharu 让博客搭建变得简单而优雅。

## 标题层级

本文展示了 h2-h6 各级标题，它们都会自动生成锚点链接，方便分享和引用。

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

## 分割线

---

## 列表

### 无序列表

- 项目一
  - 子项目 A
  - 子项目 B
- 项目二
- 项目三

### 有序列表

1. 第一步
2. 第二步
   1. 子步骤 A
   2. 子步骤 B
      1. 子步骤 C
3. 第三步

## 图片

图片会自动应用 LQIP（低质量图片占位符）效果：

![示例图片](/img/cover/3.webp)

## Shoka 兼容 Markdown 语法

除了上述标准 Markdown 增强外，astro-koharu 还支持从 Hexo Shoka 主题迁移的丰富扩展语法，包括：

- **文字特效** — 下划线 ++ins++、高亮 ==mark==、上下标 ~sub~ / ^sup^、颜色文字
- **隐藏文字** — Spoiler 粒子动画 !!隐藏文字!! 和 !!模糊效果!!{.blur}
- **注音标注** — Ruby {漢字^かんじ}
- **容器块** — 提醒块 `:::info`、折叠块 `+++primary 标题`、标签卡 `;;;tab`
- **数学公式** — KaTeX 行内 $E=mc^2$ 和块级 `$$...$$`
- **代码块增强** — title、mark 行高亮、command 提示符
- **加密内容块** — `:::encrypted{password="..."}` AES-256-GCM 加密，防止爬虫收录

所有功能均可在 `config/site.yaml` 中独立开关。完整语法演示和用法请参阅 [Shoka 主题 Markdown 语法演示](/post/note/shoka-features)。

## 加密内容块

使用 `:::encrypted{password="密码"}` 语法创建加密区块。内容在构建时使用 AES-256-GCM 真正加密，密码不会出现在最终 HTML 中，有效防止搜索引擎和爬虫收录敏感内容。

加密块内的 Markdown 会获得与普通内容完全相同的渲染处理（Shiki 代码高亮、KaTeX 公式等），解密后直接展示。

> 前端无法实现真正意义上的加密，因为密码需在客户端输入，密文和算法对用户可见，安全性完全取决于密码强度。本功能的目的是**防止搜索引擎和爬虫直接收录明文内容**，而非对抗有针对性的破解。

````markdown
:::encrypted{password="demo"}
这段内容已加密，输入密码 `demo` 即可查看。

支持 **完整 Markdown 语法**，包括代码块：

```python
print("Hello from encrypted block!")
```

:::
````

:::encrypted{password="demo"}
这段内容已加密，输入密码 `demo` 即可查看。

支持 **完整 Markdown 语法**，包括代码块：

```python
print("Hello from encrypted block!")
```

:::

## 总结

以上展示了 astro-koharu 支持的主要 Markdown 功能。更多功能请参考 [使用指南](/post/astro-koharu-guide)。
