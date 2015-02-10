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

Copy table from one database to another
---------------------------------------

    DROP TABLE IF EXISTS destination_db.destination_table;
    CREATE TABLE IF NOT EXISTS destination_db.destination_table SELECT * FROM source_db.source_table;

Add column
----------

    ALTER TABLE books ADD COLUMN isbn VARCHAR(10) NOT NULL

Rename(change) column
---------------------

    ALTER TABLE books CHANGE COLUMN isbn ISBN VARCHAR(10) NOT NULL

Delete column
-------------

    ALTER TABLE books DROP COLUMN ISBN

Create index
------------

    CREATE INDEX isbn ON books(isbn);
    CREATE INDEX title_author ON books(title, author);

Delete index
------------

    DROP INDEX isbn ON books

Insert multiple rows
--------------------

    INSERT INTO books VALUES
    (...),
    (...);

Insert data from another table
------------------------------

    INSERT INTO destination_table(columns, to, insert, ...) SELECT columns, to, insert, ... FROM source_table;

Import data strategies
----------------------

Turn off indexes:

    ALTER TABLE books DISABLE KEYS;
    -- IMPORT DATA HERE
    ALTER TABLE books ENABLE KEYS;

For MyISAM:

    LOCK TABLES books WRITE;
    -- IMPORT DATA HERE
    UNLOCK TABLES;

For InnoDB:

    BEGIN;
    -- IMPORT DATA HERE
    COMMIT;

Dates
-----

    SELECT DATE_SUB(CURDATE(), INTERVAL 1 WEEK),  DATE_ADD(CURDATE(), INTERVAL 1 WEEK)

Create user
-----------

    CREATE USER username@host IDENTIFIED BY 'password'

Will add record to mysql.user table

Delete user
-----------

    DROP USER username@host

Rename user
-----------

    RENAME USER username@host TO new_username@host

Change password
---------------

    SET PASSWORD FOR username@host = PASSWORD('password')

Create user and grand privileges
--------------------------------

    GRANT ALL ON sakila.* TO username@host IDENTIFIED BY 'password';

Is user not exists it will be created, if user exists you can skip `IDENTIFIED BY 'password'` to leave old user password, but if you will not - password will be changed to the new one.

Show user privileges
--------------------

    SHOW GRANTS FOR username@host

Dissalow user change data
-------------------------

    REVOKE INSERT, UPDATE, DELETE ON sakila.payment FROM username@host

Change column type from string to decimal
-----------------------------------------

	DROP TABLE IF EXISTS test;
	CREATE TABLE test LIKE zapornoregulirujushchajaarmatura;
	INSERT test SELECT * FROM zapornoregulirujushchajaarmatura;
	ALTER TABLE test ADD COLUMN price2 DECIMAL(20, 2) DEFAULT NULL;
	UPDATE test SET price2 =  CAST(REPLACE(price, ' $', '') AS DECIMAL(20, 2));
	SELECT price, price2 FROM test;
	ALTER TABLE test DROP COLUMN price;
	ALTER TABLE test CHANGE COLUMN price2 price DECIMAL(20, 2) DEFAULT NULL;

