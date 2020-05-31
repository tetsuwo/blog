---
layout: post
title: "[Terraform] destory するときに AWS Lambda@Edge がなかなか削除されない件"
date: 2020-05-30 15:17:15 +0900
categories: Terraform
tags:
- AWS
- Terraform
---


CloudFront で Basic 認証をかけたり、サブディレクトリー以下のデフォルトアクセスを index.html にしたりするには Lambda@Edge を利用しますよね。

独自ドメイン当てたり、HTTPS 対応したりするのを手動でやっていると抜け漏れなどがあり、意外と面倒になってきたりします。

そんなときに Terraform を使うわけですが、何度も環境を作り直すため、作っては壊したりを繰り返していると度々下記のエラーが発生します。

```
* aws_lambda_function.fn: Error deleting Lambda Function: Lambda was unable to delete arn:aws:lambda:~~~~~~~ because it is a replicated function. Please see our documentation for Deleting Lambda@Edge Functions and Replicas.
        status code: 400, request id: ********-****-****-********
```

このエラーはエラーメッセージの通り、[Lambda@Edge 関数とレプリカの削除](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-delete-replicas.html)
 を見れば原因が分かります。

読んでみてこういう解釈をしました。

CloudFront のエッジロケーションにおいて、Lambda を用いて細かい設定ができるのが Lambda@Edge ですので、エッジロケーションに実行する関数のレプリカが作られるのでしょう。
そのレプリカは CloudFront から外されたタイミングで削除依頼が出され、その削除には数時間かかるということみたいです。

つまりは `terraform destory` 一発では消せないということですね。

一度、destroy を実行したら時間をおいて実行、というのを完了するまで繰り返す他なさそうですね。


### 参考

- [Lambda@Edge 関数とレプリカの削除](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-delete-replicas.html)
- [Error destroying Lambda@Edge function #5818](https://github.com/terraform-providers/terraform-provider-aws/issues/5818)
