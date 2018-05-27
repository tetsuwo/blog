---
layout: post
title: "Linux: プロセスの一時停止と再開（CentOS）"
date: 2014-09-11 09:00:00 +0900
categories: Mac
tags:
- Mac
---


終了までに時間のかかるバッチ処理を実行している際に、負荷的な面などから一時的に処理を停止させたい場合があります。

その際、`kill` コマンドでそれが実現できます。


プロセスの一時停止

    # kill -s SIGSTOP {プロセスID}


一時停止しているプロセスの再開

    # kill -s SIGCONT {プロセスID}


実際に上記のコマンドを実行するときには、まず `ps` コマンドにて一時停止させたい処理を探します。

<!-- more -->

    # ps aux
    USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    .
    .
    .
    root     12345  0.0  0.0  13540  1484 ?        R    Sep19   0:00 /usr/bin/find /path/to/demo/ -type f -print0

プロセス ID（`PID`）が 12345 のプロセスを一時停止させます。

    # kill -s SIGSTOP 12345

本当に処理が一時停止しているか確認します。
主に `STAT` が **T** になっていることを確認します。

    # ps aux
    USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    .
    .
    .
    root     12345  0.0  0.0  13540  1484 ?        T    Sep19   0:00 /usr/bin/find /path/to/demo/ -type f -print0

次に一時停止している処理を再開させます。

    # kill -s SIGCONT 12345

再開されたかを `STAT` が **S** か **R** になっているかどうかで確認します。

    # ps aux
    USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
    .
    .
    .
    root     12345  0.0  0.0  13540  1484 ?        R    Sep19   0:00 /usr/bin/find /path/to/demo/ -type f -print0

時には便利。


### 参考 URL

- [プログラムの実行を一時的に停止するには](http://www.atmarkit.co.jp/flinux/rensai/linuxtips/230usesigstop.html)

