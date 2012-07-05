---
layout: home
title: My notes
---

Index
=====

<ol>
{% for post in site.posts limit:20 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ol>
