---
layout: post
title: "Chrome 拡張機能: Backend の修正について"
slug: chrome-backend-access-url
date: 2017-11-20 00:00:00 +0900
tags:
- Google Chrome
---

なんのことはない至って簡単な拡張機能を作ったことがあって「作った」という程でもないアレなので共有する内容でもないかもしれませんが、自分の中で気になったのでまとめてみました。

Chrome の管理機能に簡単にアクセスするための拡張機能「Backend」をひさしぶりに使ったら、前まで正常に動いていた機能が動かなくなっていたので調べてみました。

普通、Chrome の管理機能や隠し機能にアクセスするには、ブックマークバーにある歯車アイコンからアクセスすることができます。

でもこれ、実はロケーションバーから `chrome://{$ANYTHING}` のような URL にアクセスすることで同じことができます。  
まさにそれを利用した拡張機能が「Backend」でした。

しかし、いつの間にかその URL が変わっており、動かなくなっていたのです。


## なにがどう動かなくなっていたか

`about:` やら `chrome:` 以下のいくつかが動かなくなっていました。

どうやら `about:` 系は 2009 年くらいから `chrome:` の URL スキームにリダイレクトされるようになっていたようです。
（なので辛うじて使えたと）

[参考](https://support.google.com/chrome/forum/AAAAP1KN0B0GsCAG8T7vfo/?hl=en)

<!-- more -->


### 本拡張機能（Backend）で動かなくなっていた URL と現在の URL の対応表

|名称|以前|現在|
|-|-|-|
|閲覧履歴データを消去する|chrome://chrome/settings/clearBrowserData|chrome://settings/clearBrowserData|
|すべての Cookie とサイトデータ|chrome://chrome/settings/content/cookies|chrome://settings/siteData|
|コンテンツの設定|chrome://chrome/settings/content|chrome://settings/content|
|言語|chrome://chrome/settings/languages|chrome://settings/languages|
|設定|chrome://chrome/settings/|chrome://settings/|
|拡張機能管理|chrome://extensions|chrome://extensions|
|ダウンロード|chrome://downloads|chrome://downloads|
|履歴|chrome://history|chrome://history|
|ブックマーク マネージャ|chrome://bookmarks|chrome://bookmarks|
|プラグイン一覧|about:plugins|--|
|キャッシュ一覧|about:cache|chrome://cache|
|メモリの使用状況を表示|about:memory|--|
|各種統計情報|about:stats|--|
|DNS の記録|about:dns|chrome://dns|
|ネットワーク状況|about:network|--|
|クラッシュ状態|about:crash|--|
|ハングアップ状態|about:hang|--|
|（不明）|about:internets|--|
|ヒストグラム|about:histograms|chrome://histograms|
|バージョン表示|about:version|chrome://version|
|試験運用機能|about:flags|chrome://flags|
|ヘルプ|chrome://chrome/help/|chrome://settings/help|

上記に関して対応する URL に遷移させるように変更したので、一旦大丈夫そう。


### about:plugins 

`about:plugins`は Chrome 57 で廃止されていたようです。

[参考](https://support.google.com/chrome/forum/AAAAP1KN0B01VNwlragY-s/?hl=en)

その代わりに、 `chrome://component` が用意されていますが、まったく同じ用途かというとそうではないようです。


## 隠し機能の全 URL

List of Chrome URLs という chrome: の URL がすべて載ったページがあるので、別のページにそれをまとめてみました。

[Chrome: 管理機能（隠し機能）へのアクセス](/post/20171121/chrome-urls.html)
