---
layout: post
title: Branching with TortoiseSVN
permalink: /793
tags: [branch, merge, svn, tag, tortoise, trunk]
---

## Flow




  * Create a new branch


  * Switch your local working copy to the new branch


  * Develop in the branch (commit changes, etc.)


  * Merge changes from trunk into your branch


  * Merge changes from branch into trunk


  * Delete the branch


Original article: [http://stevesmithblog.com/blog/simple-branching-and-
merging-with-svn/](http://stevesmithblog.com/blog/simple-branching-and-
merging-with-svn/)

## Create a new branch


[![](http://mac-blog.org.ua/wp-content/uploads/image001-260x300.png)](http
://mac-blog.org.ua/wp-content/uploads/image001.png)


[![](http://mac-blog.org.ua/wp-content/uploads/image002-271x300.png)](http
://mac-blog.org.ua/wp-content/uploads/image002.png)


**From WC at URL** – will be path where you make previous step

**To URL** – path where branch will be created (usual: branches/YOUR_BRANCH_NAME)

[![](http://mac-blog.org.ua/wp-content/uploads/image003-300x135.png)](http
://mac-blog.org.ua/wp-content/uploads/image003.png)

## Switch Local Working Copy to New Branch


[![](http://mac-blog.org.ua/wp-content/uploads/image004-251x300.png)](http
://mac-blog.org.ua/wp-content/uploads/image004.png)


[![](http://mac-blog.org.ua/wp-content/uploads/image005-300x180.png)](http
://mac-blog.org.ua/wp-content/uploads/image005.png)

## Develop in the Branch


As usual

## Merge Changes from Trunk into your Branch


Instead **SVN Update** command use Merge


[![](http://mac-blog.org.ua/wp-content/uploads/image006-300x275.png)](http
://mac-blog.org.ua/wp-content/uploads/image006.png)


[![](http://mac-blog.org.ua/wp-content/uploads/image007-300x278.png)](http
://mac-blog.org.ua/wp-content/uploads/image007.png)


**URL to merge from** – will probably be trunk, leave all other blank

[![](http://mac-blog.org.ua/wp-content/uploads/image008-300x272.png)](http
://mac-blog.org.ua/wp-content/uploads/image008.png)


Default settings in most cases will match your needs


[![](http://mac-blog.org.ua/wp-content/uploads/image009-300x136.png)](http
://mac-blog.org.ua/wp-content/uploads/image009.png)


It there is conflicts, you will see something like this:


[![](http://mac-blog.org.ua/wp-content/uploads/image010-300x169.png)](http
://mac-blog.org.ua/wp-content/uploads/image010.png)

## Merge Your Branch Back Into Trunk


[![](http://mac-blog.org.ua/wp-content/uploads/image011-300x277.png)](http
://mac-blog.org.ua/wp-content/uploads/image011.png)


[![](http://mac-blog.org.ua/wp-content/uploads/image012-300x272.png)](http
://mac-blog.org.ua/wp-content/uploads/image012.png)


[![](http://mac-blog.org.ua/wp-content/uploads/image013-300x273.png)](http
://mac-blog.org.ua/wp-content/uploads/image013.png)


[![](http://mac-blog.org.ua/wp-content/uploads/image014-300x138.png)](http
://mac-blog.org.ua/wp-content/uploads/image014.png)


You’ll see this if you have not committed changes is your branch


[![](http://mac-blog.org.ua/wp-content/uploads/image015-300x138.png)](http
://mac-blog.org.ua/wp-content/uploads/image015.png)


Noticed, that in new versions of SVN, **first** you need to **switch back to
trunk**, then make **reintegrate branch**, and in **from url** put **url to
branch** that u want to reintegrate.

## Delete the Branch


[![](http://mac-blog.org.ua/wp-content/uploads/image016-300x170.png)](http
://mac-blog.org.ua/wp-content/uploads/image016.png)


[![](http://mac-blog.org.ua/wp-content/uploads/image017-300x212.png)](http
://mac-blog.org.ua/wp-content/uploads/image017.png)


[![](http://mac-blog.org.ua/wp-content/uploads/image018-300x264.png)](http
://mac-blog.org.ua/wp-content/uploads/image018.png)


You can easily restore any deleted branch

