---
layout: post
title: "CocoaPods: `xcodeproj` was renamed to `project`. Please update your Podfile accordingly."
date: 2016-11-17 01:35:00 +0900
tags:
- iOS
- CocoaPods
- Xcode
redirect_from: 
- /post/153262938342/cocoapods-xcodeproj-was-renamed-to-project
---


CocoaPods 0.39 以下がサポート切れたので 1.1 系にアップグレードしたら、このようなエラーに見舞われた。

    $ bundle exec pod install
    Re-creating CocoaPods due to major version update.
    Analyzing dependencies
    [!] The dependency `AFNetworking (= x.x.x)` is not used in any concrete target.
    The dependency `Xxxxxxxxxx (= x.x)` is not used in any concrete target.
    .
    .
    .
    .
    
    [!] `xcodeproj` was renamed to `project`. Please update your Podfile accordingly.


エラーの意味通り、 `xcodeproj` は `project` にリネームされましたよー。Podfile を更新してねー。


Podfile には案の定 xcodeproj でプロジェクト名を記載していた。


    platform :ios, '10.0'
    
    xcodeproj 'Xxxxxxx.xcodeproj'

以下のように変更。

    platform :ios, '10.0'
    
    project 'Xxxxxxx.xcodeproj'
