---
layout: post
title: "Python で PHP の isset 関数のように定義されているかどうかを判別する"
date: 2011-03-20 09:00:00 +0900
categories: Python
tags:
- Python
---

Python で変数が定義されているかどうかを判別するには try を使用します。  
（Python 1 や Python 3 は分からないけど）

```
try:
    _var = variable
except NameError:
    _var = 'default'
```

配列の値がない場合も同様に try を使用します。ただし except は IndexError になります。

```
try:
    _var = array[1]
except IndexError:
    _var = 'default'
```


### 参考サイト

- [Determine if variable is defined in Python](http://stackoverflow.com/questions/1592565/determine-if-variable-is-defined-in-python)
