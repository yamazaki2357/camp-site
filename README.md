# Camp Site

キャンプ場レビューとアウトドア情報を発信する静的HTMLサイト

## 特徴

- **ピュアHTML/CSS/JS**: ビルド不要の静的サイト
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **SEO対応**: 適切なメタタグ設定
- **高速**: サーバーサイド処理なし、CDN配信に最適

## ファイル構成

```
/
├── index.html           # トップページ
├── about.html          # Aboutページ
├── contact.html        # お問い合わせ
├── categories.html     # カテゴリ一覧
├── tags.html           # タグ一覧
├── 404.html            # エラーページ
├── assets/             # CSS・画像
│   ├── css/
│   │   ├── normalize.css
│   │   └── main.css
│   └── img/
├── includes/           # 共通HTML部品
│   ├── header.html
│   └── footer.html
├── js/                 # JavaScript
│   └── common.js
└── posts/              # 記事（今後追加）
```

## ローカル開発

シンプルなHTTPサーバーで起動：

```bash
# Python 3
python3 -m http.server 8000

# Node.js (http-server)
npx http-server -p 8000
```

ブラウザで http://localhost:8000 にアクセス

## GitHub Pagesで公開

1. GitHubにプッシュ
2. Settings → Pages
3. Source: `main` ブランチ、`/ (root)` を選択

サイトURL: https://yamazaki2357.github.io/camp-site/

## 記事の追加方法

1. `posts/` ディレクトリにHTMLファイルを作成
2. `index.html` に記事カードを追加
3. 該当カテゴリ・タグページを更新

## ライセンス

MIT License
