---
layout: post
title: WordPress – добавляем аватар автора к статье
permalink: /69
tags: [gravatar, php, wordpress]
----

Wordpress использует сервис [Gravatar](http://ru.gravatar.com/) для
отображения аватарок. И имеет встроенные средства для их вывода. Все, как
обычно, в духе wordpress, делается одной строчкой кода, итак чтобы отобразить
аватар автора, необходимо написать:

    
    <code><?php echo get_avatar( get_the_author_email() ); ?></code>


более подробно, об использовании аваторок, можно прочесть в [кодексе
разработчиков](http://codex.wordpress.org/Using_Gravatars) wordpress’а.


Это очень удобно при создании новостных сайтов, так как позволит автоматом
создать красивый и стильный сайт.

