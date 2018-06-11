---
layout: post
title: "C#/XAML: ComboBox を選択不可能・読み取り専用（IsReadOnly）にする"
date: 2014-03-16 09:00:00 +0900
categories: C-Sharp XAML
tags:
- C-Sharp
- XAML
- WPF
---

※ **.NET Framework 4.5** が対象です。

HTML ではフォーム系の要素に readonly プロパティを記述するだけで「読み取り専用」の状態になりますが、C# では `IsReadOnly` を真にするだけだとプルダウンから違う値を選択できてしまいます。

結論からいうと ComboBox を読み取り専用にするには ComboBox に `IsReadOnly=True` と `IsTabStop=False`、`IsHitTestVisible=False` を同時に設定する必要があります。

```
// XAML
<ComboBox
    IsReadOnly="True"
    IsHitTestVisible="False"
    IsTabStop="False" />
```


### MSDN でそれぞれのプロパティを調べてみると...

ComboBox.IsReadOnly（引用 - [MSDN](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.combobox.isreadonly(v=vs.110).aspx)）

> 選択専用モードを有効にする値を取得または設定します。選択専用モードでは、コンボボックスの内容は選択可能ですが、編集することはできません。
> 
> プロパティ値
> 型 : System.Boolean
> ComboBox が読み取り専用である場合は true。それ以外の場合は false。 既定値は、false です。

<!-- more -->

UIElement.IsHitTestVisible（引用 - [MSDN](http://msdn.microsoft.com/ja-jp/library/system.windows.uielement.ishittestvisible(v=vs.110).aspx)）

> 描画されたコンテンツの一部からヒット テスト結果としてこの要素が返される可能性があるかどうかを宣言する値を取得または設定します。 これは、依存関係プロパティです。
> 
> プロパティ値
> 型 : System.Boolean
> 少なくとも 1 つのポイントからヒット テスト結果としてこの要素が返される場合は true。それ以外の場合は false。 既定値は true です。

Control.IsTabStop（引用 - [MSDN](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.control.istabstop(v=vs.110).aspx)）

> コントロールがタブ ナビゲーションに含まれるかどうかを示す値を取得または設定します。
> プロパティ値
> 型 : System.Boolean
> コントロールがタブ ナビゲーションに含まれる場合は true。それ以外の場合は false。 既定値は、true です。

ということでして、`IsReadOnly` はそもそも選択肢の変更が行えてしまうようです。  
そのため、`IsHitTestVisible` で当たり判定を返さないようにし、`IsTabStop` で TAB キーでの移動に含まれないようにしなければならないようです。


### 参考記事

- [ComboBox.IsReadOnly プロパティ (System.Windows.Controls)](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.combobox.isreadonly(v=vs.110).aspx)
- [UIElement.IsHitTestVisible プロパティ (System.Windows)](http://msdn.microsoft.com/ja-jp/library/system.windows.uielement.ishittestvisible(v=vs.110).aspx)
- [Control.IsTabStop プロパティ (System.Windows.Controls)](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.control.istabstop(v=vs.110).aspx)


### C#、WPF おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4798114200/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4798114200&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="WPF おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4822298477/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4822298477&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="C# おすすめ書籍#2"></a>
