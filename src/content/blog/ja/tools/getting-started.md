---
title: Rocky Blog へようこそ
link: getting-started
catalog: true
date: 2024-01-01 00:00:00
description: Astro、React、Tailwind CSS で構築した静的な個人ブログ Rocky Blog の紹介です。
tags:
  - 入门
  - Astro
categories:
  - 工具
sticky: true
translationKey: getting-started
---

**Rocky Blog** へようこそ。文章を書くこと、読むこと、コンテンツを見つけることを中心にした静的な個人ブログです。

## プロジェクトについて

Rocky Blog は Astro 7、React 19、TypeScript、Tailwind CSS 4 で構築されています。静的生成を基本とし、必要な操作だけをクライアント側で動かします。デザインは上質なエディトリアルレイアウト、現代的な雑誌のタイポグラフィ、桜・植物・星空をモチーフにした控えめなディテールを組み合わせています。

主な機能：

- トップページの編集的なコンテンツセクション、記事、カテゴリー、タグ、アーカイブ、シリーズ。
- Pagefind による静的検索、コマンドパレット、ローカル読書履歴、続きを読む導線。
- ライト / ダークテーマ、読書設定、集中モード、目次。
- GFM、Shiki、KaTeX、Mermaid、Infographic、Shoka 形式の Markdown 拡張。
- 中国語、英語、日本語、フランス語の UI。
- 静的 SEO metadata と静的ホスティング。

CMS、コメント、アクセス解析、サイト全体の音楽プレーヤー、RSS、AI 要約、読書履歴のクラウド同期は提供しません。詳細はリポジトリの Product Scope を参照してください。

## パーソナル読書棚

対応する記事カードや記事ページから記事を保存し、`/shelf` で管理できます。「未読」「読書中」「読了」の絞り込み、検索、並べ替え、グリッド / リスト表示に対応しています。保存した記事と読書履歴は現在のブラウザー内に保存され、デバイス間では同期されません。

## クイックスタート

必要な環境：Node.js `>=22.20.0`、pnpm `10.28.2`。

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

開発サーバーのデフォルトポートは 3000 です。変更する場合は `BLOG_PORT` を設定してください。

## 最初の記事を書く

`src/content/blog/` に Markdown ファイルを作成します。

```markdown
---
title: はじめての記事
description: 短い紹介文
date: 2026-11-27
link: my-first-post
tags:
  - Astro
categories:
  - 笔记
---

ここから本文を書きます。
```

コンテンツ schema は `src/content.config.ts` に定義されています。主なフィールドは `title`、`date`、`description`、`link`、`updated`、`cover`、`tags`、`categories`、`sticky`、`draft`、`catalog`、`tocNumbering`、`math`、`password`、`keywords`、`translationKey` です。

## 翻訳記事

デフォルト言語は中国語です。翻訳記事はデフォルト記事と同じ相対パスを `en/`、`ja/`、`fr/` の下に作成します。`link` と必要に応じて `translationKey` を揃えてください。

UI が4言語に対応していても、すべての記事に4つの翻訳があるとは限りません。翻訳がない場合はサイトのフォールバック動作が適用されます。

## 設定とデプロイ

`config/site.yaml` でサイト名、ドメイン、タイムゾーン、言語、ナビゲーション、カテゴリー、シリーズ、モーションを設定します。カテゴリーやシリーズの翻訳は `config/i18n-content.yaml` にあります。

`pnpm build` を実行すると `dist/` が生成されます。GitHub Pages、Vercel、Netlify、Cloudflare Pages などの静的ホスティングサービスに配置してください。アプリケーションサーバーやデータベースは必要ありません。

## 詳細情報

- [Rocky Blog 利用ガイド](/ja/post/astro-koharu-guide)
- [Markdown 機能デモ](/ja/post/markdown-features)
- [アーカイブ](/ja/archives)
- [GitHub リポジトリ](https://github.com/RockyBabcock/rocky-blog)
