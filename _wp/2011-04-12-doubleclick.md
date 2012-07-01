---
layout: post
title: DoubleClick
permalink: /552
tags: [ad, adsense, commercial, dc, doubleclick, google, service]
---

[![](http://mac-blog.org.ua/wp-content/uploads/DoubleClick-300x154.png)](http
://mac-blog.org.ua/wp-content/uploads/DoubleClick.png)


**Sample code for home page:**

header:


    <script type="text/javascript" src="http://partner.googleadservices.com/gampad/google_service.js"></script>
    <script type='text/javascript'>
        GS_googleAddAdSenseService("ca-pub-5675491672212760");
        GS_googleEnableAllServices();
    </script>
    <script type='text/javascript'>
        GA_googleAddSlot("ca-pub-5675491672212760", "Marketing_Home_240x400");
    </script>
    <script type='text/javascript'>
        //GA_googleAddAttr("Interests", "Sports");
        GA_googleFetchAds();
    </script>


inplace:


    <div style="width:240px;height:400px;background:#ccc;">
    <!-- Marketing_Home_240x400 -->
    <script type='text/javascript'>
        GA_googleFillSlot("Marketing_Home_240x400");
    </script>
    </div>


**Sample code for search results page:**

header:


    <script type='text/javascript' src='http://partner.googleadservices.com/gampad/google_service.js'>
    </script>
    <script type='text/javascript'>
        GS_googleAddAdSenseService("ca-pub-5675491672212760");
        GS_googleEnableAllServices();
    </script>
    <script type='text/javascript'>
        GA_googleAddAttr("region", "<%= Parameters.CityId%>");
        GA_googleAddAttr("keyword", "<%= Parameters.Keyword%>");
    </script>
    <script type='text/javascript'>
        GA_googleAddSlot("ca-pub-5675491672212760", "Marketing_VacList_240x400");
    </script>
    <script type='text/javascript'>
        GA_googleFetchAds();
    </script>


in place:


    <div style="width:240px;height:400px;background:#ccc;margin:10px auto;">
    <!-- Marketing_VacList_240x400 -->
    <script type='text/javascript'>
        GA_googleFillSlot("Marketing_VacList_240x400");
    </script>
    </div>


If u have more slots just copy paste their desc


For design purpuses u can use div#google_ad_div_SLOTNAME_ad_container - this
div creates if there is ad, so u can do something like:


    <!-- Marketing_VacList_240x400 -->
    <script type='text/javascript'>
        GA_googleFillSlot("Marketing_VacList_240x400");
    </script>
    <style type="text/css">
    #google_ads_div_Marketing_VacList_240x400_ad_container
    {
        background:#ccc;
        padding:10px;
        margin:auto;
    }
    </style>


Or even use js to do whatever u want


To post multiple values to key:


    GA_googleAddAttr("region", "kiev");
    GA_googleAddAttr("region", "lviv");


Notice:


keys - must be 10 characters length, only alphanumeric and underscores
allowed,


values - can be any string

