---
layout: post
title: "MySQL の ORDER BY で NULL を先にもってきて NULL 以外は降順にする"
date: 2011-05-17 18:29:00 +0900
categories: MySQL
tags:
- MySQL
migration_from: 
- http://tetsuwo.tumblr.com/post/5572292332/mysql-order-by-null-null
---

こんなんできたのね・・・。

```
ORDER BY created_at IS NULL ASC, created_at ASC
```

たとえばこんなデータで試すと…

```
CREATE TABLE test ( id INT(1), created_at DATETIME );
INSERT INTO test ( id, created_at ) VALUES ( 1, '2010-05-17 15:29:00' ), ( 2, '2011-05-17 15:29:00' ), ( 3, '2012-05-17 15:29:00' ), ( 4, NULL ), ( 5, NULL);
```

これを created_at 昇順で取得すると NULL が先にきてしまう。

```
SELECT * FROM test ORDER BY created_at ASC;

+----+---------------------+
| id | created_at          |
+----+---------------------+
|  4 | NULL                |
+----+---------------------+
|  5 | NULL                |
+----+---------------------+
|  1 | 2010-05-17 15:29:00 |
+----+---------------------+
|  2 | 2011-05-17 15:29:00 |
+----+---------------------+
|  3 | 2012-05-17 15:29:00 |
+----+---------------------+
```

逆に日付昇順ソートで NULL を最後にもってくるには…

```
SELECT * FROM test ORDER BY created_at IS NULL ASC, created_at ASC;

+----+---------------------+
| id | created_at          |
+----+---------------------+
|  1 | 2010-05-17 15:29:00 |
+----+---------------------+
|  2 | 2011-05-17 15:29:00 |
+----+---------------------+
|  3 | 2012-05-17 15:29:00 |
+----+---------------------+
|  4 | NULL                |
+----+---------------------+
|  5 | NULL                |
+----+---------------------+
```

ほほーう。


## 参考

- https://dev.mysql.com/doc/refman/5.6/ja/working-with-null.html


### MySQL おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4774142948/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774142948&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4873116384/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873116384&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#2"></a>
