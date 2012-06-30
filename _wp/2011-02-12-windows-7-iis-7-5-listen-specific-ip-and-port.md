---
layout: post
title: Windows 7 iis 7.5 listen specific ip and port
permalink: /444
tags: [.net, admin, administration, http, iis, ipaddress, iplisten, listen, netsh, port, server, w3w]
----

<code>net stop http /y

    netsh http add iplisten ipaddress=192.168.1.1:80
    netsh http show iplisten</code>


Deleting:

    
    <code>netsh http delete ::0.1.0.128</code>


Use IPv6 localhost:

    
    <code>netsh http add iplisten ipaddress=[0:0:0:0:0:0:0:1]:80</code>

