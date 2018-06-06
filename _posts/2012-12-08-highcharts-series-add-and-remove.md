---
layout: post
title: "Highcharts: あとからグラフデータ（series）を追加・削除する"
date: 2012-12-08 09:00:00 +0900
categories: JavaScript
tags:
- Highcharts
- JavaScript
- Graph
- Chart
migration_from: 
- http://tetsuwo.tumblr.com/post/37466890117/highcharts-%E3%81%82%E3%81%A8%E3%81%8B%E3%82%89%E3%82%B0%E3%83%A9%E3%83%95%E3%83%87%E3%83%BC%E3%82%BFseries%E3%82%92%E8%BF%BD%E5%8A%A0%E5%89%8A%E9%99%A4%E3%81%99%E3%82%8B
---

`Highcharts` を利用したグラフを描画するとき、動的に後からグラフデータを追加したい場合がある。

通常の描画の仕方はこう。

```
chart = Highcharts.Chart({
    chart: {
        anything...
        type: 'line' // 折れ線グラフ
    },
    anything...
    // ここからグラフデータ
    series: [{
        name: '1本目',
        data: [1, 2.5, 2]
    }, {
        name: '2本目',
        data: [1.5, 2, 3.5]
    }]
});
```

これに、何か特定のイベントが発生したときにもう一本折れ線グラフを追加したいという場合、下のように `Highcharts.Chart` オブジェクトの `addSeries` でグラフデータを追加することができる。

```
chart.addSeries({
    name: '3本目',
    data: [1.75, 2.25, 3]
});
```

また、特定のグラフデータを削除することもできる。  
グラフデータは配列になっており、追加した `3本目` を削除する場合は添字 `2` なので以下のようになる。

```
chart.series[2].remove();
```


### デモ

<script type="text/javascript" src="http://jsdo.it/blogparts/iwlm/js?width=465&amp;height=496&amp;view=play"></script>


しかし、`Highcharts` 便利だ。


### 参考

- [Highcharts API Reference](http://api.highcharts.com/highcharts)
