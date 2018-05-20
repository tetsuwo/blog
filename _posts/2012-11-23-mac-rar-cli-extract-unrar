---
layout: post
title: "Mac で RAR 拡張子のファイルをコマンドラインから解凍する - unrar"
date: 2012-11-23 03:49:00 +0900
categories: Mac
tags:
- Mac
migration_from: 
- http://tetsuwo.tumblr.com/post/36296887979
---

`brew` で `unrar` をインストールする。

    $ brew install unrar
    ==&gt; Downloading http://www.rarlab.com/rar/unrarsrc-4.2.4.tar.gz
    ######################################################################## 100.0%
    ==&gt; make --makefile makefile.unix
    /usr/local/Cellar/unrar/4.2.4: 4 files, 220K, built in 12 seconds


解凍したい RAR ファイルを `unrar` する。  
`e` オプション指定でカレントディレクトリに展開してくれる。

    $ unrar e xxxxxxxxxx.rar
    
    UNRAR 4.20 freeware      Copyright (c) 1993-2012 Alexander Roshal


パスワード付きの RAR でも大丈夫。

    $ unrar e xxxxxxxxxx.rar
    
    UNRAR 4.20 freeware      Copyright (c) 1993-2012 Alexander Roshal

    Enter password (will not be echoed) for xxxxxxxxxx.rar: [PASSPHRASE]


`unrar` のオプションは以下の通り。


<!-- more -->


```
$ unrar --help

UNRAR 4.20 freeware      Copyright (c) 1993-2012 Alexander Roshal

Usage:     unrar <command> -<switch 1> -<switch N> <archive> <files...>
               <@listfiles...> <path_to_extract\>

<Commands>
  e             Extract files to current directory
  l[t,b]        List archive [technical, bare]
  p             Print file to stdout
  t             Test archive files
  v[t,b]        Verbosely list archive [technical,bare]
  x             Extract files with full path

<Switches>
  -             Stop switches scanning
  @[+]          Disable [enable] file lists
  ad            Append archive name to destination path
  ag[format]    Generate archive name using the current date
  ai            Ignore file attributes
  ap<path>      Set path inside archive
  c-            Disable comments show
  cfg-          Disable read configuration
  cl            Convert names to lower case
  cu            Convert names to upper case
  dh            Open shared files
  ep            Exclude paths from names
  ep3           Expand paths to full including the drive letter
  f             Freshen files
  id[c,d,p,q]   Disable messages
  ierr          Send all messages to stderr
  inul          Disable all messages
  kb            Keep broken extracted files
  n<file>       Include only specified file
  n@            Read file names to include from stdin
  n@<list>      Include files listed in specified list file
  o[+|-]        Set the overwrite mode
  or            Rename files automatically
  ow            Save or restore file owner and group
  p[password]   Set password
  p-            Do not query password
  r             Recurse subdirectories
  sl<size>      Process files with size less than specified
  sm<size>      Process files with size more than specified
  ta<date>      Process files modified after <date> in YYYYMMDDHHMMSS format
  tb<date>      Process files modified before <date> in YYYYMMDDHHMMSS format
  tn<time>      Process files newer than <time>
  to<time>      Process files older than <time>
  ts<m,c,a>[N]  Save or restore file time (modification, creation, access)
  u             Update files
  v             List all volumes
  ver[n]        File version control
  vp            Pause before each volume
  x<file>       Exclude specified file
  x@            Read file names to exclude from stdin
  x@<list>      Exclude files listed in specified list file
  y             Assume Yes on all queries
```
