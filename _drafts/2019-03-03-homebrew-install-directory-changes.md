---
layout: post
title: "Homebrew: インストール先のディレクトリーを /usr/local 以外に指定する方法"
date: 2019-03-03 09:30:00 +0900
categories: Homebrew
tags:
- Homebrew
---

[参考](https://github.com/Homebrew/brew/blob/master/docs/Installation.md#alternative-installs)

```
$ mkdir -p .local/Homebrew/
$ curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C ~/.local/Homebrew
$ cat << 'EOF' >> ~/.bash_profile
export PATH=$HOME/.local/Homebrew/bin:$PATH
export HOMEBREW_CACHE=$HOME/.local/Homebrew/caches
EOF
```



