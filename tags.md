---
layout: page
title: Tags
---

Tags
====

<dl>
{% for tag in site.tags %} 
    <dt><a name="{{ tag[0] }}">{{ tag[0] }}</a></dt>
    <dd><ol>
    {% for post in tag[1] %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
    </ol></dd>
{% endfor %}
</dl>
