---
layout: post
title: jQuery unwrap links
permalink: /717
tags: [child, grabber, html, jquery, link, parser, replacewith, text, unwrap]
---

Two ways:


    $('a').contents().unwrap();

    $('a').each(function() {
        $(this).replaceWith(this.childNodes);
    });


