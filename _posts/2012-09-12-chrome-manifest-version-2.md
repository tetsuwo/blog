---
layout: post
title: "Chrome 拡張機能・アプリの Manifest Version を 1 から 2 にアップグレードする"
date: 2012-09-12 20:21:00 +0900
categories: Chrome
tags:
- Google Chrome
- Chrome Extension
- Chrome App
redirect_from: 
- /post/31273343648/chrome-manifest-version-2
---


ちょっと前（厳密には2012年7月4日？）に Chrome Web Store Team から以下のようなメールが届きました。

> Manifest_Version 1: Manifest Version 1 has been deprecated since Chrome 18, and when Chrome 21 hits stable in mid-August the Chrome Web Store will no longer accept new items with manifest_version 1. Converting to manifest_version 2 should be very simple for the majority of developers, and we encourage all developers to update their extensions and packaged apps as soon as possible. Review our deprecation schedule to determine when to update your items in the store.


ヘボヘボな和訳です。

> Manifest_Version 1: manifest\_version 1 は Chrome 18 以降で非推奨となっており、8月中旬の Chrome 21 安定版リリース際に Chrome Web Store は manifest\_version  1 の新しいアイテムは許可しません。manifest\_version 2 に変換するのは多数の開発者のためにとても簡単にしてあり、私たちが奨励するすべての開発者は拡張機能、パッケージアプリを可能な限り早く更新すべきです。Chrome Web Store でアイテムを更新するタイミングを決定するために廃止スケジュールを検討します。


何が言いたいかというと、要するに「以前までの `manifest.json` のフォーマットでは駄目ですよ。Version2 のフォーマットにアップグレードしてくださいね。」ということです。下に関連するリンクがありますので確認を。

- [Manifest Version](http://developer.chrome.com/extensions/manifestVersion.html)（Manifest Version 1 のサポートスケジュールが載っています）
- [Formats: Manifest Files](http://developer.chrome.com/extensions/manifest.html)（マニフェストファイルのフォーマットについての詳細が記載されています）

具体的どのような変更があったか触れていきます。


### Manifest Version の 1 と 2 で変わった点

- Content Security Policy はデフォルトで `script-src 'self'; object-src 'self'` に設定されています。この件はドキュメントに記述されており、開発者に様々な影響を与えます。
[[MORE]]
- パッケージのリソースに外部 Web サイト（画像の src あるいは script タグなど）は、デフォルトでは使用できなくなりました。もしもパッケージに含まれている Web サイトのリソースを読み込みたい場合は、明示的にマニフェストの属性である `web_accessible_resources` にホワイトリストとして登録する必要があります。これはインジェクトコンテントスクリプト経由で Web サイトのインターフェースを構築する場合は特に重要です。
- Background Pages の変更点
  - `background_page` プロパティが `"background": { "page": ~ }` になりました。
  - `background_scripts` プロパティが `"background": { "scripts": ~ }` になりました。
- Browser Actions 変更点
  - `icons` プロパティが削除されました。その代わりに `default_icon` プロパティ、もしくは `chrome.browserAction.setIcon` が使えます。
  - `name` プロパティが削除されました。その代わりに `default_title` プロパティ、もしくは `chrome.browserAction.setTitle` が使えます。
  - `popup` プロパティが削除されました。その代わりに `default_popup` プロパティ、もしくは `chrome.browserAction.setPopup` が使えます。
- Page Actions 変更点
  - `icons` プロパティが削除されました。その代わりに `default_icon` プロパティ、もしくは `chrome.pageAction.setIcon` が使えます。
  - `name` プロパティが削除されました。その代わりに `default_title` プロパティ、もしくは `chrome.pageAction.setTitle` が使えます。
  - `popup` プロパティが削除されました。その代わりに `default_popup` プロパティ、もしくは `chrome.pageAction.setPopup` が使えます。

これらが主だった変更点のようです。

※[こちら](http://developer.chrome.com/extensions/manifestVersion.html) に本家の変更点があります。


### 実際の manifest.json で例を挙げてみる

実際に、以前開発していた拡張機能を ManifestVersion 2 に移行してみました。

以前のフォーマットの例：

    {
      "name": "__MSG_ext_name__",
      "description": "__MSG_ext_description__",
      "default_locale": "en",
      "background_page": "background.html",
      "options_page": "options.html",
      "browser_action": {
        "popup": "popup.html",
        "default_icon": "images/19.png"
      },
      "icons": {
        "128": "images/128.png"
      },
      "permissions": [
        "http://*/*",
        "tabs"
      ],
      "version": "0.2.0"
    }


これを `manifest_version: 2` にすると...

    {
      "name": "__MSG_ext_name__",
      "description": "__MSG_ext_description__",
      "manifest_version": 2,
      "default_locale": "en",
      "background": {
        "page": "background.html"
      },
      "options_page": "options.html",
      "browser_action": {
        "default_popup": "popup.html",
        "default_icon": {
          "19": "images/19.png",
          "38": "images/38.png"
        }
      },
      "icons": {
        "128": "images/128.png"
      },
      "permissions": [
        "http://*/",
        "tabs"
      ],
      "version": "0.2.0"
    }


とまあ、Injected Content Script や XMLHttpRequest、外部リソースを読み込むようなことをしていなければ然程面倒な修正ではないです。


### XMLHttpRequest の permissions 設定

`maniest.json` のプロパティである `permissions` の記述の仕方が少し変わっていました。
以前は `https://*/*` のような記述ができたのですが、`https://*/` まででよくなりました。逆に前者だと XHR は動きません。ここは特に注意が必要です。

※公式ドキュメント [Cross-Origin XMLHttpRequest](http://developer.chrome.com/extensions/xhr.html)


### Google Analytics などの外部リソースを読み込むための Content Security Policy の設定

拡張機能・アプリの解析に外部リソース（Google Analytics などのような）を読み込む必要がある場合、src 読み込み時にコンソールで以下のようなエラーが発生します。  
つまり、Manifest Version 1 のままでは動きません。

    Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'`

このエラーを解消するには `manifest.json` に Content Security Policy の記述する必要があります。以下がその例です。

    "content_security_policy": "script-src 'self' https://ssl.google-analytics.com; object-src 'self'"

この記述で Google Analytics は読み込めるようになります。  
しかしながら、他の外部リソースも読み込みたい場合があります。 

この Content Security Policy には以下の例のように、半角スペース区切りでドメインを記述することで、複数のドメインをホワイトリストに登録することができます。 
※例では Google Analytics と Twitter Tweet Button、Google+ Button を読み込めるようにしてみました。

    "content_security_policy": "script-src 'self' https://ssl.google-analytics.com https://platform.twitter.com https://apis.google.com; object-src 'self'"

Facebook の「いいね！」は、なぜか Facebook JavaScript SDK が読み込めないので、以下のように `frame-src` のホワイトリストに登録し、HTML 側では iframe で対応する方法をとりました。  
※もしかすると `permissions` で SDK のURL を許可すれば Facebook JS SDK が読み込めるかもしれません。また違う機会に試します。

    "content_security_policy": "script-src 'self' https://ssl.google-analytics.com https://platform.twitter.com https://apis.google.com; frame-src https://www.facebook.com; object-src 'self'"

Content Security Policy まわりは[この記事](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)が非常に参考になりました。

なるべく早めに移行しておくことをお勧めします。


### Manifest Version 1 のサポートスケジュール

#### Chrome 21（Beta: 2012年7月上旬、Stable: 2012年8月中旬）
- Web Store は新規の Manifest Version 1 を利用したアイテムの作成をブロックします
- Web Store は既存の Manifest Version 1 を利用したアイテムの更新を許可します

#### Chrome 23（Beta: 2012年9月下旬、Stable: 2012年11月上旬）
- Web Store は Manifest Version 1 のアイテムの更新をブロックします
- Chrome は Manifest Version 1 のパッケージングを停止します（開発用も含む）

#### 2013年第1四半期
- Web Store は Manifest Version 1 のアイテムをウォール、検索結果、そしてカテゴリーページから削除します
- Manifest Version 1 のアイテムを公開している全ての開発者に Version 2 にアップグレードするよう通知メールを送ります

#### 2013年第2四半期
- Web Store は Manifest Version 1 のアイテムを全て非公開にします
- Web Store で未だ Manifest Version 1 のアイテムを公開している開発者に最後の通知メールを送ります
- Chrome はインストールされた Manifest Version 1 のアイテムの読み込み、実行を引き続き許可します

#### 2013年第3四半期
- Chrome は Manifest Version 1 のアイテムの読み込み、実行を停止します


#### 参考記事

- [Formats: Manifest Files - Google Chrome](http://developer.chrome.com/extensions/manifest.html)
- [Content Security Policy (CSP) - Google Chrome](http://developer.chrome.com/extensions/contentSecurityPolicy.html)
- [Tutorial: Google Analytics - Google Chrome](http://developer.chrome.com/extensions/tut_analytics.html)
- [An Introduction to Content Security Policy - HTML5 Rocks](http://www.html5rocks.com/en/tutorials/security/content-security-policy/)
- [Chrome 拡張機能のインストールで "マニフェスト ファイルが無効です" というエラーが発生する « をぶろぐ](http://tetsuwo.tumblr.com/post/39633262643/chrome)


#### 更新履歴

1. 「Manifest Version 1 サポートスケジュール」追記
2. 「実際の manifest.json で例を挙げてみる」の `browser_action.default_icon` の記述を変更
3. 「Manifest Version 1 サポートスケジュール」加筆


### 参考になるかも

<a href="https://www.amazon.co.jp/gp/product/4844334220/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4844334220&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="おすすめ書籍#1"></a>

