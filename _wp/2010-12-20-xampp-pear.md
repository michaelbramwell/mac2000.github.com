---
layout: post
title: XAMPP Pear
permalink: /39
tags: [admin, develop, pear, php]
----

**List installed packages**

    
    <code>C:\xampp\php\pear.bat list</code>


**Install package with all dependencies**

    
    <code>C:\xampp\php\pear.bat install PACKAGE -a</code>


**Help**

    
    <code>C:\xampp\php\pear.bat help COMMAND</code>


**Upgrade**

    
    <code>C:\xampp\php\pear.bat upgrade-all</code>


**Channels**

[http://www.developertutorials.com/pear-manual/guide.users.commandline.channel
s.html](http://www.developertutorials.com/pear-
manual/guide.users.commandline.channels.html)


**PEAR.INI**

Add **PHP_PEAR_SYSCONF_DIR** sys variable that point to php’s dir


**BETA**

To install beta use something like this:

    
    <code>pear install channel://pear.php.net/PEAR_Frontend_Web-0.7.5</code>


**Pear webinstaller**

    
    <code>pear install pear/PEAR#webinstaller</code>

