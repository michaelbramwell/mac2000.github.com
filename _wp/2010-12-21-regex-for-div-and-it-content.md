---
layout: post
title: Regex for div and it content
permalink: /216
tags: [.net, c#, javascript, php, regex]
----

![](http://mac-blog.org.ua/wp-content/uploads/image03.png)

## C#


    
    <code>string html = @"<div class=""ddd"">ddd</div>
    
    <div class=""s"">hello<div>world</div>
    </div>
    <div class=""ddd"">ddd</div>";
    
    MessageBox.Show(Regex.Replace(html, @"<div class=""s""[^>]*>((?:(?:(?!<div[^>]*>|</div>).)+|<div[^>]*>([\s\S]*?)</div>)*)</div>", "XXXXXX", RegexOptions.IgnoreCase | RegexOptions.Singleline));</code>


## PHP


    
    <code><?php
    
    $cnt = '<div class="ddd">hello</div>
    
    <div class="s">hello<div>world</div>
    </div>
    <div class="ddd">hello</div>';
    
    $cnt = preg_replace('#<div\s+class="s"[^>]*>((?:(?:(?!<div[^>]*>|</div>).)+|<div[^>]*>[\s\S]*?</div>)*)</div>#six', '<h1>MAC WAS HERE</h1>', $cnt);
    
    echo $cnt;
    ?></code>


## JavaScript


    
    <code><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Untitled Document</title>
    <script type="text/javascript">
    function hello() {
       var cnt = document.body.innerHTML+'';
       cnt = cnt.replace(new RegExp('[\r\n]', 'gi'), '');
       cnt = cnt.replace(new RegExp('<div class="s">((?:(?:(?!<div[^>]*>|</div>).)+|<div[^>]*>.*?</div>)*)</div>', 'i'), '<h1>XXXX</h1>');
       document.body.innerHTML = cnt;
    }
    </script>
    </head>
    
    <body onload="hello()">
    <div class="ddd">hello</div>
    
    <div class="s">hello<div>world</div>
    </div>
    <div class="ddd">hello</div>
    </body>
    </html></code>

