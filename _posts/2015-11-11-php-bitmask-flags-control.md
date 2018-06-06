---
layout: post
title: "PHP: ビットマスク（ビット演算）で複数フラグ管理"
date: 2015-11-11 09:00:00 +0900
categories: PHP
tags:
- PHP
migration_from: 
- http://tetsuwo.tumblr.com/post/133001449227/php-bitmask-flags-control
---

少し前に会社で「複数のフラグを管理する良い方法」的な話が持ち上がりました。  
自分としてはビット演算を使うことを提案したのですが、うまく伝えることができなかったので、ちょっと練習。

本記事の流れをザックリ。

1. まえおき
2. 管理するフラグの定義
3. コードに落としこむ
4. データベース（MySQL）とからめる
5. まとめ


## 1. まえおき

さて、プログラミングしている上で、所謂「データ」に対して複数のフラグ管理が必要になるとき、皆さんはどうしていますか？

    class Data {
        ...
        $flag_1 = 0;
        $flag_2 = 0;
        $flag_3 = 0;
        $flag_x = 0;
    }

こんなクラスを作って、これを更にデータベースで管理するとき、こんな具合になりますかね。

    CREATE TABLE data (
        ...
        flag_1 TINYINT UNSIGNED DEFAULT 0,
        flag_2 TINYINT UNSIGNED DEFAULT 0,
        flag_3 TINYINT UNSIGNED DEFAULT 0,
        flag_x TINYINT UNSIGNED DEFAULT 0
    );

でも、このまま開発を進めていくとフラグが追加・削除されるときとか結構面倒ですよね。  
フラグが追加になる度に新しいカラムが増えることにもなります。

そんなときビット演算が役立ちます。

何がどう役立つのか、サンプルとしてロールプレイングゲームでよくあるプレイヤーの状態異常の管理をフラグでおこなって理解を深めたいと思います。

<!-- more -->


## 2. 管理するフラグの定義

まずは管理する状態異常の種類です。

|#|状態異常名|
|:-|:-|
|1|通常|
|2|死亡|
|3|毒|
|4|睡眠|
|5|石化|
|6|混乱|
|7|麻痺|

ありきたりですね。  
ちょっと少ないですがこのあたりでご勘弁を。

ここで仕様を追加して、プレイヤーは状態異常を同時に何個でも持てることとします。  
つまり「毒かつ睡眠」のように状態の掛け持ちができるのです。

この状態異常表にプログラム上で扱うための物理名と 2 進数、10 進数表現を追加します。

|#|状態異常名|状態異常物理名|2 進数|10 進数|
|:-|:-|:-|:-:|:-:|
|1|通常|NORMAL|000000|0|
|2|死亡|DEATH|000001|1|
|3|毒|POISON|000010|2|
|4|睡眠|SLEEP|000100|4|
|5|石化|PETRIFIED|001000|8|
|6|混乱|CONFUSION|010000|16|
|7|麻痺|PARALYSIS|100000|32|


## 3. コードに落としこむ

これをクラスで表現してみましょう。

    class Status {
        const NORMAL    = 0b000000;
        const DEATH     = 0b000001;
        const POISON    = 0b000010;
        const SLEEP     = 0b000100;
        const PETRIFIED = 0b001000;
        const CONFUSION = 0b010000;
        const PARALYSIS = 0b100000;
    }

    class Player {
        private $state = 0;

        public function getState()
        {
            return $this->state;
        }

        public function setState($value)
        {
            $this->state = $value;
        }
    }

こういうクラスを作ります。  
プレイヤークラスには `state` とそのアクセサだけ書いときます。

### 3.1. 状態異常を追加

ではプレイヤーに「毒」の状態異常を追加してみましょう。

    $me = new Player();
    $me->setState(Status::POISON);
    >> 10

これに状態異常「麻痺」を追加してみましょう。

    $me->setState(Status::PARALYSIS);
    >> 100000

あれ？ゲームの仕様的にプレイヤーに対して状態異常が一つしか発生しないのであればこれで良いのですが、今回の例では複数のフラグを管理するのが目的なので、プレイヤーは複数の状態異常を持てます。 
ですので、これでは駄目ですね。

ではどうするかというと、こういったときにはビット演算子を使いましょう。  
[ビット演算子？](http://php.net/manual/ja/language.operators.bitwise.php)

仕様や状況によりますが、状態異常を追加する際には、大体の場合は「ビット和（OR）」を使うのか良いでしょう。

ビット和は `$a | $b` のように記述することで `$a` または `$b` のどちらかにセットされているビットを返します。

このビット演算子「ビット和」を用いて「麻痺」を追加します。

    $state = $me->getState(Status::NORMAL);
    >> 000000
    $me->setState($state | Status::PARALYSIS);
    >> 100000

さらに「毒」を追加します。

    $me->setState($state | Status::POISON);
    >> 100010

さらにさらに「混乱」を追加します。

    $me->setState($state | Status::CONFUSION);
    >> 110010

元の状態を維持したまま、複数の状態異常を持つことができました。

### 3.2. 状態異常の回復・解除

じゃあここで「毒消し」で毒状態を治してみましょう。

若干後出しが多くてグダッてきました。一応表にしておきましょうか。

|#|道具名|道具物理名|2 進数|説明|
|:-|:-|:-|:-|
|1|不死鳥の尾|FUSHICHONOO|000001|死亡状態を回復|
|2|毒消し|DOKUKESHI|000010|毒状態を回復|
|3|眠眠打破|MINMINDAHA|000100|睡眠状態を回復|
|4|万能薬|BANNOUYAKU|111110|死亡以外の状態異常を回復|

状態異常と対応させようと思いましたが、全部使わないのでこんなものにしときます。

毒消しには毒と同じビットを用いています。

    class Item {
        const FUSHICHONOO = 0b000001;
        const DOKUKESHI   = 0b000010;
        const MINMINDAHA  = 0b000100;
        const BANNOUYAKU  = 0b111110;
    }

この毒消しで毒状態を解除するには、ビット演算子の「排他的論理和（XOR）」を用います。

排他的論理和は `$a ^ $b` のように記述することで `$a` または `$b` のどちらかにセットされており、かつ両方にセットされていないビットを返します。  

    $me->setState(Status::NORMAL | Status::PARALYSIS);  // 0b100000
    $me->setState($me->getState() | Status::POISON);    // 0b100010
    $me->setState($me->getState() | Status::CONFUSION); // 0b110010
    $me->setState($me->getState() ^ Item::DOKUKESHI);
    >> 110000

    110010 ^ 000010 = 110000
    ooxx x   xxxx x

※ `o` はどちらかにセットされているビット、`x` はどちらにもセットされていないビット


では次に万能薬で他の状態異常も治してしまいましょう。  
万能薬は死亡以外の状態を治せるということなので...。

    $me->setState(Status::NORMAL | Status::PARALYSIS);  // 0b100000
    $me->setState($me->getState() | Status::POISON);    // 0b100010
    $me->setState($me->getState() | Status::CONFUSION); // 0b110010
    $me->setState($me->getState() ^ Item::BANNOUYAKU);
    >> 1100

あれ...？ `1100` ってことはまだ状態異常が回復していない...、となってしまいます。

「万能薬」を使ったのに定められた状態異常が回復しないという、かなり重大なバグです。
これではいけません。

これを解消するには「ビット積（`&`）」と「否定（`~`）」を使います。

「ビット積」は `$a & $b` のとき、`$a` および `$b` の両方にセットされているビットがセットされます。
「否定」は `~$a` のとき、`$a` にセットされているビットはセットせず、そうでないものは逆にします。

    $me->getState() & ~Item::BANNOUYAKU

    ~Item::BANNOUYAKU
    >> ~111110 -> 000001

    $me->getState() & 000001
    >> 111110 & 000001 -> 000000


このようにビットとビット演算子を利用することで複数のフラグ管理が容易になります。


## 4. データベース（MySQL）とからめる

ビットマスクをプログラム上でどのように扱うかはなんとなく分かっていただけたところで、データベース上で扱うときの話に移りたいと思います。

データベース上での扱いも、基本的にはプログラムの方とそう変わらないです。

序盤で以下のようなテーブルを提案しましたが、前項まで見た方はこんなカラム要らないということが分かると思います。

    CREATE TABLE data (
        ...
        flag_1 TINYINT UNSIGNED DEFAULT 0,
        flag_2 TINYINT UNSIGNED DEFAULT 0,
        flag_3 TINYINT UNSIGNED DEFAULT 0,
        flag_x TINYINT UNSIGNED DEFAULT 0
    );

しかしながら、抽出するときや更新するときに計算結果を入れるのは面倒ってもんです。

とりあえずデータベースで複数フラグを管理するためにこんなテーブルを作りましょう。

    CREATE TABLE user_statuses (
        user_id INT UNSIGNED,
        status TINYINT UNSIGNED DEFAULT 0
    );

`status` カラムでフラグを管理します。  
え、これだけ？と思った方はもう一度前項を見直してみてください。  
※ちなみに `TINYINT（UNSIGNED）` は 0 ~ 255（8bit）までなので 8 つのフラグを管理できます。

    mysql> INSERT INTO user_statuses VALUES(1, 0);
    Query OK, 1 row affected (0.00 sec)

    mysql> SELECT user_id, status, CONV(status, 10, 2) FROM user_statuses;
    +---------+--------+---------------------+
    | user_id | status | CONV(status, 10, 2) |
    +---------+--------+---------------------+
    |       1 |      0 | 0                   |
    +---------+--------+---------------------+
    1 row in set (0.00 sec)


上記データに毒を追加してみましょう。

    mysql> UPDATE user_statuses SET status = status | 0b000010 WHERE user_id = 1;
    Query OK, 1 row affected (0.00 sec)
    Rows matched: 1  Changed: 1  Warnings: 0

    mysql> SELECT user_id, status, CONV(status, 10, 2) FROM user_statuses;
    +---------+--------+---------------------+
    | user_id | status | CONV(status, 10, 2) |
    +---------+--------+---------------------+
    |       1 |      2 | 10                  |
    +---------+--------+---------------------+
    1 row in set (0.01 sec)


麻痺を追加してみましょう。

    mysql> UPDATE user_statuses SET status = status | 0b100000 WHERE user_id = 1;
    Query OK, 1 row affected (0.00 sec)
    Rows matched: 1  Changed: 1  Warnings: 0

    mysql> SELECT user_id, status, CONV(status, 10, 2) FROM user_statuses;
    +---------+--------+---------------------+
    | user_id | status | CONV(status, 10, 2) |
    +---------+--------+---------------------+
    |       1 |     34 | 100010              |
    +---------+--------+---------------------+
    1 row in set (0.00 sec)


毒消しを使ってみましょう。

    mysql> UPDATE user_statuses SET status = status & ~0b000010 WHERE user_id = 1;
    Query OK, 1 row affected (0.00 sec)
    Rows matched: 1  Changed: 1  Warnings: 0

    mysql> SELECT user_id, status, CONV(status, 10, 2) FROM user_statuses;
    +---------+--------+---------------------+
    | user_id | status | CONV(status, 10, 2) |
    +---------+--------+---------------------+
    |       1 |     32 | 100000              |
    +---------+--------+---------------------+
    1 row in set (0.00 sec)


万能薬を使ってみましょう。

    mysql> UPDATE user_statuses SET status = status & ~0b111110 WHERE user_id = 1;

    mysql> SELECT user_id, status, CONV(status, 10, 2) FROM user_statuses;
    +---------+--------+---------------------+
    | user_id | status | CONV(status, 10, 2) |
    +---------+--------+---------------------+
    |       1 |      0 | 0                   |
    +---------+--------+---------------------+
    1 row in set (0.00 sec)

前項と同じですね。


抽出する場合も同じで、例えば毒状態のデータを抽出する場合はこれで抽出できます。

    mysql> SELECT user_id, status, CONV(status, 10, 2) FROM user_statuses WHERE status & 0b000010;

ここまでできればプログラムからも扱いやすいですね。


## 5. まとめ

管理するフラグの仕様次第でデータの持ち方は変わるので、管理するフラグの性質を見極めることが大事です。

ここでいう性質とは以下のようなことになります。

- データを永続化する必要があるのか
- データの更新頻度はどの程度か
- フラグをもとに抽出されることはあるのか
- フラグをもとに抽出される場合、データのボリュームはどのくらいか

上記のことは何事にも言えることですが、背丈にあった（求められていることに則した）実装について考えることも大事だなーと。


以上。
