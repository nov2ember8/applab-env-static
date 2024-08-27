# 開発位環境の立ち上げ

`npm install` でパッケージをインストールします。

`npm run dev` で開発環境をスタートします。ホットリロードがついたプレビュー用URLがコンソールに出力されます。

`npm run build` でリリース用に本番ビルドし、distに出力します。

`npm run preview` でビルドした結果をプレビューします。プレビュー用URLがコンソールに出力されます。

# 開発環境の運用方法

## フォルダ構造

### dist

ビルド結果が出力されます。

### plugins

画像圧縮プラグインが入っています。

### public/src

画像圧縮する前の元データを配置します。

### src/includes

ヘッダーやフッターなど includes で挿入するコンポーネントはここに配置します。

### src/pages

各ページはここに配置します。ディレクトリを作成するとその構造の通りに出力されます。

### src/scripts

javascriptはここに配置します。
+.jsにフォルダ内のファイルが自動的にimportされるので、それをmain.jsにimportして使ってもOKです。

### src/styles

css（scss）はここに配置します。
+.cssにフォルダ内のファイルが自動的にimportされるので、それをmain.scssにimportして使ってもOKです。

## 画像の取り扱い

開発環境が動いている状態で `public/src` に `hoge@2x.jpg` のファイル名で画像を配置すると `public/opt` に `hoge@1x.jpg hoge@2x.jpg, hoge@1x.webp, hoge@2x.webp` の 4つのファイルが出力されます。

この画像をnunjucksで表示する場合、`<img src="/opt/hoge@2x.webp" alt="">` のように記述します。

# 技術スタックについて

## 静的サイトジェネレータ
ViteベースのVituumを使用しています。  
https://vituum.dev

## Nunjacks
HTMLのメタ言語として採用しています。  
公式ドキュメント： https://mozilla.github.io/nunjucks/templating.html

## splide
スライダーの実装に使用してください。 
公式ドキュメントは https://ja.splidejs.com/ にあります。