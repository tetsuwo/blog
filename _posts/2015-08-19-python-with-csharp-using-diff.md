---
layout: post
title: "Python: Python の with と C# の using の違い"
date: 2015-08-19 09:00:00 +0900
categories: Python
tags:
- Python
- C-Sharp
---

先日、友人から「Python の with って C# でいうとこの using なのかな！？」ってメッセージがきました。

気になったので試したところ、結果は `using` と同義ではないことがわかりました。

<s>そもそも C# の `using` はオブジェクトの破棄を保証するもので、`using` を抜けるともう既にそのオブジェクトは破棄されています。</s>  
↑ は誤りです。ただしくは破棄を保証するものではなく下記の通りとなります。  
（yuba さんご指摘ありがとうございました！）

そもそも C# の `using` は、オブジェクトを破棄する処理を呼び出すことを保証するものです。  
他の用途としては当該オブジェクトのスコープ範囲を括ることも挙げられます。  
したがって `using` を抜けるともう既にそのオブジェクトはスコープの範囲外となり、参照することはできません。

下記が `using` のサンプルです。

```
public void Anything() {
    using (FileStream fs = new FileStream("hoge.txt", FileMode.Read)) {
        // anything
    }
    // fs はもう破棄されている
}
```

`using` ステートメントを抜けるタイミングで `Dispose` が呼ばれます。  
さらにスコープの範囲は `using` 内に留まります。


次に Python の `with` です。

Python 2.7 を主に使っているので 2 系のドキュメントから `with` の説明をかいつまんで拝借すると...

> with 文は、 __enter__() メソッドがエラーなく終了した場合には __exit__() が常に呼ばれることを保証します。ですので、もしエラーがターゲットリストへの代入中にエラーが発生した場合には、これはそのスイートの中で発生したエラーと同じように扱われます。

引用: http://docs.python.jp/2/reference/compound_stmts.html#with

つまりは `__enter__() メソッドがエラーなく終了した場合には __exit__() が常に呼ばれることを保証` するものなので `using` とは意味が違います。  
具体的に下記に `with` のサンプルコードを示します。

```
// with-test.py
class WithTest:
    def __init__(self, hoge):
        print('__init__')
        self.hoge = hoge
    
    def printer(self):
        print(self.hoge)
    
    def __enter__(self):
        print('__enter__')
        return self
    
    def __exit__(self, type, value, traceback):
        print('__exit__')
    
    
with WithTest('test') as t:
    t.printer()

t.printer()
```

実行結果は以下の通り。

```
$ python with-test.py
__init__
__enter__
test
__exit__
test
```

何が保証されるか、そこに違いがありましたというお話でした。
