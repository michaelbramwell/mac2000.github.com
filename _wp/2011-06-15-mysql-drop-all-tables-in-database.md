---
layout: post
title: MySQL drop all tables in database
permalink: /629
tags: [delete, drop, dump, mysql, mysqldump]
---

    mysqldump -u[USERNAME] -p[PASSWORD] --add-drop-table --no-data
[DATABASE] | grep ^DROP | mysql -u[USERNAME] -p[PASSWORD] [DATABASE]
