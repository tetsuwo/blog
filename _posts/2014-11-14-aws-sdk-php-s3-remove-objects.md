---
layout: post
title: "PHP: AWS SDK for PHP v2 で S3 上の指定文字列にマッチするオブジェクトの削除"
date: 2014-11-14 09:00:00 +0900
categories: PHP
tags:
- AWS
- PHP
- S3
---

※ **AWS SDK for PHP 2 系** を使用しています

S3 を長い間、運用していると S3 上のオブジェクトの内、特定の文字列を含むオブジェクトを一括削除したいときがあります。

`Aws\S3\S3Client\deleteObject` の存在は知っていたので、指定バケット以下から特定の文字列を含むオブジェクトを引っこ抜き、その後、引っこ抜いたオブジェクトを個別に削除していくのがセオリーだと思います。

```
try {
    $client = Aws\S3\S3Client::factory([
        'key'     => 'YOUR ACCESS KEY',
        'secret'  => 'YOUR SECRET KEY',
        'profile' => 'YOUR PROFILE',
        'region'  => 'YOUR REGION CODE'
    ]);

    $client->deleteObject([
        'Bucket' => 'BUCKET NAME',
        'Key'    => 'DELETE TARGET KEY'
    ]);
} catch (Exception $ex) {
    throw $ex;
}
```


オプションの説明は [Configuring the SDK](http://docs.aws.amazon.com/aws-sdk-php/guide/latest/configuration.html#client-configuration-options) が参考になります。
`region` に利用できる列挙体は [Class Aws\Common\Enum\Region](http://docs.aws.amazon.com/aws-sdk-php/latest/class-Aws.Common.Enum.Region.html) で確認できます。

[[MORE]]


ただ、引っこ抜く手間が面倒な場合もあります。  
AWS SDK for PHP のドキュメントを確認してみると [deleteMatchingObjects](http://docs.aws.amazon.com/aws-sdk-php/latest/class-Aws.S3.S3Client.html#_deleteMatchingObjects) なるものがあります。

これは指定した正規表現にマッチしたオブジェクトを削除することができます。

```
try {
    $client = Aws\S3\S3Client::factory([
        'key'     => 'YOUR ACCESS KEY',
        'secret'  => 'YOUR SECRET KEY',
        'profile' => 'YOUR PROFILE',
        'region'  => 'YOUR REGION CODE'
    ]);

    $client->deleteMatchingObjects('BUCKET NAME', 'DIRECTORY PREFIX', '/YOUR REGEX CODE/');
} catch (Exception $ex) {
    throw $ex;
}
```


これ結構、便利です。
