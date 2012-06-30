---
layout: post
title: MsSql Unix time
permalink: /36
tags: [mssql, sql]
----

<code>--Convert Unix time 1282234070 to DateTime

    SELECT DATEADD(SECOND, 1282234070, {d '1970-01-01'})
    
    --Convert DateTime GETDATE() to Unix time
    SELECT DATEDIFF(s, '19700101', GETDATE())</code>

