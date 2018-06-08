---
layout: post
title: "Chrome 拡張機能のインストールで“マニフェスト ファイルが無効です”というエラーが発生する"
date: 2013-01-04 09:00:00 +0900
categories: Chrome Extension
tags:
- Chrome Extension
- Google Chrome
migration_from: 
- http://tetsuwo.tumblr.com/post/39633262643/chrome-%E6%8B%A1%E5%BC%B5%E6%A9%9F%E8%83%BD%E3%81%AE%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E3%81%A7-%E3%83%9E%E3%83%8B%E3%83%95%E3%82%A7%E3%82%B9%E3%83%88-%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%8C%E7%84%A1%E5%8A%B9%E3%81%A7%E3%81%99-%E3%81%A8%E3%81%84%E3%81%86%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%8C%E7%99%BA%E7%94%9F%E3%81%99%E3%82%8B
---

Chrome 拡張機能を更新しようと思い、ダッシュボードから zip をアップし、反映されたのを確認して、再インストールしたら「**マニフェスト ファイルが無効です**」というエラーが表示されました。

色々と試した結果、原因は `browser_action.default_icon` のフォーマットでした。

以下がエラーが出たときの `browser_action.default_icon` です。

```
{
  "name": "__MSG_ext_name__",
  "description": "__MSG_ext_description__",
  "default_locale": "en",
  "background": {
    "page": "background.html"
  },
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": "images/19.png"
  }
  ...
}
```

こちらはエラーが出なくなったときの `browser_action.default_icon` です。

```
{
  "name": "__MSG_ext_name__",
  "description": "__MSG_ext_description__",
  "default_locale": "en",
  "background": {
    "page": "background.html"
  },
  "browser_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "19": "images/19.png",
      "38": "images/38.png"
    }
  }
  ...
}
```

サイズを明記して記述することでエラーが解消しました。

以前（2012 年 12 月頃）に更新した際には、このフォーマットでも大丈夫だったので Chrome 側の不具合かもしれません。

この `browser_action.default_icon` については "[chrome.browserAction - Google Chrome](http://developer.chrome.com/extensions/browserAction.html#manifest)" に載っています。


**Manifest Version 2** への移行がお済みでない方は "[Chrome 拡張機能・アプリを Manifest Version 2 に対応させる](/post/20120912/chrome-manifest-version-2.html)" も参考に。


### 参考記事

- [chrome.browserAction - Google Chrome](http://developer.chrome.com/extensions/browserAction.html#manifest)
