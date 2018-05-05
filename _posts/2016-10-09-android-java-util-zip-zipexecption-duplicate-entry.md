---
layout: post
title: "Android: java.util.zip.ZipException: duplicate entry: xx/xx/Xxxxx.class"
date: 2016-10-09 00:00:00 +0900
categories: Facebook iOS
tags:
- Android
- Android Studio
migration_from: 
- http://tetsuwo.tumblr.com/post/151562190527/android-java-util-zip-zipexecption-duplicate-entry
---

Android アプリの Gradle ビルドを走らせたときに下記のエラーに遭遇。

    java.util.zip.ZipException: duplicate entry: xx/xx/Xxxxx.class


エラーからすると Xxxx.class に重複したエントリーがあるということを教えてくれているようです。

なるほどなるほどと、該当の箇所をみてみると確かにバージョン違いの同名 jar ファイルがありました。

同名 jar ファイルを一つだけにしてビルドしたらビルド成功。

そういえば、とある SDK をアップグレードする際に、とりあえず jar ファイルだけ置いておいて放置したやつが影響していました。。。

凡ミス。
