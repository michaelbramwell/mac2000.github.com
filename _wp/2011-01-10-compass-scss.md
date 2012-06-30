---
layout: post
title: Compass &#038; SCSS
permalink: /300
tags: [compass, css, css3, gem, ruby, sass, scss]
----

Рульная штука с целой кучей примочек.


Установка

    
    <code>gem install compass</code>


Создание проекта

    
    <code>compass create my1</code>


В созданном проекте в папке src, лежат сырки scss.


Компиляция

    
    <code>compass compile my1</code>


Плюшки


[http://compass-style.org/docs/reference/compass/](http://compass-
style.org/docs/reference/compass/)


Например в SCSS

    
    <code>@import "compass/css3/border-radius";
    
    .simple   { @include border-radius(5px); }</code>


На выходе:

    
    <code>.simple {
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      -o-border-radius: 5px;
      -ms-border-radius: 5px;
      -khtml-border-radius: 5px;
      border-radius: 5px;
    }</code>


И там такого добра целая куча.


Компиляция для продакшена

    
    <code>compass compile -e production --force my1</code>


Компиляция с полным ужатием

    
    <code>compass compile --output-style compressed --force my1</code>


В самом простом случае, если нужно что то добавить идем в доки ([http
://compass-style.org/docs/reference/compass/](http://compass-
style.org/docs/reference/compass/))


смотрим что надо заимпортить, наприм.:

    
    <code>@import "compass/css3/inline-block"</code>


потом уже можно писать

    
    <code>.test {@include inline-block;}</code>


Спека по SASS/SCSS: [http://sass-lang.com/](http://sass-lang.com/)


Пожалуй самое прикольное:

    
    <code>@import "compass/reset/utilities";
    
    .my {
    	@include nested-reset;
    }</code>


и можно начинать действительно блочную и абсолютно не зависимую верстку


Для беспрерывной компиляции используем:

    
    <code>compass watch my1</code>




Compass вешается на изменение исходников и если видит их то сам компилирует
проект.

