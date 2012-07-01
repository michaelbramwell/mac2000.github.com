---
layout: post
title: PowerShell RSS reader
permalink: /136
tags: [automate, cmd, powershell, script]
---

<code>([xml](new-object net.webclient).DownloadString("http://newsrss.bbc.co.u
k/rss/newsonline_world_edition/business/rss.xml")).rss.channel.item | format-
table title, pubDate

