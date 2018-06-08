---
layout: post
title: "C#: WPF で App.config から設定情報を取得する"
date: 2014-03-14 09:00:00 +0900
categories: C-Sharp
tags:
- C-Sharp
migration_from: 
- http://tetsuwo.tumblr.com/post/79473164941/c-sharp-configuration-manager-app-config
---

`App.config` で設定した情報を C# プログラム内で使いたいときってありますよね。

`System.Configuration` を**参照追加**から追加します。

`App.config` に何か適当に記述しておきます。  
※今回は丁度 Windows Azure の接続文字列を取得したかったのでそれで。

    // App.config
    <?xml version="1.0" encoding="utf-8" ?><configuration><startup><supportedruntime version="v4.0" sku=".NETFramework,Version=v4.5"></supportedruntime></startup><connectionstrings><add name="AzureAccountInfo" connectionstring="DefaultEndpointsProtocol=https;AccountName=[ACCOUNT_NAME];AccountKey=[ACCOUNT_KEY]"></add></connectionstrings></configuration>


`MainWindow.xaml.cs` で参照追加で追加した `System.Configuration` から `ConfigurationManager` を呼び出します。

    // MainWindow.xaml.cs
    var azureAccountInfo = System.Configuration.ConfigurationManager.ConnectionStrings["AzureAccountInfo"];
    Console.WriteLine("AzureAccountInfo: {0}", azureAccountInfo);


結果、

<!-- more -->

    AzureAccountInfo: DefaultEndpointsProtocol=https;AccountName=[ACCOUNT_NAME];AccountKey=[ACCOUNT_KEY]   

できましたね。

C# がよくわからんという人は [プログラミングC#](http://www.amazon.co.jp/dp/4873116503/tetsukamp-22/ref=nosim) でも読みましょう。


### 参考記事

- [[C#] ConfigurationManager クラスを使用して構成ファイルから接続文字列を取得する 言語: C#](http://code.msdn.microsoft.com/windowsdesktop/DataAccess-howto-2e8cc311)
