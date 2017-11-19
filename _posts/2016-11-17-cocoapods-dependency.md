---
layout: post
title: "CocoaPods: The dependency `Xxxxxxxxxx (= x.x)` is not used in any concrete target."
date: 2016-11-17 00:00:00 +0900
categories: iOS
tags:
- iOS
- CocoaPods
- Xcode
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


エラーの意味通り、使ってないよー。


Podfile には案の定 xcodeproj でプロジェクト名を記載していた。


    platform :ios, '10.0'
    
    project 'Xxxxxxx.xcodeproj'

    pod 'AFNetworking', 'x.x.x'
    pod 'Xxxxxxx', 'x.x'


以下のように変更。

    platform :ios, '10.0'
    
    project 'Xxxxxxx.xcodeproj'

    target 'Xxxxxx' do
      pod 'AFNetworking', 'x.x.x'
      pod 'Xxxxxxx', 'x.x'
    end

