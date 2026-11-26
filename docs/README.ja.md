# Rocky Blog

**Language:** [中文](../README.md) | [English](./README.en.md) | **日本語**

**Astro 7 + React 19 + TypeScript + Tailwind CSS 4** で構築された静的個人ブログです。オープンソーステーマ [astro-koharu](https://github.com/cosZone/astro-koharu)（Hexo [Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/) から着想）をベースに、ピンクブルーの配色・桜のモーション・快適な読書体験を保ちつつ、執筆と閲覧に集中できる軽量な静的構成へ最適化しています。

[クイックスタート](../GETTING-STARTED.md) · [使い方ガイド](../src/content/blog/tools/astro-koharu-guide.md) · [GitHub リポジトリ](https://github.com/RockyBabcock/rocky-blog)

> **ライセンス：AGPL-3.0。** 利用・改変・デプロイの前に [LICENSE](../LICENSE) を確認してください。

- **Astro 7** ベースの純粋な静的出力と高速なページ読み込み
- ライトテーマと夜桜ダークテーマ、桜吹雪・クリック花びら・糸のような目次・滑らかな画面遷移
- 階層カテゴリ、タグ、アーカイブ、連載シリーズ（週刊）
- Pagefind によるサーバーレス静的全文検索
- LQIP（低品質画像プレースホルダー）による読み込み前グラデーション表示
- 中国語・英語・日本語・韓国語の 4 言語 UI 辞書と多言語ルーティング

## 画面と動き

<table>
  <tr>
    <td width="50%"><img src="../docs/assets/showcase/home.webp" alt="カバーに桜が舞い、スクロールするとヘッダーがカプセル型に浮かぶ" /><br /><sub>カバーに桜が舞い、スクロールするとヘッダーがカプセル型に浮かぶ</sub></td>
    <td width="50%"><img src="../docs/assets/showcase/theme.webp" alt="円形に広がって夜桜のダークテーマへ切り替え" /><br /><sub>円形に広がって夜桜のダークテーマへ切り替え</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="../docs/assets/showcase/pages.webp" alt="クリックで花びらが弾け、ナビのハイライトが滑り、アーカイブ・カテゴリー・連載を滑らかに遷移" /><br /><sub>クリックで花びらが弾け、ナビのハイライトが滑り、アーカイブ・カテゴリー・連載を滑らかに遷移</sub></td>
    <td width="50%"><img src="../docs/assets/showcase/toc.webp" alt="糸のような目次が読み進める位置を追う" /><br /><sub>糸のような目次が読み進める位置を追う</sub></td>
  </tr>
</table>

## できること

| 用途 | 機能とガイド |
| --- | --- |
| 表現豊かな本文を書く | GFM、Shiki コードハイライト、KaTeX 数式、Mermaid、Infographic。Shoka の注意書き、折りたたみ、タブ、文字装飾、ネタバレ隠し、ルビを個別に切り替え可能。[構文ガイド](../src/content/blog/tools/astro-koharu-guide.md#markdown-增强)を参照 |
| 原文の共有 | 公開記事の Markdown 原文をコピー・ダウンロード可能（暗号化記事は自動で非公開） |
| 内容を整理する | 階層カテゴリ、タグ、アーカイブ、下書き、固定記事。[シリーズ](../src/content/blog/tools/astro-koharu-guide.md#系列文章系统)には専用ページとホームのハイライトがあり、独立ページは `src/pages/` に追加 |
| 快適に読む | ライト・ダークテーマ、読書設定（4 種類の内蔵フォントプリセット、文字サイズ、行間、本文幅、均等割り付け）、モバイルの章タイトルと目次、読書進捗、ライトボックス。Pagefind 静的検索、LQIP 画像プレースホルダー。`motion` は 3 段階の動きを設定でき、OS の動きを減らす設定に対応 |
| 多言語で公開する | 中国語・英語・日本語・韓国語の UI 辞書、記事翻訳、言語切り替え、hreflang、言語別 RSS。[i18n 設定](../src/content/blog/tools/astro-koharu-guide.md#多语言支持i18n)を参照 |
| アセット生成スクリプト | 任意スクリプトで LQIP 画像プレースホルダーを生成可能 |
| コンテンツ暗号化 | 記事全体・ブロック単位の AES-256-GCM ビルド時暗号化に対応 |

## 記事の作成と管理

`src/content/blog/` 配下に Markdown ファイルを直接作成します。

```markdown
---
title: はじめての記事
date: 2026-10-09
link: hello-rocky-blog
tags: [日常]
---

覚えておきたいことを、今日から少しずつ。
```

`pnpm dev` を起動して `/post/hello-rocky-blog` を開きます。

## ローカルで起動

**Node.js ≥ 22.20.0** と **pnpm 10.28.2** が必要です。要件は [package.json](../package.json) に従います。

```bash
pnpm install
pnpm dev
```

[config/site.yaml](../config/site.yaml) でサイト名・作者・ドメイン・アバター・ナビゲーションを設定してください。設定変更後は開発サーバーの再起動または再ビルドが必要です。手順は[クイックスタート](../GETTING-STARTED.md)を参照してください。

## デプロイ

```bash
pnpm build
pnpm preview
```

純粋な静的サイトとして `dist/` へ出力されるため、GitHub Pages、Vercel、Netlify、Cloudflare Pages などの静的ホスティングでバックエンド不要で公開できます。

## 設定とドキュメント

| 設定したいこと | 参照先 |
| --- | --- |
| サイト情報・ナビゲーション・動き・任意機能 | [サイト設定](../config/site.yaml) と [使い方ガイド](../src/content/blog/tools/astro-koharu-guide.md) |
| カテゴリ・シリーズの翻訳 | [コンテンツ翻訳](../config/i18n-content.yaml)。翻訳記事は `src/content/blog/<locale>/` に配置 |
| 開発ガイドライン | [AGENTS.md](../AGENTS.md) · [CONTRIBUTING.md](../CONTRIBUTING.md) |

## 利用前に知っておくこと

- **原文と暗号化**：記事操作を有効にすると frontmatter を含む Markdown 原文が公開されます。暗号化記事・暗号化ブロックを含む記事の原文は公開しません。AES-256-GCM のパスワードはビルド時の暗号化に使用し、クライアントへ配布せず、読者が入力します。
- **アセット生成スクリプト**：LQIP（`pnpm generate:lqips`）は任意のビルド前スクリプトです。

## 謝辞

本リポジトリは [cosZone/astro-koharu](https://github.com/cosZone/astro-koharu)（AGPL-3.0）をベースにカスタマイズしています。インスピレーションとリファレンスに感謝します：

- [astro-koharu](https://github.com/cosZone/astro-koharu)
- [Hexo テーマ Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- フォント：[Chill Round](https://chinese-font.netlify.app/zh-cn/fonts/hcqyt/ChillRoundFRegular)・LXGW WenKai

## License

[GNU Affero General Public License version 3 (AGPL-3.0)](../LICENSE)
