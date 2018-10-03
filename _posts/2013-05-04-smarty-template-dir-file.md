---
layout: post
title: "Smarty: テンプレート読み込みで template_dir のルートから相対指定する方法"
date: 2013-05-04 14:01:00 +0900
categories: Smarty
tags:
- Smarty
- Template Engine
---

FuelPHP で Smarty を使っていたら以下のエラーが発生したのでメモ。

    SmartyException [ Error ]: Unable to read template file '../******.tpl

単純にテンプレートディレクトリーの階層を切り過ぎて、相対パスがあわなくなって、テンプレートファイルが読み込めないために起きているのだが、何かいい方法はないのか。

問題が起きた構造は以下のような感じ。

    views/
     + common/
     |  |
     |  +- base.tpl
     |  |
     |  +- footer.tpl
     |  |
     |  +- header.tpl
     |
     + welcome/
        |
        +- index.tpl
        |
        +- hoge/
            |
            +- fuga.tpl


こういった構造のときに以下のように読み込んでエラーがでました。

    // views/common/base.tpl
    {include="./header.tpl"}
    ...
    {include="./footer.tpl"}

    // views/welcome/index.tpl
    {include="../common/base.tpl"}
    -> ok

    // views/welcome/my/fuga.tpl
    {include="../../common/base.tpl"}
    -> ng (SmartyException [ Error ]: Unable to read template file '../******.tpl)


これを解消するには `file:` を使います。

<!-- more -->

    // views/common/base.tpl
    {include="file:common/header.tpl"}
    {include="file:common/footer.tpl"}

    // views/welcome/index.tpl
    {include="../common/base.tpl"} or {include="file:common/base.tpl"}
    -> ok

    // views/welcome/my/fuga.tpl
    {include="../../common/base.tpl"} or {include="file:common/base.tpl"}
    -> ok

`file:` はテンプレートディレクトリーのルートからの参照なので相対的にあっているか気にする必要がないのです。

※勿論、テンプレートディレクトリーは使用するフレームワークによって異なります。


### 参考 URL

- [{include} | Smarty](http://www.smarty.net/docsv2/en/language.function.include.tpl)
