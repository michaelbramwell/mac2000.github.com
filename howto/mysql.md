---
layout: page
title: MySql
---

Create database
---------------

    CREATE DATABASE dbname CHARACTER SET utf8 COLLATE utf8_general_ci;

Delete database
---------------

    DROP DATABASE dbname;

Create toor user
----------------

    CREATE USER 'toor'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON *.* TO 'toor'@'localhost' WITH GRANT OPTION;

    CREATE USER 'toor'@'%' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON *.* TO 'toor'@'%' WITH GRANT OPTION;

    CREATE USER 'toor'@'127.0.0.1' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON *.* TO 'toor'@'127.0.0.1' WITH GRANT OPTION;

Create user and database
------------------------

    CREATE USER 'USERNAME'@'%' IDENTIFIED BY 'PASSWORD';
    CREATE DATABASE IF NOT EXISTS USERNAME CHARACTER SET utf8 COLLATE utf8_general_ci;
    GRANT ALL PRIVILEGES ON USERNAME.* TO 'USERNAME'@'%';

Delete user and his database
----------------------------

    DROP USER 'USER_LOGIN'@'%';
    DROP DATABASE IF EXISTS `USER_LOGIN`;

Delete all tables in database
-----------------------------

    mysqldump -u[USERNAME] -p[PASSWORD] --add-drop-table --no-data [DATABASE] | grep ^DROP | mysql -u[USERNAME] -p[PASSWORD] [DATABASE]

Backup/restore
--------------

    # backup
    mysqldump --databases -u [LOGIN] --password=[PASSOWRD] [DATABASE] > /home/mac/db-`date +%Y-%m-%d`.sql
    # restore
    mysql -u [LOGIN] --password=[PASSWORD] [DATABASE] < /home/mac/db-2012-04-25.sql

To avoid errors on importing huge files set `set global max_allowed_packet=128*1024*1024;`

Versioning mysql database
-------------------------

Just create `my_data_base.sym` file in `mysql/data` and write to it path where database files are actually stored, for example `/home/mac/Dropbox/projects/example/my_data_base`

Insert or update
----------------

    REPLACE INTO [table]
    SET id = 12, name = 'mac'

Northwind database analouge for MySQL
-------------------------------------

http://dev.mysql.com/doc/index-other.html#sampledb

http://downloads.mysql.com/docs/sakila-db.zip

Encodings
---------

To get `utf8` make changes to `my.cnf`

    [client]
    default-character-set=utf8

    [mysql]
    default-character-set=utf8


    [mysqld]
    collation-server=utf8_general_ci
    init-connect='SET NAMES utf8'
    character-set-server=utf8

To check encodings run following queries:

    show variables like 'char%';
    show variables like 'collation%';

Minimal phpmyadmin config.inc.php
---------------------------------

    <?php
    $cfg['Servers'][1]['verbose'] = 'localhost';
    $cfg['Servers'][1]['auth_type'] = 'cookie';
    $cfg['blowfish_secret'] = '507e9d4d8bbdc8.34867123';

Allow external connections
--------------------------

Changes in `/etc/mysql/my.cnf`:

    #bind-address = 127.0.0.1
    bind-address = 0.0.0.0

Now connect to mysql and run following command:

    GRANT ALL ON *.* TO root@'%' IDENTIFIED BY 'password';
    FLUSH PRIVILEGES;

Where:

`*.*` - database.table to allow access, star means all.
`root@'%'` - username and remote host(ip), percent means all.