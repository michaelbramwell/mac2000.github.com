---
layout: home
---

Index
=====

Hello World

Posts
-----

<div>
{% for post in site.posts limit:20 %}
    <div><a href="{{ post.url }}">{{ post.title }}</a></div>
{% endfor %}
</div>

Tags
----

{% for tag in site.tags %} 
  <b>{{tag[0]}}</b><br>
  {% for post in tag[1]%}{{post.title}}<br>{% endfor %}
{% endfor %}

Categories
----------

{% for category in site.categories %} 
  <b>{{category[0]}}</b><br>
  {% for post in category[1]%}{{post.title}}<br>{% endfor %}
{% endfor %}
