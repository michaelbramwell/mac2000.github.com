---
layout: post
title: Javascript window dimensions
permalink: /268
tags: [dimensions, height, javascript, js, width, window]
----

crossbrowser get window dimensions in javascript

    
    <code>var windowWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.clientWidth;
    var windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.clientHeight;	
    </code>

