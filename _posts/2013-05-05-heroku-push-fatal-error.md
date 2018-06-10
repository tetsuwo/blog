---
layout: post
title: "Heroku に push するとエラー “fatal: ‘heroku’ does not appear to be a git repository”"
date: 2013-05-05 09:00:00 +0900
categories: Heroku
tags:
- Heroku
- Git
---

久しぶりに Heroku で運用しているサービスを修正しようとしたらプッシュするときにエラーが発生したのでメモ。

まずは clone。

    $ git clone git@heroku.com:{repos-name}.git

もろもろ修正したあと、push。

    $ git push heroku master
    fatal: 'heroku' does not appear to be a git repository 
    fatal: Could not read from remote repository.

    Please make sure you have the correct access rights
    and the repository exists.

怒られる。

`.git/config` を確認してみる。

[[MORE]]

    $ vim .git/config
    [remote "origin"]
        url = git@heroku.com:{repos-name}.git
        fetch = +refs/heads/*:refs/remotes/origin/*
    [branch "master"]
        remote = origin
        merge = refs/heads/master
        rebase = true

`origin` を `heroku` に変えてみる。

    [remote "heroku"]
        url = git@heroku.com:{repos-name}.git
        fetch = +refs/heads/*:refs/remotes/origin/*
    [branch "master"]
        remote = heroku
        merge = refs/heads/master
        rebase = true

再び push。

    $ git push heroku master
    Counting objects: 16, done.
    Delta compression using up to 4 threads.
    Compressing objects: 100% (9/9), done.
    Writing objects: 100% (10/10), 2.59 KiB, done.
    Total 10 (delta 2), reused 0 (delta 0)
    remote: xxxx
    ...
    remote: xxxx
    To git@heroku.com:{repos-name}.git
       xxxxxxx..xxxxxxx  master -> master

デプロイできた。
