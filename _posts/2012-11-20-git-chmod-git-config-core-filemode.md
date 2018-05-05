---
layout: post
title: "Git でファイルパーミッションの変更（chmod）を無視する - git config core.filemode false"
date: 2012-11-20 01:19:00 +0900
categories: Git
tags:
- Git
migration_from: 
- http://tetsuwo.tumblr.com/post/36066698390/git-chmod-git-config
---


さて変更を反映するか。

    $ git pull
    remote: Counting objects: 74, done.
    remote: Compressing objects: 100% (37/37), done.
    remote: Total 60 (delta 26), reused 55 (delta 21)
    Unpacking objects: 100% (60/60), done.
    From xxxxxxxxxx
       xxxxxx..xxxxxx  master     -&gt; origin/master
    Updating xxxxxx..xxxxxx
    error: Your local changes to 'xxxxxxxxxx' would be overwritten by merge.  Aborting.
    Please, commit your changes or stash them before you can merge.


む、サーバー上で作業はしてないはずだが。 `git status` みてみる。

    $ git st
    # On branch master
    # Your branch is behind 'origin/master' by 4 commits, and can be fast-forwarded.
    #
    # Changed but not updated:
    #   (use "git add <file>..." to update what will be committed)
    #   (use "git checkout -- <file>..." to discard changes in working directory)
    #
    #	modified:   .gitignore
    #	modified:   xxxxxxxxxx


むむ、なぜだ。 `git diff` してみる。

<!-- more -->

    $ git diff
    diff --git a/.gitignore b/.gitignore
    old mode 100644
    new mode 100755
    diff --git a/xxxxxxxxxx b/xxxxxxxxxx
    old mode 100644
    new mode 100755


どうやら、ファイルパーミッションの変更まで検知してしまっているようだ。

では、ファイルモードの変更を感知しないようにするには...。  
ググったら以下の質問（StackOverflow）が見つかった。

- [How do I make git ignore mode changes (chmod)?](http://stackoverflow.com/questions/1580596/how-do-i-make-git-ignore-mode-changes-chmod)
- [git: repositories with different filesystems](http://stackoverflow.com/questions/5425088/git-repositories-with-different-filesystems)


結果は、これでパーミッション変更を無視できるらしい。

    $ git config core.filemode false


ちゃんと `core.filemode = false` に設定できたか確認するには以下のコマンドで。

    $ git config -l | grep filemode


これ読んで勉強しましょうね。

<a href="https://www.amazon.co.jp/gp/product/427406767X/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=427406767X&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="入門git - Travis Swivegood"></a>


