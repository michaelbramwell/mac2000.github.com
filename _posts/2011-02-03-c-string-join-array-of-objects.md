---
layout: post
title: C# string join array of objects
permalink: /413
tags: [.net, array, c#, convert, object, string, tostring, convertall]
---

    string.Join(",", Array.ConvertAll<object, string>((object[])value, Convert.ToString))
