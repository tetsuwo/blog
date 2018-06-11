---
layout: post
title: "PHP: ts は Thread Safe で nts は Non Thread Safe"
date: 2012-11-06 09:00:00 +0900
categories: PHP
tags:
- PHP
---

よく eAccelerator や XDebug の dll とか持ってくるときに `ts` とか `nts` とかサフィックスがついてることがある。

`Thread Safe` と `Non Thread Safe` の略だったようだ。

```
ts  ... Thread Safe
nts ... Non Thread Safe
```

それぞれの違いはこちら（[PHP のNon Thread Safe とThread Safe の違い](http://gete.blog.shinobi.jp/Entry/41/)）が参考になる。
