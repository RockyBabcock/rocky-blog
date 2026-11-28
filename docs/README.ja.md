# Rocky Blog

**言語：** [中文](../README.md) · [English](./README.en.md) · **日本語**

Rocky Blog は、外部の MuseAI ワークフローが作成する記事を読むことと、コンテンツを発見することを中心にした静的な個人ブログです。**Astro 7、React 19、TypeScript、Tailwind CSS 4** を採用し、静的生成を基本として必要な箇所だけをインタラクティブにしています。デザイン方針は **Premium Editorial × Contemporary Magazine × Sakura Botanical × Celestial Details**。編集的なタイポグラフィと明確な情報階層を軸に、桜・植物・星空のモチーフを控えめに取り入れます。

このリポジトリは Rocky Blog として独立して保守されています。上流プロジェクトの説明ではなく、本リポジトリの実装と製品範囲を基準にしてください。

[クイックスタート](../GETTING-STARTED.md) · [製品範囲](./PRODUCT-SCOPE.md) · [アーキテクチャ](./overview/00-overview.md) · [利用ガイド](../src/content/blog/tools/astro-koharu-guide.md)

## 主な機能

- **コンテンツ構成：** トップページの特集、新着記事、シリーズ / 週刊、カテゴリー、タグ、アーカイブ、タイムライン、ページネーション。
- **読書体験：** ライト / ダークテーマ、読書設定、読書進捗、目次、集中モード、ローカル読書履歴、続きを読む導線。
- **コンテンツ検索：** Pagefind による静的全文検索、コマンドパレット、サイト内ナビゲーション。
- **パーソナル読書棚：** 記事をブラウザー内に保存し、「未読 / 読書中 / 読了」で絞り込み、検索・並べ替え、グリッド / リスト表示を利用できます。カテゴリーとアーカイブの記事一覧にも、一覧内検索と並べ替えがあります。
- **Markdown：** GFM、Shiki、KaTeX、Mermaid、Infographic、Shoka 形式のコンテナ・タブ・折りたたみ・ルビ・テキスト効果。
- **保護コンテンツ：** 記事全体または一部をビルド時に AES-256-GCM で暗号化します。サーバー側のアクセス制御ではありません。詳細は[セキュリティ上の制約](./PRODUCT-SCOPE.md)を参照してください。
- **対応言語：** 中国語（デフォルト）、英語、日本語、フランス語。UI は4言語に対応しますが、すべての記事に翻訳があるとは限りません。
- **SEO と公開：** canonical、Open Graph、hreflang、sitemap、robots、静的ホスティング。
- **ビジュアル：** レスポンシブなエディトリアルレイアウト、桜の花びら、ページ遷移、動きを抑える設定。

アカウント、読書履歴のクラウド同期、コメント、アクセス解析、CMS、サイト全体の音楽プレーヤー、RSS 購読は製品機能に含めません。詳細は[製品範囲](./PRODUCT-SCOPE.md)を確認してください。

## スクリーンショット

以下は過去のバージョンで撮影した画像です。ページ構成や操作イメージの参考として掲載しており、最新の `main` ブランチと完全に一致するとは限りません。現行画面を撮影したら更新してください。

<table>
  <tr>
    <td width="50%"><img src="./assets/showcase/home.webp" alt="Rocky Blog トップページの過去の画面" /><br /><sub>トップページ（過去の画面）</sub></td>
    <td width="50%"><img src="./assets/showcase/theme.webp" alt="テーマ切り替えの過去の画面" /><br /><sub>テーマ（過去の画面）</sub></td>
  </tr>
  <tr>
    <td width="50%"><img src="./assets/showcase/pages.webp" alt="ページ遷移の過去の画面" /><br /><sub>ページ遷移（過去の画面）</sub></td>
    <td width="50%"><img src="./assets/showcase/toc.webp" alt="目次の過去の画面" /><br /><sub>目次（過去の画面）</sub></td>
  </tr>
</table>

## 開発環境

必要なバージョン：

- Node.js `>=22.20.0`
- pnpm `10.28.2`

```bash
git clone https://github.com/RockyBabcock/rocky-blog.git
cd rocky-blog
pnpm install
pnpm dev
```

開発サーバーのデフォルトポートは 3000 です。変更する場合は `BLOG_PORT` を設定してください。

| コマンド | 用途 |
| --- | --- |
| `pnpm dev` | 開発サーバー |
| `pnpm build` | 静的サイトの生成 |
| `pnpm preview` | 本番ビルドのプレビュー |
| `pnpm check` | Astro / TypeScript の検査 |
| `pnpm lint` | Biome の検査 |
| `pnpm test` | コアテスト |
| `pnpm knip` | 未使用ファイル・依存関係の検出 |
| `pnpm generate:lqips` | 低品質画像プレースホルダーの生成 |

## MuseAI コンテンツの取り込み

Rocky Blog の記事は外部の MuseAI ワークフローで作成・翻訳します。このリポジトリには CMS、ブラウザー内エディター、記事管理画面、ローカルエディター連携はありません。Muse は検証済みの Markdown / MDX ファイルと実在する画像などのリソースを納品し、サイト側で schema 検証と静的生成を行います。

まず [Muse コンテンツ規約](./muse/README.md) を確認してください。Frontmatter schema、実際のディレクトリとカテゴリー対応、4言語の配置、対応 Markdown 構文、編集基準、アップロードチェックリスト、新規記事・翻訳・レビュー用 Prompt をまとめています。

コンテンツのルートは `src/content/blog/` です。中国語の原稿はカテゴリー別ディレクトリに置き、翻訳は同じ相対パスを `en/`、`ja/`、`fr/` の下に複製します。サイト名、言語、ナビゲーション、シリーズ、テーマ、モーションは `config/site.yaml` で設定します。

`pnpm build` で `dist/` を生成し、静的ホスティングサービスに公開します。アプリケーションサーバーやデータベースは不要です。

## ドキュメント

- [製品範囲](./PRODUCT-SCOPE.md)
- [フロントエンドデザイン実装 Prompt](./FRONTEND-DESIGN-PROMPT.md)
- [Editorial デザイン参考と Rocky のスタイルへの適用](./design/EDITORIAL-REFERENCE-AND-ADAPTATION.md)
- [Muse コンテンツ規約](./muse/README.md)
- [プロジェクト状況と Agent 引き継ぎ](./PROJECT-STATUS.md)
- [クイックスタート](../GETTING-STARTED.md)
- [アーキテクチャ概要](./overview/00-overview.md)
- [国際化と SEO](./overview/11-i18n-and-seo.md)
- [コントリビューション](../CONTRIBUTING.md)
- [AI Agent 向けガイド](../AGENTS.md) — [Gemini](../GEMINI.md)、[Claude Code](../CLAUDE.md)、[GitHub Copilot](../.github/copilot-instructions.md) からも共通ルールを参照します。

## ライセンス

Rocky Blog は [AGPL-3.0](../LICENSE) で公開されています。再配布や改変版の公開前に、ライセンスと上流由来の表示義務を確認してください。
