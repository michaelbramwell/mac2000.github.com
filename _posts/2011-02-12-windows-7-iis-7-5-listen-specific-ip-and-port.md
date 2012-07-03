---
layout: post
title: Windows 7 iis 7.5 listen specific ip and port
permalink: /444
tags: [.net, admin, administration, http, iis, ipaddress, iplisten, listen, netsh, port, server, w3w]
---

    net stop http /y

    netsh http add iplisten ipaddress=192.168.1.1:80
    netsh http show iplisten

Deleting:

    netsh http delete ::0.1.0.128

Use IPv6 localhost:

    netsh http add iplisten ipaddress=[0:0:0:0:0:0:0:1]:80
