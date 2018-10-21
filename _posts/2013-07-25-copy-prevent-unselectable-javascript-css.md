---
layout: post
title: "jQuery を使ったテキストのコピー防止 JavaScript, CSS"
date: 2013-07-25 09:00:00 +0900
categories: jQuery
tags:
- jQuery
- JavaScript
- CSS
---

昔、`unselectable` なんて属性があった気がしましたが、使えなかったので、今風のコピー防止対処の仕方はどうなのか調べてみました。

*コピーイベントを無効化* ： コピーショートカットキーが押下されたら return false を返し無効化する。

    $('.prevent-copy').on('copy', function() {
        return false;
    });


*コンテキストメニューを無効化* ： Windows だとマウスの右クリックで出現するコンテキストメニューを return false を返し無効化する。

    $('.prevent-copy').on('contextmenu', function() {
        return false;
    });

*貼り付けイベント無効化* ： コピー不可能なエリアというと、大体は書き換え不可能な `readonly` な箇所だと思うので、ペーストイベントも殺しておく。

    $('.prevent-copy').on('paste', function() {
        return false;
    });


*テキスト選択を無効化（CSS）* ： 最後に CSS レベルでテキスト選択を無効化する。

    .prevent-copy {
        -webkit-user-select: none;
        user-select: none;
    }


まとめるとこんな感じ

<!-- more -->

    // コピー防止
    $('.prevent-copy')
        .css('user-select', 'none')
        .on('copy paste contextmenu', false);

デモ
<script type="text/javascript" src="http://jsdo.it/blogparts/mMeP/js"></script>


因みに [jQuery の公式ドキュメント](http://api.jquery.com/on/) にも記載されていますが、以下のイベント無効化は同義です。

    // 通常版
    $(selector).on('eventType', function() {
        return false 
    });

    // 短縮版
    $(selector).on('eventType', false);

上記のようにコールバック引数の `function () { return false }` は `false` に置き換えられます。


### 参考 URL

- [user-select - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)
- [Event compatibility tables](http://www.quirksmode.org/dom/events/)
- [Event reference - Web technology reference | MDN](https://developer.mozilla.org/en-US/docs/Web/Reference/Events)
- [.on() | jQuery API Documentation](http://api.jquery.com/on/)
