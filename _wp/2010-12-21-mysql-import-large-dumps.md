---
layout: post
title: MySQL import large dumps
permalink: /204
tags: [backup, export, import, mysql, restore]
----

Для импорта дампа используем:

    
    mysql -u username --password=password database_name < filename.sql


Для экспорта:

    
    mysqldump -u USER --password=PASSWORD DATABASE > filename.sql

