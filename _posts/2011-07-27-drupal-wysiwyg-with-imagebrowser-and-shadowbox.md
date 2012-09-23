---
layout: post
title: Drupal wysiwyg with imagebrowser and shadowbox

tags: [d6, drupal, imagebrowser, shadowbox, tinymce, wysiwyg]
---

Note about configuring content manager friendly backend.

**Modules:**

http://drupal.org/project/imagebrowser - 6.x-2.x - at moment in dev

http://drupal.org/project/shadowbox

**Dependencies:**

wysiwyg, jquery_update, views, imagecache, imageapi.

**Configuring imagebrowser:**

Probably before configuring imagebrowser you must configure imagecache presets.

Specify role permissions, especialy for imagecache presets - this will prevent user from inserting images as is.


![screenshot](/images/wp/120.png)

Do not forget to allow users to view imagecache presets.

Make some basic setup on **/admin/settings/imagebrowser** to configure styles and defaults.

![screenshot](/images/wp/35.png)

![screenshot](/images/wp/44.png)

Enable imagebrowser fileter here **/admin/settings/filters**. In my case i rearranget it to be last, after all other filters, but it works event if it first - wich is probably better.

![screenshot](/images/wp/54.png)

![screenshot](/images/wp/63.png)

Edit wysiwyg profile at **/admin/settings/wysiwyg/profile** and enable **Image Browser** plugin.

![screenshot](/images/wp/210.png)

Now if all ok while editing pages you will see image button in editor.

![screenshot](/images/wp/73.png)

**Configuring shadowbox:**

On **/admin/settings/shadowbox/automatic** check **Enable for all image links**.

![screenshot](/images/wp/83.png)

**Drush make:**

At moment must be:

    projects[shadowbox][version] = "4.x-dev"
