---
layout: post
title: "Homebrew: インストール先のディレクトリーを /usr/local 以外に指定する方法"
date: 2019-03-03 09:30:00 +0900
categories: Homebrew
tags:
- Homebrew
---

Mac ユーザーのエンジニアなら多くの人が Homebrew を使うと思います。  
個人的には root 権限が要らないユーザーホームディレクトリー直下に置くのがおすすめです。

```
$ mkdir -p .homebrew/
$ curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C ~/.homebrew
$ cat << 'EOF' >> ~/.bash_profile
export PATH=$HOME/.homebrew/bin:$PATH
export HOMEBREW_CACHE=$HOME/.homebrew/caches
EOF
```

[参考](https://github.com/Homebrew/brew/blob/master/docs/Installation.md#alternative-installs)
