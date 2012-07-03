---
layout: post
title: Windows cmd user input
permalink: /899
tags: [batch, cmd, input, shell]
---

    @ECHO OFF

    set /P ntid=Enter NotebookId: %=%
    copy scss\0.scss scss\%ntid%.scss
    copy js\0.scss js\%ntid%.js
