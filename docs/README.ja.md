# astro-koharu

**Language:** [中文](../README.md) | [English](./README.en.md) | **日本語**

![astro-koharu のピンクとブルーのブログ画面](https://r2.cosine.ren/i/2026/01/94383107ba4586f773938ed4dae34ff1.webp)

かわいい / アニメ風 / ピンクブルー配色のブログテーマ。ACG、フロントエンド、手帳系の個人サイトに最適で、優れたパフォーマンスを実現します。

> 名前は「小春日和（こはるびより）」に由来しています。晩秋から初冬にかけての、春のように暖かく晴れた日が続く時期のことです。

デザインは Hexo の [Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/) テーマにインスピレーションを受け、モダンな技術スタックであなただけのブログを構築します。

このリポジトリはデモ用に整理されています。テーマ開発者のブログは https://blog.cosine.ren/ をご覧ください。気に入ったらスターをお願いします！

[クイックスタート](../GETTING-STARTED.md) · [使い方ガイド](../src/content/blog/tools/astro-koharu-guide.md) · [フィードバック](https://github.com/cosZone/astro-koharu/issues)

> **ライセンス：AGPL-3.0。** 利用・改変・デプロイの前に [LICENSE](../LICENSE) を確認してください。

開発継続中

- **Astro** ベース、静的出力、高速ロード
- かわいい / アニメ風 / ピンクブルー配色、ACG・フロントエンド・手帳系サイトに最適
- マルチカテゴリー・マルチタグ対応、複雑な情報構造を強制しない
- パフォーマンスオーバーヘッドを最小限に
- Pagefind によるサーバーレス全文検索
- LQIP（低品質画像プレースホルダー）— 画像読み込み前にグラデーションプレースホルダーを表示

## 画面と動き

このリポジトリのデモサイト（中国語 UI）で録画しています。

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
| 表現豊かな本文を書く | GFM、コードハイライト、数式、Mermaid、Infographic、リンクカード。Shoka の注意書き、折りたたみ、タブ、文字装飾、ネタバレ隠し、ルビ、クイズ、記事内音声・動画を個別に切り替え可能。[構文ガイド](../src/content/blog/tools/astro-koharu-guide.md#markdown-增强)を参照 |
| 記事に印を付けて共有する | [落款](../src/content/blog/tools/astro-koharu-guide.md#文章落款)で執筆方法・ネタバレ・古い情報を表示し、アーカイブで絞り込み。記事操作で Markdown 原文をコピー・ダウンロード可能 |
| 内容を整理する | 階層カテゴリ、タグ、アーカイブ、下書き、固定記事。[シリーズ](../src/content/blog/tools/astro-koharu-guide.md#系列文章系统)には専用ページとホームのハイライトがあり、独立ページは `src/pages/` に追加 |
| 快適に読む | ライト・ダークテーマ、モバイルの章タイトルと目次、読書進捗と所要時間。Pagefind 検索、LQIP 画像プレースホルダー。`motion` は 3 段階の動きと桜の演出を設定でき、OS の動きを減らす設定に対応 |
| 多言語で公開する | 中国語・英語・日本語・韓国語の UI 辞書、記事翻訳、言語切り替え、hreflang、言語別 RSS。[i18n 設定](../src/content/blog/tools/astro-koharu-guide.md#多语言支持i18n)を参照 |
| お知らせ・アセット生成 | お知らせシステムに対応し、LQIP・意味的類似度・AI 要約を任意スクリプトで生成可能 |
| コンテンツ暗号化 | 記事全体・ブロック単位の AES-256-GCM 暗号化に対応 |

## 記事の作成と管理

`src/content/blog/` 配下に Markdown ファイルを直接作成します。

```markdown
---
title: はじめての記事
date: 2026-10-09
link: hello-koharu
tags: [日常]
---

覚えておきたいことを、今日から少しずつ。
```

`pnpm dev` を起動して `/post/hello-koharu` を開きます。

## ローカルで起動

**Node.js ≥ 22.20.0** と **pnpm 10.28.2** が必要です。要件は [package.json](../package.json) に従います。

```bash
pnpm install
pnpm dev
```

[config/site.yaml](../config/site.yaml) でサイト名・作者・ドメイン・アバター・ナビゲーションを変更し、サンプル記事を自分の記事に置き換えてください。設定変更後は開発サーバーの再起動または再ビルドが必要です。手順は[クイックスタート](../GETTING-STARTED.md)を参照してください。

## デプロイ

```bash
pnpm build
pnpm preview
```

純粋な静的サイトとして `dist/` へ出力されるため、Vercel、Netlify、Cloudflare Pages などの静的ホスティングでバックエンド不要で公開できます。

## 設定とドキュメント

| 設定したいこと | 参照先 |
| --- | --- |
| サイト情報・ナビゲーション・動き・任意機能 | [サイト設定](../config/site.yaml)と[使い方ガイド](../src/content/blog/tools/astro-koharu-guide.md) |
| カテゴリ・シリーズ・落款の翻訳 | [コンテンツ翻訳](../config/i18n-content.yaml)。翻訳記事は `src/content/blog/<locale>/` に配置 |
| リンク埋め込みとメタデータキャッシュ | [リンク埋め込みガイド](./features/link-embedding.md) |
| テーマ開発への参加 | [コントリビューションガイド](../CONTRIBUTING.md) |

## 利用前に知っておくこと

- **原文と暗号化**：記事操作を有効にすると frontmatter を含む Markdown 原文が公開されます。暗号化記事・暗号化ブロックを含む記事の原文は公開しません。AES-256-GCM のパスワードはビルド時の暗号化に使用し、クライアントへ配布せず、読者が入力します。
- **アセット生成スクリプト**：LQIP（`pnpm generate:lqips`）、意味的類似度（`pnpm generate:similarities`）、AI 要約（`pnpm generate:summaries`）は任意の生成処理です。
- **パフォーマンス**：以下の画像は過去の例です。結果は記事・設定・ホスティングによって変わるため、自分のサイトで計測してください。

## 画面プレビュー

既存のデモ画像を掲載しています。一部は現在のバージョンより前のものです。

![ブログ操作のデモ](https://r2.cosine.ren/i/2025/12/417b098dffce2ced9c0ff6009e5213df.gif)

[優れたパフォーマンス](https://pagespeed.web.dev/analysis/https-blog-cosine-ren/w6qzrwbp9b?hl=ja&form_factor=desktop)：デスクトップでオールグリーンを目指していますが、機能追加に伴い継続的なチェックが必要です！

![過去のパフォーマンスレポート（2025 年 12 月）](https://r2.cosine.ren/i/2025/12/e93f40c340a626c4ab72212a84cf6d5d.webp)

[Issue](https://github.com/cosZone/astro-koharu/issues) も歓迎しますが、個人プロジェクトですので、フォークしてカスタマイズも自由にどうぞ！

![ブログ画面のプレビュー 1](https://r2.cosine.ren/i/2026/01/f1c239b4adf7771f10b954c389d87a74.webp)
![ブログ画面のプレビュー 2](https://r2.cosine.ren/i/2026/01/c962f82503abf68eb1f21b835873f241.webp)

## 機能ショーケース

- 画像読み込み前のグラデーションプレースホルダーで視覚体験を向上 - [ブログ記事](https://blog.cosine.ren/post/astro-lqip-implementation)
  ![LQIP](https://r2.cosine.ren/i/2025/12/40e44c8ac166183d5f823d7aa81fa792.webp)
- View Transitions API によるスムーズなダークモード切り替えアニメーション
  ![テーマ切り替え](https://r2.cosine.ren/i/2025/12/418c7602ce115660bed9db66739370d5.gif)
- Markdown 拡張 - リンク埋め込み機能 - [サンプル](https://blog.cosine.ren/post/my-claude-code-record-2)
  ![リンク埋め込み](https://r2.cosine.ren/i/2026/01/6804aa167fd4cf7022a9b511d52017ce.webp)
- Markdown 拡張 - [@antv/infographic](https://github.com/antvis/Infographic) で美しいインフォグラフィックを作成
  [インフォグラフィックガイド](https://koharu.cosine.ren/post/infographic-guide)
  ![インフォグラフィック構文](https://r2.cosine.ren/i/2026/01/581893e18557bcb837177cb2d6fb7af7.webp)
- スタイル付き RSS フィードページ - [サンプル](https://blog.cosine.ren/rss.xml)
  ![RSS フィード](https://r2.cosine.ren/i/2026/01/4476f67d1acea2e0991cc70d1d3cf6a1.webp)
- お知らせシステム
- Shoka 互換 Markdown 構文 - 注意ブロック、折りたたみブロック、タブカード、テキストエフェクト、スポイラーテキスト、ルビ注釈、クイズなど
- オーディオ/ビデオプレーヤー - 音楽プレイリストと動画再生に対応。[Meting](https://github.com/metowolf/meting) API を利用でき、セルフホストを推奨

## このテーマを使用しているブログ

> [Zhilu のブログ](https://github.com/L33Z22L11/blog-v3)にならって、このテーマを使用しているブログのショーケースを設けました。\
> QQ グループ 598022684 でのディスカッションや、[フロントエンドチャンネル](https://t.me/cosine_front_end)のコメント欄でのチャットにぜひご参加ください。

| ブログ                                         | 作者       | リポジトリ                                                      | 備考                                   |
| ---------------------------------------------- | ---------- | --------------------------------------------------------------- | -------------------------------------- |
| **[Cosine のブログ](http://blog.cosine.ren/)** | **cosine** | [cosZone/astro-koharu](https://github.com/cosZone/astro-koharu) | このテーマ                              |
| [XueHua のブログ](https://xhblog.top/)         | XueHua-s   | [XueHua-s/astro-snow](https://github.com/XueHua-s/astro-snow)   | 機能を簡素化、スタートページを追加      |
| [Ksable's 小屋](https://blog.ksable.top/)      | Ksable     | [God-2077/astro-blog](https://github.com/God-2077/astro-blog)  | 一部機能を変更 / 追加                  |

## 謝辞

使用フォント：[Chill Round](https://chinese-font.netlify.app/zh-cn/fonts/hcqyt/ChillRoundFRegular)

astro-koharu の開発にインスピレーションとリファレンスを提供してくれた以下のプロジェクトに感謝します：

- [mx-space](https://github.com/mx-space)
- [Hexo テーマ Shoka](https://shoka.lostyu.me/computer-science/note/theme-shoka-doc/)
- [waterwater.moe](https://github.com/lawvs/lawvs.github.io)
- [yfi.moe](https://github.com/yy4382/yfi.moe)
- [4ark.me](https://github.com/gd4Ark/gd4Ark.github.io)
- [Zhilu のブログ](https://blog.zhilu.site/)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=cosZone/astro-koharu&type=date&legend=top-left)](https://www.star-history.com/#cosZone/astro-koharu&type=date&legend=top-left)

## License

[GNU Affero General Public License version 3 (AGPL-3.0)](../LICENSE)
