---
layout: page
title: wget
---

Login
-----

    wget -q --wait=1 --random-wait --cookies=on --keep-session-cookies --save-cookies=cookies.txt --user-agent="Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0" "http://example.com"
    wget -q --wait=1 --random-wait --cookies=on --keep-session-cookies --load-cookies=cookies.txt --save-cookies=cookies.txt --user-agent="Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0" --post-data "Login=[LOGIN]&Password=[PASSWORD]" "http://example.com/login"

Download links from file
------------------------

    wget -q --wait=1 --random-wait --cookies=on --keep-session-cookies --load-cookies=cookies.txt --user-agent="Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0" --input-file=cvs.txt

Download site
-------------

    wget --mirror -p --convert-links -P ~/Desktop/example.com http://example.com

Define output file
------------------

    wget -q "http://example.com/index.php?page=about" -O about.html

Check for broken links
----------------------

    wget --spider -o wget.log -e robots=off -r -p http://localhost:4000

if there is broken links they will be at bottom of log file

