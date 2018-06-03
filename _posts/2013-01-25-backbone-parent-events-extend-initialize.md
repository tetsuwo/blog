---
layout: post
title: "Backbone: 親イベントの継承方法（events, initialize プロパティでの継承）"
date: 2013-01-25 09:00:00 +0900
categories: JavaScript
tags:
- JavaScript
- Backbone
migration_from: 
- http://tetsuwo.tumblr.com/post/41376859784/backbone-parent-events-extend-initialize
---


まずは Backbone で書いたこんなコードがあります。
    
    var App = { View: {} };
    
    App.View.Hoge = Backbone.View.extend({
        events: {
            'click #hello': 'hello'
        },
        hello: function() {
            alert('Hello!');
        }
    });

これを動かすと、当然、以下のように `Hello!` ボタンをクリックすることでアラートが表示されます。

<!-- more -->

<script type="text/javascript" src="http://jsdo.it/blogparts/r0rL/js?width=465&amp;height=496&amp;view=screenshot"></script>


----


次に、この `App.View.Hoge` を継承して新しい `App.View.Fuga` を作ります。

    App.View.Fuga = App.View.Hoge.extend({
        events: {
            'click #thankyou': 'thank'
        },
        thank: function() {
            alert('Thank you!');
        }
    });
    
    var FugaView = new App.View.Fuga({ el: '#hello-application' });

これを動かしてみると、`Hello!` ボタンをクリックしてもアラートが表示されません。  
しかし、新しく定義した `Thank you!` ボタンは指定したアラートが表示されます。

<script type="text/javascript" src="http://jsdo.it/blogparts/fFAY/js?width=465&amp;height=496&amp;view=screenshot"></script>


----


親のイベントを継承するには、`events` プロパティに以下のように書くことで実現可能です。

    App.View.Fuga = App.View.Hoge.extend({
        events: function() {
            return _.extend({}, App.View.Hoge.prototype.events, {
                'click #thankyou': 'thank'
            });
        },
        thank: function() {
            alert('Thank you!');
        }
    });

これで動かしてみると `Hello!` ボタンも `Thank you!` ボタンもアラートが表示されると思います。

<script type="text/javascript" src="http://jsdo.it/blogparts/sP9O/js?width=465&amp;height=496&amp;view=screenshot"></script>


----


他にも `initialize` で継承する方法があります。

    App.View.Fuga = App.View.Hoge.extend({
        events: {
            'click #thankyou': 'thank'
        },
        initialize: function() {
            this.events = _.extend({}, App.View.Hoge.prototype.events, this.events);
        },
        thank: function() {
            alert('Thank you!');
        }
    });

<script type="text/javascript" src="http://jsdo.it/blogparts/3lNt/js?width=465&amp;height=496&amp;view=screenshot"></script>


----


上記の２つ以外にも方法がありまして、`originalEvents` プロパティと `additionalEvents` プロパティを用意して `events` プロパティでマージする方法もわかりやすいです。

また、さらに継承する際には、親の `events` プロパティが `Function` かどうかを判断する必要があったりします。

これらの方法については参考記事をみていただければ幸いです。


### 参考記事
 
- [javascript - Backbone View: Inherit and extend events from parent - Stack Overflow](http://stackoverflow.com/questions/9403675/backbone-view-inherit-and-extend-events-from-parent)
