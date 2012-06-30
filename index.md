---
layout: home
---

Index
=====

Hello World

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

Tags
----
{% for tag in site.tags %} 
  {{tag[0]}}<br>
  {% for post in tag[1]%}{{post.title}}<br>{% endfor %}
{% endfor %}

Categories
----------
{% for category in site.categories %} 
  {{category[0]}}<br>
  {% for post in tag[1]%}{{post.title}}<br>{% endfor %}
{% endfor %}
