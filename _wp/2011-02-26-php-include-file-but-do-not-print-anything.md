---
layout: post
title: Php include file but do not print anything
permalink: /462
tags: [include, ob, php, print, require]
---

<code>$string = get_include_contents('somefile.php');


    function get_include_contents($filename) {
        if (is_file($filename)) {
            ob_start();
            include $filename;
            $contents = ob_get_contents();
            ob_end_clean();
            return $contents;
        }
        return false;
    }

