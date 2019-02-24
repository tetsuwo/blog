---
layout: post
title: "Facebook: 1 つのサイトで複数の Facebook Pixel タグを設定するには"
slug: multiple-facebook-pixel-tag
date: 2019-02-25 09:00:00 +0900
tags:
- Facebook
- JavaScript
---


## 前置き

いまさらながらな内容かもしれませんが、ちょっと気になったので備忘録的に書いておきます。
そこからかよっ！という説明になっているかもしれません...。


## 背景

サービスを運営しているとどこかのタイミングで Facebook などのソーシャルサービスに広告を配信するフェーズが出てきたりします。

Facebook には Facebook 上で広告配信するための管理コンソールであるビジネスマネージャという機能があります。
Facebook に広告を出稿する際には、このビジネスマネージャから発行される広告の効果を測定するためにピクセルタグというものをサイト内のあちこちに貼り付けることになるでしょう。

しかしながら、自社または自身で Facebook の広告を運用するのは大変だったりします。
そこで広告代理店が間に入り、決められた予算内で目標の効果を達成するべく、広告の運用を代行してくれたりします。

代理店が 1 社であればピクセルタグの導入はテンプレ（教科書）通りに導入できますが、 2 社以上になってくると問題が発生してきます。

どういう問題が発生するかというと、ピクセルタグから送信されるデータに不整合（重複して送られたり、優先度が決まっていたり）が発生するのです。

<!-- more -->


### 実際の例

下記 HTML + JS は Facebook ビジネスマネージャから発行する、よく見かけるピクセルタグです。

```html
<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');

fbq('init', '<FB_PIXEL_ID>');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=<FB_PIXEL_ID>&ev=PageView&noscript=1"
/></noscript>
<!-- End Facebook Pixel Code -->
```

この `fbq()` という関数は引数にキーと値（属性も取れます）をキューに追加する役割を持っています。
キュー処理の中では、キーによって処理を振り分けており、 **init** はピクセル ID の初期化処理、 **track** はイベントを送信するといった意味を持っています。
同期的にクライアント側に通信処理をさせることはユーザー体験を損ねることになりかねないのでキュー処理にしているのでしょう。

`fbq('init', '<FB_PIXEL_ID>');` で当該ピクセル ID を初期値に設定しつつ、 `fbq('track', "PageView");` で `<FB_PIXEL_ID>` の ID で **PageView** イベントを送信しています。

```plaintext:実際のネットワークログ
https://www.facebook.com/tr/tr?id=<FB_PIXEL_ID>&ev=PageView&...
```

この時点で言いたいことに気づかれる方もいらっしゃると思いますが、敢えて説明します。
そもそもこのピクセルタグの書き方では 1 つのピクセル ID しかサポートできません。

どういうことかというと...下記のように 2 つのピクセル ID を想定したピクセルタグがあるとします。
（HTML 部分は省き、JS のみにしています）

```js:２つのピクセルＩＤを想定したピクセルタグ
fbq('init', 'FBPIXELID-1');  // 代理店#1 のピクセル ID を設定
fbq('track', 'PageView');    // 代理店#1 向けの PageView イベントを送信
fbq('init', 'FBPIXELID-2');  // 代理店#2 のピクセル ID を設定
fbq('track', 'PageView');    // 代理店#2 向けの PageView イベントを送信
fbq('track', 'AddToCart');   // 代理店#2 向けの AddToCart イベントを送信
```

このピクセルタグの場合、普通に考えると下記のような通信ログが想定されると思います。

```plaintext:想定されるネットワークログ
https://www.facebook.com/tr/tr?id=FBPIXELID-1&ev=PageView&...
https://www.facebook.com/tr/tr?id=FBPIXELID-2&ev=PageView&...
https://www.facebook.com/tr/tr?id=FBPIXELID-2&ev=AddToCart&...
```

しかし、実際に実行してみると下記のような通信ログになるのです。

```plaintext:実際のネットワークログ
https://www.facebook.com/tr/tr?id=FBPIXELID-1&ev=PageView&...
https://www.facebook.com/tr/tr?id=FBPIXELID-2&ev=PageView&...
https://www.facebook.com/tr/tr?id=FBPIXELID-1&ev=AddToCart&...
https://www.facebook.com/tr/tr?id=FBPIXELID-2&ev=AddToCart&...
```

**FBPIXELID-2** のピクセル ID の AddToCart が余計ですよね？
つまりは、ピクセル ID を設定するタイミング次第では設定されているピクセル ID すべてに同じイベントを送ってしまうのです。

広告代理店ごとのピクセルタグの運用が標準化されていればそれでも問題ありませんが、それぞれ独自に運用していますので全く同じイベントを送ることは割と少ないです。


## 対処

さて、この問題に対する対処ですが、Facebook は当然ながら解消する手段を用意しています。
（といっても、ボク自身が Facebook Pixel を導入していた 2016 年とかその時期にはそのソリューションはなかったので、イメタグで対応していましたが。。。後述）

早速、そのソリューションを用いて、先程の想定外の挙動をおこしたピクセルタグの問題を解消してみましょう。

```js:２つのピクセルＩＤを想定したピクセルタグ
fbq('init', 'FBPIXELID-1');                       // 代理店#1 のピクセル ID を設定
fbq('trackSingle', 'FBPIXELID-1', 'PageView');    // 代理店#1 向けの PageView イベントを送信
fbq('init', 'FBPIXELID-2');                       // 代理店#2 のピクセル ID を設定
fbq('trackSingle', 'FBPIXELID-2', 'PageView');    // 代理店#2 向けの PageView イベントを送信
fbq('trackSingle', 'FBPIXELID-2', 'AddToCart');   // 代理店#2 向けの AddToCart イベントを送信
```

**track** の代わりに **trackSingle** というキーがあらわれました。
**trackSingle*** は 2 番目の引数にピクセル ID を取り、3 番目にイベント名を取ります。
これにより、イベントを送るときのピクセル ID を動かないものにしているのですね。

実際の挙動をみてみると...

```plaintext:実際のネットワークログ
https://www.facebook.com/tr/tr?id=FBPIXELID-1&ev=PageView&...
https://www.facebook.com/tr/tr?id=FBPIXELID-2&ev=PageView&...
https://www.facebook.com/tr/tr?id=FBPIXELID-2&ev=AddToCart&...
```

バッチリです 👍


**PageView** イベントはどちらのピクセル ID でも送っているので、こうすることもできます。

```js:２つのピクセルＩＤを想定したピクセルタグ（まとめたやつ）
fbq('init', 'FBPIXELID-1');                       // 代理店#1 のピクセル ID を設定
fbq('init', 'FBPIXELID-2');                       // 代理店#2 のピクセル ID を設定
fbq('track', 'PageView');                         // 代理店#1,2 向けの PageView イベントを送信
fbq('trackSingle', 'FBPIXELID-2', 'AddToCart');   // 代理店#2 向けの AddToCart イベントを送信
```

ただ、個人的にはややこしいので、 **init** をやめて **trackSingle** だけでいいんじゃないかと思ったります。



### 別のソリューション

後述すると書いていた件ですが、このソリューションが発表される前はこんなことをやっていました。
そのときの要求を満たせばよかっただけなのでクソ適当 JS です。

```js:自前ソリューション
function trackFacebookPixel(prop) {
    try {
        var url = 'https://www.facebook.com/tr/?';
        var payload = {
            'id': prop.pixelId,
            'ev': prop.eventName,
            'dl': window.location.href,
            'rl': window.document.referrer,
            'if': 'false',
            'ts': new Date().getTime(),
            'v': '2.0'
        };
        if (typeof prop.details !== 'undefined') {
            if (prop.details.contentIds) {
                payload['cd[content_ids]'] = prop.details.contentIds.join(',');
            }
            if (prop.details.contentType) {
                payload['cd[content_type]'] = prop.details.contentType;
            }
            if (prop.details.value) {
                payload['cd[value]'] = prop.details.value;
            }
            if (prop.details.currency) {
                payload['cd[currency]'] = prop.details.currency;
            }
        }
        var query_strings = [];
        for (var key in payload) {
            query_strings.push(key + '=' + encodeURIComponent(payload[key]));
        }
        var trackingUrl = url + query_strings.join('&');
        var trackingImage = new Image();
        trackingImage.src = trackingUrl;
        trackingImage.width = 1;
        trackingImage.height = 1;
        trackingImage.style = 'display:none;';
        window.document.body.appendChild(trackingImage);
    } catch (e) {
        console.error('Facebook Pixel Error', e);
    }
}

// 呼び出し側
trackFacebookPixel({ pixelId: 'FBPIXELID-3', eventName: 'PageView' });
```

こんな対応で頑張っていたところに [Accurate Event Tracking with Multiple Pixels](https://developers.facebook.com/ads/blog/post/2017/11/28/event-tracking-with-multiple-pixels-tracksingle/) の記事が公開されていたというね。

開発者向けドキュメントにも記載があります。
[Selective event tracking with multiple pixels | Advanced - Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel/advanced/#multipixels)


## 関連記事

- [Accurate Event Tracking with Multiple Pixels](https://developers.facebook.com/ads/blog/post/2017/11/28/event-tracking-with-multiple-pixels-tracksingle/)
- [Selective event tracking with multiple pixels | Advanced - Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel/advanced/#multipixels)
