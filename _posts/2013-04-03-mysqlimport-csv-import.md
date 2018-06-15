---
layout: post
title: "MySQL: mysqlimport で CSV データをインポートする"
date: 2013-04-03 09:00:00 +0900
categories: MySQL
tags:
- MySQL
- CSV
---

下記コマンドで MySQL に CSV データをインポートできる。

```
mysqlimport --fields-terminated-by=',' --fields-enclosed-by='"' -h {HOST_NAME} -u {USER_NAME} -p -d {DATABASE_NAME} /path/to/{TABLE_NAME}.csv
```

以下、ヘルプ内容。

<!-- more -->


```
$ mysqlimport --help
mysqlimport  Ver 3.7 Distrib 5.5.28, for osx10.8 (i386)
Copyright (c) 2000, 2012, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Loads tables from text files in various formats.  The base name of the
text file must be the name of the table that should be used.
If one uses sockets to connect to the MySQL server, the server will open and
read the text file directly. In other cases the client will open the text
file. The SQL command 'LOAD DATA INFILE' is used to import the rows.

Usage: mysqlimport [OPTIONS] database textfile...
Default options are read from the following files in the given order:
/etc/my.cnf /etc/mysql/my.cnf /usr/local/etc/my.cnf ~/.my.cnf 
The following groups are read: mysqlimport client
The following options may be given as the first argument:
--print-defaults        Print the program argument list and exit.
--no-defaults           Don't read default options from any option file.
--defaults-file=#       Only read default options from the given file #.
--defaults-extra-file=# Read this file after the global files are read.
  --character-sets-dir=name 
                      Directory for character set files.
  --default-character-set=name 
                      Set the default character set.
  -c, --columns=name  Use only these columns to import the data to. Give the
                      column names in a comma separated list. This is same as
                      giving columns to LOAD DATA INFILE.
  -C, --compress      Use compression in server/client protocol.
  -#, --debug[=name]  Output debug log. Often this is 'd:t:o,filename'.
  --debug-check       Check memory and open file usage at exit.
  --debug-info        Print some debug info at exit.
  --default-auth=name Default authentication client-side plugin to use.
  -d, --delete        First delete all rows from table.
  --fields-terminated-by=name 
                      Fields in the input file are terminated by the given
                      string.
  --fields-enclosed-by=name 
                      Fields in the import file are enclosed by the given
                      character.
  --fields-optionally-enclosed-by=name 
                      Fields in the input file are optionally enclosed by the
                      given character.
  --fields-escaped-by=name 
                      Fields in the input file are escaped by the given
                      character.
  -f, --force         Continue even if we get an SQL error.
  -?, --help          Displays this help and exits.
  -h, --host=name     Connect to host.
  -i, --ignore        If duplicate unique key was found, keep old row.
  --ignore-lines=#    Ignore first n lines of data infile.
  --lines-terminated-by=name 
                      Lines in the input file are terminated by the given
                      string.
  -L, --local         Read all files through the client.
  -l, --lock-tables   Lock all tables for write (this disables threads).
  --low-priority      Use LOW_PRIORITY when updating the table.
  -p, --password[=name] 
                      Password to use when connecting to server. If password is
                      not given it's asked from the tty.
  --plugin-dir=name   Directory for client-side plugins.
  -P, --port=#        Port number to use for connection or 0 for default to, in
                      order of preference, my.cnf, $MYSQL_TCP_PORT,
                      /etc/services, built-in default (3306).
  --protocol=name     The protocol to use for connection (tcp, socket, pipe,
                      memory).
  -r, --replace       If duplicate unique key was found, replace old row.
  -s, --silent        Be more silent.
  -S, --socket=name   The socket file to use for connection.
  --ssl               Enable SSL for connection (automatically enabled with
                      other flags).
  --ssl-ca=name       CA file in PEM format (check OpenSSL docs, implies
                      --ssl).
  --ssl-capath=name   CA directory (check OpenSSL docs, implies --ssl).
  --ssl-cert=name     X509 cert in PEM format (implies --ssl).
  --ssl-cipher=name   SSL cipher to use (implies --ssl).
  --ssl-key=name      X509 key in PEM format (implies --ssl).
  --ssl-verify-server-cert 
                      Verify server's "Common Name" in its cert against
                      hostname used when connecting. This option is disabled by
                      default.
  --use-threads=#     Load files in parallel. The argument is the number of
                      threads to use for loading data.
  -u, --user=name     User for login if not current user.
  -v, --verbose       Print info about the various stages.
  -V, --version       Output version information and exit.
```
