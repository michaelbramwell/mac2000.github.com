---
layout: post
title: C# Linq on DataColumnCollection
permalink: /250
tags: [.net, c#, linq]
----

<code>var q = from x in dt.Columns.Cast<DataColumn>()

    	where x.ColumnName != "Month"
    	select x.ColumnName;</code>

