---
layout: post
title: "[Terraform] Docker 内で `terraform init -upgrade` したときに `no such host` が発生"
date: 2022-12-17 15:55:00 +0900
categories: Terraform
tags:
- AWS
- Terraform
- Docker
---


元々は Intel Chip の Mac から実行していた Terraform 環境を久しぶりに弄る機会がありました。

構築時と当時と違うのはぼくの端末が M1 Mac になっていることで、何かしら対応してないよーと言われる覚悟はしていましたが、案の定当時入れた `SOPS` のバージョンが ARM ベースに対応していませんでした。

```
# terraform init
 ~
 ~
    Provider registry.terraform.io/carlpett/sops v0.6.2 does not have a package available for your current platform, linux_arm64.
 ~
 ~
```

というわけで、対応バージョンをググっていると [このやり取り](https://github.com/carlpett/terraform-provider-sops/issues/67) から [この対応](https://github.com/carlpett/terraform-provider-sops/pull/68/files#diff-e3445fc75aa9c3e4a60fbe5394dcce12693022018216a8fbe0000fe9952850a6R6) でサポートされたということなので、0.6.2 から 0.6.3 にアップグレードすることを決意しました。

ところがどっこい。


```
# terraform init -upgrade
 ~
 ~
    docker: Error response from daemon: Get https://registry-1.docker.io/v2/: 
           dial tcp: lookup registry.terraform.io on 127.0.0.11:53: no such host.
 ~
 ~
```

外に出ていけていない...。

ネームサーバーを変更（ `/etc/resolv.conf` ）して解決しました。


```
# /etc/resolv.conf
#nameserver 127.0.0.11
nameserver 8.8.8.8
```

久しぶりに弄る環境は怖い怖い...というお話でした。
