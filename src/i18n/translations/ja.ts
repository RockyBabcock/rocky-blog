/**
 * 日本語 (ja) — UI 文字列
 *
 * ここに存在しないキーは、デフォルトのロケール (zh) にフォールバックします。
 */

import type { UIStrings } from '../types';

export const uiStrings: UIStrings = {
  // Index pages
  'index.posts': '件の投稿',
  'index.years': '年',
  'index.categories': '件のカテゴリー',
  'index.tags': '個のタグ',
  'index.mostUsed': '最多のタグ',
  'category.filter': 'サブカテゴリー',
  'tag.filter': 'タグを絞り込む',
  'tag.filterPlaceholder': 'タグ名を入力',
  'tag.noMatches': '一致するタグがありません',
  'tag.singleTags': '1回だけ使われたタグがあと{count}個',
  'archives.jumpToYear': '{year}年へ移動',
  'archives.legendFew': '少ない',
  'archives.legendMany': '多い',
  'archives.calendar': '投稿カレンダー',
  'archives.monthLabel': '{year}年{month}月 · {count}件の投稿',

  // ── ナビゲーション ──────────────────────────────────────────────
  'nav.home': 'ホーム',
  'nav.posts': '投稿',
  'nav.categories': 'カテゴリー',
  'nav.tags': 'タグ',
  'nav.archives': 'アーカイブ',
  'nav.about': 'ブログについて',
  'nav.weekly': '週刊',

  // ── 一般 ──────────────────────────────────────────────────
  'common.search': '検索',
  'common.close': '閉じる',
  'viewer.loadError': 'ビューアを読み込めませんでした。ページを再読み込みしてお試しください。',
  'search.loadError': '検索を読み込めませんでした。ページを再読み込みしてお試しください。',
  'common.copy': 'コピー',
  'common.copied': 'コピーしました',
  'common.copyFailed': '自動コピーに失敗しました。リンクを手動でコピーしてください。',
  'common.loading': '読み込み中...',
  'common.noResults': '結果が見つかりません',
  'common.backToTop': 'トップに戻る',
  'common.darkMode': 'ダークモード',
  'common.lightMode': 'ライトモード',
  'common.toggleTheme': 'テーマを切り替え',
  'common.language': '言語',
  'common.toc': '目次',
  'common.expand': '展開する',
  'common.collapse': '折りたたむ',
  'common.menuLabel': '{name}メニュー',

  // ── 投稿 ────────────────────────────────────────────────────
  'post.readMore': '詳細を読む',
  'post.totalPosts': '{count}件の投稿',
  'post.stickyPosts': '固定された投稿',
  'post.postList': '投稿',
  'post.featuredCategories': 'おすすめのカテゴリー',
  'post.yearPosts': '{count}件の投稿',
  'post.readingTime': '{time}分で読み終えます',
  'post.wordCount': '{count}文字',
  'post.publishedAt': '公開日: {date}',
  'post.updatedAt': '更新日: {date}',
  'post.prevPost': '前へ',
  'post.nextPost': '次へ',
  'post.seriesNavigation': 'シリーズナビゲーション',
  'post.seriesPrev': '前へ',
  'post.seriesNext': '次へ',
  'post.fallbackNotice': 'この投稿は「{lang}」では表示できません。元の投稿を表示しています。',
  'post.draft': '下書き',
  'post.pinned': '固定済み',
  'post.noPostsFound': '投稿が見つかりません',

  // ── カテゴリーとタグ ───────────────────────────────────────
  'category.allCategories': 'すべてのカテゴリー',
  'category.postsInCategory': '{name}の投稿',
  'category.totalCategories': '{count}件のカテゴリー',
  'category.categoryLabel': 'カテゴリー',
  'tag.allTags': 'すべてのタグ',
  'tag.postsWithTag': '「{name}」のタグが付けられた投稿',
  'tag.totalTags': '{count}個のタグ',
  'tag.all': 'すべて',
  'tag.postCount': '{count}件の投稿',

  // ── アーカイブ ────────────────────────────────────────────────
  'archives.title': 'アーカイブ',
  'archives.totalPosts': '{count}件の投稿',

  // ── 検索 ──────────────────────────────────────────────────
  'search.placeholder': 'キーワードで検索',
  'search.label': 'このサイトを検索',
  'search.clear': 'クリア',
  'search.loadMore': 'さらに検索結果を読み込み',
  'search.filters': '絞り込み',
  'search.noResults': '検索結果は見つかりません',
  'search.manyResults': '[COUNT]件の検索結果',
  'search.oneResult': '[COUNT]件の検索結果',
  'search.altSearch': '結果が見つかりません。[DIFFERENT_TERM]の結果を表示しています。',
  'search.suggestion': '検索結果が見つかりません。 こちらの検索をお試しください:',
  'search.searching': '[SEARCH_TERM]を検索中...',
  'search.dialogTitle': '投稿を検索',
  'search.dialogClose': '閉じる',
  'search.dialogSelect': '選択',
  'search.dialogOpen': '開く',

  // ── コードブロック ──────────────────────────────────────────────
  'code.copy': 'コードをコピー',
  'code.copied': 'コピーしました!',
  'code.fullscreen': 'フルスクリーン',
  'code.exitFullscreen': 'フルスクリーンを終了',
  'code.wrapLines': '文字の折り返し',
  'code.viewSource': 'ソースを表示',
  'code.viewRendered': 'レンダリングされた表示',
  'code.collapse': 'コードを折りたたむ',
  'code.expand': 'コードを展開',

  // ── 図表 / インフォグラフィック ───────────────────────────────────
  'diagram.fullscreen': 'フルスクリーン',
  'diagram.exitFullscreen': 'フルスクリーンを終了',
  'diagram.viewSource': 'ソースを表示',
  'diagram.zoomIn': '拡大',
  'diagram.zoomOut': '縮小',
  'diagram.resetZoom': 'リセット',
  'diagram.fitToScreen': '画面に合わせる',
  'diagram.actualSize': '実際のサイズ',
  'diagram.download': '画像をダウンロード',
  'diagram.resize': '図のサイズを変更',
  'diagram.resizeHint': 'ドラッグでサイズ変更、ダブルクリックで元に戻す',
  'diagram.renderError': '図を表示できませんでした',
  'diagram.loadingSlow': '図の読み込みに時間がかかっています',
  'diagram.errorHelp': 'ページを再読み込みするか、ツールバーから図のソースを表示・コピーできます。',
  'diagram.errorHelpNoSource': 'ページを再読み込みしてお試しください。',
  'diagram.reload': '再読み込み',
  'diagram.gestureHint': 'ピンチ/ホイールで拡大縮小・ドラッグで移動・ダブルクリックで拡大',

  // ── Lightboxでの画像表示 ──────────────────────────────────────────
  'image.preview': '画像プレビュー',
  'image.loadError': '画像を読み込めませんでした',
  'image.retry': '再試行',
  'image.hintMobileGallery': '左右にスワイプで切替 · ピンチで拡大 · 下にスワイプで閉じる',
  'image.zoomIn': '拡大',
  'image.zoomOut': '縮小',
  'image.resetZoom': 'リセット',
  'image.resetZoomRotate': '回転と拡大をリセット',
  'image.rotate': '90度に回転',
  'image.close': '閉じる',
  'image.prev': '前へ',
  'image.next': '次へ',
  'image.counter': '{current} / {total}',
  'image.hintDesktop': 'ダブルクリックで拡大 · スクロールでズーム · 余白をクリックして閉じる',
  'image.hintMobile': 'ダブルタップ・ピンチで拡大 · 下にスワイプ・余白をタップして閉じる',

  // ── フッター ──────────────────────────────────────────────────
  'footer.poweredBy': 'Powered by {name}',
  'footer.totalPosts': '{count}件の投稿',
  'footer.totalWords': '{count}文字',
  'footer.totalWordsTitle': '合計の文字数',
  'footer.readingTimeTitle': '合計の読書時間',
  'footer.postCountTitle': '合計の投稿数',
  'footer.runningDays': '稼働して{days}日が経過',
  'footer.wordUnit': '文字',
  'footer.postUnit': '投稿',

  // ── ページ付け ──────────────────────────────────────────────
  'pagination.label': 'ページ送り',
  'pagination.prev': '前へ',
  'pagination.next': '次へ',
  'pagination.page': 'ページ: {page}',
  'pagination.currentPage': '現在は{page}ページです',
  'pagination.of': '{total}ページの内、',

  // ── パンくず ──────────────────────────────────────────────
  'breadcrumb.home': 'ホーム',
  'breadcrumb.goToCategory': '{name}のカテゴリーに移動',

  // ── フローティンググループ ──────────────────────────────────────────
  'floating.backToTop': 'トップに戻る',
  'floating.scrollToBottom': '下にスクロール',
  'floating.toggleTheme': 'テーマを切り替え',
  'floating.toggleToolbar': 'ツールバーを切り替え',
  'floating.settings': '設定',

  // ── Settings Panel ────────────────────────────────────────
  'settings.title': '設定',
  'settings.reader': '読書',
  'settings.general': '一般',
  'settings.closePanel': '設定パネルを閉じる',
  'settings.fontPreset': 'フォント',
  'settings.fontPreset.round': '丸ゴシック',
  'settings.fontPreset.system': 'システム',
  'settings.fontPreset.serif': 'セリフ',
  'settings.fontPreset.wenkai': '文楷',
  'settings.fontSize': '文字サイズ',
  'settings.lineHeight': '行間',
  'settings.measure': '行幅',
  'settings.auto': '自動',
  'settings.justify': '両端揃え',
  'settings.scrollProgress': 'スクロール進捗バー',
  'settings.motionLevel': 'モーション',
  'settings.motionLevel.lively': 'いきいき',
  'settings.motionLevel.subtle': 'ひかえめ',
  'settings.motionLevel.reduced': '減らす',
  'settings.motionLevel.livelyHint': '入場演出・カバーの桜吹雪・スクロール表示・ページ遷移を有効に',
  'settings.motionLevel.subtleHint': '入場とページ遷移のみ。桜吹雪とスクロール演出は無効',
  'settings.motionLevel.reducedHint': '必要な操作フィードバックのみ',
  'settings.motionLevel.systemReduced': 'システムで「視差効果を減らす」が有効なため、常に「減らす」として扱います',
  'settings.wave': 'カバーの波',
  'settings.reset': 'デフォルトにリセット',
  'settings.waveDisabledByReducedMotion': 'モーションが「減らす」の間は使用できません',
  'settings.invalidNumber': '正の数を入力してください',

  // ── 暗号化されたブロック ─────────────────────────────────────────
  'encrypted.locked': '暗号化されたコンテンツ',
  'encrypted.placeholder': 'パスワードを入力で解除',
  'encrypted.submit': '解除',
  'encrypted.incorrect': 'パスワードが間違っています',

  // ── 暗号化された投稿 ─────────────────────────────────────────
  'encrypted.post.title': 'この記事は暗号化されています',
  'encrypted.post.description': 'パスワードを入力して内容をご覧ください',

  // ── 404 ─────────────────────────────────────────────────────
  'notFound.title': 'ページは見つかりません',
  'notFound.description': 'お探しのページは見つかりません',
  'notFound.backHome': 'ホームに戻る',
  'notFound.browseArchives': 'アーカイブを参照',
  'notFound.message': 'お探しのページは存在しないか、移動した可能性があります。',

  // ── カテゴリーの統計 ────────────────────────────────────────
  'category.subCategoryCount': '{count}件のサブカテゴリー',
  'category.postCount': '{count}件の投稿',

  // ── 投稿カード ─────────────────────────────────────────────
  'post.readingTimeTooltip': '読み終える推定時間: {time}',

  // ── おすすめのシリーズ ─────────────────────────────────────────
  'series.latestPost': '最新',
  'series.viewAll': 'すべて表示',
  'series.postCount': '{count}件の投稿',
  'series.position': '{total} 本中 {current} 本目',
  'series.noPosts': 'このシリーズには投稿がありません',
  'series.chromeExtension': 'Chrome拡張機能',
  'series.docs': 'ドキュメント',
  'series.issues': '号',
  'series.latestIssue': '最新号',
  'series.readIssue': 'この号を読む',

  // ── ホーム情報 ───────────────────────────────────────────────
  'homeInfo.articles': '記事',
  'homeInfo.categories': 'カテゴリー',
  'homeInfo.tags': 'タグ',
  'homeInfo.greetingMorning': 'おはよう！',
  'homeInfo.greetingAfternoon': 'こんにちは！',
  'homeInfo.greetingEvening': 'こんばんは！',
  'homeInfo.greetingNight': '夜更かしはほどほどに',

  // ── ドロワー ──────────────────────────────────────────────────
  'drawer.navMenu': 'ナビゲーションメニュー',
  'drawer.close': 'メニューを閉じる',
  'drawer.openMenu': 'メニューを開く',

  // ── 概要パネル ───────────────────────────────────────────
  'summary.description': '概要',

  // ── 最新記事 ────────────────────────────────────────────
  'post.latestPosts': '最新記事',

  // ── タグコンポーネント ───────────────────────────────────────────
  'tag.expandAll': 'すべて表示',
  'tag.viewTagPosts': '「{tag}」のタグの付いた投稿を{count}件表示',

  // ── 目次のコンテンツ ───────────────────────────────────────
  'toc.title': '目次',
  'toc.sectionProgress': 'この節の読書進捗',
  'toc.expand': '目次のコンテンツを展開',
  'toc.empty': '見出しはありません',

  // ── Content ───────────────────────────────────────────────
  'content.revealSpoiler': '隠された内容を表示',

  // ── 検索ショートカット ───────────────────────────────────────
  'search.searchShortcut': '検索 ({shortcut})',

  // ── Sider のセグメント ─────────────────────────────────────────
  'sider.overview': '概要',
  'sider.toc': 'コンテンツ',
  'sider.series': 'シリーズ',

  // ── リンクをコピー ───────────────────────────────────────────────
  'cover.copyLink': 'リンクをコピー',

  // ── 多言語・フォールバック ──────────────────────────────────
  'post.viewOriginal': '元の投稿（{lang}）を見る',
  'post.originalLocale': '原文: {lang}',
  'language.nativeAvailable': '翻訳あり',
  'language.fallbackLabel': '原文表示',

  // ── 検索機能強化 ───────────────────────────────────────────
  'search.filterCategory': 'カテゴリー',
  'search.filterTag': 'タグ',
  'search.filterLanguage': '言語',
  'search.clearFilters': '絞り込みを解除',
  'search.all': 'すべて',
  'search.resultCount': '{count}件の記事が見つかりました',
  'search.emptyPrompt': 'キーワードを入力するか、下のフィルターを選択してください',
  'search.retry': '再試行',
  'search.openCommands': 'コマンドパレットを開く',
  'search.shortcutHint': 'コマンド',

  // ── 閲覧履歴 ───────────────────────────────────────────────
  'history.title': '最近読んだ記事',
  'history.continueReading': '続きを読む',
  'history.empty': '閲覧履歴はまだありません',
  'history.clearAll': '履歴をクリア',
  'history.cleared': '閲覧履歴をクリアしました',
  'history.removeItem': '履歴を削除',
  'history.progress': '{percent}% 読了',
  'history.completed': '読了',
  'history.justNow': 'たった今',
  'history.minutesAgo': '{count}分前',
  'history.hoursAgo': '{count}時間前',
  'history.daysAgo': '{count}日前',

  // ── コマンドパレット ───────────────────────────────────────
  'command.title': 'コマンドパレット',
  'command.placeholder': 'コマンドやページを検索...',
  'command.empty': '一致するコマンドがありません',
  'command.groupNav': 'ナビゲーション',
  'command.groupActions': 'アクション',
  'command.groupRecent': '最近読んだ記事',
  'command.searchPosts': '記事を検索',
  'command.searchForQuery': '「{query}」を記事から検索',
  'command.openSettings': '読書設定を開く',
  'command.toggleFocus': '集中読書モードを切り替え',
  'command.toggleTheme': 'ライト / ダークテーマを切り替え',
  'command.trigger': 'コマンド',
  'command.navigateHint': '移動',
  'command.executeHint': '実行',

  // ── 記事シェア ─────────────────────────────────────────────
  'share.title': '共有',
  'share.copyLink': '記事リンクをコピー',
  'share.copyMarkdown': 'Markdown リンクをコピー',
  'share.nativeShare': 'システムで共有',
  'share.linkCopied': '記事リンクをコピーしました',
  'share.markdownCopied': 'Markdown リンクをコピーしました',
  'share.shared': '共有メニューを開きました',
  'share.failed': 'コピーに失敗しました。URLを手動でコピーしてください。',

  // ── 集中読書モード ─────────────────────────────────────────
  'focus.enter': '集中読書',
  'focus.exit': '集中モードを終了',
  'focus.active': '集中読書モード',
  'focus.shortcutHint': 'Esc キーで終了',

  // ── シリーズ読書ルート ─────────────────────────────────────
  'series.progressTitle': 'シリーズ読書進捗',
  'series.completedCount': '{read} / {total} 記事を読了',
  'series.continueReading': '続きを読む',
  'series.startReading': '最初から読む',
  'series.statusRead': '読了',
  'series.statusInProgress': '{percent}%',
  'series.backToSeries': 'シリーズ一覧へ',
  'series.partOfSeries': 'シリーズ',

  // ── アーカイブタイムライン ─────────────────────────────────
  'archives.timelineTitle': '記事タイムライン',
  'archives.allYears': 'すべての年',
  'archives.quickJump': '年へ移動',

  // ── ホーム編集ダッシュボード ───────────────────────────────
  'home.heroExplore': '記事を探す',
  'home.heroSearch': '記事を検索',
  'home.featuredSection': 'ピックアップ',
  'home.featuredSubtitle': 'おすすめ記事とシリーズの注目号',
  'home.latestSubtitle': '最新の技術ノートと日々の記録',
  'home.seriesSection': 'シリーズ・週刊',
  'home.seriesSubtitle': 'テーマ別に読み進める連載ルート',
  'home.exploreTopics': 'トピック探索',
  'home.exploreSubtitle': 'カテゴリーと人気タグから記事を探す',
  'home.popularTags': '人気タグ',
  'home.allTags': 'すべてのタグ',
  'home.allCategories': 'すべてのカテゴリー',
  'home.timelineSection': '執筆タイムライン',
  'home.timelineSubtitle': '最近の更新と年別の執筆記録',
  'home.viewFullArchives': 'アーカイブをすべて見る',
  'home.railSearchHint': '記事・タグ・カテゴリーを検索...',
  'home.railHistoryEmptyHint': '読んだ記事はブラウザに記録され、いつでも続きから読めます。',
  'home.railStartExplore': 'ピックアップから読む',
  'home.railArchiveSummary': '年別アーカイブ',
  'home.railTopicsSummary': '主なカテゴリー',
  'home.viewAllPosts': 'すべての記事',

  // ── リーディングシェルフ・ブックマーク ─────────────────────────
  'nav.shelf': '読書棚',
  'bookmark.save': '保存',
  'bookmark.saved': '保存済み',
  'bookmark.saveArticle': '読書棚に追加',
  'bookmark.removeArticle': '読書棚から削除',
  'bookmark.toastSaved': '読書棚に追加しました',
  'bookmark.toastRemoved': '読書棚から削除しました',
  'bookmark.storageUnavailable': 'ブラウザのローカルストレージが利用できないため、保存できません。',
  'shelf.kicker': 'マイライブラリ',
  'shelf.title': '読書棚',
  'shelf.subtitle': '気になる記事をブックマークして、このブラウザ内だけで読書リストを管理できます。',
  'shelf.countLabel': '{count} 件を保存',
  'shelf.filterAll': 'すべて',
  'shelf.filterToRead': '未読',
  'shelf.filterInProgress': '読書中',
  'shelf.filterCompleted': '読了',
  'shelf.searchPlaceholder': '保存した記事を絞り込む...',
  'shelf.sortNewest': '保存日（新しい順）',
  'shelf.sortOldest': '保存日（古い順）',
  'shelf.sortTitle': 'タイトル順',
  'shelf.layoutGrid': 'グリッド表示',
  'shelf.layoutList': 'リスト表示',
  'shelf.savedOn': '{date} に保存',
  'shelf.openArticle': '記事を読む',
  'shelf.continueReading': '続きを読む',
  'shelf.readAgain': 'もう一度読む',
  'shelf.remove': '削除',
  'shelf.clearAll': 'すべて削除',
  'shelf.clearConfirmTitle': '保存した記事をすべて削除しますか？',
  'shelf.clearConfirmAction': 'すべて削除',
  'shelf.clearCancel': 'キャンセル',
  'shelf.cleared': '読書棚を空にしました',
  'shelf.loading': '読書棚を読み込んでいます...',
  'shelf.emptyTitle': '読書棚にはまだ記事がありません',
  'shelf.emptyHint': '記事カードや記事ページのブックマークボタンから、後で読みたい記事を保存できます。',
  'shelf.emptyExploreLatest': '最新記事を見る',
  'shelf.emptyBrowseArchives': 'アーカイブを見る',
  'shelf.noFilterMatches': 'このステータスの記事はまだありません',
  'shelf.noSearchResults': '条件に一致する保存記事がありません',
  'shelf.resetFilters': 'すべて表示',
  'shelf.railTitle': '読書棚',
  'shelf.railEmpty': '記事をブックマークすると、ここからすぐに開けます。',
  'shelf.railOpenShelf': '読書棚を開く',
  'shelf.commandSave': '現在の記事を読書棚に保存',
  'shelf.commandRemove': '現在の記事を読書棚から削除',

  // ── コレクション絞り込みコントロール ───────────────────────────
  'browse.filterPlaceholder': 'タイトルやタグで絞り込む...',
  'browse.sortNewest': '新しい順',
  'browse.sortOldest': '古い順',
  'browse.noMatches': '条件に一致する記事が見つかりません',
  'browse.resetFilter': '絞り込みを解除',
  'browse.showingCount': '{visible} / {total} 件を表示',
};
