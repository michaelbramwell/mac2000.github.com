---
layout: page
title: How to MySql
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
