---
layout: post
title: "WPF: XAML, C# で TextBlock などの要素内の文字列を改行させる"
date: 2013-08-24 21:16:00 +0900
categories: C-Sharp
tags:
- C-Sharp
- XAML
- WPF
migration_from: 
- http://tetsuwo.tumblr.com/post/59191241888/wpf-xaml-csharp-textblock-break-word-wrap
---

要素のプロパティ内で改行するには以下のサンプルコードのように `&#10;` を挿入します。

```
// XAML
<TextBlock Text="あいうえお&#10;かきくけこ" />

// C#
TextBlock txt = new TextBlock();
txt.Text = "あいうえお" + Environment.NewLine + "かきくけこ";

// C# 環境変数を使わないで
TextBlock txt = new TextBlock();
txt.Text = "あいうえお¥nかきくけこ";

// C# プログラマティックに
TextBlock txt = new TextBlock();
txt.Inlines.Add(new Run("あいうえお"));
txt.Inlines.Add(new Run(Environment.NewLine));
txt.Inlines.Add(new Run("かきくけこ"));
```

次にプロパティ内ではなく、文字列をタグで挟んでいる場合は `<LineBreak />` を挿入します。

```
// XAML
<TextBlock>
    あいうえお<LineBreak />
    かきくけこ
</TextBlock>
```

ふむふむ。


### 参考記事

- [WPF Textblock, linebreak in Text attribute - Stack Overflow](http://stackoverflow.com/questions/837367/wpf-textblock-linebreak-in-text-attribute)
- [TextBlock Class (System.Windows.Controls)](http://msdn.microsoft.com/en-us/library/system.windows.controls.textblock.aspx)


### C#、WPF おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4798114200/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4798114200&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="WPF おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4822298477/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4822298477&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="C# おすすめ書籍#2"></a>
