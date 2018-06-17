---
layout: post
title: "Vagrant AWS: The parameter groupName cannot be used with the parameter subnet の対処"
date: 2014-11-30 09:00:00 +0900
categories: Vagrant
tags:
- AWS
- Vagrant
---

Vagrant で EC2 を起動しようとしたときのエラーです。


### 確認環境

- Mac OS X 10.9.5-x86\_64
- vagrant 1.6.5
- vagrant-aws 0.5.0


`Vagrantfile` で `aws.security_groups` に `["ssh-fixed", "test"]` を設定しました。

```
// Vagrantfile
.
.
.
  config.vm.provider "aws" do |aws, override|
    aws.access_key_id     = AWS_ACCESS_KEY
    aws.secret_access_key = AWS_SECRET_KEY
    aws.keypair_name      = AWS_KEYPAIR_NAME

    aws.region            = "ap-northeast-1" # Tokyo
    aws.availability_zone = "ap-northeast-1c"
    aws.ami               = "ami-4985b048" # Amazon Linux AMI 2014.09.1 (HVM)
    aws.instance_type     = "t2.small"
    aws.tags              = {
        "Name" => "vagrant-aws" 
    }
    aws.security_groups   = ["ssh-fixed", "test"]
    aws.subnet_id         = AWS_SUBNET_ID

    override.ssh.username         = AWS_SSH_USERNAME
    override.ssh.private_key_path = AWS_SSH_KEY_PATH
  end
.
.
.
```

この設定で `vagrant up` する。

<!-- more -->

```
$ bundle exec vagrant up --provider=aws
Bringing machine 'default' up with 'aws' provider...
==> default: HandleBoxUrl middleware is deprecated. Use HandleBox instead.
==> default: This is a bug with the provider. Please contact the creator
==> default: of the provider you use to fix this.
==> default: Warning! The AWS provider doesn't support any of the Vagrant
==> default: high-level network configurations (`config.vm.network`). They
==> default: will be silently ignored.
==> default: Warning! You're launching this instance into a VPC without an
==> default: elastic IP. Please verify you're properly connected to a VPN so
==> default: you can access this machine, otherwise Vagrant will not be able
==> default: to SSH into it.
==> default: Launching an instance with the following settings...
==> default:  -- Type: m1.micro
==> default:  -- AMI: ami-29dc9228
==> default:  -- Region: ap-northeast-1
==> default:  -- Availability Zone: ap-northeast-1c
==> default:  -- Keypair: ****
==> default:  -- Subnet ID: subnet-*****
==> default:  -- Security Groups: ["ssh-fixed", "test"]
==> default:  -- Block Device Mapping: []
==> default:  -- Terminate On Shutdown: false
==> default:  -- Monitoring: false
==> default:  -- EBS optimized: false
==> default:  -- Assigning a public IP address in a VPC: false
==> default: Warning! Vagrant might not be able to SSH into the instance.
==> default: Please check your security groups settings.
There was an error talking to AWS. The error message is shown
below:

InvalidParameterCombination => The parameter groupName cannot be used with the parameter subnet
```

そして、エラー「**InvalidParameterCombination => The parameter groupName cannot be used with the parameter subnet**」が発生。

もしやと思いセキュリティグループの指定をグループ名からグループ ID に変更して再実行したら通りました。  
どうやら **Security Groups** の指定が **Group Name** ではなく、**Group ID** だったということです。

ドキュメントは確か **Group Name** 使ってたと思うのだが...。


### 参考 URL

- [mitchellh/vagrant-aws](https://github.com/mitchellh/vagrant-aws)
