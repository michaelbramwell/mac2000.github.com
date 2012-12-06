---
layout: page
title: glamour notes
---

Меняем хостнейм

    echo glamour.mac-blog.org.ua > /etc/hostname

Обновляем систему

    apt-get update
    apt-get upgrade

Перенастраиваем консоль

    dpkg-reconfigure console-setup

Перенастраиваем часовой пояс (Europe/Kiev)

    dpkg-reconfigure tzdata

Локаль

    cat /usr/share/i18n/SUPPORTED | grep ru
    locale-gen ru_UA
    locale-gen ru_UA.UTF-8
    # вносим соотв. изменения в /etc/default/locale
    LANGUAGE=ru_UA:ru
    LANG=ru_UA.UTF-8


Обновление до 12.10

    apt-get install update-manager-core
    do-release-upgrade -d

Добавление пользователя

    adduser glamour
    usermod -a -G sudo glamour
    usermod -a -G www-data glamour

nginx

    apt-get install nginx

/var/run/glamour.php5-fpm.sock

