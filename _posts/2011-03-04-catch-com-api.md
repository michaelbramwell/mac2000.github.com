---
layout: post
title: Catch.com api
permalink: /475
tags: [.net, api, c#, catch, note, notes, php]
---

found at: http://github.com/catch/docs-api

    string api = "https://api.snaptic.com/v1/notes.json";

    WebClient wc = new WebClient();
    wc.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes("LOGIN:PASSWORD")));
    string json = wc.DownloadString(api);

    MessageBox.Show(json);

http://github.com/catch/docs-api/wiki/Catch-REST-API-Quickstart-Guide

http://github.com/catch/docs-api/wiki/Catch-REST-API
