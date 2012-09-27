---
layout: post
title: MySQL import large dumps

tags: [backup, export, import, mysql, restore, mysqldump]
---

**Import**

    mysql -u username --password=password database_name < filename.sql

**Export**

    mysqldump -u USER --password=PASSWORD DATABASE > filename.sql
