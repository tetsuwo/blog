---
layout: post
title: "Git: 複数アカウントで同リポジトリーで作業していると \"error: insufficient permission for adding an object to repository database .git/objects\" が発生する"
date: 2012-12-27 13:23:00 +0900
categories: Git
tags:
- Git
migration_from: 
- http://tetsuwo.tumblr.com/post/38922104151/git-error-insufficient
---


Linux サーバー上でマルチアカウントで git 使ってると稀に以下のエラーが起きる。

    error: insufficient permission for adding an object to repository database .git/objects

具体的には `git add` したときに発生。

    $ git add .
    error: insufficient permission for adding an object to repository database .git/objects

    error: {path}: failed to insert into database
    error: unable to index file {path}
    fatal: updating files failed

`git pull` ったタイミングかなんかで権限まわりがオカシクなったのだろう。  
[こちら](http://stackoverflow.com/questions/7864872/cant-add-file-to-git-repository-but-can-change-commit) の質問が参考になった。

めんどくさいから .git/objects 以下の権限を書き換えてしまおう。

    $ sudo chmod -R 0777 .git/objects/

よし。

根本の解決である `git config core.sharedRepository` を利用する場合は [リポジトリを後から共有できるようにする。 - kuma8の日記](http://d.hatena.ne.jp/kuma8/20110115/1295100616) と [git で共用レポジトリを作成する -- BONNOH FRACTION 14](http://www.fraction.jp/log/archives/2009/11/16/create_shared_repository_for_git) を参考に。

### 参考記事

- [linux - can't add file to git repository but can change / commit - Stack Overflow](http://stackoverflow.com/questions/7864872/cant-add-file-to-git-repository-but-can-change-commit)


### 参考になるかも

<a href="https://www.amazon.co.jp/gp/product/427406767X/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=427406767X&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="入門git - Travis Swivegood"></a>
