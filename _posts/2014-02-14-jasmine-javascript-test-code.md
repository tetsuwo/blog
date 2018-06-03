---
layout: post
title: "Jasmine を使って JavaScript コードをテストしよう"
date: 2014-02-14 09:00:00 +0900
categories: JavaScript
tags:
- JavaScript
- Jasmine
- BDD
migration_from: 
- http://tetsuwo.tumblr.com/post/76536345132/jasmine-for-beginner
---

## Jasmine ってなに？

Jasmine は JavaScript 用のビヘイビア駆動開発テスティングフレームワークです。

よくテスト駆動開発（TDD）とか言いますが、ビヘイビア駆動開発（BDD）は TDD の派生系で、要求仕様に近い形で自然文を併記しながらテストコードを記述できるという特長があります。

※ 詳しくは [Wikipedia - ビヘイビア駆動開発][1] を参照


## テスティングフレームワークってどんなもの？

ここまで進めておいて何ですが、人によってはそもそもテストってなに？という疑問も浮かぶと思います。

表面的というか取っ付きやすい答えとしては、書いたコードの妥当性を保証するのがテストと言えると思いますが、本質的な意味合いとしては仕様・設計を実装に落とし込む助けとなるもの、つまりコードの品質を高めるものだと思います。

後者の意味合いは[コチラ](http://d.hatena.ne.jp/kura-replace/touch/20120306/1331040054)や[アチラ](http://www.ibm.com/developerworks/jp/java/library/j-cq09187/)を読むと納得しやすいと思います。

では本題に戻り、具体的なテストの例を挙げてみます。

<!-- more -->

### テスティングフレームワークを利用しないテストの例

以下の JavaScript の関数は引数に文字列を渡すと「文字列の先頭もしくは末尾の空白を除き、その他の空白を -（ハイフン）に置き換えて呼び出し元に返す」関数です。

```
function slugify(str) {
    return str.replace(/^\s+|\s+$/g, '')
              .replace(/\s/g, '-');
}
```    

このコードは `slugify("hoge fuga")` のように実行すると `"hoge-fuga"` という置き換えられた文字列が返ってきますので、以下の様に記述すれば勿論 `true` が返ってきます。

```
slugify("hoge fuga") === "hoge-fuga"
=> true
```

この形式を利用して要求仕様を満たしているか以下のコードようにチェックしてみましょう。

```
// 先頭に空白がある文字列を渡すと先頭の空白を除いた文字列が返ってくる
slugify(" hoge") === "hoge"
=> true

// 末尾に空白がある文字列を渡すと末尾の空白を除いた文字列が返ってくる
slugify("fuga ") === "fuga"
=> true

// 先頭末尾に空白がある文字列を渡すと先頭末尾の空白を除いた文字列が返ってくる
slugify(" moga ") === "moga"
=> true

// 先頭末尾以外に空白がある文字列を渡すと空白をハイフンに置き換えた文字列が返ってくる
slugify("hoge fuga") === "hoge-fuga"
=> true

... 他にもパターンはあります
```
    

かなり雑な説明ですが、上記のようなコードを書き易く、見易く仕組み化したものがテスティングフレームワークです。

 [1]: http://ja.m.wikipedia.org/wiki/%E3%83%93%E3%83%98%E3%82%A4%E3%83%93%E3%82%A2%E9%A7%86%E5%8B%95%E9%96%8B%E7%99%BA


## Jasmine でテストを書いてみよう

グダグダ説明するよりも実際にやってみたほうが早いってことで、Jasmine でテストコードを書いてみましょう。

Jasmine でテストコードを書く際は、3 つの関数を覚えるだけで大丈夫です。  
その 3 つの関数は `describe` と `it`、`expect` です。

### describe と it、expect

`describe` は仕様のグループを定義し、`it` は仕様を定義します。

```
describe('ユーザモデルテスト', function() { // 同種のテストをまとめる

    it('ユーザのタイプは 2 種類ある', function() {
        ～テストコード～
    });

    describe('ユーザのニックネームは', function() { // ネストできる

        it('半角英数字とハイフンのみ使用可能である', function() {
            ～テストコード～
        });

        it('先頭にハイフンは使用できない', function() {
            ～テストコード～
        });

    });

});
```
    

そして具体的なテストコードを書く際には `it` の中で `expect` を利用します。

`expect` は、`expect` の第一引数として渡された値の**期待される振る舞い**を評価するためのメソッド群を返します。  
そのメソッド群は `Jasmine.Matchers` と呼ばれます。

```
expect("hoge").toEqual("hoge");
=> true
```

`Jasmine.Matchers` にはたくさんの種類が存在します。

### Jasmine.Matchers の種類

期待される振る舞いを評価するときは「～と同じ」以外にも「～を含む」や「～と同じではない」など色々な手法を使います。  
そこで、`Jasmine.Matchers` が提供する評価の種類を以下にリストアップします。

<table><thead><tr><th>種類</th>
  <th>利用例</th>
  <th>説明</th>
</tr></thead><tbody><tr><td>toBe</td>
  <td>expect(A).toBe(B)</td>
  <td>A が B と同一であることを期待する</td>
</tr><tr><td>toEqual</td>
  <td>expect(A).toEqual(B)</td>
  <td>A が B と同値であることを期待する</td>
</tr><tr><td>toMatch</td>
  <td>expect(A).toMatch(B)</td>
  <td>A が B とマッチすることを期待する</td>
</tr><tr><td>toBeDefined</td>
  <td>expect(A).toBeDefined()</td>
  <td>A が定義済みであることを期待する</td>
</tr><tr><td>toBeUndefined</td>
  <td>expect(A).toBeUndefined()</td>
  <td>A が未定義であることを期待する</td>
</tr><tr><td>toBeNull</td>
  <td>expect(A).toBeNull()</td>
  <td>A が null であることを期待する</td>
</tr><tr><td>toBeTruthy</td>
  <td>expect(A).toBeTruthy()</td>
  <td>A が true であることを期待する</td>
</tr><tr><td>toBeFalsy</td>
  <td>expect(A).toBeFalsy()</td>
  <td>A が false であることを期待する</td>
</tr><tr><td>toContain</td>
  <td>expect(A).toContain(B)</td>
  <td>A が B を含んでいることを期待する</td>
</tr><tr><td>toBeLessThan</td>
  <td>expect(A).toBeLessThan(B)</td>
  <td>A が B より小さいことを期待する</td>
</tr><tr><td>toBeGreaterThan</td>
  <td>expect(A).toBeGreaterThan(B)</td>
  <td>A が B より大きいことを期待する</td>
</tr><tr><td>toBeCloseTo</td>
  <td>expect(A).toBeCloseTo(B)</td>
  <td>A が B と与えられた少数桁数まで同値であることを期待する</td>
</tr><tr><td>toThrow</td>
  <td>expect(A).toThrow(B)</td>
  <td>A が例外を発生させることを期待する（B が渡されている場合はメッセージが一致するかまで判定する）</td>
</tr></tbody></table><!---
    種類            | 利用例                       | 説明
    ----------------|------------------------------|------------------------------------------------------------------------------------------------
    toBe            | expect(A).toBe(B)            | A が B と同一であることを期待する
    toEqual         | expect(A).toEqual(B)         | A が B と同値であることを期待する
    toMatch         | expect(A).toMatch(B)         | A が B とマッチすることを期待する
    toBeDefined     | expect(A).toBeDefined()      | A が定義済みであることを期待する
    toBeUndefined   | expect(A).toBeUndefined()    | A が未定義であることを期待する
    toBeNull        | expect(A).toBeNull()         | A が null であることを期待する
    toBeTruthy      | expect(A).toBeTruthy()       | A が true であることを期待する
    toBeFalsy       | expect(A).toBeFalsy()        | A が false であることを期待する
    toContain       | expect(A).toContain(B)       | A が B を含んでいることを期待する
    toBeLessThan    | expect(A).toBeLessThan(B)    | A が B より小さいことを期待する
    toBeGreaterThan | expect(A).toBeGreaterThan(B) | A が B より大きいことを期待する
    toBeCloseTo     | expect(A).toBeCloseTo(B)     | A が B と与えられた少数桁数まで同値であることを期待する
    toThrow         | expect(A).toThrow(B)         | A が例外を発生させることを期待する（B が渡されている場合はメッセージが一致するかまで判定する）
-->

これらのメソッドを利用できます。

しかし、上の表は全て肯定形のテストです。  
否定形のテストには `not` を利用します。

```
expect("hoge").not.toEqual("fuga")
=> true
```

否定用に新しくメソッド名を覚える必要がなくて楽ですね。


ちなみに Jasmine でテストコードを書いてブラウザで実行するとこうなります。

<iframe width="100%" height="350" src="http://jsfiddle.net/tetsuwo/wEru2/embedded/result,js,html,css/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

このようにテスティングフレームワークを利用すると、レポーティング機能までついてきて分かり易いです。

ちょっと飽きたのでここまでて。

以上。
