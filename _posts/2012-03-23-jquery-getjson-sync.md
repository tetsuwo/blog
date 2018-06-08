---
layout: post
title: "jQuery.getJSON で同期通信させる"
date: 2012-03-23 09:09:00 +0900
categories: jQuery
tags:
- jQuery
- JavaScript
migration_from: 
- http://tetsuwo.tumblr.com/post/19776253444/jquerygetjson-%E3%81%A7%E5%90%8C%E6%9C%9F%E9%80%9A%E4%BF%A1%E3%81%95%E3%81%9B%E3%82%8B
---

これだと非同期。

```
$.getJSON('unko.json', { type: 'unko' }, function() { gonyogonyo... });
```

getJSON 手前で ajaxSetup の `async` を `false` にしておくと同期通信になる。

```
$.ajaxSetup({ async: false });
$.getJSON('unko.json', { type: 'unko' }, function() { gonyogonyo... });
$.ajaxSetup({ async: true }); // 非同期に戻す
```

※ `async: false` にしたままだと、他の Ajax 通信も同期になるので注意。  
個別に同期通信させたい場合は、素直に $.getJSON を `$.ajax({ async: false })` に書き換えるほうがいいだろう。  
