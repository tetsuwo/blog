---
layout: post
title: "MySQL で iOS の絵文字（4bytes UTF-8）が切れる"
date: 2012-11-09 16:35:00 +0900
categories: MySQL
tags:
- MySQL
migration_from: 
- http://tetsuwo.tumblr.com/post/35327902400/mysql-%E3%81%A7-ios-%E3%81%AE%E7%B5%B5%E6%96%87%E5%AD%974bytes-utf-8%E3%81%8C%E5%88%87%E3%82%8C%E3%82%8B
---

MySQL に iOS の絵文字（4bytes UTF-8）が入った文字列を INSERT/UPDATE すると絵文字以降の文字がぶった切られる。

どういうことかというと、下の文字列を MySQL に INSERT/UPDATE する...

    あいうえお [ 絵文字 ] かきくけこ

すると、このようになります。

    あいうえお


symfony1.4 の `Doctrine_Table_Exception Unserialization` のエラーでこの不具合に気付きました。  
データベースに入れた `serialize` データを `unserialize` したときに、上のエラーはかれてデータがぶった切られてることが判明したのです。


### 注意点

この不具合は MySQL 5.5 では直っています。直っているといってもキャラクターセットに `utf8mb4` を指定しなければいけないようです。  
MySQL 5.5 以上で、4 バイト UTF-8 に対応するための詳しい対応方法は、以下の記事が参考になります。  
[鯖管のメモ帳: mysql に 4バイトutf8 の文字を入れたい](http://netsket-koshiba.blogspot.jp/2012/11/mysql-4utf8.html)


### 対応策

MySQL のみでの対応だとバージョンアップするしかないので、それが難しいならアプリケーション側で対応するしかないです。

「[UTF-8において４バイトで表示する文字について，一覧表が載っているHPまたは本って... - Yahoo!知恵袋](http://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q1364613748)」によると以下を除外できればいいみたい。

<!-- more -->

<small>[外字 - Wikipedia](http://ja.wikipedia.org/wiki/%E5%A4%96%E5%AD%97) より引用</small>


    JIS X 0221 (Unicode）における外字
    =================================
    
    Unicodeでは、外字エリアとして私用領域という名称でU+E000〜U+F8FF、U+000F0000〜U+000FFFFD、U+00100000〜U+0010FFFDに外字領域を設けてある。このうち、あとの2つは面単位で用意されているので、私用面と呼ばれる。
    
    Windowsのユーザ外字領域であるShift_JISの0xF040〜0xF9FCはUnicodeのU+E000〜U+E757に順番に対応付けられている。（Shift_JISで0xF07Fなどの使用不可能なコードポイントは飛ばす。）
    
    Windows付属の外字エディタではU+E758〜U+F8FFにも外字を作成可能であるが、そこに作成したものはUnicode環境でのみ使用可能となる。
    
    WingdingsなどのシンボルフォントのグリフはUnicodeではU+F020〜U+F0FFの一部に対応付けられている。
    
    ARIB外字や携帯電話の絵文字などこれまでは外字でしか使用できなかった文字についても、順次Unicodeに含めることが進められている。


正規表現でカットしちゃいましょう。

因みに PHP で `serialize` していたところは `json_encode` にすることで MySQL に INSERT/UPDATE することができました。  
※配列を `serialize` していたので `json_decode` するときは第 2 引数を `true` にした。




### 参考記事

- [漢(オトコ)のコンピュータ道: MySQLコミュニティ騒然！MySQL 5.5.4が与えるインパクト！](http://nippondanji.blogspot.jp/2010/04/mysqlmysql-554.html)
- [UTF-8で4バイトになる文字 at softelメモ](http://www.softel.co.jp/blogs/tech/archives/596)
- [iOS Emoji](http://punchdrunker.github.com/iOSEmoji/table_html/)
- [MySQLで4バイトのUTF-8文字を扱ってみる - HHeLiBeXの日記 正道編](http://d.hatena.ne.jp/hhelibex/20120110/1326179698)


### MySQL おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4774142948/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774142948&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4873116384/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873116384&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#2"></a>
