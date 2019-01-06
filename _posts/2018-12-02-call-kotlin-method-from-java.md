---
layout: post
title: "Java から Kotlin のメソッドを呼び出すときに気をつけること（@JvmStatic）"
date: 2018-12-02 09:00:00 +0900
categories: Kotlin
tags:
- Kotlin
- Java
---

ちょっとした「こういうもんなのか」ということがあったので備忘録的に残しておく。

Kotlin で書かれたオブジェクト「DataStore」があるとする。

```kotlin
// kotlin
object DataStore {

    private val shared: DataStore = DataStore

    fun shared(): DataStore {
        return shared
    }

    fun setup(context: Context) {
    }
}
```

このクラスの `shared` メソッドを Java から呼び出す場合は `INSTANCE` を経由して呼び出す必要がある。

```java
// java
DataStore.INSTANCE.shared().setup(context);
```

しかし、 DataStore の `shared` に `JvmStatic` アノテーションを付けると...、

```kotlin
// kotlin
object DataStore {
    private val shared: DataStore = DataStore

    @JvmStatic
    fun shared(): DataStore {
        return shared
    }

    fun setup(context: Context) {
    }
}
```

`INSTANCE` を経由せずに呼び出すことができる。

```java
// java
DataStore.shared().setup(context);
```

詳しい調査・解説はまた時間があるときに。


### 参考 URL

- [Calling Kotlin from Java](https://kotlinlang.org/docs/reference/java-to-kotlin-interop.html#static-methods)
