---
layout: post
title: Ubuntu, recover root password
permalink: /926
tags: [linux, passwd, password, pwconv, pwd, recover, recovery, root, shadow, ubuntu]
----

You need to load into recovery mode


[![](http://mac-blog.org.ua/wp-content/uploads/130-300x197.png)](http://mac-
blog.org.ua/wp-content/uploads/130.png)


Then into root shell


[![](http://mac-blog.org.ua/wp-content/uploads/216-300x124.png)](http://mac-
blog.org.ua/wp-content/uploads/216.png)


Then run **passwd root** command to change root password.


Check output of passwd command.


If u see something like: **Authentication token manipulation error**


Try run **pwconv** command, it should fix this (problem is that passwd and
shadow files are not synced)


If pwconv fails with message like: **cannot lock /etc/passwd; try again
later**


There can be two problems, try to find and delete **passwd.lock** file.


Or in my case, remount file system to have write access with command: **mount
-o remount,rw /**


Links:


http://www.psychocats.net/ubuntu/resetpassword


http://www.mczone.ru/relations/num/422/1


http://askubuntu.com/questions/24006/how-do-i-reset-a-lost-administrativeroot-
password






