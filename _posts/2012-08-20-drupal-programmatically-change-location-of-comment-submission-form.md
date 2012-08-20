---
layout: post
title: Drupal 6 programatically change location of comment submissiom form
tags: [drupal, comment, preprocess_node, comment_form_location, comment_form_below, comment_form_separate_page]
---

Here is example how to change location of comment submissiom form depending on node sticky flag (can be anything you want)

Add to your `template.php` file next function:

    // THEME_preprocess_node
    function test_preprocess_node(&$vars, $hook) {
        variable_set('comment_form_location_' . $vars['node']->type, $node->sticky ? COMMENT_FORM_SEPARATE_PAGE : COMMENT_FORM_BELOW );
    }

