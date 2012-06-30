---
layout: post
title: Drupal wysiwyg with imagebrowser and shadowbox
permalink: /754
tags: [d6, drupal, imagebrowser, shadowbox, tinymce, wysiwyg]
----

Note about configuring content manager friendly backend.


**Modules:**

[http://drupal.org/project/imagebrowser](http://drupal.org/project/imagebrowse
r) - 6.x-2.x - at moment in dev


[http://drupal.org/project/shadowbox](http://drupal.org/project/shadowbox)


**Dependencies:**

wysiwyg, jquery_update, views, imagecache, imageapi.


**Configuring imagebrowser:**

Probably before configuring imagebrowser you must configure imagecache
presets.


Specify role permissions, especialy for imagecache presets - this will prevent
user from inserting images as is.**

**

[![](http://mac-blog.org.ua/wp-content/uploads/120-300x172.png)](http://mac-
blog.org.ua/wp-content/uploads/120.png)


Do not forget to allow users to view imagecache presets.


Make some basic setup on **/admin/settings/imagebrowser** to configure styles
and defaults.


[![](http://mac-blog.org.ua/wp-content/uploads/35-209x300.png)](http://mac-
blog.org.ua/wp-content/uploads/35.png)


[![](http://mac-blog.org.ua/wp-content/uploads/44-218x300.png)](http://mac-
blog.org.ua/wp-content/uploads/44.png)


Enable imagebrowser fileter here **/admin/settings/filters**. In my case i
rearranget it to be last, after all other filters, but it works event if it
first - wich is probably better.


[![](http://mac-blog.org.ua/wp-content/uploads/54-236x300.png)](http://mac-
blog.org.ua/wp-content/uploads/54.png)


[![](http://mac-blog.org.ua/wp-content/uploads/63-300x264.png)](http://mac-
blog.org.ua/wp-content/uploads/63.png)


Edit wysiwyg profile at **/admin/settings/wysiwyg/profile** and enable **Image
Browser** plugin.


[![](http://mac-blog.org.ua/wp-content/uploads/210-300x120.png)](http://mac-
blog.org.ua/wp-content/uploads/210.png)


Now if all ok while editing pages you will see image button in editor.


[![](http://mac-blog.org.ua/wp-content/uploads/73-300x173.png)](http://mac-
blog.org.ua/wp-content/uploads/73.png)


**Configuring shadowbox:**

On **/admin/settings/shadowbox/automatic** check **Enable for all image
links**.


[![](http://mac-blog.org.ua/wp-content/uploads/83-300x171.png)](http://mac-
blog.org.ua/wp-content/uploads/83.png)


**Drush make:**

At moment must be:

    
    <code>projects[shadowbox][version] = "4.x-dev"</code>






