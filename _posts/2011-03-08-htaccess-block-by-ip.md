---
layout: post
title: Htaccess block by ip
permalink: /495
tags: [apache, htaccess, remote_addr, rewritecond]
---

    RewriteEngine On

    RewriteCond %{REMOTE_ADDR} ^(81\.95\.184\.80|213\.120\.141\.24)
    RewriteRule ^.*$ special.page.html [R=301,L]
