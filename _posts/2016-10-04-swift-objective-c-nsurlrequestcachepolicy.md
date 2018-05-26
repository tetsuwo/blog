---
layout: post
title: "Swift, Objective-C: NSURLRequestCachePolicy の種類"
date: 2016-10-04 00:02:00 +0900
categories: Objective-C
tags:
- Objective-C
- Swift
- iOS
migration_from: 
- http://tetsuwo.tumblr.com/post/151290876172/swift-objective-c-nsurlrequestcachepolicy
---


[こっち（AFHTTPRequestOperationManager で結果キャッシュを無効にする）](/post/20161003/ios-afnetworking-request-cache.html) でも触れたのですが、
[NSURLRequestCachePolicy](https://developer.apple.com/reference/foundation/nsurlrequestcachepolicy) の種類だけを抜き出しておいたほうが備忘録的にも探しやすいので残しておく。

| 値 | 説明 |
|-|-|
| NSURLRequestUseProtocolCachePolicy | 基本的にはプロトコルのキャッシュ方針に従う。でも何故かキャッシュされっ放しのケースがある。プロパティに何も指定がなかった場合にデフォルトで設定される。 |
| NSURLRequestReloadIgnoringLocalCacheData | 必ずサーバー側にリクエストを送る。サーバー側のキャッシュコントロールには従う。 |
| NSURLRequestReloadIgnoringLocalAndRemoteCacheData | クライアント側、サーバー側ともにキャッシュを無視する。ただしサーバー側でプロキシーキャッシュしている場合はその限りではない。 |
| NSURLRequestReturnCacheDataElseLoad | クライアント側にキャッシュがあれば必ずキャッシュデータを返す。ちなみに未実装...。 |
| NSURLRequestReloadRevalidatingCacheData | サーバー側にキャッシュデータの妥当性を問い合わせた上でキャッシュを使うくさい。ちなみにこれも未実装...orz |

2016 年 10 月時点での情報です。

ご参考までに。
