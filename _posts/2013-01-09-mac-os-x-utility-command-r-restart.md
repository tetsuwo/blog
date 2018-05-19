---
layout: post
title: "Mac OS X ユーティリティ：Command キー（⌘）+ R キー + 再起動で起動しない"
date: 2013-01-09 23:34:00 +0900
categories: Mac
tags:
- Mac
migration_from: 
- http://tetsuwo.tumblr.com/post/40094068606
---

MacBook Air を初期化しようと思って、[MacBook Air (13-inch, Mid 2011) マニュアル](http://manuals.info.apple.com/ja_JP/macbook_air_13inch_mid2011_ug_jp.pdf) を見る。

目次の「*第3章:問題とその解決方法*」をクリックして「*コンピュータを工場出荷時の設定に復元する*」を見てみると、以下のように書いてある。

> コンピュータを工場出荷時の設定に復元すると、コンピュータ上のすべてのもの(ユーザアカウント、ネットワーク設定、およびすべてのファイルやフォルダ)が削除されます。復元する前に、残しておきたいファイルは別のディスクにコピーしてバックアップしてください。Mac OS X の再インストール後にネットワークに簡単に再接続できるように、「ネットワーク」環境設定のネットワーク設定を書き留めておいてください。
> 
> 1. Ethernet または Wi-Fi ネットワークを使って MacBook Air がインターネットに接続していることを確 認します。(Wi-Fi ネットワークに接続する場合は、43 ページの指示に従ってください。)
> 2. 「Mac OS X ユーティリティ」パネルで、「ディスクユーティリティ」を選択して、「続ける」をクリックします。
> 3. 左側のリストでディスクを選択してから、「消去」タブをクリックします。
> 4. 「フォーマット」ポップアップメニューから「Mac OS 拡張(ジャーナリング)」を選択し、ディスクの名前を入力してから、「消去」をクリックします。
> 5. ディスクが消去されたら、「ディスクユーティリティ」&gt;「ディスクユーティリティを終了」と選択します。
> 6. 「Mac OS X ユーティリティ」パネルで、「Mac OS X を再インストール」を選択して、「続ける」をクリックします。
> 7. Mac OS X およびアプリケーションを再インストールする場合は、「Mac OS X インストーラ」の指示に従ってください。
> 
> Mac OS X および Apple のアプリケーションを復元した後で、その他のデータおよびアプリケーションを Time Machine バックアップから選択して復元できます。

引用：[MacBook Air (13-inch, Mid 2011) マニュアル](http://manuals.info.apple.com/ja_JP/macbook_air_13inch_mid2011_ug_jp.pdf)

しかしながら、この通りやっても *Mac OS X ユーティリティ* が起動しなかった。  
じゃあどうやったら起動するのか...。

まずは確認事項を。


### 確認事項

- 電源アダプターで電源に接続されているか確認する
- Ethernet、Wi-Fi でインターネットに接続されているか確認する

<!-- more -->


### ⌘ + R + 再起動

「*確認事項*」を踏まえて、アップルメニュー &gt;「再起動」と選択（*ここで ⌘ + R を押す必要はない*）する。  
そして、再起動ポップアップが表示されるので、ここで *⌘ + R* を押しっぱなしで「*再起動*」ボタンをクリックする。（画面が暗くなるまで押しっぱなしにしとく）

僕の場合はこの方法で *Mac OS X ユーティリティ* が起動した。

このあとはマニュアル通り、初期化することができた。

ご参考までに。


### 参考

- [MacBook Air (13-inch, Mid 2011) マニュアル](http://manuals.info.apple.com/ja_JP/macbook_air_13inch_mid2011_ug_jp.pdf)
- [OS X Lion: Mac OS X を消去して再インストールする](http://support.apple.com/kb/PH4439?viewlocale=ja_JP)


### Mac おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4839965145/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4839965145&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="Mac おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4866360879/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4866360879&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="Mac おすすめ書籍#2"></a>
<a href="https://www.amazon.co.jp/gp/product/4866362324/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4866362324&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="Mac おすすめ書籍#2"></a>
