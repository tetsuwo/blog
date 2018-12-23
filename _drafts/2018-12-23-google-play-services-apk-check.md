---
layout: post
title: "Android: Google Play Service "
slug: google-play-services-apk-check
date: 2018-12-23 09:00:00 +0900
tags:
- Android
- Kotlin
---

## 背景

Android アプリを開発する上で Google の API や Firebase はもはや欠かせないもの、とまではいかないまでもほとんどの開発者が利用することでしょう。

しかしながら、これらの SDK を清く正しく利用するためには、互換性のある Google Play 開発者サービスの APK が端末にインストールされている必要があります。

Firebase の[公式でも注記](https://firebase.google.com/docs/cloud-messaging/android/client#sample-play)があるくらいです ↓

> Play 開発者サービスの SDK に依存するアプリについては、Google Play 開発者サービス機能にアクセスする前に、互換性のある Google Play 開発者サービスの APK が端末にインストールされているかどうかをアプリが必ずチェックする必要があります。このチェックは、メイン アクティビティの onCreate() メソッドと onResume() メソッドの 2 か所で行うことをおすすめします。onCreate() では、チェックにパスしないとアプリを使用できないようにします。onResume() では、ユーザーが [戻る] ボタンなどの他の手段を使って実行中のアプリに戻った場合にもチェックされるようにします。
> 
> 互換性のあるバージョンの Google Play 開発者サービスが端末にインストールされていない場合は、アプリで GoogleApiAvailability.makeGooglePlayServicesAvailable() を呼び出すと、ユーザーが Play ストアから Google Play 開発者サービスをダウンロードできます。


https://developers.google.com/android/reference/com/google/android/gms/common/GoogleApiAvailability.html#isGooglePlayServicesAvailable(android.content.Context)


isGooglePlayServicesAvailable


