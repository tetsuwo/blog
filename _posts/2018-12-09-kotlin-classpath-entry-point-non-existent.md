---
layout: post
title: "Kotlin: 'Classpath entry points to a non-existent location: /path/to/app/src/main/kotlin'"
date: 2018-12-09 09:00:00 +0900
categories: Kotlin
tags:
- Kotlin
- Android
---


Kotlin で記述したテストを実行した際に下記の Warning が発生。  
（ちなみに Kotlin のバージョンは 1.2.50）

```
w: Classpath entry points to a non-existent location: /path/to/app/src/main/kotlin
```

調べてみると Kotlin 1.2.51 で修正済みということ。 （[参考](https://github.com/JetBrains/kotlin/blob/master/ChangeLog.md#1251)）

この `file.exists()` が本質的な対応コードかな？

https://github.com/JetBrains/kotlin/commit/3fb26d92df54cbd8c56ec9da5c24c018cd064c18#diff-71105cf8ec106334eb651d60189d4ec4R77


### 参考 URL

- [1.2.50 emits warning "Classpath entry points to a non-existent location:"](https://youtrack.jetbrains.com/issue/KT-24716)
- [Filter out non-existent java source roots in kapt tasks](https://github.com/JetBrains/kotlin/commit/3fb26d92df54cbd8c56ec9da5c24c018cd064c18#diff-71105cf8ec106334eb651d60189d4ec4R77)
- [Changelog](https://github.com/JetBrains/kotlin/blob/master/ChangeLog.md#1251)
