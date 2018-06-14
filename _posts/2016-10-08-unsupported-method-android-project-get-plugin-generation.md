---
layout: post
title: "Android: Unsupported method: AndroidProject.getPluginGeneration() ~ の対処"
date: 2016-10-08 09:00:00 +0900
categories: Android
tags:
- Android
- Android Studio
---

Android アプリの開発をしているときに Android Studio を 2.1.0 から 2.2.0 にアップグレードした際に、Gradle ビルドで下記のエラーが発生しました。

```
Unsupported method: AndroidProject.getPluginGeneration().
The version of Gradle you connect to does not support that method.
To resolve the problem you can change/upgrade the target version of Gradle you connect to.
Alternatively, you can ignore this exception and read other information from the model
```


使っている Gradle のバージョンがメソッド `AndroidProject.getPluginGeneration()` をサポートしていないというエラーです。

本当なら Gradle をアップグレードしたいところですが、諸々あって別の方法を探しました。

どうやら調べてみると Android Studio 2.2 から自動で有効になった？ **Instant Run** が影響しているようでした。

[Instant Run](https://developer.android.com/studio/run/index.html#instant-run) は、初回ビルド以降、新規に APK をビルドすることなく、アプリの更新内容をプッシュできるため、変更点を素早く確認できるようになる機能です。

この機能を無効にするには設定からおこないます。

<!-- more -->


#### Windows/Linux の場合

1. File
2. Settings
3. Build, Execution, Deployment
4. Instant Run
5. Enable Instant Run to hot swap code/resource changes on deploy (default enabled) のチェックを外す


#### Mac OS X の場合

1. Android Studio
2. Preferences
3. Build, Execution, Deployment
4. Instant Run
5. Enable Instant Run to hot swap code/resource changes on deploy (default enabled) のチェックを外す

----

これでエラーが発生しなくなりました。

しかし、早く Instant Run を導入したいですね。。。



### 参考 URL

- [Android Studio Release Notes \| Android Studio](https://developer.android.com/studio/releases/index.html)
- [Google Developers Japan: Android Studio 2\.2](https://googledevjp.blogspot.jp/2016/09/android-studio-2-2.html)
- [アプリをビルドして実行する \| Android Studio](https://developer.android.com/studio/run/index.html#instant-run)
