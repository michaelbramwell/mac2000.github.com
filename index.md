---
layout: home
title: My notes
---

Index
=====

Hello World

<ol>
{% for post in site.posts %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ol>

Pages
-----

<div>
{% for page in site.pages limit:20 %}
    <div><a href="{{ page.url }}">{{ page.title }}</a></div>
{% endfor %}
</div>

Posts
-----

<div>
{% for post in site.posts limit:20 %}
    <div><a href="{{ post.url }}">{{ post.title }}</a></div>
{% endfor %}
</div>

Tags
----


<div>
    {% for tag in site.tags %} 
      <div>
          <b>{{tag[0]}}</b>
      </div>
      {% for post in tag[1]%}
      <div>
        {{post.title}}
    </div>
      {% endfor %}
    {% endfor %}
</div>

Categories
----------

<div>
    {% for category in site.categories %} 
          <div>
              <b>{{category[0]}}</b>
          </div>
          {% for post in category[1]%}
          <div>
            {{post.title}}
        </div>
          {% endfor %}
    {% endfor %}
</div>
