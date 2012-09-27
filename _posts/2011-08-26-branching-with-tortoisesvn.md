---
layout: post
title: Branching with TortoiseSVN

tags: [branch, merge, svn, tag, tortoise, trunk]
---

Flow
----

* Create a new branch
* Switch your local working copy to the new branch
* Develop in the branch (commit changes, etc.)
* Merge changes from trunk into your branch
* Merge changes from branch into trunk
* Delete the branch

Original article: http://stevesmithblog.com/blog/simple-branching-and-merging-with-svn/

Create a new branch
-------------------

![screenshot](/images/wp/image001.png)

![screenshot](/images/wp/image002.png)

**From WC at URL** – will be path where you make previous step

**To URL** – path where branch will be created (usual: branches/YOUR_BRANCH_NAME)

![screenshot](/images/wp/image003.png)

Switch Local Working Copy to New Branch
---------------------------------------

![screenshot](/images/wp/image004.png)

![screenshot](/images/wp/image005.png)

Develop in the Branch
---------------------

As usual

Merge Changes from Trunk into your Branch
-----------------------------------------

Instead **SVN Update** command use Merge

![screenshot](/images/wp/image006.png)

![screenshot](/images/wp/image007.png)

**URL to merge from** – will probably be trunk, leave all other blank

![screenshot](/images/wp/image008.png)

Default settings in most cases will match your needs

![screenshot](/images/wp/image009.png)

It there is conflicts, you will see something like this:

![screenshot](/images/wp/image010.png)

Merge Your Branch Back Into Trunk
---------------------------------

![screenshot](/images/wp/image011.png)

![screenshot](/images/wp/image012.png)

![screenshot](/images/wp/image013.png)

![screenshot](/images/wp/image014.png)

You’ll see this if you have not committed changes is your branch

![screenshot](/images/wp/image015.png)

Noticed, that in new versions of SVN, **first** you need to **switch back to trunk**, then make **reintegrate branch**, and in **from url** put **url to branch** that u want to reintegrate.

Delete the Branch
-----------------

![screenshot](/images/wp/image016.png)

![screenshot](/images/wp/image017.png)

![screenshot](/images/wp/image018.png)

You can easily restore any deleted branch
