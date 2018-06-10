---
layout: post
title: "非推奨となるオフラインアクセス権限“Deprecation of Offline Access Permission”の和訳"
date: 2012-01-24 09:00:00 +0900
categories: Facebook
tags:
- Facebook
- Japanized
---

[Deprecation of Offline Access Permission](https://developers.facebook.com/docs/offline-access-deprecation/) の和訳です。

1.  2012/01/24 ... 初めて訳したものを載せるので言い回しが硬かったり、分かりやすい表現になっていない箇所があると思いますが、ご容赦ください...。できればコメントでアドバイスくらさい...。

## 非推奨となるオフラインアクセス権限

アクセストークンは、有意義、かつソーシャルな方法で、あなたのアプリケーションと相互に影響することをユーザーに許可します。（操作でいいんだろか・・・） 私たちはオフラインアクセス権限の使用を非推奨としている間、開発者アプリで移行設定を通して、既存の有効期限をリセットする機能を認めています、有効なアクセストークンはそれぞれの時間、ユーザーはあなたのサイトと対話できます。アプリが存在するために変更を求める事はありません。 しかし、有効期限の長いアクセストークンを与える新しいエンドポイントの導入を検討してください。

<!-- more -->

> Deprecation of Offline Access Permission Access_tokens allow users to interact with your apps in meaningful and social ways. While we are deprecating the use of the offline_access permission, through a migration setting in the Developer App, we are now allowing the option to reset the expiration time for existing, valid access_tokens each time a user interacts with your site. For existing apps, there are no changes required for your app, but you should consider using the new endpoint that allows you to get access tokens with a longer expiration time.

### 既存アクセストークンの有効期限を延長

ユーザーが期限の切れていない有効なアクセストークンでサイトを訪れたとき、再びユーザーにログインさせることなしにアクセストークンの有効期限を延長するオプションがあります。 私たちのプラットフォームは、1 日 1 回 だけ有効期限を延長するでしょう。ユーザーがあなたのサイトを 1 日のうちに複数回訪れた場合も、 1 回目のリクエスト時にトークンは延長されるでしょう。

> Extending the expiration of existing access_tokens When a user visits your site with an existing, valid access_token, you have the option to extend the expiration time of that access token without requiring the user to login again. Our platform will only extend the expiration time once per day, so even if a user revisits your site multiple times a day, the token will be extended the first time requested.

### いくつかの例外

#### デスクトップアプリ

デスクトップアプリケーションは既存アクセストークンの延命はできません。そしてユーザーはトークンが切れたあとに Facebook にログインしなければなりません。

#### 古い SDK を使用しているネイティブモバイルアプリ（iOS / Android）

私たちはアクセストークンの有効期限を延長することのできる iPhone / Android 用 SDK のアップデートをリリースしました。もしあなたが古いバージョンを使う、またはトークンの延長が実装されないままならば、そのユーザーはアクセストークン期限のときにあなたのアプリに定期的に再ログインしなければならないでしょう。以下の iOS / Android のドキュメントを見てください：  

iOS: https://developers.facebook.com/docs/mobile/ios/build/#extend_token  
Android: https://developers.facebook.com/docs/mobile/android/build/#extend_token

> A couple of exceptions Desktop Apps Desktop applications will not be able to extend the life of an existing access_token and the user must login to facebook once the token has expired. Native Mobile Apps using older SDKs (iOS and Android) We released an update to our SDKs for iPhone and Android that will allow access_token expiration to be extended. If you continue to use an older version, and do not implement changes to extend the token, the user will have to re-login to your app periodically when the access_token expires. See the iOS and Android doc pages for more information: iOS: https://developers.facebook.com/docs/mobile/ios/build/#extend_token Android: https://developers.facebook.com/docs/mobile/android/build/#extend_token

### 新しい移行設定のスタートガイド

あなたの開発者アプリページの "高度な設定" に "非推奨 offline_access" と呼ばれる新しい移行設定項目が表示されます。それを有効にしてアプリに適用するには "変更を保存する" クリックします。移行が適用された後、アプリは新しいトークンモデルの下でアクセストークンを作成し、延長することができます。さらに、以前 offline_access 権限をリクエストしていた場合は、その権限はもはや新規ユーザーの認証ダイアログには表示されません。

> Getting started with the new migration setting You will see a new migration called "deprecate offline_access" in your Advanced settings of the Developer App. Enable it and click "Save Changes" for the migration to take effect for that app. After the migration is enabled, apps can create and extend access tokens under the new token model. Additionally, if you were previously requesting offline_access permissions, that permission will no longer be displayed in the Auth Dialog to new users.

### offline_access を要求していなかった場合

アプリが機能し続けるために必要となる変更はありません。もし signed_request もしくはブラウザーのハッシュタグ（クライアントサイド）を通じてアクセストークンを取得したならば、[より長い有効期限](https://developers.facebook.com/docs/offline-access-deprecation/#extend_token)をもつ、新アクセストークンのために新しいエンドポイントの導入を検討してください。

> If you were NOT previously asking for offline_access There are no required changes needed for your app to continue to functioning. If you were obtaining access_tokens through the signed_requests or those returned in a browser hash-tag (client-side), you should consider using our new endpoint to exchange them for new access_tokens that have a longer expiration time.

### offline_access を使用している場合

offline_access 権限を要求していた、またはユーザーが権限を承諾した開発者のために、既存のアクセストークンは有効期限を持たないでしょう（この行はもう一回訳す）。  

アプリにログイン、再ログインしなければならないユーザーのために、もう認証ダイアログで offline_access 権限の表示はされません（移行が有効になっているから）。 あなたのアプリは offline_access を得ることなしで前と同じような機能を続ける必要があります。しかし、既存アクセストークンの有効期限を延長するための新しいエンドポイントの導入を検討すべきです。

> If you have been using offline_access For those developers who were asking for the offline_access permissions and for those users that granted that permission, existing access_tokens will continue to have no expiration time. For any user that has to login or re-login to your app, they will no longer see the permission for offline_access in the Auth Dialog (because the migration is enabled). Your app should continue to function as before even without getting the offline_access, but you should consider using the new endpoint to extend the expiration time of existing access_tokens.

### 新しいエンドポイントを通じてクライアントサイド OAuth と延長しているアクセストークン有効期限

新しいエンドポイントを導入する下で、既存の有効なアクセストークンの有効期限を延長できるでしょう。 アクセストークンはクライアントサイド OAuth、もしくは signed_request を通して生成された場合に、エンドポイントが新しいアクセストークンを返すでしょう。 今後、あなたはこの新しいアクセストークン使用する必要があります。 そのアクセストークンが期限まで機能し続けるでしょう。しかし再び、  

アクセストークンを得る、もしくは既存のアクセストークンの有効期限をリセットするためには、エンドポイントにあなたの所有している client_id（app_id）と app_secret、クライアントサイドアクセストークンを通せばいいのです。返り値のアクセストークンは 60 日間の期限をセットされるでしょう。

> Client-side OAuth and Extending Access_Token Expiration Time through New Endpoint Using the new endpoint below, you will be able to extend the expiration time of an existing, valid access_token. If the access_token was originally generated from a client-side OAuth call or through a signed_request, the endpoint will actually return a new access_token. You should use this new access_token going forward. The original access_token will continue to function until it expires, but again, it will be more effective to use the new access token with the longer expiration time. To get the access_token or reset the expiration time for an existing access_token, simply pass your own client_id (your app_id), your app_secret, and the client-side access_token to the endpoint below. The returned access_token will be set to expire in 60 days.

### サーバーサイド OAuth 開発者

アクセストークンが[サーバーサイド](https://developers.facebook.com/docs/authentication/server-side/) OAuth の呼び出しから生成されている場合、その結果のアクセストークンはもっと長い有効期限をもつでしょう。 まだ有効なアクセストークンがあるうちに呼び出す場合、2 回目の呼び出しから返ってきたアクセストークンは同じままで、有効期限のみ延長されるでしょう。 再び、同日中に複数回呼び出すと 1 回目の呼び出しのみ有効期限の延長がなされます。

> Server-side OAuth Developers If the access_token is generated from a server-side OAuth call, the resulting access_token will have the longer expiration time. If the call is made while there is still a valid access_token for that user, the returned access_token from this second call will remain the same and only the expiration time will be extended. Again, calling this multiple times during the same day will result only in the first call extending the expiration time.

### 期限切れトークン、ユーザーパスワード変更、アプリのアンインストール、そしてユーザーのログアウトの取り扱い

あなたのアプリが offline_access を要求したことに関係なく、ユーザーがパスワード変更をする、もしくはアプリを無効にする、ログアウトするような状況で期限切れアクセストークンを正常に処理する必要があります。 画一的なユーザーエクスペリエンスへ導くシンプルなコードソリューションを含む、これらのケースの詳細についてはこの[ブログの記事](https://developers.facebook.com/blog/post/500/)で確認することができます。  

私たちはこの新たな移行に興奮し、それが開発者とユーザー双方にとって偉大なことになるのを知っています。 私たちは皆さんが構築する、そしてイノベートする Facebook プラットフォーム上で役立つツールや機能を提供し続けている偉大なアプリを楽しみにしています。

> Handling expired tokens, user password changes, uninstalled apps, and user logout Regardless if your app requested the offline_access permission, apps should gracefully handle an expired access tokens in situations where a user changes their password, deauthorizes an app, or logs out. More information on these cases including a simple code solution that leads to a uniform user experience can be found in this blog post. We're excited for this new migration and know that it will be great for both developers and users. We look forward to seeing your great applications as we continue to give you the tools and features that help you build and innovate on the Facebook platform.
