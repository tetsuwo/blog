---
layout: post
title: "AWS: AMI の作り方（Amazon Machine Image）"
date: 2013-04-07 09:00:00 +0900
categories: AWS
tags:
- AWS
---

## AMI 作成のおおまかな流れ

1. アクセスキーや証明書を取得
2. イメージに含めたくないファイルを整理
3. イメージを作成
4. 作成したイメージを S3 にアップロード
5. アップロードしたイメージを AMI として登録
6. 稼働チェック


### 1. 各種証明書やキーを取得

[こちら](https://portal.aws.amazon.com/gp/aws/securityCredentials)から、*X.509 証明書*、*API キー*、*シークレットキー*、*アカウント ID* を取得してメモしておきます。


### 2. イメージに含めたくないファイルを整理

`/mnt` 以下はイメージから除外されるので、含めたくないファイルやディレクトリーは削除するか、`/mnt` 以下に移動するなりする。

[[MORE]]


### 3. OS のイメージを作成

    $ cd /mnt/
    $ ec2-bundle-vol -c {cert-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.pem} -k {pk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.pem} -u {AWS_ACCOUNT_ID} -r x86_64
    Copying / into the image file /tmp/image...
    Excluding: 
    	 /sys
    	 /proc
    	 /dev/pts
    	 /data
    	 /proc/sys/fs/binfmt_misc
    	 /dev
    	 /media
    	 /mnt
    	 /proc
    	 /sys
    	 /tmp/image
    	 /mnt/img-mnt
    1+0 records in
    1+0 records out
    1048576 bytes (1.0 MB) copied, 0.001797 seconds, 584 MB/s
    mke2fs 1.39 (29-May-2006)
    Bundling image file...
    Created image.part.00
    .
    .
    .
    Created image.part.xx
    Generating digests for each part...
    Digests generated.
    Unable to read instance meta-data for ramdisk-id
    Unable to read instance meta-data for product-codes
    Creating bundle manifest...
    ec2-bundle-vol complete.


### 4. 作成したイメージを S3 にアップロード

    $ cd /tmp
    $ ec2-upload-bundle -b {BUCKET_NAME} -a {ACCESS_KEY} -s {SECRET_ACCESS_KEY} -m image.manifest.xml --location ap-northeast-1
    Uploading bundled image parts to the S3 bucket xxxxx ...
    Uploaded image.part.00
    .
    .
    .
    Uploaded image.part.xx
    Uploading manifest ...
    Uploaded manifest.
    Bundle upload completed.


### 5. アップロードしたイメージを AMI として登録

AWS Management Console &gt; S3 &gt; 4 で入力したバケット &gt; `image.manifest.xml` のプロパティを開き、リンクをコピーします。

AWS Management Console &gt; EC2 &gt; AMIs &gt; Register New AMI &gt; AMI Manifest Path に取得したリンクのパス部分をペーストします。
AMIs に登録した AMI が表示されていれば OK です。


### 6. 起動チェック

AWS Management Console &gt; EC2 &gt; Instances &gt; Launch Instance でインスタンス作成ウィザードを起動します。

AMI を選択する画面の My AMIs に登録した AMI があるはずなので、それを選択し、インスタンスを起動します。

あとは起動完了後、SSH で入るなり、Web サーバーであれば Public DNS でアクセスしてみたりして、動作確認をします。


### 参考記事

- [EC2インスタンスからオリジナルAMIを作成する（インスタンスストア・EBS） | イーライセンスシステムズ技術ラボ](http://lab.eli-sys.jp/2012/12/31/ec2%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%81%8B%E3%82%89%E3%82%AA%E3%83%AA%E3%82%B8%E3%83%8A%E3%83%ABami%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B%EF%BC%88%E3%82%A4%E3%83%B3/)
- [Amazon EC2（AWS） インスタンスをコピーしてサイトを複製 - サイト制作の豆知識](http://asobicocoro.com/tips/article/aws-create-ami)
