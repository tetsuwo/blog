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

そんなときに Terraform を使うわけですが、何度環境を作り直すため、作っては壊したりを繰り返していると度々下記のエラーが発生します。

```
* aws_lambda_function.fn: Error deleting Lambda Function: Lambda was unable to delete arn:aws:lambda:~~~~~~~ because it is a replicated function. Please see our documentation for Deleting Lambda@Edge Functions and Replicas.
        status code: 400, request id: ********-****-****-********
```

このエラーはエラーメッセージの通り、[Lambda@Edge 関数とレプリカの削除](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-delete-replicas.html)
 を見れば原因が分かります。



### 参考

- [Lambda@Edge 関数とレプリカの削除](https://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-delete-replicas.html)
- [Error destroying Lambda@Edge function #5818](https://github.com/terraform-providers/terraform-provider-aws/issues/5818)
