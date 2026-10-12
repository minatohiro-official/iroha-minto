# イロハミント / IROHA MINTO

「あなたらしさを、Webのかたちに。」個人・クリエイター・小規模事業者向けHP制作サービスの公式サイト。

## 公開先と現在の状況

- 指定Owner: **minatohiro-official**
- 指定リポジトリ: **minatohiro-official/iroha-minto**
- 公開URL: https://minatohiro-official.github.io/iroha-minto/
- 2026-10-12: Publicリポジトリに実装をコミットし、GitHub PagesのGitHub Actionsデプロイ成功を確認。公開URLのPC表示と主要機能を検証済み。
- 書き込み・公開先は指定リポジトリに限定しています。既存実績サイトへの変更は行っていません。

## 構成

ビルド不要のHTML/CSS/JavaScript。外部JavaScript、CDNフォント、アクセス解析、バックエンド、決済処理、npm依存なし。

| ファイル | 内容 |
| --- | --- |
| index.html | トップ・特徴・プラン・制作の流れ・FAQ |
| services.html | プラン比較・月額サポート・オプション全15項目 |
| works.html | しぃの部屋・星屑もぐの画面、特徴、公開サイトへのリンク |
| contact.html | 受付準備中の案内・概算見積もり・既存ヒアリングシートへの外部リンク |
| privacy.html | 現時点の情報取り扱いの説明 |
| 404.html | サブパス対応のエラーページ |
| assets/style.css | 共通のデザイン・レスポンシブ対応 |
| assets/app.js | ナビ・スクロール演出・概算計算・コピー |
| assets/logo.svg | オリジナルのカタカナ主体ロゴ |
| assets/favicon.svg / ogp.png | アイコン・SNS共有画像 |
| sitemap.xml / robots.txt | 検索エンジン用設定 |

## ローカル表示

```sh
python3 -m http.server 8080
```

http://localhost:8080/ へアクセス。全ページの通常リンクとアセットは相対パス。SEOのURLは本番サブパスで固定しています。GitHub Pagesのカスタム404は `/iroha-minto/` を基点にします。

## 更新方法

- 文章・料金: 各HTMLを編集します。
- 料金を変更する際はHTMLのプラン・オプションと `assets/app.js` の `prices`、フォームの数値を合わせて変更します。
- OGP/ロゴ: assets内の画像を更新します。
- ページを追加する際は共通ナビ、canonical、OGP URL、sitemapを更新します。
- 2026-10-12にユーザーから実績掲載の許可を確認。しぃの部屋・星屑もぐの名称、実際の画面、リンクをトップとworks.htmlに掲載しています。

## GitHub公開方法

1. minatohiro-official組織の指定リポジトリに管理権限がある認証で操作し、Ownerが **minatohiro-official** であることを確認します。
2. `minatohiro-official/iroha-minto` が存在しなければPublicリポジトリを作成します。既存ならOwnerと内容を確認し、既存変更を保護して統合します。
3. このフォルダのファイルをmainブランチへコミットします。`.github/workflows/pages.yml` も含めます。
4. Settings → Pages → Build and deployment → Sourceを **GitHub Actions** に設定します。
5. Actionsで `Publish IROHA MINTO to GitHub Pages` を実行します。
6. 成功後、公開URLで全ページ・アセット・メニュー・コピー・見積もりを確認します。

ワークフローは指定リポジトリ以外では実行されません。公開アーティファクトにはHTML・assets・SEO用ファイルだけを含め、READMEや確認書類は含めません。

## 概算見積もり

制作プラン + チェックしたオプション各1件を合計します。月額サポートは別枠です。「〜」は最低参考額。ドメイン実費や複数件は未加算です。コピーのみ可能で、入力送信・保存・契約・決済は行いません。クリップボードAPIが使えない場合は手動コピー欄を表示します。

## デザインと権利

深いミント、余白、カタカナロゴ、植物の抽象図形、編集誌風の構成。トップの架空Web画面は本サイト用のオリジナルデザインイメージです。実績欄は掲載許可確認済みの公開サイトの実画面を使っています。スクリーンショットは2026年10月12日撮影。既存サイトの変更は行っていません。

ロゴの文字形とOGP画像はGoogle FontsのNoto Sans JP（SIL Open Font License 1.1）をもとに制作し、ロゴはSVGパスに変換。Webフォントの通信は不要です。フォントファイル自体は配布していません。Noto Sans JP: https://fonts.google.com/noto/specimen/Noto+Sans+JP

## 検証状況・残る確認

- JS構文、ローカルファイル参照、ページ内アンカー、SEO設定、料金計算の自動検査を実施。
- 620px・820px・1100pxのレスポンシブ設定、reduced-motion・キーボード・フォーカス配慮を実装。
- 公開サイトをPC幅のブラウザで確認。ナビゲーション、FAQ開閉、スタンダードプラン引き継ぎ、オプション加算（17,780円）、月額分離（980円）、コピー成功表示、画像読み込み、横はみ出しなしを確認。iPhone/iPad実機での表示確認は未実施です。
- ヒアリングシートのHTTP 200とページ内容は確認。実際の送信テストは未実施。
- 受付条件・実績許可・連絡先・法的表示の確認は別添の公開前チェックリストを参照。
