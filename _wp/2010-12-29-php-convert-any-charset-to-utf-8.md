---
layout: post
title: php convert any charset to utf-8
permalink: /271
tags: [charset, cp-1251, encoding, iconv, php, utf-8, windoth-1251]
----

К примеру выдираем страницу, не знаем ее кодировку, но хотим чтобы она стала
utf-8

    
    <code>require_once dirname(__FILE__) . '/a.charset.php';
    function _convertHtmlToUtf8($html) {
    	preg_match('/<meta.*?http-equiv.*?charset[\s\r\n\t]*=(.*?)([\'"]{1})/si', $html, $matches);
    	if (isset($matches[1])) {
    		if (strtolower($matches[1]) != 'utf-8') {
    			$html = charset_x_win($html);
    			$html = iconv('cp1251', 'utf-8', $html);
    			preg_replace('/<meta.*?http-equiv[^>]+>/si', '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />', $html);
    		}
    	}
    
    	return $html;
    }
    </code>


[a.charset.php](http://mac-blog.org.ua/wp-content/uploads/a.charset.php_.zip)

