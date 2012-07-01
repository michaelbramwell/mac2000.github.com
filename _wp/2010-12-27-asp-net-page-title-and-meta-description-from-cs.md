---
layout: post
title: Asp.net page title and meta description from cs
permalink: /263
tags: [.net, asp.net, c#, meta, seo, title]
---

<code>this.Page.Title = "TITLE_HERE";

    HtmlHead head = (System.Web.UI.HtmlControls.HtmlHead)Header;
    HtmlMeta meta = new HtmlMeta();
    meta.Attributes.Add("content", "DESCRIPTION_HERE");
    meta.Attributes.Add("name", "description");
    head.Controls.Add(meta);

