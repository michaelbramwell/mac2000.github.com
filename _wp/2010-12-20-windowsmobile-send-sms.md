---
layout: post
title: WindowsMobile send SMS
permalink: /107
tags: [.net, c#, mobile]
----

## references


    
    <code>Microsoft.WindowsMobile
    Microsoft.WindowsMobile.PocketOutlook</code>


## code


    
    <code>using Microsoft.WindowsMobile.PocketOutlook;
    
    try
    {
    	SmsMessage sms = new SmsMessage();
    	sms.Body = "hello world";
    	sms.To.Add(new Recipient("+380984561952"));
    	sms.Send();
    	MessageBox.Show("Message sent!");
    }
    catch (Exception ex)
    {
    	MessageBox.Show(ex.Message);
    }</code>

