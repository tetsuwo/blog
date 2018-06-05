---
layout: post
title: "Xcode: Base SDK と Deployment Target の違い"
date: 2016-09-30 09:00:00 +0900
categories: Xcode
tags:
- Xcode
- iOS
migration_from: 
- http://tetsuwo.tumblr.com/post/151143540167/ios-base-sdk-deployment-target
---

はじめてまとも（仕事として）に iOS アプリの引き継ぎ開発をするにあたり、後方互換を意識しなければならず、Xcode プロジェクトのビルド設定にある **Base SDK** と **Deployment Target** の理解が曖昧だったので、公式ドキュメントを漁って調べてみました。

下記、公式ドキュメントをオレオレ和訳したものになります。

ご参考まで。

----

Xcode プロジェクトで特定の SDK を使うには、プロジェクトのビルド設定で 2 つの選択をおこないます。
これらの選択はプロジェクトで使う OS 機能を決定します。

- **Deployment Target** はお使いのソフトウェアを実行できる最も古い OS バージョンを識別する設定です。デフォルトは **Base SDK** のバージョン以降に対応する OS のバージョンと同じです。
  この設定のための Xcode ビルド変数名は `MACOSX_DEPLOYMENT_TARGET` (OS X Deployment Target) と `IPHONEOS_DEPLOYMENT_TARGET` (iOS Deployment Target) です。
  **Deployment Target** 以前の OS に組み込まれている機能は無条件に利用できます。
- **Base SDK** は **Base SDK** に対応するバージョン以前の OS に組み込まれている機能が利用できます。
  この設定のための Xcode ビルド設定名は `SDKROOT` (Base SDK) です。
  Deployment Target のバージョン以降、Base SDK に対応する OS バージョンまでの機能は、開発したアプリで利用できます。
  ただし、新しい機能が使えるかどうかチェックする必要があります（「[iOS 弱リンククラスの使い方](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/cross_development/Using/using.html#//apple_ref/doc/uid/20002000-SW3)」、「[弱リンクメソッド、関数、シンボルの使い方](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/cross_development/Using/using.html#//apple_ref/doc/uid/20002000-1114537)」を参照）

----

以下、原文。

<!-- more -->

> Base SDK and Deployment Target Settings
> 
> To use a particular SDK for an Xcode project, make two selections in your project's build settings. These choices determine which operating system features your project can use, as follows:
> 
> - Choose a deployment target. This identifies the earliest OS version on which your software can run. By default, Xcode sets this to the version of the OS corresponding to the base SDK version and later.
>   The Xcode build variable names for this setting are MACOSX_DEPLOYMENT_TARGET (OS X Deployment Target) and IPHONEOS_DEPLOYMENT_TARGET (iOS Deployment Target).
>   You can unconditionally use features from OS versions up to and including your deployment target setting.
> - Choose a base SDK. Your software can use features available in OS versions up to and including the one corresponding to the base SDK. By default, Xcode sets this to the newest OS supported by Xcode.
>   The Xcode build setting name for this parameter is SDKROOT (Base SDK).
>   You can use features from system versions later than the deployment target—up to and including the OS version you've selected as your base SDK—but you must check for the availability of new features, as described in Using Weakly Linked Classes in iOS and Using Weakly Linked Methods and Functions.
> 
> For possible values and more information about build settings in Xcode, see Building for Multiple Releases of an Operating System in Xcode Project Management Guide, Xcode Build Setting Reference and Running Applications in iOS Development Guide.
> 
> When you build your application, your deployment target is reflected in the MinimumOSVersion entry in the application's Info.plist file. For iOS apps, the MinimumOSVersion entry is used by the App Store to indicate the iOS release requirement.
> 
> Figure 2-1 shows a timeline that explains the relationship between deployment target and base SDK.



> The figure describes a project with a deployment target of OS X v10.4 and a base SDK of OS X v10.6. (The version numbers in the figure represent all releases of that version, including system updates.)
> 
> In this example, the software can freely use any features from OS X v10.0 through the newest update of version 10.4. It can conditionally take advantage of features from OS X v10.5 and 10.6, after ensuring that each such feature is available.
> 
> The effects of these settings at compile time and run time are as follows. If your code uses a symbol:
> 
> Not defined in the base SDK (for example, a symbol from a newer OS), you get a compile-time error.
> Defined in the base SDK but marked as deprecated, you get a compile-time warning.
> Defined in the deployment target, your code links and builds normally. At run time:
> On a system running an OS earlier than the deployment target, your code may fail to load if you use symbols unavailable in that OS.
> On a system running an OS equal to or later than the deployment target, your code has null pointers for symbols not available in that OS. Prepare your code for this as described in Using Weakly Linked Methods and Functions and Using Weakly Linked Classes in iOS.
> 
>     Note: OS X v10.6 does not support using iOS Simulator SDKs prior to version 3.0. In addition, when building with Simulator SDKs, the binary runs only on the same operating system version as the base SDK, not on earlier or later versions.
> 
> Always check to see if you are using deprecated APIs; though still available, deprecated APIs are not guaranteed to be available in the future. The compiler warns you about the presence of deprecated APIs in your code, as described in Finding Instances of Deprecated API Usage.
> 
> When you change the base SDK setting, in addition to changing the headers and stub libraries your code builds against, Xcode adjusts the behavior of other features appropriately. For example, symbol lookup, code completion, and header file opening are based on the headers in the base SDK, rather than those of the currently running OS (if the two differ). Similarly, the Xcode Quick Help affinity mechanism ensures that documentation lookup uses the doc set corresponding to the base SDK.
> 
> In addition to setting the base SDK and deployment target for your project as a whole, you can set these values individually for each build target. Target settings override project settings. (However, some Xcode features that attempt to correlate with the base SDK setting, such as symbol definition and documentation lookup, may work differently.)


### 参考 URL

- [Configuring a Project for SDK-Based Development](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/cross_development/Configuring/configuring.html)
