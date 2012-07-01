---
layout: post
title: remote service control from cmd
permalink: /21
tags: [cmd, iis, remote, shell]
---

    net use \\server password /USER:user
    sc \\betasrv stop W3SVC
