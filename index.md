---
layout: base
title: My notes
---

<aside class="recent">
<h1>Recent</h1>
<ul>
{% for post in site.posts limit:20 %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
</aside>
<aside class="howto">
<h1>How to</h1>
<ul>
{% for page in site.pages %}
    {% if page.url contains '/howto/' %}
        <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endif %}
{% endfor %}
</ul>
</aside>
<div id="cse" style="width: 100%;clear:both;">Loading</div>
<script src="//www.google.com/jsapi"> </script>
<script>
    google.load('search', '1');
    google.setOnLoadCallback(function() {
        var customSearchOptions = {};
        var customSearchControl = new google.search.CustomSearchControl('000857461493106615220:h3g48vufhro', customSearchOptions);
        customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
        customSearchControl.draw('cse');
    }, true);
</script>
