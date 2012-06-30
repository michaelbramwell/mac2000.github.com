---
layout: post
title: Ubuntu Desktop easiest LAMP
permalink: /361
tags: [admin, administration, apache, compass, haml, install, lamp, linux, mysql, pear, phpdoc, phpdocumentor, phpunit, sass, scss, setup, ubuntu, zend]
----

<code>sudo apt-get install tasksel

    sudo apt-get tasksel</code>


Then choose LAMP, this is all.


To install stufs like scss

    
    <code>sudo apt-get install rubygems
    sudo gem install haml
    sudo gem install compass</code>


Pear

    
    <code>sudo apt-get install php-pear</code>


Some tools

    
    <code>sudo pear channel-discover pear.phpunit.de
    sudo pear install phpunit/PHPUnit
    
    sudo pear channel-discover pear.php.net/PhpDocumentor
    sudo pear install PhpDocumentor
    
    sudo pear channel-discover zend.googlecode.com/svn
    sudo pear install zend/zend
    
    sudo apt-get install zend-framework-bin</code>

