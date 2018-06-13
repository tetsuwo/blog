---
layout: post
title: "C#/XAML: WPF の TextBox を複数行入力（マルチライン）に対応させる"
date: 2014-03-04 09:00:00 +0900
categories: C-Sharp
tags:
- C-Sharp
- XAML
- WPF
---

※ **.NET Framework 4.5** が対象です。

XAML には HTML のように複数行入力欄の textarea のようなコントロールはありません。

TextBox のプロパティに複数行入力できるよう設定することで初めて複数行入力することができます。


### XAML ベースでの複数行入力欄

XAML ベースで設定する場合は少し冗長な感じになります。

```
<TextBox
    AcceptsReturn="True"
    TextWrapping="Wrap"
    VerticalContentAlignment="Top"
    Height="100" />
```


### XAML のスタイル化

スタイル化すると XAML に記述するプロパティ数・重複コードが減り、XAML の可読性もあがるのでオススメです。

<!-- more -->

```
<Style TargetType="{x:Type TextBox}" x:Key="Textarea">
    <Setter Property="AcceptsReturn" Value="True" />
    <Setter Property="TextWrapping" Value="Wrap" />
    <Setter Property="VerticalContentAlignment" Value="Top" />
</Style>

<TextBox Style="{StaticResource Textarea}" />
```


### C# で複数行入力欄

```
TextBox textbox = new TextBox();
textbox.AcceptsReturn = True;
textbox.TextWrapping = TextWrapping.Wrap;
textbox.VerticalContentAlignment = VerticalAlignment.Top;
```


### MSDN でそれぞれのプロパティを調べてみると...

TextBoxBase.AcceptsReturn（引用 - [MSDN](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.primitives.textboxbase.acceptsreturn(v=vs.110).aspx)）
> Enter キーが押されたとき、テキスト編集コントロールがどのように反応するかを示す値を取得または設定します。
> 
> プロパティ値
> 型 : System.Boolean
> Enter キーを押しても現在のカーソル位置に新しい行を挿入する場合true ; それ以外の場合は、 Enter キーは無視されます。 既定値は RichTextBoxの TextBox と true の false です。

TextBox.TextWrapping（引用 - [MSDN](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.textbox.textwrapping(v=vs.110).aspx)）
> テキスト ボックスのテキスト折り返し方法を取得または設定します。
> 
> プロパティ値
> 型 : System.Boolean
> テキスト ボックスのテキスト折り返し方法を示す TextWrapping 値のいずれか。 既定値は、TextWrapping.NoWrap です。

つまりは Enter キーを押して新しい行を挿入しつつ、TextBox のテキスト折り返しを有効にすることで複数行入力が実現できます。


### 参考記事

- [WPF TextBox Wrapping - Stack Overflow](http://stackoverflow.com/questions/7828691/wpf-textbox-wrapping)
- [TextBoxBase.AcceptsReturn プロパティ (System.Windows.Controls.Primitives)](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.primitives.textboxbase.acceptsreturn(v=vs.110).aspx)
- [TextBox.TextWrapping プロパティ (System.Windows.Controls)](http://msdn.microsoft.com/ja-jp/library/system.windows.controls.textbox.textwrapping(v=vs.110).aspx)
