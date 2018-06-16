---
layout: post
title: "PHP: AWS SDK for PHP v2 で S3 にファイルをアップロード"
date: 2014-11-15 09:00:00 +0900
categories: PHP
tags:
- PHP
- AWS
- S3
---

S3 の指定バケットにファイルをアップロードしたい、そんなときは AWS SDK を利用しましょう。

今回の例では PHP 版の SDK を利用します。

Composer をインストールします。

```
~$ curl -sS https://getcomposer.org/installer | php
#!/usr/bin/env php
All settings correct for using Composer
Downloading...

Composer successfully installed to: /path/to/aws-sdk-php/composer.phar
Use it: php composer.phar
```


`composer.json` に以下の json を記述して、AWS SDK for PHP をインストールする準備をします。

```
{
    "require": {
        "aws/aws-sdk-php": "2.*"
    }
}
```


AWS SDK for PHP をインストールします。

<!-- more -->

```
~$ php composer.phar install
Loading composer repositories with package information
Installing dependencies (including require-dev)
  - Installing symfony/event-dispatcher (v2.5.5)
    Downloading: 100%

  - Installing guzzle/guzzle (v3.9.2)
    Downloading: 100%

  - Installing aws/aws-sdk-php (2.7.0)
    Downloading: 100%

symfony/event-dispatcher suggests installing symfony/dependency-injection ()
symfony/event-dispatcher suggests installing symfony/http-kernel ()
aws/aws-sdk-php suggests installing doctrine/cache (Adds support for caching of credentials and responses)
aws/aws-sdk-php suggests installing monolog/monolog (Adds support for logging HTTP requests and responses)
aws/aws-sdk-php suggests installing symfony/yaml (Eases the ability to write manifests for creating jobs in AWS Import/Export)
Writing lock file
Generating autoload files
```


AWS SDK for PHP を使って、特定のファイルを S3 にアップロードします。

```
// config.php
<?php return [
    'includes' => ['_aws'],
    'services' => [
        'default_settings' => [
            'params' => [
                'key'    => 'YOUR_AWS_ACCESS_KEY_ID',
                'secret' => 'YOUR_AWS_SECRET_ACCESS_KEY',
                // OR: 'profile' => 'my_profile',
                'region' => 'us-west-2'
            ]
        ]
    ]
);
```

```
// putObject.php
<?php require_once 'vendor/autoload.php';

$bucketName = 'hoge-fuga-bucket';
$pathToFile = '/path/to/*******.jpg';

use Aws\S3\S3Client;
use Aws\Common\Aws;

$aws = Aws::factory(sprintf('%s/config.php', dirname(__FILE__)));
$client = $aws->get('s3');

$filename = basename($pathToFile);
printf("File basename: %s\n", $filename);

$key = sprintf('xxxxx/%s', $filename);

$putResult = $client->putObject([
    'Bucket' => $bucketName,
    'Key' => $key,
    'SourceFile' => $pathToFile,
    'Metadata' => [
        'Foo' => 'abc',
        'Baz' => '123'
    ],
]);

$client->waitUntil('ObjectExists', [
    'Bucket' => $bucketName,
    'Key'    => $key
]);
```

※ [Getting Started Guide — AWS SDK for PHP 2.7.5 documentation](http://docs.aws.amazon.com/aws-sdk-php/guide/latest/quick-start.html) が参考になります


これで S3 の管理画面からバケット「hoge-fuga-bucket」を選択し、ディレクトリ「xxxxx」以下に *******.jpg が存在し、更に中身がアップロードしたものと同じものであれば OK です。

※ バケット名は S3 上でユニークであるため、サンプルとは変更して試してください。
