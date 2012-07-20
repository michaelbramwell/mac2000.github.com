---
layout: page
title: Linux console
---

Change multiple files extension
-------------------------------

    rename 's/\.css$/\.scss/' *.css

Backup(restore) directory
-------------------------

    # backup
    tar -cpzf test-`date +%Y-%m-%d`.tar.gz /home/mac/test
    # restore
    tar -xpzf /home/mac/test-2012-04-25.tar.gz -C /

Backup(restore) mysql
---------------------

    # backup
    mysqldump --databases -u [LOGIN] --password=[PASSOWRD] [DATABASE] > /home/mac/db-`date +%Y-%m-%d`.sql
    # restore
    mysql -u [LOGIN] --password=[PASSWORD] [DATABASE] < /home/mac/db-2012-04-25.sql

If there is errors about importing big file, set `set global max_allowed_packet=128*1024*1024;`

Symlink
-------

    ln -s [link] [actual_file_or_directory_path]
