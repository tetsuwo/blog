---
layout: post
title: "iOS: Universal Links でクライアントが apple-app-site-association を参照するときの User Agent"
date: 2015-11-12 09:00:00 +0900
categories: iOS
tags:
- iOS
migration_from: 
- http://tetsuwo.tumblr.com/post/133003413132/ios-universal-links-apple-app-site-association-user-agen
---

Universal Links でクライアントが `apple-app-site-association` を参照するときのユーザーエージェント

```
swcd (unknown version) CFNetwork/758.0.2 Darwin/15.0.0
```

`swcd` ってのは *Shared Web Credentials Daemon* の略らしい。

Shared Web Credentials は Web サービスとアプリ間で認証情報を共有できる技術らしい。


### 参考 URL

- [Shared Web Credentials Reference](https://developer.apple.com/library/ios/documentation/Security/Reference/SharedWebCredentialsRef/)
