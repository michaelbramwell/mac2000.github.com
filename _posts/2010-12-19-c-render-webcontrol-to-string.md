---
layout: post
title: C# Render WebControl to string
permalink: /23
tags: [.net, asp.net, c#]
---

Add reference to `System.Web`

    StringBuilder sb = new StringBuilder();
    System.Web.UI.HtmlTextWriter tw = new System.Web.UI.HtmlTextWriter(new StringWriter(sb));

    System.Web.UI.WebControls.DataGrid htmlTable = new System.Web.UI.WebControls.DataGrid();
    htmlTable.DataSource = ds.Tables[0];
    htmlTable.DataBind();
    htmlTable.RenderControl(tw);

    MessageBox.Show(sb.ToString());
