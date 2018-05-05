---
layout: post
title: "Android: 'android' is deprecated; use 'com.android.application' instead"
date: 2016-10-09 00:00:00 +0900
categories: Facebook iOS
tags:
- Android
- Android Studio
- Gradle
migration_from: 
- http://tetsuwo.tumblr.com/post/151562798262/android-is-deprecated-use-com-android-application-instea
---

Android Studio 上で build.gradle の整理をしているときに気付いたのですが、apply plugin: 'android' に打ち消し線が入るようになっていました。

こんなのです↓

    'android' is deprecated; use 'com.android.application' instread

    This detector looks for deprecated Gradle constructs which currently work but will likely stop working in a future update.


Android Studio のバージョンいくつから付くようになったのかは分かりませんが、非推奨と言われてしまったら変えざるを得ない。

    // build.gradle
    apply plugin: 'android'

    ↓

    apply plugin: 'com.android.application'


この修正を入れた上で、build.gradle の android ブロックが悲鳴を上げなければ大丈夫。
