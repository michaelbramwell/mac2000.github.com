---
layout: post
title: Drupal theming
permalink: /186
tags: [drupal, php]
---

[http://drupal.org/node/587366](http://drupal.org/node/587366)


As example, we have 2 content types: page and story


Create new theme and define regions in its info file:


    regions[left] = Left sidebar
    regions[right] = Right sidebar
    regions[content] = Content
    regions[header] = Header
    regions[footer] = Footer
    regions[pageright] = Page right
    regions[pagetop] = Page top
    regions[pagebottom] = Page bottom
    regions[pageleft] = Page left
    regions[storyright] = Story right
    regions[storytop] = Story top
    regions[storybottom] = Story bottom
    regions[storyleft] = Story left


Then in template.php add


    function THEMENAME_preprocess_node(&$variables) {
        if($variables['type'] == 'page') {
            $variables['pagetop'] = theme('blocks', 'pagetop');
        }
    }


Then create files node-page.tpl.php and node-story.tpl.php and insert in them
somethins like this:


    <?php if ($pagetop): ?>
    <div style="background:#999;padding:1em;">
      <?php print $pagetop ?>
    </div>
    <?php endif; ?>


[http://drupal.org/node/163561](http://drupal.org/node/163561)

[http://drupal.org/node/807330](http://drupal.org/node/807330)

