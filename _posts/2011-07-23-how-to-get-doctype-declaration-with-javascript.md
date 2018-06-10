---
layout: post
title: "JavaScript で DOCTYPE 宣言（document.doctype）を取得する"
date: 2011-07-23 09:00:00 +0900
categories: JavaScript
tags:
- JavaScript
- HTML
---

JavaScript で DOCTYPE 宣言を取得する方法として document.doctype があるが、これがブラウザーによって挙動が違う。


### document.doctype プロパティ

<table><tr><th class="n">name</th>
    <td>&lt;!DOCTYPE <b style="color:#f00;">html</b> PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;</td>
  </tr><tr><th class="n">publicId</th>
    <td>&lt;!DOCTYPE html PUBLIC <b style="color:#f00;">"-//W3C//DTD XHTML 1.0 Transitional//EN"</b> "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;</td>
  </tr><tr><th class="n">systemId</th>
    <td>&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" <b style="color:#f00;">"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"</b>&gt;</td>
  </tr></table>


### Chrome の場合、以下の記述だけで全体を取得できる

```
document.doctype;
// → <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
```


Firefox, Safari, Opera の場合、個々のプロパティを指定しないと取得できない

```
document.doctype;
// → { entities, internalSubset, name, notations, publicId, systemId }

with (document.doctype) {
    var dtd = '<!DOCTYPE '+ name +' PUBLIC "'+ publicId +'" "'+ systemId +'">';
}
// → 実際にはこれでは駄目で、条件分岐させないと様々なDOCTYPEには対応できません。
```

console ベースで調べただけなので正規のやり方じゃないかも...。

何か良い方法があればコメントで教えてくださーい。
