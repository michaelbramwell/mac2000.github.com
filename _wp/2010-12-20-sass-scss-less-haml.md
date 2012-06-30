---
layout: post
title: Sass, Scss, Less, Haml
permalink: /171
tags: [haml, less, ruby, sass, scss]
----


## Refactoring with SASS


[http://chriseppstein.github.com/blog/2010/05/25/refactor-my-stylesheets-digg-
edition/](http://chriseppstein.github.com/blog/2010/05/25/refactor-my-
stylesheets-digg-edition/)

## Get Ruby


On Windows

[http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)


Sass tutorial

[http://sass-lang.com/tutorial.html](http://sass-lang.com/tutorial.html)

## Less




In console:



    
    <code>gem install less
    lessc style.less</code>


style.less file content:

    
    <code>@brand_color: #4D926F;
    
    #header {
     color: @brand_color;
    }
    
    h2 {
     color: @brand_color;
    }</code>


will be converted to style.css:

    
    <code>#header, h2 { color: #4d926f; }</code>



## Sass


    
    <code>sass C:\Users\mac\Desktop\test.sass:C:\Users\mac\Desktop\test2.css</code>


will convert test.sass file:





    
    <code>$blue: #3bbfce
    $margin: 16px
    
    .content-navigation
      border-color: $blue
      color: darken($blue, 9%)
    
    .border
      padding: $margin / 2
      margin: $margin / 2
      border-color: $blue</code>


to test2.css:



    
    <code>.content-navigation {
      border-color: #3bbfce;
      color: #2ca2af; }
    
    .border {
      padding: 8px;
      margin: 8px;
      border-color: #3bbfce; }</code>




## Haml


    
    <code>haml C:\Users\mac\Desktop\test.haml C:\Users\mac\Desktop\test3.html</code>


will convert test.haml file:






    
    <code>#content
      .left.column
    	%h2 Welcome to our site!
    	%p Lorem ipsum
      .right.column
    	%p Lorem ipsum</code>




to test3.html:




    
    <code><div id='content'>
      <div class='left column'>
    	<h2>Welcome to our site!</h2>
    	<p>Lorem ipsum</p>
      </div>
      <div class='right column'>
    	<p>Lorem ipsum</p>
      </div>
    </div></code>




## Scss


    
    <code>sass C:\Users\mac\Desktop\test.scss:C:\Users\mac\Desktop\test3.css</code>


will convert test.scss file:





    
    <code>$blue: #3bbfce;
    $margin: 16px;
    .border {
      padding: $margin / 2;
      margin: $margin / 2;
      border-color: $blue;
    }</code>


to test3.css:




    
    <code>.border {
      padding: 8px;
      margin: 8px;
      border-color: #3bbfce; }</code>



