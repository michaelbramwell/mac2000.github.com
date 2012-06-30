---
layout: default
---

Index
=====

[ya.ru](http://ya.ru)
[relative](/one/)
Hello World

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
