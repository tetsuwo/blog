---
layout: post
title: "Travis CI 入門：GitHub + Travis CI で継続的インテグレーション"
date: 2013-03-06 23:34:00 +0900
categories: CI
tags:
- Travis CI
- CI
- Github
redirect_from: 
- /post/44706350593/github-travis-continuous-integration
---

<!--
## 目次

1. [Travis CI とは](#sec-1)
2. [Travis CI のサポート言語](#sec-2)
3. [Travis CI のビルドライフサイクル](#sec-3)
4. [設定ファイル（.travis.yml）](#sec-4)
5. [設定ファイル（.travis.yml）の設定例と解説](#sec-5)
6. [設定ファイル（.travis.yml）の検証](#sec-6)
7. [Travis CI との接続方法](#sec-7)
8. [Tips](#sec-8)
9. [参考記事](#sec-9)
-->

## <a id="sec-1"></a> 1. Travis CI とは

[Travis CI](https://travis-ci.org/) はオープンソースコミュニティのためにホストされた CI（継続的インテグレーション）サービスです。

*継続的インテグレーションってなんだ？*

> 継続的インテグレーション、CI（英: continuous integration）とは、主にプログラマーのアプリケーション作成時の品質改善や納期の短縮のための習慣のことである。エクストリーム・プログラミング (XP) のプラクティスの一つで、狭義にはビルドやテスト、インスペクションなどを継続的に実行していくことを意味する。特に、近年の開発においては、継続的インテグレーションをサポートするソフトウェアを使用することがある。

引用: [継続的インテグレーション - Wikipedia](http://ja.wikipedia.org/wiki/%E7%B6%99%E7%B6%9A%E7%9A%84%E3%82%A4%E3%83%B3%E3%83%86%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)

Travis CI は GitHub と連携しており、CI したいリポジトリーを接続しておくと、Travis CI がコミットを取得して、設定ファイル通りにビルド・テストしてくれます。そしてビルド・テストに失敗するとメール（他も可）で結果が送られてきます。

以下のような流れでビルド・テストが行われます。

     +---> [Developer] --- (1) ---> [GitHub] <---+
     |                                           |
     +----- (3) ----- [Travis CI] ----- (2) -----+

    (1) ソースコミット
    (2) 未テストのコミット取得
    (3) テスト結果を送信

<!-- more -->

そもそもの CI を深く知りたい方は以下の書籍が参考になると思います。

- [初めての自動テスト ―Webシステムのための自動テスト基礎](http://www.amazon.co.jp/gp/product/4873118166/t5o-22/ref=nosim)
- [継続的デリバリー 信頼できるソフトウェアリリースのためのビルド・テスト・デプロイメントの自動化](http://www.amazon.co.jp/gp/product/4048707876/t5o-22/ref=nosim)
- [継続的インテグレーション入門](http://www.amazon.co.jp/gp/product/482228395X/t5o-22/ref=nosim)
- [Jenkins実践入門　～ビルド・テスト・デプロイを自動化する技術 ](http://www.amazon.co.jp/gp/product/4774148911/t5o-22/ref=nosim)

GitHub と CI との連携は書籍 [GitHub実践入門](http://amazon.co.jp/o/ASIN/477416366X/t5o-22/ref=nosim) が参考になるかもしれません。


### <a id="sec-2"></a> 2. Travis CI のサポート言語

以下のプログラミング言語をサポートしています。

- C
- C++
- Clojure
- Erlang
- Go
- Groovy
- Haskell
- Java
- JavaScript (with Node.js)
- Perl
- PHP
- Python
- Ruby
- Scala


### <a id="sec-3"></a> 3. ビルドのライフサイクル

1. 言語の切り替え
2. GitHub からプロジェクトのリポジトリーをクローン
3. `before_install` スクリプトを実行
4. クローンしたディレクトリーに移り、依存関係のインストールコマンドを実行
5. `before_script` スクリプトを実行
6. テスト用の `script` コマンドを実行
7. `after_script` スクリプトを実行
8. `after_success` または `after_failure` スクリプトを実行


### <a id="sec-4"></a> 4. 設定ファイル（.travis.yml）

設定ファイルはリポジトリーのルートディレクトリー直下に `.travis.yml` という名前で配置します。

このファイルの中には、以下のようなことを YAML 形式で記述します。

- プロジェクトで使用しているプログラミング言語
- ビルド前に実行しておきたいコマンドまたはスクリプト（例えばインストールや依存ライブラリの更新など）
- テストスイートを走らせるためのコマンド
- ビルドの失敗を通知する先（Eメール、Campfire、チャットルーム）


### <a id="sec-5"></a> 5. 設定ファイル（.travis.yml）の設定例と解説

    language: php
    php:
      - "5.4"
      - "5.3"
    before_install:
      - command1
      - command2
    before_script:
      - php composer.phar install
      - php app/console xxxx
    script:
      - phpunit -c app
      - phantomjs xxxx/run-jasmine.js xxxx/test.html

    notifications:
      emails:
        - aaaaa@un.ko
        - bbbbb@un.ko
      on_success: always # default: change
      on_failure: always


まず、`language` にはプログラミング言語を指定しています。

    language: php


次にバージョンです。ここは言語によってキーが変わります。

    php:
      - "5.4"
      - "5.3"


`before_install` には事前に何かをインストールしておく必要がある場合などのためにコマンドを記述することができます。

    before_install:
      - command1
      - command2


`script` にはテストスイートを走らせるためのコマンドを記述することができます。

    # コマンドが一つだけの場合
    script: phpunit -c app

    # 複数のコマンドがある場合
    script:
      - phpunit -c app
      - phantomjs xxxx/run-jasmine.js xxxx/test.html 


`notifications` にはテストの結果を通知する先を指定できます。

    notifications:
      emails:
        - aaaaa@un.ko
        - bbbbb@un.ko
      on_success: always # default: change
      on_failure: always


`on_success` は成功時、`on_failure` は失敗時にどうするかを設定できます。

それぞれ、`always` `change` `never` の 3 種類あり、以下のような意味になります。


種類      | 説明
----------|-----------------------------
always    | 通知を受け取る
change    | 成功から失敗、または失敗から成功に変わったときに通知を受け取る
never     | 通知を受け取らない


### <a id="sec-6"></a> 6. 設定ファイル（.travis.yml）の検証

設定ファイルが正しいかどうかは [Validate your .travis.yml file](http://lint.travis-ci.org/) でチェックすることができます。


### <a id="sec-7"></a> 7. Travis CI との接続方法

1. GitHub の公開リポジトリに `.travis.yml` をアップする
2. [Travis CI](https://travis-ci.org/) に移動し、GitHub アカウントでログインする
3. 設定から該当リポジトリのスイッチを ON にする（OFF が見えている状態）

ここまでで一先ず繋ぎこみは完了です。

次に繋ぎこみの確認です。

1. 該当リポジトリに何かをプッシュする
2. Travis CI のサイト上で確認しているとリポジトリがリストアップされる
3. Travis CI からメールが届く

このスクリーンショットは通らなかったテストが通ったときに送られてくるメールです。

`.travis.yml` に何も記述していない場合は以下のようなメールが届きます。  
![The build failed.](http://media.tumblr.com/edeafeb0cd25a7c5493e414da586e9cb/tumblr_inline_mj64k9Jtad1qz4rgp.png)

失敗し続けると...  
![The build is still failing.](http://media.tumblr.com/3a407cdd7268c4d18143908c515588a9/tumblr_inline_mj64l18TCd1qz4rgp.png)

失敗していたテストが通ると...  
![The build was fixed.](http://media.tumblr.com/3516a4bd0b753d0a3d8f61ba70594437/tumblr_inline_mfonhhdB1n1qc24pp.png)

`on_success` を `always` してテスト成功するとこんなメールがきます。  
![The build passed.](http://media.tumblr.com/41b1fdd34e911a55855eaac28faade1f/tumblr_inline_mj64krSkY01qz4rgp.png)


これらのメールもしくは Travis CI のリポジトリ詳細にアクセスするとビルドの詳細な情報を見ることができます。  
![Current Build](http://media.tumblr.com/86c671b8396b52e5a57e787a6084030b/tumblr_inline_mfonh7TQMI1qc24pp.png)


ぜひぜひやってみてください。


### <a id="sec-8"></a> 8. Tips

GitHub の `README.md` で見かける以下の画像を表示させる方法

![Build Status](http://media.tumblr.com/06483be805e56237dab834bc24df8bb2/tumblr_inline_mj8oip6LWA1qz4rgp.png)

ステータスイメージの URL 仕様

    https://travis-ci.org/[YOUR_GITHUB_USERNAME]/[YOUR_PROJECT_NAME].png

Markdown 形式で表現するとこのようになります。

    [![Build Status](https://secure.travis-ci.org/[YOUR_GITHUB_USERNAME]/[YOUR_PROJECT_NAME].png?branch=[YOUR_REPOSITORY_BRANCH]](https://travis-ci.org/[YOUR_GITHUB_USERNAME]/[YOUR_PROJECT_NAME])


Travis CI 側のリポジトリ詳細画面で自動生成されたものをコピペで使うこともできます。

`Status Images` をクリックして、  
![Status Images 1 - Travis CI Repository Page](http://media.tumblr.com/ca9e095d44112474cf561888adc7de17/tumblr_inline_mj8rd0gWB41qz4rgp.png)

欲しい形式をコピー＆ペーストして使います。  
![Status Images 2 - Travis CI Repository Page](http://media.tumblr.com/10f1c6456ac09f322266d08fcf2a7dca/tumblr_inline_mj8rdaiW3m1qz4rgp.png)

適宜置き換えて設置してください。


### <a id="sec-9"></a> 9. 参考書籍・記事

<a href="https://www.amazon.co.jp/gp/product/4873118166/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873118166&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="参考書籍1"></a>
<a href="https://www.amazon.co.jp/gp/product/4048707876/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4048707876&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="参考書籍1"></a>
<a href="https://www.amazon.co.jp/gp/product/4774148911/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774148911&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="参考書籍2"></a>
<a href="https://www.amazon.co.jp/gp/product/4774156167/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774156167&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="参考書籍3"></a>

- [Travis CI: Configuring your Travis CI build with .travis.yml](http://about.travis-ci.org/docs/user/build-configuration/)
- [Travis CIでブラウザテスト ? The little book of Buster.JS 1.0 documentation](http://the-little-book-of-busterjs.readthedocs.org/en/latest/doc/column/TravisCI/)
