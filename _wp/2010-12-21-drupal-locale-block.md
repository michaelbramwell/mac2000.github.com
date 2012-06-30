---
layout: post
title: Drupal Locale Block
permalink: /188
tags: [drupal, php]
----

Если на главной странице отображается конкретная нода, то блок locale
(отображающий доступные языки сайта), на главной странице не работает


Проблема лечиться в файле: /modules/locale/locale.module

    
    <code>//$path = drupal_is_front_page() ? '<front>' : $_GET['q'];
    $path = drupal_is_front_page() && 'node' != arg(0) ? '<front>' : $_GET['q'];</code>

