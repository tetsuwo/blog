---
layout: post
title: "Mercurial で 作業ディレクトリーがロックされたままの状態になった “waiting for lock on working directory of ~”"
date: 2012-05-10 09:00:00 +0900
categories: Mercurial
tags:
- Mercurial
---

Mercurial で `hg commit` 途中で PC が強制再起動しちゃったときに起きた問題。  
起動後、また `hg commit` したら以下のエラーが発生した。

```
waiting for lock on working directory of $PATH held by '$SERVER-ID:$PID'
```

なんぞ...？って思ったが、まあ"作業ディレクトリーのロック状態なんで待ちです"ってことなので、どこにロックファイルがあるんだと調査したところ stackoverflow に答え（[Mercurial stuck “waiting for lock”](http://stackoverflow.com/questions/12865/mercurial-stuck-waiting-for-lock)）がありました。

`.hg/wlock` がそれらしいのでファイルを削除しちゃいます。

```
rm .hg/wlock
```

これで無事 `hg commit` できました。  
ちゃんちゃん。


#### 参考記事
- [Mercurial stuck “waiting for lock”](http://stackoverflow.com/questions/12865/mercurial-stuck-waiting-for-lock)
