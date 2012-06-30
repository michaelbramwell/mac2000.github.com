---
layout: post
title: Highilight line in textarea
permalink: /98
tags: [javascript]
----

Пример подсветки текущей строки в textarea

    
    <code><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Untitled Document</title>
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.4.2.min.js"></script>
    <!--<script type="text/javascript" src="jquery.caret.1.02.min.js"></script>-->
    <script type="text/javascript">
    /*
     *
     * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
     * Licensed under the MIT License:
     * http://www.opensource.org/licenses/mit-license.php
     *
     */
    ﻿(function(k,e,i,j){k.fn.caret=function(b,l){var a,c,f=this[0],d=k.browser.msie;if(typeof b==="object"&&typeof b.start==="number"&&typeof b.end==="number"){a=b.start;c=b.end}else if(typeof b==="number"&&typeof l==="number"){a=b;c=l}else if(typeof b==="string")if((a=f.value.indexOf(b))>-1)c=a+b[e];else a=null;else if(Object.prototype.toString.call(b)==="[object RegExp]"){b=b.exec(f.value);if(b!=null){a=b.index;c=a+b[0][e]}}if(typeof a!="undefined"){if(d){d=this[0].createTextRange();d.collapse(true);
    d.moveStart("character",a);d.moveEnd("character",c-a);d.select()}else{this[0].selectionStart=a;this[0].selectionEnd=c}this[0].focus();return this}else{if(d){c=document.selection;if(this[0].tagName.toLowerCase()!="textarea"){d=this.val();a=c[i]()[j]();a.moveEnd("character",d[e]);var g=a.text==""?d[e]:d.lastIndexOf(a.text);a=c[i]()[j]();a.moveStart("character",-d[e]);var h=a.text[e]}else{a=c[i]();c=a[j]();c.moveToElementText(this[0]);c.setEndPoint("EndToEnd",a);g=c.text[e]-a.text[e];h=g+a.text[e]}}else{g=
    f.selectionStart;h=f.selectionEnd}a=f.value.substring(g,h);return{start:g,end:h,text:a,replace:function(m){return f.value.substring(0,g)+m+f.value.substring(h,f.value[e])}}}}})(jQuery,"length","createRange","duplicate");
    </script>
    <script type="text/javascript">
    $(function(){
    	$('#data').keyup(highlightTextArea).mouseup(highlightTextArea).scroll(highlightTextArea);
    });	
    
    function highlightTextArea() {
    	var m = ($.browser.msie || $.browser.opera) ? 2 : 1;
    	var count = $('#data').caret().start;
    	var lines = $('#data').val().split('\n');
    	for(var i = 0; i < lines.length; i++) {
    		count = count - lines[i].length - m;
    		if(count < 0) break;
    	}
    
    	var lineHeight = parseInt($('#data').css('line-height'));
    	if(isNaN(lineHeight)) lineHeight = 16;
    	var top = i * lineHeight - $('#data').scrollTop();
    	top = '0 ' + parseInt(top) + 'px';
    	$('#data').css('background-position', top);
    }
    </script>
    <style type="text/css">
    #data {padding:0;border:1px solid #999;font:14px/16px Arial;background:#fff url(z.png) repeat-x 0 0}
    </style>
    </head>
    
    <body>
    <textarea name="data" id="data" rows="10" columns="50" wrap="off" >1. line
    2. line
    3. line
    4. line
    5. line
    6. line
    7. line
    8. line
    9. line
    10. line
    11. line
    12. line
    13. line
    14. line
    15. line</textarea>
    </body>
    </html></code>

