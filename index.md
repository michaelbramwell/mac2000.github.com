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
<div id="cse" style="width: 100%;clearboth">Loading</div>
<script src="http://www.google.com/jsapi" type="text/javascript"></script>
<script type="text/javascript">
  google.load('search', '1');
  google.setOnLoadCallback(function() {
    var customSearchOptions = {};
    var googleAnalyticsOptions = {};
    googleAnalyticsOptions['queryParameter'] = 's';
    googleAnalyticsOptions['categoryParameter'] = '';
    customSearchOptions['googleAnalyticsOptions'] = googleAnalyticsOptions;  var customSearchControl = new google.search.CustomSearchControl(
      '000857461493106615220:h3g48vufhro', customSearchOptions);
    customSearchControl.setResultSetSize(google.search.Search.FILTERED_CSE_RESULTSET);
    customSearchControl.draw('cse');
  }, true);
</script>
