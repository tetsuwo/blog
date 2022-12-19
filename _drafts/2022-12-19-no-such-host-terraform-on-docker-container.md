---
layout: post
title: "[Terraform] `tflint -f compact` したときに `Failed to initialize plugins ~~~` が発生"
date: 2022-12-17 17:00:00 +0900
categories: Terraform
tags:
- AWS
- Terraform
- GitHub Actions
---


とある環境のインフラ構成のデプロイを GitHub Actions 経由でおこなっているのだが、


```
# tflint -f compact
 ~
 ~
Failed to initialize plugins; TFLint is not compatible with this version of the "aws" plugin. A newer TFLint or plugin version may be required. Plugin version: 10, Client versions: [11]
 ~
 ~
```

