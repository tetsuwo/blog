---
layout: post
title: "[Slack] チャンネル ID を確認する方法"
date: 2023-02-08 20:45:00 +0900
categories: Slack
tags:
- Slack
---

すごく詰まらない内容ですが、ググっても一番分かりやすい方法を示しているところが見当たらなかったので備忘録的に残しておきます。

Slack は ワークスペース > チャンネル といった構成になっており（恐らく）、エンジニアをやっていると、この「チャンネルの ID」を知りたくなるときが、まあまああります。

このチャンネル ID を知る方法はいくつかやり方があります。

1. 当該チャンネルの詳細情報モーダルウィンドウから確認する
2. Slack ワークスペース内のチャンネルメニューから当該チャンネルのコンテキストメニューでコピー＆ペーストして確認する
3. Slack を Web ブラウザーで利用しているときの URL から確認する
4. Slack API を利用して確認する

ざっとこの 4 つの方法があります。  
人によって違うとは思いますが、個人的に一番分かりやすいというか、間違いがない方法は 1 です。


### 1. 当該チャンネルの詳細情報モーダルウィンドウから Slack チャンネル ID を確認する

#### 対象
- Slack デスクトップアプリ
- Slack ウェブアプリ（ブラウザー）

#### 手順
1. Slack チャンネル ID を確認したいチャンネルに移動する
2. チャンネルのメインパネルの方にあるチャンネル名をクリックする
3. チャンネル詳細情報がモーダルウィンドウで表示される
4. モーダルウィンドウの最下部からチャンネル ID が確認およびコピーできる

<!-- more -->

### 2. Slack ワークスペース内のチャンネルメニューから当該チャンネルのコンテキストメニューでコピー＆ペーストして Slack チャンネル ID を確認する

#### 対象
- Slack デスクトップアプリ
- Slack ウェブアプリ（ブラウザー）
- Slack モバイルネイティブアプリ

#### 手順
1. Slack のチャンネル一覧からチャンネル ID を確認したいチャンネルを探す
2. チャンネル名の上でコンテキストメニューを表示する
    - デスクトップ、ウェブアプリならば右クリック
    - モバイルネイティブアプリならば長押し
4. チャンネルリンクをコピーする
5. コピーしたリンクをテキストエディタなどに貼り付ける
6. 貼り付けた URL 文字列の `https://{ワークスペース名}.slack.com/archives/{チャンネル ID}` で確認できる


### 3. Slack を Web ブラウザーで利用しているときの URL から Slack チャンネル ID を確認する

#### 対象
- Slack ウェブアプリ（ブラウザー）

#### 手順
1. 確認したいチャンネルに移動する
2. 当該チャンネルに移動できたらロケーションバー（アドレスバー）を確認する
6. ロケーションバーの URL 文字列の `https://{ワークスペース名}.slack.com/archives/{チャンネル ID}` で確認できる


### 4. Slack API を利用して Slack チャンネル ID を確認する

Slack API を使えばできます。

[Conversations List Method](https://api.slack.com/methods/conversations.list) がそれに該当しそうです。

実装調査はご自分で 🙂

----

すごく詰まらない内容ですが、誰かの助けになればと 🙏