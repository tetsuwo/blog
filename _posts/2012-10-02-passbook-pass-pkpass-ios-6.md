---
layout: post
title: "Passbook の仕様と Pass (pkpass) の作り方・開発方法 - iOS 6"
date: 2012-10-03 01:54:00 +0900
categories: Passbook
tags:
- Passbook
- iOS
redirect_from: 
- /post/32741613415/passbook-pass-pkpass-ios-6
---


## Passbook とは

Passbook は iOS 6 から標準搭載アプリとなったチケット発行管理アプリです。

より分かりやすく説明するとライブのチケット、お店のクーポン、スーパーのポイントカード（他にもこんなものが管理できます）などを一つのアプリで管理できるというものです。  
※Passbook ではこのアプリで管理できるチケットやクーポン、ポイントカードのことを `Pass` と呼びます。

この Pass には画像データとテキストデータが含まれており、テキストデータには位置情報が付記できます。
この位置情報を利用して、ライブ会場やファストフード店など近くを通ったときに、通知してくれるのです。  

Pass はアプリ内にあるので、財布から取り出し忘れることも、探す必要もなくなります。  
（新たな問題として Pass から通知を受けたにも関わらずレジで見せ忘れる、何てことが発生しそうですねw）

更に、Passbook の仕様を見てみるとプッシュ通知に対応しており、各発行者がそれに対応していれば、最新の Pass データに自動で更新してくれます。

それでは Pass の中に触れていきます。


### 発行できる Pass の種類

種類             | 説明
-----------------|------
搭乗券           | 飛行機、電車、船などに搭乗するためのチケットを表します。
クーポン         | 割引や販促アイテムを提供する加盟店のために使われます。
イベントチケット | 特定の時間や会場でのイベントにアクセスするために提供されます。
店舗・会員カード | 店舗やクラブでのアカウントを表すために使用できます。
その他           | 上記カテゴリーに当てはまらないような用途。

※この表は [Getting started with Passbook](https://developer.apple.com/passbook/getting_started_with_passbook.pdf) を適当に和訳したものです。

次にこれらのパスの配布方法です。

<!-- more -->


## Passbook の作り方

### Pass の配布方法

種類             | 説明
-----------------|-------------------------------------------------------------
アプリ内で配布 | アプリは標準の UIKit ビューコントローラーを使ってユーザーにどんな種類の Pass でもプレゼントできます。Passbook にパスを追加するオプションをユーザーに与えます。
E メール経由で配布 | パスはどんな E メールにも添付できるデジタル署名文書です。iOS 6 の iPhone あるいは iPod touch で閲覧したとき、ユーザーはパスを閲覧、Passbook への追加をすることができます。
Web 上で配布 | iOS 6 で Safari を使っているユーザーはパスのリンクをタップでき、Passbook にそれらを追加することができます。Web 上での配布は、ユーザーがカスタマイズされたパスを受け取るのにアカウントへのサインインが必要な場合に便利な方法です。

※この表は [Getting started with Passbook](https://developer.apple.com/passbook/getting_started_with_passbook.pdf) を適当に和訳したものです。

E メールに添付する、Safari でダウンロードさせる際には MIME タイプを以下に設定しておく必要があります。

    application/vnd.apple.pkpass

次にこれらのパスの中身についてです。


### 発行する Pass データの中身

Pass は `.pkpass` という拡張子で配布されます。

.pkpass ファイルはただの zip ファイルで、.pkpass の部分を .zip に書き換える、もしくはコマンドラインから unzip で解凍すれば中身をみることができます。

解凍した中身は以下のようになります。

    ***.pkpass
    ├ background.png
    ├ background@2x.png
    ├ icon.png
    ├ icon@2x.png
    ├ logo.png
    ├ logo@2x.png
    ├ manifest.json
    ├ pass.json
    ├ signature
    ├ strip.png
    ├ strip@2x.png
    ├ thumbnail.png
    └ thumbnail@2x.png

何やら Chrome 拡張機能の crx ファイルのようです。

pass.json の中身が気になりますので、とりあえず [Changing the Pass Type ID and Team ID](https://developer.apple.com/library/ios/#documentation/UserExperience/Conceptual/PassKit_PG/Chapters/YourFirst.html#//apple_ref/doc/uid/TP40012195-CH2-SW26) に載っているサンプルを掲示します。

    -- pass.json --
    {
        "description" : "Coupon for a free lollipop at Example Candy Store",
        "logoText" : "Example Candy Store",
        "coupon" : {
            "primaryFields" : [
                {
                    "key": "offer",
                    "value": "Free lollipop"
                    "label": "On July 29"
                }
            ]
        },
        "passTypeIdentifier" : "<<パスタイプ ID>>",
        "teamIdentifier" : "<<チーム ID>>",
    }

参考資料「Passbookプログラミングガイド」の「パスタイプIDを要求する」のページをみると分かる通り、パスには Pass の種類を判別するための `passTypeIdentifier（パスタイプ ID）` とそれを管理する `teamIdentifier（チーム ID）` というのが必要なようです。

次はその ID を生成するのに必要な証明書の発行の仕方です。


### Pass の作成に必要な項目と証明書の発行手順

`passTypeIdentifier` と `teamIdentifier` を得るために証明書を発行します。

#### パスタイプ ID と証明書生成
1. [iOS Provisioning portal](https://developer.apple.com/ios/manage/passtypeids/ios/manage) にアクセスし、New Pass Type ID から説明文とパスタイプ ID を入力してサブミットする
2. Pass Type IDs に移り、サブミットしたパスタイプ ID の証明書をダウンロードする
3. 証明書を Keychain Access で開き、キーチェーンに追加する

#### チーム ID の取得
1. Keychain Access を起動し、証明書を選択する
2. File >> Get Info >> Details >> Organizational Unit >> チーム ID

この `パスタイプ ID` と `チーム ID` を先程の pass.json に当てはめます。  
とりあえず pass.json の上位ディレクトリーは `demo.pass` にしておきましょうかね。

    ./demo.pass
    ├ ~~~~~~~~
    ├ ~~~~~~~~
    ├ manifest.json
    └ pass.json


### signpass を利用してパスに署名を施し圧縮する

次に修正した pass ディレクトリー一式を署名・圧縮します。
signpass というツールを使うので [Passbook SupportMaterials](https://developer.apple.com/downloads/index.action?name=passbook) から入手してください。

この signpass を Terminal から実行します。  
signpass のディレクトリーまで移動してから以下を実行します。

    ./signpass -p ~/demo.pass

これで demo.pkpass というファイルが出来ていれば成功です。


### iOS Simulator で表示を確認する

このように表示されれば OK なようです。

![demo.pkpass on iOS Simulator](http://media.tumblr.com/tumblr_mb9yke1BZJ1qc24pp.png)


### ここまでの作業をサーバー上でやるには

この pkpass ファイルをサーバー上で動的に作るための PHP ライブラリーが既に公開されています。

この [PHP-PassKit](https://github.com/tschoffelen/PHP-PKPass) を使うことで簡単に pkpass が作れる予感がしてます。  
※詳しくは README.md をご覧ください。


### デバイスから最新の Pass データを取得する

エンドポイントはこのようにしなければならないようです。

                  Protocol Version Number                        Serial Number
                             |                                         |
                            ---                                   ----------
    ttps://example.com/hoge/v1/passes/pass.com.example.MyPassType/ABCDE12345
    -----------------------           ---------------------------
               |                                   |
        Web Service URL                   Pass Type Identifier

#### パラメーター

Item                    | Description
------------------------|--------------------------------------------------------
Web Service URL         | パス内で指定された Web サービス URL（webServiceURL）
Protocol Version Number | プロトコルバージョン番号、現在は v1（version）
Pass Type Identifier    | パス内で指定されたパスタイプ ID（passTypeIdentifier）
Serial Number           | パス内で指定されたユニークなパス ID（serialNumber）

----

### 最後に

以上、間違いなどあればご指摘いただければ幸いです。

----

### 参考資料
- [Passbook for Developers - Apple Developer](https://developer.apple.com/passbook/)
- [Passbookプログラミングガイド](https://developer.apple.com/jp/devcenter/ios/library/documentation/PassKit_PG.pdf)
- [Getting started with Passbook](https://developer.apple.com/passbook/getting_started_with_passbook.pdf)
- [元記事](http://tetsuwo.tumblr.com/post/32741613415/passbook-pass-pkpass-ios-6)


#### 更新履歴
1. 「最後に」追記
2. MIME タイプ追記
3. 「デバイスから最新の Pass データを取得する」追記
