---
---

var tags = [
    {% for tag in site.tags %}{
        tag: '{{tag[0]}}',
        posts: [
            {% for post in tag[1]%}{title: '{{post.title}}', url: '{{post.url}}'}{% unless forloop.last %},{% endunless %}{% endfor %}
        ]
    }{% unless forloop.last %},{% endunless %}{% endfor %}
];
