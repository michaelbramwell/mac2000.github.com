---
layout: base
title: My notes
---

<article class="recent">
<h1>Recent</h1>
<ul>
{% for post in site.posts limit:20 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
</article>
<aside class="pipe">
<h1>Pipe</h1>
<ul id="pipe"></ul>
</aside>
