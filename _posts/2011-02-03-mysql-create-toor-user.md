---
layout: post
title: MySql create toor user
permalink: /416
tags: [admin, administration, database, db, grant, localhost, mysql, privilegies, root, toor, user]
---

    mysql --user=root mysql

    CREATE USER 'toor'@'localhost' IDENTIFIED BY 'toor';
    GRANT ALL PRIVILEGES ON *.* TO 'toor'@'localhost' WITH GRANT OPTION;
    CREATE USER 'toor'@'%' IDENTIFIED BY 'toor';
    GRANT ALL PRIVILEGES ON *.* TO 'toor'@'%' WITH GRANT OPTION;
    CREATE USER 'toor'@'127.0.0.1' IDENTIFIED BY 'toor';
    GRANT ALL PRIVILEGES ON *.* TO 'toor'@'127.0.0.1' WITH GRANT OPTION;
