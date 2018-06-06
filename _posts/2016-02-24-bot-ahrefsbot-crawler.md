---
layout: post
title: "Bot: AhrefsBot/3.0"
date: 2016-02-24 09:00:00 +0900
categories: Crawler (Bot)
tags:
- Crawler (Bot)
migration_from: 
- http://tetsuwo.tumblr.com/post/139909649992/bot-ahrefsbot-crawler
---

このユーザーエージェントも、自分の管理するサービスでちょくちょく見かけるものです。

    Mozilla/5.0 (compatible; AhrefsBot/5.0; +http://ahrefs.com/robot/)

Ahrefs（エーエイチレフス？）は SEO のチェックツールを提供している会社という認識ですが、念のため調べてみる。

> Ahrefsは2011年に発足。  
> シンガポールとウクライナの多国籍企業が運営するSEO分析ツールです。  
> 世界７か国語に対応し、facebook、Twitter、Google＋などのソーシャルシグナルにも対応した世界で約12万人のサイト運営管理者が様にご利用いただいています。  
> 使い勝手・実績・性能いずれも最高峰のSEO分析ツールです。
> 
> 引用：https://www.affiliate-b.com/web/ahrefs/

[Ahrefs](https://ahrefs.com/) を見てみても分かる通り、有償にて SEO ツール類を提供しているサービスのようです。  
（最初に知ったときは無料で使えたような気がしたけど）

次にユーザーエージェント上でも示されている URL（ http://ahrefs.com/robot/ ）にアクセスしてみます。  
とても新設なページで、robots.txt の記述の仕方が分かりやすく載っています。  

全体的に拒否したい場合、

    User-agent: AhrefsBot
    Disallow: /

クロール頻度を調整したい場合、

    User-agent: AhrefsBot 
    Crawl-Delay: 2

のように載っています。

紳士的なクローラーのように見受けられます。
