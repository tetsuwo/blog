---
layout: post
title: "CKEditor: 書式を無視してプレーンテキストで貼り付ける"
date: 2015-02-05 09:00:00 +0900
categories: CKEditor
tags:
- CKEditor
---

CKEditor 4 系において、書式を無視してプレーンテキストでペーストする設定はないものかとドキュメントを漁っていたらありました。

[CKEDITOR.config - CKEditor 4 Documentation](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-forcePasteAsPlainText)

内容を引用すると...

> **forcePasteAsPlainText** : Boolean
> 
> Whether to force all pasting operations to insert on plain text into the editor, loosing any formatting information possibly available in the source text.
> 
> Note: paste from word (dialog) is not affected by this configuration.
> 
>     config.forcePasteAsPlainText = true;
>
> Defaults to: false

これを使えばできそうだ。

```
CKEDITOR.on('instanceCreated', function(event) {
    var editor = event.editor,
    editor.on('configLoaded', function() {
        editor.config.forcePasteAsPlainText = true;
    });
});
```

↑のようにインスタンス作成時に設定を上書きして適用しました。


### 参考 URL

- [CKEDITOR.config - CKEditor 4 Documentation](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-forcePasteAsPlainText)
