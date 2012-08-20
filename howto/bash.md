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

Search for text in files
------------------------

    grep -H -r "TODO" | cut -d: -f1

Sync with production server
---------------------------

    rsync -avz -e ssh [USERNAME]@[HOST]:/var/www/ ./
    mysqldump --add-drop-database --databases -h [HOST] -u [USERNAME] --password=[PASSWORD] [DATABASE] > [FILE_NAME].sql
    mysql -u root --password=[PASSWORD] < [FILE_NAME].sql

First command will sync files, two next - database
