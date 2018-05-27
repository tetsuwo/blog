---
layout: post
title: "PL/pgSQL の関数やトリガーを使ってみる（PostgreSQL）"
date: 2014-04-12 09:00:00 +0900
categories: PostgreSQL
tags:
- PostgreSQL
- SQL
---


数年ぶりに `PL/pgSQL` に触れる機会があったので、思い出すために基礎を少しおさらいしました。

まずは `PL/pgSQL` とはなんぞ？ってとこで Wikipedia 引用。  
（引用: [PL/pgSQL - Wikipedia](http://ja.wikipedia.org/wiki/PL/pgSQL)）

> PL/pgSQL (Procedural Language/PostgreSQL Structured Query Language) は PostgreSQL ORDBMS でサポートされる手続き言語である。その文法は Oracle Database の PL/SQL と類似している。
> 
> PL/pgSQL は SQL に手続き的な制御構造を加えたプログラミング言語である。繰り返し処理 (FOR) や条件分岐 (IF, CASE) などの制御構文が利用できる。PL/pgSQL で記述された関数は SQL から呼び出すことができ、またトリガによって実行することもできる。

まあざっくり SQL にプログラミング言語を付加しましたということです。

さてと本題に。


## PL/pgSQL の関数やトリガーを使ってみる

1. テスト用 DB の作成・ログイン
2. 関数・トリガーを簡単に試す
3. 引数を取って何かする
4. 関数・トリガーの削除
5. 参考サイト・URL

[[MORE]]

### 1. テスト用の DB を作ってログインしておく

PostgreSQL がコマンドラインで利用できる環境下にて以下のコマンドを発行し、DB 作成、ログインを行う。

```
$ createdb testdb
$ psql testdb
```

※ ポスグレは私が人生で最初に触れた RDBMS なので、上のコマンドでのログインの仕方なんかも懐かしくてタイプしたときに色々思いました。...先輩。

### 2. 簡単な関数を作ってトリガーを仕込んで PL/pgSQL を体験してみる

```
testdb=# CREATE FUNCTION set_timestamp() RETURNS TRIGGER AS $$
    BEGIN                                         -- DECLARE を利用すると変数が利用可能
        IF (TG_OP = 'INSERT') THEN                -- INSERT だったら
            NEW.created_at := CURRENT_TIMESTAMP;  -- CURRENT_TIMESTAMP を最新の created_at に代入
        ELSIF (TG_OP = 'UPDATE') THEN             -- UPDATE だったら
            NEW.updated_at := CURRENT_TIMESTAMP;  -- CURRENT_TIMESTAMP を最新の updated_at に代入
        END IF;
        RETURN NEW;                               -- 最新状態のオブジェクトを返す
    END;
$$ LANGUAGE plpgsql;

testdb=# CREATE TABLE users ( id INT, name TEXT, created_at TIMESTAMP, updated_at TIMESTAMP );

testdb=# CREATE TRIGGER trigger_users_timestamp
    BEFORE INSERT OR UPDATE ON users     -- INSERT or UPDATE がトリガー
    FOR EACH ROW                         -- INSERT or UPDATE の対象となる各行に対して
    EXECUTE PROCEDURE set_timestamp();   -- set_timestamp() を実行する

testdb=# INSERT INTO users ( id, name ) VALUES ( 1, 'yamada' ); -- 自動で created_at に値が入る
testdb=# INSERT INTO users ( id, name ) VALUES ( 2, 'tanaka' ); -- 自動で created_at に値が入る
testdb=# INSERT INTO users ( id, name ) VALUES ( 3, 'saitoh' ); -- 自動で created_at に値が入る
testdb=# UPDATE users SET name = 'yamada2' WHERE id = 1;        -- 自動で updated_at に値が入る
```


これで `users` に対して SELECT してみると...

```
testdb=# SELECT * FROM users;
 id |  name   |         created_at         |         updated_at         
----+---------+----------------------------+----------------------------
  2 | tanaka  | 2014-03-02 18:41:03.731874 | 
  3 | saitoh  | 2014-03-02 18:41:03.733013 | 
  1 | yamada2 | 2014-03-02 18:41:03.730203 | 2014-03-05 16:38:30.581603
```

ふむふむ。  
こんなことができるのが PL/pgSQL なのである。

### 3. トリガーを仕込むテーブルから引数として DB 値を取って関数の中で何かしたい

`users.name` を引数に取って末尾に `-test` を追記する関数をつくろう。

```
testdb=# CREATE FUNCTION append_test_text(TEXT) RETURNS TEXT AS $$
    DECLARE
        name ALIAS FOR $1; -- $1 で関数の第1引数を受け取れる
        append_text TEXT = '-test';
    BEGIN
        RETURN name || append_text;
    END;
$$ LANGUAGE plpgsql;

testdb=# CREATE FUNCTION set_any_on_users() RETURNS TRIGGER AS $$
    BEGIN
        NEW.name := append_test_text(NEW.name);
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

testdb=# CREATE TRIGGER trigger_users
    BEFORE INSERT OR UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE set_any_on_users();

testdb=# SELECT * FROM users;
 id |     name     |         created_at         |         updated_at         
----+--------------+----------------------------+----------------------------
  2 | tanaka       | 2014-03-02 18:41:03.731874 | 
  3 | saitoh       | 2014-03-02 18:41:03.733013 | 
  1 | yamada2-test | 2014-03-02 18:41:03.730203 | 2014-03-05 16:50:29.988915
```


### 4. FUNCTION , TRIGGER の削除の仕方

```
// トリガーを削除する
testdb=# DROP TRIGGER IF EXISTS [trigger_name] ON [table_name];
※注意点：ON [table_name] まで一致しないと削除できない

// 引数なしの関数を削除する
testdb=# CREATE FUNCTION hoge_moga() ~~~~~;
testdb=# DROP FUNCTION IF EXISTS hoge_moga();
※注意点：() がないと削除できない

// 引数ありの関数を削除する
testdb=# CREATE FUNCTION fuga_moge(TEXT, INTEGER) ~~~~~;
testdb=# DROP FUNCTION IF EXISTS fuga_moge(TEXT, INTEGER);
※注意点：() 内の引数まで一致しないと削除できない
```


### 5. 参考サイト・URL

- [PostgreSQL 9.3.2文書][1]

 [1]: http://www.postgresql.jp/document/9.3/html/

