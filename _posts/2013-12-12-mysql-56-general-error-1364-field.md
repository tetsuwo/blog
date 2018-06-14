---
layout: post
title: "MySQL 5.6 で General error: 1364 Field ’{COLUMN_NAME}’ doesn’t have a default value エラーの対処"
date: 2013-12-12 09:00:00 +0900
categories: MySQL
tags:
- MySQL
---

MySQL 5.5 から MySQL 5.6 への移行検証中に INSERT で以下のようなエラーが発生しました。

```
SQLSTATE[HY000]: General error: 1364 Field '{COLUMN_NAME}' doesn't have a default value
```

ググってみると同じ問題を [Stack Overflow](http://stackoverflow.com/questions/11733266/field-x-doesnt-have-a-default-value) で発見。

結論からいうと MySQL 5.6 から MySQL のシステム変数である `sql_mode` のデフォルト値が設定されるようになり、それによりエラーが発生していました。

早速システム変数 `sql_mode` を `SHOW VARIABLES` みてみると...、

```
mysql> SHOW VARIABLES LIKE 'sql_mode';
+---------------+--------------------------------------------+
| Variable_name | Value                                      |
+---------------+--------------------------------------------+
| sql_mode      | STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION |
+---------------+--------------------------------------------+
1 row in set (0.00 sec)
```

`STRICT_TRANS_TABLES` と `NO_ENGINE_SUBSTITUTION` という値が入っている。

それぞれの値の説明は公式リファレンスに記載されていました。


**STRICT_TRANS_TABLES**

> トランザクションのストレージ エンジンに対して、Strict Mode を有効にする。非トランザクションのストレージ エンジンに対しても可能な場合ある。
> 
> Strict Mode は、MySQL が無効または不明な入力値をどのように処理するかを制御します。何らかの理由で値は無効になることがあります。たとえば、カラムに対して違うデータの入力、範囲を超える入力などがあった場合です。値が不明であるということは、挿入する新規のレコードに、カラム値がない場合で、定義に、明示的な DEFAULT 節がないときです。
> 
> トランザクション テーブルでは、無効または不明な値がクエリにある場合はエラーになります。これは、STRICT_ALL_TABLES または STRICT_TRANS_TABLES のどちらかのモードが有効になっている場合に起こります。クエリは中断、そしてロールバックの対象になります。
> 
> 最初の行で挿入または更新するときに、bad 値が発生する場合、非トランザクションのテーブルでは、どちらのモードでも同様に動作します。クエリ処理は中断し、テーブルはそのまま変更なしの状態になります。クエリを挿入または複数行を変更した場合に、bad 値が2行目以降に発生する場合は、結果はどの制限オプションを有効に設定しているかに依存します。


**NO_ENGINE_SUBSTITUTION**
 
> デフォルトのストレージ エンジンの自動置換 (substitution) を防ぐ。これは、CREATE TABLE のようなステートメントが、無効化した、またはコンパイルしたストレージ エンジンを指定するときのこと。エラーで知らせる。


ということで、どちらも無効（`sql_mode` を空っぽ）にしてみる。

```
mysql> SET SESSION sql_mode = '';
Query OK, 0 rows affected (0.00 sec)

mysql> SET GLOBAL sql_mode = '';
Query OK, 0 rows affected (0.00 sec)
```


設定ファイルのほうも変更する場合は、`my.cnf` で `sql_mode` を空にすればいい。

```
// my.cnf
sql_mode = ''
```

これでエラーが解消しました。


### 参考記事

- [MySQL :: MySQL 5.6 Reference Manual :: 5.1.7 Server SQL Modes](http://dev.mysql.com/doc/refman/5.6/en/server-sql-mode.html)
- [php - Field 'x' doesn't have a default value - Stack Overflow](http://stackoverflow.com/questions/11733266/field-x-doesnt-have-a-default-value)
- [Mysql Mode On Linux CentOS - Stack Overflow](http://stackoverflow.com/questions/16603947/mysql-mode-on-linux-centos)


### MySQL おすすめ書籍

<a href="https://www.amazon.co.jp/gp/product/4774142948/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774142948&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#1"></a>
<a href="https://www.amazon.co.jp/gp/product/4873116384/t5o-22/ref=nosim"><img src="https://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4873116384&Format=_SL110_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=t5o-22" alt="MySQL おすすめ書籍#2"></a>
