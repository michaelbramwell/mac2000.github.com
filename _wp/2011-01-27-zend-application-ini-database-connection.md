---
layout: post
title: Zend application.ini database connection
permalink: /376
tags: [application, cfg, conf, config, database, db, ini, mysql, pdo, zend]
----

Here is example for _application.ini_:

    
    <code>resources.db.adapter = "PDO_MYSQL"
    resources.db.params.host = "localhost"
    resources.db.params.username = "root"
    resources.db.params.password = ""
    resources.db.params.dbname = "sakila"
    resources.db.isDefaultTableAdapter = true </code>




To access default db adapter use:

    
    <code>Zend_Db_Table::getDefaultAdapter()</code>

