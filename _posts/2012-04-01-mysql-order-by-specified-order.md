---
layout: post
title: "MySQL の ORDER BY で指定した順番に並び替える（並び順を明示する）"
date: 2012-04-01 09:00:00 +0900
categories: MySQL
tags:
- MySQL
migration_from: 
- http://tetsuwo.tumblr.com/post/20284290860/mysql-%E3%81%AE-order-by-%E3%81%A7%E6%8C%87%E5%AE%9A%E3%81%97%E3%81%9F%E9%A0%86%E7%95%AA%E3%81%AB%E4%B8%A6%E3%81%B3%E6%9B%BF%E3%81%88%E3%82%8B%E4%B8%A6%E3%81%B3%E9%A0%86%E3%82%92%E6%98%8E%E7%A4%BA%E3%81%99%E3%82%8B
---

ずっとドラフト入りっぱなしだった...orz  
`FIELD` を使用すると指定した順番でデータが取得できます。

    ORDER BY FIELD(id, 3, 5, 1, 2, 4) ASC|DESC

たとえばこんなデータで試すと...

    CREATE TABLE unchicchi ( id INT(1) );
    INSERT INTO unchicchi ( id ) VALUES ( 1 ), ( 2 ), ( 3 ), ( 4 ), ( 5 );


[[MORE]]


普通に取得する  
`SELECT id FROM unchicchi;`

    +----+
    | id |
    +----+
    |  1 |
    +----+
    |  2 |
    +----+
    |  3 |
    +----+
    |  4 |
    +----+
    |  5 |
    +----+


指定した並び順で取得する  
`SELECT id FROM unchicchi ORDER BY FIELD(id, 3, 5, 1, 2, 4);`

    +----+
    | id |
    +----+
    |  3 |
    +----+
    |  5 |
    +----+
    |  1 |
    +----+
    |  2 |
    +----+
    |  4 |
    +----+


指定した並び順から降順で取得する  
`SELECT id FROM unchicchi ORDER BY FIELD(id, 3, 5, 1, 2, 4) DESC;`

    +----+
    | id |
    +----+
    |  4 |
    +----+
    |  2 |
    +----+
    |  1 |
    +----+
    |  5 |
    +----+
    |  3 |
    +----+


### 参考

- [MySQL :: MySQL 5.1 リファレンスマニュアル (オンラインヘルプ) :: 7.4 文字列関数 : FIELD(str,str1,str2,str3,...)](http://dev.mysql.com/doc/refman/5.1-olh/ja/string-functions.html#function_field)


### MySQL おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4774142948/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774142948&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4873116384/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873116384&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#2"></a>
