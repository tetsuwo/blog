---
layout: post
title: "Objective-C: AFHTTPRequestOperationManager で結果キャッシュを無効にする"
date: 2016-10-03 09:00:00 +0900
categories: Objective-C
tags:
- Objective-C
- iOS
---


とある iOS アプリから Web API と HTTP を喋るのに AFNetworking（2系）を利用しています。

AFNetworking というよりかは NSURLRequest の仕様だと思うのですが、下記のようなコードで、一度 HTTP リクエストを送った URL に対して 2 回目のリクエストを送るとクライアント側のキャッシュからデータ（レスポンス）を読むようです。  
（サーバー側のレスポンスヘッダーが悪いような感じではなかった、、、）  
このような場合、特に Web API などはクライアント依存になってしまう状態だと何かと不便です。

下記コードが問題のところ。  
いたって普通の HTTP 通信するためのコードです。

```
AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
[manager GET:URL
  parameters:PARAMS
     success:^(AFHTTPRequestOperation *operation, id responseObject) {
        // anything
     }
     failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        // anything
     }];
```


どうにか解消できないかと調べていると、HTTP リクエストを送る際にキャッシュポリシーのオプションを指定できることがわかりました。  
（公式ドキュメント - [NSURLRequestCachePolicy \- Foundation \| Apple Developer Documentation](https://developer.apple.com/reference/foundation/nsurlrequestcachepolicy?language=objc)）

キャッシュポリシーは列挙型 `NSURLRequestCachePolicy` で、デフォルトが HTTP に従うようです。


下記コードが改善版。  
`[manager.requestSerializer setCachePolicy: NSURLRequestReloadIgnoringLocalCacheData]` が改善箇所です。

```
AFHTTPRequestOperationManager *manager = [AFHTTPRequestOperationManager manager];
[manager.requestSerializer setCachePolicy: NSURLRequestReloadIgnoringLocalCacheData]
[manager GET:URL
  parameters:PARAMS
     success:^(AFHTTPRequestOperation *operation, id responseObject) {
        // anything
     }
     failure:^(AFHTTPRequestOperation *operation, NSError *error) {
        // anything
     }];
```

なるほどなるほど。

他にどんなキャッシュポリシーがあるか調べました。

[NSURLRequestCachePolicy (Objective-C)](https://developer.apple.com/reference/foundation/nsurlrequestcachepolicy?language=objc) の種類

| 値 | 説明 |
|-|-|
| NSURLRequestUseProtocolCachePolicy | 基本的にはプロトコルのキャッシュ方針に従う。でも何故かキャッシュされっ放しのケースがある。プロパティに何も指定がなかった場合にデフォルトで設定される。 |
| NSURLRequestReloadIgnoringLocalCacheData | 必ずサーバー側にリクエストを送る。サーバー側のキャッシュコントロールには従う。 |
| NSURLRequestReloadIgnoringLocalAndRemoteCacheData | クライアント側、サーバー側ともにキャッシュを無視する。ただしサーバー側でプロキシーキャッシュしている場合はその限りではない。 |
| NSURLRequestReturnCacheDataElseLoad | クライアント側にキャッシュがあれば必ずキャッシュデータを返す。ちなみに未実装...。 |
| NSURLRequestReloadRevalidatingCacheData | サーバー側にキャッシュデータの妥当性を問い合わせた上でキャッシュを使うくさい。ちなみにこれも未実装...orz |


いまさらの Objective-C ですが、書き方に癖があるだけで、今のところ自然に入り込めている感じ。


### 参考 URL

- [Enumeration - NSURLRequestCachePolicy](https://developer.apple.com/reference/foundation/nsurlrequestcachepolicy?language=objc)
- [ios - AFNetworking - do not cache response - Stack Overflow](http://stackoverflow.com/questions/20166148/afnetworking-do-not-cache-response)
- [EZ-NET: NSURLRequest でキャッシュを無視して再読み込みする : Objective-C プログラミング](http://program.station.ez-net.jp/special/handbook/objective-c/nsurlrequest/cache-policy.asp)
