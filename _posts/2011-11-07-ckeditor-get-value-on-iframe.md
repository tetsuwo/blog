---
layout: post
title: "CKEditor: iframe 内の値を取得・設定する方法"
date: 2011-11-07 09:00:00 +0900
categories: CKEditor
tags:
- CKEditor
- JavaScript
---

※ CKEditor 4 の話です。

HTML 上で MS Word のようなリッチテキストエディター（WYSIWYG：ウィジウィグ）が実現できることで有名な *CKEditor*。


```
CKEDITOR.replace('hoge');
```

以下のように HTML ドキュメント上の要素 `id="hoge"（#hoge）` に対して CKEditor を適用している場合、 これで値を取得できる。

```
CKEDITOR.instances.hoge.getData();
```

CKEditor ではブラウザー上で WYSIWYG を実現するために内部で iframe を用いています。

ということもあいまって iframe 内を自力で参照するやり方をしている方がいらっしゃいますが ↑ だけでいけるのです。


取得ではなく、逆に値を設定するにはこれで

```
CKEDITOR.instances.hoge.setData('<p>値がセットできた！</p>');
```


### 参考

- http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.editor.html
