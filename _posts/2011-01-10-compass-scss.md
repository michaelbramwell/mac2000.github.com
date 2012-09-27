---
layout: post
title: Compass &#038; SCSS

tags: [compass, css, css3, gem, ruby, sass, scss]
---

Рульная штука с целой кучей примочек.

Установка

    gem install compass

Создание проекта

    compass create my1

В созданном проекте в папке src, лежат сырки scss.

Компиляция

    compass compile my1

Плюшки

http://compass-style.org/docs/reference/compass/

Например в SCSS

    @import "compass/css3/border-radius";

    .simple   { @include border-radius(5px); }

На выходе:

    .simple {
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      -o-border-radius: 5px;
      -ms-border-radius: 5px;
      -khtml-border-radius: 5px;
      border-radius: 5px;
    }

И там такого добра целая куча.

Компиляция для продакшена

    compass compile -e production --force my1

Компиляция с полным ужатием

    compass compile --output-style compressed --force my1

В самом простом случае, если нужно что то добавить идем в доки http://compass-style.org/docs/reference/compass/

смотрим что надо заимпортить, наприм.:

    @import "compass/css3/inline-block"

потом уже можно писать

    .test {@include inline-block;}

Спека по SASS/SCSS: http://sass-lang.com/

Пожалуй самое прикольное:

    @import "compass/reset/utilities";

    .my {
        @include nested-reset;
    }

и можно начинать действительно блочную и абсолютно не зависимую верстку

Для беспрерывной компиляции используем:

    compass watch my1

Compass вешается на изменение исходников и если видит их то сам компилирует проект.
