---
layout: post
title: "mysqldump コマンドで条件（WHERE）を指定してダンプする方法"
date: 2014-05-16 10:29:00 +0900
categories: MySQL
tags:
- MySQL
- mysqldump
- Database
migration_from: 
- http://tetsuwo.tumblr.com/post/85872149692/mysqldump-where-conditions
---


`mysqldump` コマンドだけで条件を指定してダンプデータって取れるのかな？と思って公式マニュアル見てみたらちゃんと書いてありました。

（引用元: [MySQL :: MySQL 5.1 リファレンスマニュアル :: 7.11 mysqldump - データベースバックアッププログラム](http://dev.mysql.com/doc/refman/5.1/ja/mysqldump.html)）

> --where='where_condition', -w 'where_condition'  
> あるWHERE状態に選択された行のみダンプします。ユーザのコマンドインタープリタにとって特別なキャラクタ、もしくはスペースを含んでいる場合、状態の周りをクオートで囲まなければいけません。  
> 例：
> 
>     --where="user='jimf'"
>     -w"userid>1"
>     -w"userid<1"

本当に指定した条件でダンプされるか試すためにテスト用のデータを作ります。

    mysql> CREATE DATABASE testdb;
    Query OK, 1 row affected (0.00 sec)

    mysql> use testdb;
    Database changed

    mysql> CREATE TABLE users (id INTEGER, name VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, PRIMARY KEY(id)) ENGINE = InnoDB;
    Query OK, 0 rows affected (0.01 sec)

    mysql> INSERT INTO users (id, name, email) VALUES (1, 'test-1', '*****@xxxx.yyy'), (2, 'test-2', '*****@xxxx.zzz'), (3, 'test-3', '*****@xxxx.yyy'), (4, 'hoge-4', '*****@xxxx.zzz'), (5, 'fuga-5', '*****@xxxx.zzz');
    Query OK, 5 rows affected (0.01 sec)
    Records: 5  Duplicates: 0  Warnings: 0

    mysql> SELECT * FROM users;
    +----+--------+----------------+
    | id | name   | email          |
    +----+--------+----------------+
    |  1 | test-1 | *****@xxxx.yyy |
    |  2 | test-2 | *****@xxxx.zzz |
    |  3 | test-3 | *****@xxxx.yyy |
    |  4 | hoge-4 | *****@xxxx.zzz |
    |  5 | fuga-5 | *****@xxxx.zzz |
    +----+--------+----------------+
    5 rows in set (0.00 sec)

    mysql> quit
    Bye

これから叩くダンプコマンドの説明です。

    $ mysqldump -u {ユーザー名} {データベース名} {デーブル名} -t --where="{条件}" > dump.sql


{条件} は SQL の WHERE 句に記述する条件と同じです。

ではテストデータの `email` が `@xxxx.zzz` で終わる行だけをダンプしてみましょう。

    $ mysqldump -u root testdb users -t --where="email LIKE '%@xxxx.zzz'" > dump-1.sql

dump-1.sql の中身をみてみましょう。

    -- MySQL dump ***** ******************
    --
    -- Host: localhost    Database: testdb
    -- ------------------------------------------------------
    -- Server version       *******
    
    /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
    /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
    /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
    /*!40101 SET NAMES utf8 */;
    /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
    /*!40103 SET TIME_ZONE='+00:00' */;
    /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
    /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
    /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
    /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
    
    --
    -- Dumping data for table `users`
    --
    -- WHERE:  email LIKE '%@xxxx.zzz'
    
    LOCK TABLES `users` WRITE;
    /*!40000 ALTER TABLE `users` DISABLE KEYS */;
    INSERT INTO `users` VALUES (2,'test-2','*****@xxxx.zzz'),(4,'hoge-4','*****@xxxx.zzz'),(5,'fuga-5','*****@xxxx.zzz');
    /*!40000 ALTER TABLE `users` ENABLE KEYS */;
    UNLOCK TABLES;
    /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
    
    /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
    /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
    /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
    /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
    /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
    /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
    /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
    
    -- Dump completed on Y-m-d H:i:s


`Dumping data for table users` の WHERE に条件が反映されていますね。

実際にリストアして `SELECT` してみましょう。


    mysql> CREATE DATABASE testdb_1;
    Query OK, 1 row affected (0.00 sec)

    mysql> use testdb_1;
    Database changed

    mysql> CREATE TABLE users (id INTEGER, name VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, PRIMARY KEY(id)) ENGINE = InnoDB;
    Query OK, 0 rows affected (0.01 sec)

    mysql> quit
    Bye

    $ mysql -u root testdb_1  SELECT * FROM users;
    +----+--------+----------------+
    | id | name   | email          |
    +----+--------+----------------+
    |  2 | test-2 | *****@xxxx.zzz |
    |  4 | hoge-4 | *****@xxxx.zzz |
    |  5 | fuga-5 | *****@xxxx.zzz |
    +----+--------+----------------+
    3 rows in set (0.00 sec)


次に複数条件を試してみます。先程の条件にプラスして、`name` が `test` で始まる行をダンプしてみましょう。

    $ mysqldump -u root testdb users -t --where="email LIKE '%@xxxx.zzz' AND name LIKE 'test%'" > dump-2.sql
    $ less dump-2.sql
    .
    .
    .
    --
    -- Dumping data for table `users`
    --
    -- WHERE:  email LIKE '%@xxxx.zzz' AND name LIKE 'test%'
    
    LOCK TABLES `users` WRITE;
    /*!40000 ALTER TABLE `users` DISABLE KEYS */;
    INSERT INTO `users` VALUES (2,'test-2','*****@xxxx.zzz');
    /*!40000 ALTER TABLE `users` ENABLE KEYS */;
    UNLOCK TABLES;
    /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
    .
    .
    .


`IN` も問題なく使えました。

    $ mysqldump -u root testdb users -t --where="id IN (1, 3, 5)" > dump-3.sql
    $ less dump-3.sql
    .
    .
    .
    --
    -- Dumping data for table `users`
    --
    -- WHERE:  id IN (1, 3, 5)
    
    LOCK TABLES `users` WRITE;
    /*!40000 ALTER TABLE `users` DISABLE KEYS */;
    INSERT INTO `users` VALUES (1,'test-1','*****@xxxx.yyy'),(3,'test-3','*****@xxxx.yyy'),(5,'fuga-5','*****@xxxx.zzz');
    /*!40000 ALTER TABLE `users` ENABLE KEYS */;
    UNLOCK TABLES;
    /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
    .
    .
    .


便利。


### 参考 URL

- [MySQL :: MySQL 5.1 リファレンスマニュアル :: 7.11 mysqldump - データベースバックアッププログラム](http://dev.mysql.com/doc/refman/5.1/ja/mysqldump.html)


### MySQL おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4774142948/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774142948&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4873116384/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873116384&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#2"></a>
