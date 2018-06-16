---
layout: post
title: "Python: /usr/bin/env: python: No such file or directory 対処"
date: 2015-03-08 09:00:00 +0900
categories: Python
tags:
- Python
---

とある Linux サーバー上で Python を実行しようとしたときに起きた問題。

    $ ./hoge.py
    : No such file or directory
    
↑ は Git から Linux 上に落とした Python コードを実行しようとしたところ発生したエラーです。

実際のエラー全文は下記です。
    
    /usr/bin/env: python: No such file or directory

この Python ファイルがどんなものか調べてみます。

    $ file hoge.py
    hoge.py: Python script, ASCII text executable, with CRLF line terminators

改行コードが CRLF になっているので LF に変換しなければなりません。

幸い実行サーバーには vim が入っていたので `:set fileformat=unix` して解決。

sed の使い方を思い出さずに済みました。
