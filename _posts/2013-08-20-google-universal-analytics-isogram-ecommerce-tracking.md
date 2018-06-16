---
layout: post
title: "Google Analytics のトラッキングコードで E コマーストランザクションを収集する方法（Universal Analaytics）"
date: 2013-08-20 09:00:00 +0900
categories: Google Analytics
tags:
- Google Analytics
---

Universal Analytics を適用し、新しいトラッキングコードになってから、E コマースのトランザクションデータが収集できなくなったので調査してみました。

ほとんどのことが [Ecommerce Tracking - Web Tracking (analytics.js) - Google Analytics — Google Developers](https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce) に載っていることです。


新しいトラッキングコードは以下のようになっています。（※ 2013/08/19 22:00 時点）

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    
      ga('create', 'UA-XXXXXX-YY');
      ga('send', 'pageview');

    </script>


上記コードをみるとわかりますが、以前のバージョンでは `_gaq` オブジェクトの `push` メソッドに全て突っ込んでいたので、このトラッキングコードでは今までカスタマイズしていたイベントトラッキングなどは動かなくなります。
当然、E コマースのトランザクションデータも収集できなくなります。

以前の E コマーストラッキングコードは以下のようなサンプルが用意されていました。  
※下記例は 1 トランザクションで 2 商品購入した例です。

<!-- more -->

```
<script type="text/javascript">

  _gaq.push(['_addTrans',
    '12345',        // transaction ID - required
    'MINI4Q-STORE', // affiliation or store name
    '1480.00',      // total - required
    '74.00',        // tax
    '0',            // shipping
    'Kawagoe',      // city
    'Saitama',      // state or province
    'JPN'           // country
  ]);

  _gaq.push(['_addItem',
    '12345',                        // transaction ID - required
    'MINI4Q-LIGHTNING-MAONUM',      // SKU/code - required
    'ミニ四Q ライトニングマ○ナム', // product name
    'MINI4Q',                       // category or variation
    '700.00',                       // unit price - required
    '1'                             // quantity - required
  ]);

  _gaq.push(['_addItem',
    '12345',
    'MINI4Q-HANDYCRAFT-CUTTERNOKO3',
    'カッターのこ III',
    'MINI4Q',
    '780.00',
    '1'
  ]);

  _gaq.push(['_trackTrans']);

</script>
```

新しい Universal Analytics では、下記コードを書けばトランザクションデータを収集できるようになります。

```
<script>
    ga('require', 'ecommerce', 'ecommerce.js');

    ga('ecommerce:addTransaction', {
      'id': '12345',                 // transaction ID - required
      'affiliation': 'MINI4Q-STORE', // affiliation or store name
      'revenue': '1480.00',          // total - required
      'shipping': '0',               // tax
      'tax': '74.00',                // shipping
      'currency': 'JPY'              // currency code
    });

    ga('ecommerce:addItem', {
      'id': '12345',                          // transaction ID - required
      'name': 'ミニ四Q ライトニングマ○ナム', // product name
      'sku': 'MINI4Q-LIGHTNING-MAONUM',       // SKU/code - required
      'category': 'MINI4Q',                   // category or variation
      'price': '700.00',                      // unit price - required
      'quantity': '1',                        // quantity - required
      'currency': 'JPY'                       // currency code
    });

    ga('ecommerce:addItem', {
      'id': '12345',
      'name': 'カッターのこ III',
      'sku': 'MINI4Q-HANDYCRAFT-CUTTERNOKO3',
      'category': 'MINI4Q',
      'price': '780.00',
      'quantity': '1',
      'currency': 'JPY'
    });

    ga('ecommerce:send');
</script>
```

新 E コマーストラッキングコードを簡単に解説すると...

```
// E コマース用のプラグインを読み込む
ga('require', 'ecommerce', 'ecommerce.js');

// トランザクションの追加
ga('ecommerce:addTransaction', {
    ~~~~
});

// アイテムの追加
ga('ecommerce:addItem', {
    ~~~~
});

// データの送信
ga('ecommerce:send');
```

といった感じになります。


### 脱線...

因みに、何でトラッキングコードの引数名（`i,s,o,g,r,a,m`）が意味ありげな `Isogram` なんだろうと調べたら `Nonpattern word` （繰り返しのない単語）として知られている単語らしい。

```
             Isogram
                |
          -------------
(function(i,s,o,g,r,a,m){
 ~~~~
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
```

確かに引数の名前に使いやすい。

他にも色々な [Isogram](http://en.wikipedia.org/wiki/Isogram) があるようです。

ドイツ語の Isogram、長い... `Heizölrückstoßabdämpfung`


### 参考 URL

- [e コマース トランザクションの破棄 - アナリティクス ヘルプ](https://support.google.com/analytics/answer/1037443?hl=ja)
- [Ecommerce Tracking - Web Tracking (ga.js) - Google Analytics — Google Developers](https://developers.google.com/analytics/devguides/collection/gajs/gaTrackingEcommerce)
- [Ecommerce Tracking - Web Tracking (analytics.js) - Google Analytics — Google Developers](https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce)
