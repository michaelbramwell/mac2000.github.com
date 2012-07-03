---
layout: post
title: Fixing a MySQL Character Encoding Mismatch
permalink: /621
tags: [backup, charset, collation, cp1251, dump, encoding, mysql, utf-8, utf8, windows-1251]
---

[![video](http://img.youtube.com/vi/hCciKNiE2TQ/0.jpg)](http://www.youtube.com/watch?v=hCciKNiE2TQ)

Make backup of database, as usual.

Open backup in notepad++.

Convert encoding to ANSII.

Change all cp1251 to utf8.

Save backup and import it.
