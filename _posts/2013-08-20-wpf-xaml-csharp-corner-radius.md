---
layout: post
title: "WPF: XAML、C# で Border の角丸（Corner Radius）"
date: 2013-08-20 20:47:00 +0900
categories: C-Sharp
tags:
- C-Sharp
- XAML
- WPF
migration_from: 
- http://tetsuwo.tumblr.com/post/58781845366/wpf-xaml-csharp-corner-radius
---

初の C# 記事です。

WPF で角丸を実現したいときありますよね。
`Border` のときは `CornerRadius`、`Rectangle` のときは `RadiusX`, `RadiusY` をプロパティーで指定すれば角丸になります。

以下、サンプルコードです。  
※ `using` 使えばコードは短くなりますが、敢えて全部書いちゃいます

`Border` のサンプルコード

    // XAML
    <border borderbrush="#FF000000" borderthickness="1" background="#FFFFFFFF" padding="5" cornerradius="5"></border>

    // C#
    myBorder = new System.Windows.Controls.Border();
    myBorder.BorderBrush = (Brush)new BrushConverter().ConvertFromString("#FF000000");
    myBorder.BorderThickness = new System.Windows.Thickness(1);
    myBorder.Background = (Brush)new BrushConverter().ConvertFromString("#FFFFFFFF");
    myBorder.Padding = new System.Windows.Thickness(5);
    myBorder.CornerRadius = new CornerRadius(5);


`Rectangle` のサンプルコード

<!-- more -->

    // XAML
    <rectangle stroke="#FF000000" strokethickness="1" fill="#FFFFFFFF" radiusx="5" radiusy="5"></rectangle>

    // C#
    myRect = new System.Windows.Shapes.Rectangle();
    myRect.Stroke = (Brush)new BrushConverter().ConvertFromString("#FF000000");
    myRect.StrokeThickness = new System.Windows.Thickness(1);
    myRect.Fill = (Brush)new BrushConverter().ConvertFromString("#FFFFFFFF");
    anyElement.Children.Add(myRect);


### 参考 URL

- [Border.CornerRadius Property (System.Windows.Controls)](http://msdn.microsoft.com/en-us/library/system.windows.controls.border.cornerradius.aspx)
- [Rectangle Class (System.Windows.Shapes)](http://msdn.microsoft.com/en-us/library/System.Windows.Shapes.Rectangle.aspx)
- [How to convert color code into media.brush? - Stack Overflow](http://stackoverflow.com/questions/6808739/how-to-convert-color-code-into-media-brush)
- [Convert string to Brushes/Brush color name in C# - Stack Overflow](http://stackoverflow.com/questions/372693/convert-string-to-brushes-brush-color-name-in-c-sharp)


### C#、WPF おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4798114200/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4798114200&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="WPF おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4822298477/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4822298477&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="C# おすすめ書籍#2"></a>
