---
layout: post
title: HTML Check omitted tags
permalink: /654
tags: [compass, gae, google_apps_engine, sass]
----

[http://check-ommited-tags.appspot.com/](http://check-ommited-
tags.appspot.com/)


[![how to check omitted html tags](http://check-omitted-
tags.appspot.com/images/howto.gif)](http://check-omitted-
tags.appspot.com/images/howto.gif)




Main idea is to help find omitted tags in html.


All job done by very small and simple script:

    
    <code>jQuery(document).ready(function($) {
    	function show_tab(tab) {
    		$('section').hide();
    		$(tab).show('hide');
    
    		$('nav a').removeClass('active');
    		$('nav a[href="' + tab + '"]').addClass('active');
    
    		if(tab == '#disqus' && $('#disqus_thread div').size() == 0) {
    			var disqus_shortname = 'checkomittedtags';
    			var disqus_identifier = 'checkomittedtags';
    			var disqus_url = 'http://check-omitted-tags.appspot.com/';
    
    			(function() {
    				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
    				dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
    				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    			})();
    		}
    
    		if(tab == '#about' && $('#fbcard a').size() == 0) {
    
    			$('#thanks').html('<img src="http://code.google.com/appengine/images/appengine-noborder-120x30.gif" alt="Технология Google App Engine" /><br /><img src="https://www.dropbox.com/static/17231/images/logo.png" alt="Dropbox" />');
    
    			$('#fbcard').html('<a href="http://ru-ru.facebook.com/marchenko.alexandr" target="_TOP" title="Александр Марченко"><img src="http://badge.facebook.com/badge/1717009617.167.612418335.png" width="387" height="84" style="border: 0px;" /></a>');
    			//run about snippet to add iframes, widgets
    		}
    	}
    
    	$('nav a').click(function(){
    		show_tab($(this).attr('href'));			
    		return false;
    	});
    
    	function check_closed_tags(html) {
    		//remove comments
    		html = html.replace(/<!--[\s\S]*?-->/gi, '');
    		//collapse scripts
    		html = html.replace(/<script[\s\S]*?<\/script>/gi, '[script]');
    		//collapse self closed tags
    		html = html.replace(/<(\w+[^>]*\/)>/gi, '[$1]');
    
    		//collapse safe selft closed tags
    		html = html.replace(new RegExp('<(img[^>]*)>', 'gi'), '[$1]');
    		html = html.replace(new RegExp('<(br[^>]*)>', 'gi'), '[$1]');
    		html = html.replace(new RegExp('<(hr[^>]*)>', 'gi'), '[$1]');
    		html = html.replace(new RegExp('<(input[^>]*)>', 'gi'), '[$1]');
    		html = html.replace(new RegExp('<(button[^>]*)>', 'gi'), '[$1]');
    
    		//collapse tags without nested tags
    		while(html.match(/<(\w+)[^>]*>(?:(?!\$\{)[^<])*<\/\1>/gi)) {
    			html = html.replace(/<(\w+)([^>]*)>(?:(?!\$\{)[^<])*<\/\1>/gi, '[$1$2]...[$1]');
    		}
    
    		return html;
    	}
    
    	function htmlspecialchars(string) {
    		return jQuery('<span>').text(string).html();
    	}
    
    	function add_class_names() {
    		$('#highlighted_res .tag:contains("</")').addClass('close_tag');
    		$('#highlighted_res .tag[class="tag"]').addClass('open_tag');
    		$('#highlighted_res .tag').each(function(index, item){
    			$(item).addClass($(item).find('.title').text()+'_tag');
    		});
    	}
    
    	function get_ommited_tags_info() {
    		var tags = [];
    		$('#highlighted_res .tag .title').each(function(i,e){
    			var tag = $(e).text();
    			if(('|' + tags.join('|') + '|').indexOf('|' + tag + '|') == -1) {
    				tags.push(tag);
    			}
    		});
    
    		var no_open_tag = [];
    		var no_close_tag = [];
    
    		$.each(tags, function(index, tag){
    			var open = $('#highlighted_res span[class="tag open_tag '+tag+'_tag"]').size();
    			var close = $('#highlighted_res span[class="tag close_tag '+tag+'_tag"]').size();
    			if(open != close) {
    				$('#highlighted_res .'+tag+'_tag').addClass('probably_tag_ommited');
    				if(open > close) {
    					no_close_tag.push({
    						'tag' : tag,
    						'open' : open,
    						'close' : close,
    						'diff' : open - close
    					});
    				} else {
    					no_open_tag.push({
    						'tag' : tag,
    						'open' : open,
    						'close' : close,
    						'diff' : close - open
    					});
    				}
    			}
    		});
    
    		var res = {
    			open : no_open_tag,
    			close : no_close_tag
    		};
    		return res;
    	}
    
    	function print_info(info) {
    		var msg = '';
    
    		if(info.close.length == 0 && info.open.length == 0) {
    			msg = 'Seems like all tags have pair';
    			$('#result_info').removeClass('error');
    			$('#result_info').addClass('success');
    		} else {
    
    			if(info.close.length > 0) {
    				msg += '<table cellspacing="0" cellpadding="0" border="0"><caption>Probably <b>' + info.close.length + ' close</b> tags ommited</caption><thead><tr><th>tag</th><th>open</th><th>close</th></tr></thead><tbody>';
    				$.each(info.close, function(index, item){
    					msg += '<tr><td>' + item.tag + '</td><td>' + item.open + '</td><td>' + item.close + '</td></tr>';
    				});
    				msg += '</tbody></table>';
    			}
    
    			if(info.open.length > 0) {
    				msg += '<table cellspacing="0" cellpadding="0" border="0"><caption>Probably <b>' + info.open.length + ' close</b> tags ommited</caption><thead><tr><th>tag</th><th>open</th><th>close</th></tr></thead><tbody>';
    				$.each(info.open, function(index, item){
    					msg += '<tr><td>' + item.tag + '</td><td>' + item.open + '</td><td>' + item.close + '</td></tr>';
    				});
    				msg += '</tbody></table>';
    			}
    
    			$('#result_info').removeClass('success');
    			$('#result_info').addClass('error');			
    		}
    
    		$('#result_info').html(msg);
    	}
    
    	$('#btnSubmit').click(function(){
    		var src = $('#src').val();
    
    		if('' + src.length == 0) {
    			$('#src').addClass('error');
    			return false;
    		} else {
    			$('#src').removeClass('error');
    		}
    
    		var html = check_closed_tags(src);
    
    		$('#res').val(html);
    		$('#highlighted_res').html(htmlspecialchars(html));
    
    		hljs.highlightBlock(document.getElementById('highlighted_res'), '    ');
    
    		add_class_names();
    
    		var info = get_ommited_tags_info();
    		print_info(info);
    
    		$('nav a[href="#result"]').show();			
    		show_tab('#result');
    		return false;
    	});
    });</code>




Also here is sass:

    
    <code>@import "compass/css3";
    @import "blueprint";
    @import "blueprint/reset";
    @import "blueprint/typography";
    
    @include blueprint-global-reset;
    @include blueprint-typography;
    
    html {overflow-y: scroll;}
    
    .container {
    	@include container;
    	//@include showgrid;
    	@include blueprint-form;
    
    	textarea {width:938px;}
    
    	nav {
    		padding:1em 0;
    		background:transparent image-url("icon.png") no-repeat 0 50%;
    		padding-left:20px;
    
    		label, a {margin-right:1em;}
    		label {
    			font-weight:normal;
    		}
    		a {
    			text-decoration:none;
    			border-bottom:1px dashed #0072bc;			
    			@include link-colors(#0072bc);
    		}
    		a.active {
    			color:#000;
    			border:none;
    			@include single-text-shadow;
    		}
    	}
    
    	aside.left {
    		@include column(12);
    	}
    	aside.right {
    		@include column(12, true);
    	}
    
    	pre code {color:#777;overflow:hidden;}
    	pre .probably_tag_ommited {background:#FBE3E4}
    	pre .probably_tag_ommited .title {color:#8A1F11}
    
    	.error {
    		@include error;
    
    		table {
    			margin-bottom:0;
    
    			thead th {
    				background:#8A1F11;
    				color:#fff;
    			}
    		}
    	}
    
    	.success {
    		@include success;
    	}
    }</code>




Application hosted on google apps engine, i do not know it at all, here is my
app.yaml:

    
    <code>application: check-omitted-tags
    version: 1
    runtime: python
    api_version: 1
    default_expiration: "30d"
    
    handlers:
    - url: /
      static_files: index.html
      upload: index.html
    
    - url: /images
      static_dir: images
    
    - url: /css
      static_dir: css
    
    - url: /js
      static_dir: js</code>


