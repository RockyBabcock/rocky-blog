---
link: note/shoka-features
title: Shoka 主题 Markdown 语法演示
date: 2026-02-07 12:00:00
categories:
  - 笔记
tags:
  - Shoka
  - Markdown
  - 测试
description: 展示所有 Shoka 主题兼容的特殊 Markdown 语法
math: true
---

本文展示了从 Hexo Shoka 主题迁移的所有特殊 Markdown 语法。

## 文字特效

### 下划线 (ins)

```markdown
++这是下划线文字++

++波浪下划线++{.wavy}

++着重点标记++{.dot}
```

++这是下划线文字++

++波浪下划线++{.wavy}

++着重点标记++{.dot}

### 下划线颜色

```markdown
++主色调++{.primary} ++成功++{.success} ++警告++{.warning} ++危险++{.danger} ++信息++{.info}
```

++主色调++{.primary} ++成功++{.success} ++警告++{.warning} ++危险++{.danger} ++信息++{.info}

### 高亮 (mark)

```markdown
==这是高亮文字==
```

==这是高亮文字==

### 上下标

```markdown
H~2~O 是水的化学式
E = mc^2^ 是质能方程
```

H~2~O 是水的化学式

E = mc^2^ 是质能方程

### 颜色文字

```markdown
[红色]{.red} [粉色]{.pink} [橙色]{.orange} [黄色]{.yellow} [绿色]{.green} [水色]{.aqua} [蓝色]{.blue} [紫色]{.purple} [灰色]{.grey}
```

[红色]{.red} [粉色]{.pink} [橙色]{.orange} [黄色]{.yellow} [绿色]{.green} [水色]{.aqua} [蓝色]{.blue} [紫色]{.purple} [灰色]{.grey}

### 彩虹文字

```markdown
[这段文字会有彩虹渐变效果]{.rainbow}
```

[这段文字会有彩虹渐变效果]{.rainbow}

### 键盘键

```markdown
[Ctrl]{.kbd} + [C]{.kbd} 复制，[Ctrl]{.kbd} + [V]{.kbd} 粘贴
```

[Ctrl]{.kbd} + [C]{.kbd} 复制，[Ctrl]{.kbd} + [V]{.kbd} 粘贴

## 隐藏文字 (Spoiler)

```markdown
这里有一段!!隐藏文字，鼠标点击显示!!

这里有一段!!模糊文字，鼠标悬停显示!!{.blur}
```

这里有一段!!隐藏文字，鼠标点击显示!!

这里有一段!!模糊文字，鼠标悬停显示!!{.blur}

## 标签块 (Labels)

```markdown
[默认]{.label .default} [主要]{.label .primary} [信息]{.label .info} [成功]{.label .success} [警告]{.label .warning} [危险]{.label .danger}
```

[默认]{.label .default} [主要]{.label .primary} [信息]{.label .info} [成功]{.label .success} [警告]{.label .warning} [危险]{.label .danger}

## 提醒块 (Note Blocks)

```markdown
:::default
这是默认提醒块
:::

:::primary
这是主要提醒块，用于重要提示
:::

:::info
这是信息提醒块，用于提供额外信息
:::

:::success
这是成功提醒块，用于正面反馈
:::

:::warning
这是警告提醒块，请注意
:::

:::danger
这是危险提醒块，务必谨慎
:::

:::info no-icon
这是没有图标的信息块
:::
```

:::default
这是默认提醒块
:::

:::primary
这是主要提醒块，用于重要提示
:::

:::info
这是信息提醒块，用于提供额外信息
:::

:::success
这是成功提醒块，用于正面反馈
:::

:::warning
这是警告提醒块，请注意
:::

:::danger
这是危险提醒块，务必谨慎
:::

:::info no-icon
这是没有图标的信息块
:::

## 折叠块 (Collapse)

```markdown
+++primary 点击展开详细内容
这里是折叠的内容，点击标题可以展开或收起。

支持 **Markdown** 格式化。

- 列表项 1
- 列表项 2
+++
```

```markdown
+++warning 注意事项
这里列出一些需要注意的问题：

1. 注意事项一
2. 注意事项二
+++
```

~~~~markdown
+++danger 危险操作
请确保你知道自己在做什么！

```bash
rm -rf /  # 请勿执行此命令
```
+++
~~~~

+++primary 点击展开详细内容
这里是折叠的内容，点击标题可以展开或收起。

支持 **Markdown** 格式化。

- 列表项 1
- 列表项 2
+++

+++warning 注意事项
这里列出一些需要注意的问题：

1. 注意事项一
2. 注意事项二
+++

+++danger 危险操作
请确保你知道自己在做什么！

```bash
rm -rf /  # 请勿执行此命令
```
+++

## 标签卡 (Tabs)

````markdown
;;;tab1 JavaScript
```js
console.log('Hello, World!');
```
;;;

;;;tab1 Python
```python
print('Hello, World!')
```
;;;

;;;tab1 Rust
```rust
fn main() {
    println!("Hello, World!");
}
```
;;;
````

;;;tab1 JavaScript
```js
console.log('Hello, World!');
```
;;;

;;;tab1 Python
```python
print('Hello, World!')
```
;;;

;;;tab1 Rust
```rust
fn main() {
    println!("Hello, World!");
}
```
;;;

## 注音

```markdown
{取り返す^とりかえす}是日语中"取回"的意思。

{漢字^かんじ}的注音示例。
```

{取り返す^とりかえす}是日语中"取回"的意思。

{漢字^かんじ}的注音示例。

## 代码块增强

`````markdown
```js title="hello.js" url="https://example.com" linkText="查看源码" mark:1,3
const greeting = 'Hello';
const name = 'World';
console.log(`${greeting}, ${name}!`);
```

```bash command:("$":1-3)
npm install astro
npm run dev
npm run build
```
`````

```js title="hello.js" url="https://example.com" linkText="查看源码" mark:1,3
const greeting = 'Hello';
const name = 'World';
console.log(`${greeting}, ${name}!`);
```

```bash command:("$":1-3)
npm install astro
npm run dev
npm run build
```

## 数学公式

```markdown
行内公式：$E = mc^2$

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$
```

行内公式：$E = mc^2$

块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

## 外部媒体资源链接

以下只是普通 Markdown 外部链接示例，不会在文章中生成音频 / 视频播放器或歌单嵌入。是否增加媒体嵌入能力仍需维护者决策：

- [示例音频（网易云音乐）](https://music.163.com/#/song?id=3339210292)
- [诗岸歌单 山山～全是山山～](https://music.163.com/#/playlist?id=8676645748)
- [『诗岸』全是山山！](https://music.163.com/#/playlist?id=17606384886)
- [示例视频（MP4）](https://cdn.kastatic.org/ka-youtube-converted/O_nY1TM2RZM.mp4/O_nY1TM2RZM.mp4#t=0)

## 加密内容块 (Encrypted Block)

使用 `:::encrypted{password="密码"}` 语法可以创建加密区块。区块内容在构建时使用 AES-256-GCM 加密，静态页面交付密文与公开派生参数，读者在浏览器输入口令后解密查看。它不是服务端鉴权或 DRM，密文可以被下载并离线尝试口令。

**适用场景**：防止搜索引擎/爬虫收录敏感内容（如私人资源链接、付费内容片段等）。

:::info
前端无法实现真正意义上的加密：密码总需要在客户端输入，密文和算法都对用户可见，安全性完全取决于密码强度。本功能的目的不是对抗有针对性的破解，而是**防止搜索引擎和爬虫直接收录明文内容**。对于这个场景，AES-256-GCM 已经足够：构建产物中只有密文，不含密码和明文，搜索引擎无法索引加密区块的内容。
:::

````markdown

:::encrypted{password="test"}
这里是加密的内容，支持完整的 Markdown 语法：

- **粗体**、*斜体*、~~删除线~~
- `行内代码`
- [链接](https://example.com)

```js
console.log('加密内容中的代码也有语法高亮！');
```

行内公式 $E = mc^2$ 也可以正常渲染。
:::

:::encrypted{password="another"}
每个加密块可以设置独立的密码。
:::
````

:::encrypted{password="test"}
这里是加密的内容，支持完整的 Markdown 语法：

- **粗体**、*斜体*、~~删除线~~
- `行内代码`
- [链接](https://example.com)

```js
console.log('加密内容中的代码也有语法高亮！');
```

行内公式 $E = mc^2$ 也可以正常渲染。
:::

:::encrypted{password="another"}
每个加密块可以设置独立的密码。
:::
