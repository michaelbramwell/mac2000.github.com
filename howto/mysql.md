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

    CREATE USER 'USER_LOGIN'@'%' IDENTIFIED BY 'USER_PASSWORD';
    GRANT USAGE ON *.* TO 'USER_LOGIN'@'%' IDENTIFIED BY 'USER_PASSWORD' WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

    CREATE DATABASE IF NOT EXISTS `USER_LOGIN`;
    GRANT ALL PRIVILEGES ON `USER_LOGIN`.* TO 'USER_LOGIN'@'%';

    ALTER DATABASE `USER_LOGIN` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

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

