# Repository Guidelines

## プロジェクト構成
- ルート直下にページ: `index.html`, `about.html`, `categories.html`。
- 記事（共置き）: `posts/YYYY-MM-DD-slug/index.html` と `images/`（記事専用画像）
- アセット: `assets/css/*.css`, `assets/img/*`（共有/OGP用のみ）
- スクリプト: `js/common.js`、共通断片は `includes/` に配置
- すべてのページで `<div id="header-placeholder">` / `<div id="footer-placeholder">` を使用し、`includes/*.html` をJSで読み込み
- すべてのページに `<meta name="site-root" content="…">` を付与（トップは空文字、記事は `../../`）

## 開発
- ローカルプレビュー: `python3 -m http.server 8000` を実行し、`http://localhost:8000/` を開く。

## コーディング規約
- インデント2スペース / UTF-8。
- HTML: 属性はダブルクォート、意味のある `alt` を必ず付与。
- CSS: `assets/css/main.css` を編集。既存のCSS変数・クラス（例: `post-card`, `site-header`）を再利用。
- JS: ES6+ を前提にし、`js/common.js` に集約。

## 命名
- ファイル: kebab-case。
- 記事ディレクトリ: `YYYY-MM-DD-slug/`（中に `index.html`）
- 画像: 用途・サイズを含める（例: `cover-1200x670.webp`）

## コミット/PR
- コミット: Conventional Commits（`feat:`, `fix:`, `chore:` など）。小さく要点を明確に。
- PR: 変更概要と主要ファイルを記載。見た目変更はスクリーンショットを添付。

## 記事追加の運用（AI担当）

- 新規記事の追加・画像の配置・一覧ページ（トップ/カテゴリ/タグ）の更新は、開発用AIが担当します。
- ユーザーは以下の情報を依頼時に提示してください：
  - タイトル、投稿日（YYYY-MM-DD）、カテゴリ、タグ（任意）
  - 抜粋（カード用）、カバー画像・本文画像（ファイルまたは参照）
  - スラッグ（未指定ならAIが生成）
- AIは次を自動実施します：
  - `posts/YYYY-MM-DD-slug/` のスキャフォールド（`index.html` と `images/`）
  - `<meta name="site-root" content="../../">` の付与、CSS/JS、ヘッダー/フッターのプレースホルダ埋め込み
  - 記事本文テンプレ挿入、画像の共置き、相対パス整備
  - `index.html` / `categories.html` / `tags.html` のリンク・カード追加

### カテゴリ・タグの“正”の定義

- 各記事ファイル（`posts/YYYY-MM-DD-slug/index.html`）
  - その記事にとってのカテゴリ名・タグ名の“正”とする。
- `categories.html`
  - サイト全体におけるカテゴリ一覧と「カテゴリ → 記事一覧」の“正”とする。
  - トップページ下部の「カテゴリで探す」セクションは、`categories.html` を要約したダイジェストとして更新する。
- `tags.html`
  - サイト全体におけるタグ一覧と「タグ → 記事一覧」「タグごとの件数」の“正”とする。
  - トップページの「人気のタグ」セクションは、`tags.html` を要約したダイジェストとして更新する。

### 記事追加時の更新順序（AI用メモ）

1. 新規記事HTML（`posts/YYYY-MM-DD-slug/index.html`）にカテゴリ・タグを記述する（その記事にとっての“正”を決める）。
2. 1の内容をもとに `categories.html` / `tags.html` を更新する。
3. 最後に `index.html` の記事カード・「カテゴリで探す」・「人気のタグ」を、`categories.html` / `tags.html` に合わせて更新する。

### 一覧ページの表示ポリシー（スケール時）

- トップページ（`index.html`）
  - 「最新記事」は最新数件のみをカード表示とし、それより古い記事は `categories.html` から辿る想定とする（必要に応じて件数を調整）。
  - 「すべての記事一覧へ」リンクで `categories.html` に遷移できるようにする。
- カテゴリ一覧（`categories.html`）
  - 各カテゴリのリストは「最新5件のみ表示＋それ以外は折りたたみ」方式とし、ボタン操作で全件表示・再折りたたみできるようにする（JS実装済み）。
- タグ一覧（`tags.html`）
  - ページ上部のタグクラウドは「人気のタグ」のダイジェストとして扱い、下部の一覧を「すべてのタグ一覧」とする。
  - タグごとの記事リストもカテゴリと同じく「最新5件のみ表示＋ボタンで全件表示」の挙動とする（JS実装済み）。

参考（人手で行う場合の最小要件）
- 置き場所: `posts/YYYY-MM-DD-slug/index.html` と `images/`
- `<meta name="site-root" content="../../">` を `<head>` に追加
- CSS/JS: `../../assets/css/*.css` / `../../js/common.js`
- ヘッダー/フッター: `#header-placeholder` / `#footer-placeholder`
- 画像: `./images/...` を参照

## 運用ポリシー（柔軟な更新）

- 本リポジトリの開発支援AIは、ユーザーの要望に応じて、本ファイル（AGENTS.md）および `CLAUDE.md` の内容を柔軟に修正・更新して構いません。
- 変更は最小限の差分で行い、既存の記述と矛盾しないよう整合性を確保してください。
- 仕様変更に伴い記事テンプレートやチェックリストが影響を受ける場合、関連セクションを同時に更新して最新状態を保ってください。
