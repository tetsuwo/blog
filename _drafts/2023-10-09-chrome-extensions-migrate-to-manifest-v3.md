---
layout: post
title: "Chrome 拡張機能を Manifest V2 から V3 に移行する"
date: 2023-10-09 13:49:00 +0900
categories: Chrome Extension
tags:
- Google Chrome
- Chrome Extension
---

本業が多忙を極め、しばらく放置していた幾つかの Chrome 拡張機能たち。  
いつの間にか Manifest V2 から V3 の移行期限が終了しており、どこかでやろうやろうと思っていたけども中々できず、ようやっとやる気になったので調べがてら対応することにしました。  
だいぶ遅ればせながら・・・ではありますが、一連の移行作業も含め記しておきます。


## Chrome 拡張機能とは

Google 社が開発したクロスプラットフォームのウェブブラウザー「Google Chrome（グーグルクローム）」において、Chrome が標準でサポートしている機能では補えないような様々な機能を拡張できる、それが Chrome 拡張機能です。


### Manifest (manifest.json) とは

Chrome 拡張機能の基本的な情報や必要な権限、方針を示すための JSON 形式のファイルを Manifest（manifest.json） と呼んでいます。


## Manifest V2 から V3 の移行について

### 移行するのはなぜか

日々の技術革新やセキュリティ対策など様々な観点から当初想定していた定義ファイルではカバーできない方針設定が必要になることがあります。
その一環と、あとは保守についてくることができる拡張機能＝開発者が存在する or 継続する意思があるものがユーザーにとって良い拡張機能だろう、というところから移行を推進するのではないかなと思っています。
完全に持論です。


### 移行期限

[More details on the transition to Manifest V3](https://developer.chrome.com/blog/more-mv2-transition/) にて発表されていますが、

> - In January 2023, use of Manifest V3 will become a prerequisite for the Featured badge as we raise the security bar for extensions we highlight in the store.
> - In June 2023, the Chrome Web Store will no longer allow Manifest V2 items to be published with visibility set to Public. All existing Manifest V2 items with visibility set to Public at that time will have their visibility changed to Unlisted.
> - In January 2024, following the expiration of the Manifest V2 enterprise policy, the Chrome Web Store will remove all remaining Manifest V2 items from the store.

2024 年 1 月に Manifest V2 の Chrome 拡張機能は削除されるとのことです。


### 具体的な移行について

移行に際して該当するものにフォーカスを当てて対応するのが望ましいので [Migrate to Manifest V3](https://developer.chrome.com/docs/extensions/migrating/) に習って調べてみました。

- Manifest の更新
- Service Worker に移行
- API 呼び出しの更新
- `chrome.webRequest` リスナーの置き換え



