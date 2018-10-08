---
layout: post
title: "git rm で “fatal: pathspec ‘path/to/~’ did not match any files” が発生 ⇒ git commit -a"
date: 2013-10-26 10:41:00 +0900
categories: Git
tags:
- Git
---

特定ディレクトリ内で前方一致削除 `git rm -rf prefix_*` を実行。

    # git rm -rf path/to/images/prefix_*
    rm 'path/to/images/prefix_a.png'
    rm 'path/to/images/prefix_b.png'
    rm 'path/to/images/prefix_c.png'
    rm 'path/to/images/prefix_d.png'
    rm 'path/to/images/prefix_e.png'
    rm 'path/to/images/prefix_f.png'
    rm 'path/to/images/prefix_g.png'

`git status` で状況確認。

    # git status
    # On branch master
    # Changes to be committed:
    #   (use "git reset HEAD <file>..." to unstage)
    #
    #	deleted:    path/to/images/prefix_a.png
    #	deleted:    path/to/images/prefix_b.png
    #	deleted:    path/to/images/prefix_c.png
    #	deleted:    path/to/images/prefix_d.png
    #	deleted:    path/to/images/prefix_e.png
    #	deleted:    path/to/images/prefix_f.png
    #	deleted:    path/to/images/prefix_g.png
    #
    # Changed but not updated:
    #   (use "git add/rm <file>..." to update what will be committed)
    #   (use "git checkout -- <file>..." to discard changes in working directory)
    #
    #	deleted:    path/to/images/prefix_ x.jpg
    #

なぜか `path/to/images/prefix_ x.jpg` だけがインデックスに追加されない。

    # git rm -rf path/to/images/prefix_ x.jpg
    fatal: pathspec 'path/to/images/prefix_' did not match any files
        git rm pathspec did not match

直で `add/rm` してもダメだ。

こういうときは `git commit -a` です。

    # git commit -a

`git commit -a` は変更のあったファイルを自動検出してコミットできるのです。

このあたりのことが分からない方は [入門git - Travis Swivegood](https://www.amazon.co.jp/gp/product/427406767X/t5o-22/ref=nosim) で勉強しましょう。 


### 参考になるかも

<a href="https://www.amazon.co.jp/gp/product/427406767X/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=427406767X&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="入門git - Travis Swivegood"></a>
