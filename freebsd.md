---
layout: page
title: FreeBSD
---

Файловая система
----------------

GTP (GUID Partition Table) - свежая замена MBR, позволяющая работать с разделами больше 2Тб.

При разбивке заполняются поля:

Type - тип раздела, может быть: `freebsd-boot` (загрузочный сектор), `freebsd-ufs`, `freebsd-swap`, `freebsd-zfs` (современная файловая система требующая современное железо, на виртуальной машине можно забыть).
Size - размер раздела (понимает согращения `K`, `M`, `G`).
Mountpoint - точка монтирования.
Label - метка устройства, используется в `/etc/fstab` вместо стандартного устройства, метки храняться в `/dev/gpt/` и очень удобны в случае замены железа.


Пример:

    Type: freebsd-boot
    Size: 64K
    Mountpoint:
    Label:

    Type: freebsd-ufs
    Size: 1G
    Mountpoint: /
    Label: v1-root

    Type: freebsd-swap
    Size: 512M
    Mountpoint:
    Label: v1-swap

    Type: freebsd-ufs
    Size: 2G
    Mountpoint: /var
    Label: v1-var

    Type: freebsd-ufs
    Size: 1G
    Mountpoint: /tmp
    Label: v1-tmp

    Type: freebsd-ufs
    Size: 10G
    Mountpoint: /usr
    Label: v1-usr

При использовании `GTP` важно чтобы первым разделом был `freebsd-boot`, а вторым - корневой `freebsd-ufs`, так как что ожидает увидеть загрузчик `gptboot`, если разбить по другому система просто не сможет загрузиться.

Как обычно `swap` должен быть в двое большим чем объем оперативной памяти.

Обязательно нужно создать `freebsd-boot` раздел, так как там будет храниться загрузчик системы, его размер должен быть не менее `64K` и не более `512K`.

Остальные разделы диска не обязательны, но такая разбивка является хорошей практикой так как позволяет:

* Подключать тот же корневой раздел только на чтение, что делает его не убиваемым.
* Изолировать высоко нагруженные (IO) разделы и тех которые почти не используются (чем больше операций происходит тем выше шанс выхода из строя файловой системы).

Раздел `/usr` должен быть не мение 512 Мб, если предпологается установка портов и не мение 1 Гб если предпологается установка исходиков ядра и не мение 5 Гб если предпологается пересборка ядра. Как правило на этот раздел выделяют все оставшееся на винчестере место.

Раздел `/var` по идее должен хранить данные баз, сайтов и прочего ПО, его размер должен быть выяснен предварительно.

Оптимальный порядок разделов при разбивке: root, swap, /var, /usr (первые разделы распологаются в центре диска который быстрее).


ZFS
---

http://ximalas.info/2011/10/17/zfs-root-fs-on-freebsd-9-0/

TODO
----

Что если у нас закончилось место на `/var` (нужно проверить как добавляется новый диск, форматируется и подключается в эту точку монтирования, так же выяснить что потом можно сделать со старым разделом чтобы он не пропадал за зря).

Настройка сети на свежеустановленной системе
--------------------------------------------

http://www.freebsd.org/doc/en/books/handbook/config-network-setup.html
http://www.freebsd.org/doc/en/books/handbook/network-dhcp.html

**Посмотреть сетевые карты:**

    ifconfig | grep "^[a-z]" | cut -d":" -f 1

**IP - статика**

    ifconfig em0 inet 192.168.5.201 netmask 255.255.255.0

Либо в `/etc/rc.conf`

    ifconfig_em0="inet 192.168.5.201 netmask 255.255.255.0"

Второй вариант предпочтительнее так как настройки из этого файла считываются в `/etc/rc.d/netif` который стартует при загрузке системы

**Несколько адресов на одну сетевуху**

Через консоль

    ifconfig em0 inet 192.168.5.201 netmask 255.255.255.0
    ifconfig em0 inet 192.168.5.202 netmask 255.255.255.0 alias

Через `/etc/rc.conf`

ifconfig_em0="inet 192.168.5.201 netmask 255.255.255.0"
ifconfig_em0_alias0="inet 192.168.5.202 netmask 255.255.255.0"

**IP - DHCP**

    ifconfig_em0="DHCP"

Если нужно остановить запуск системы до завершения инициализации сети, можно использовать `SYNCDHCP` вместо `DHCP`.

Если сеть конфигурируется по DHCP, то автоматом будут перезаписаны `/etc/resolv.conf` и добавлен шлюз по умолчанию.

**Шлюз**

Для просмотра текущей маршрутизации пользуем `netstat -rn`

Добавляем в `/etc/rc.conf`

    defaultrouter="192.168.5.1"

Через консоль

    route add default 192.168.5.1

Удалить шлюз через консоль

    route delete default

**DNS**

Если пользуется статика вместо DHCP, нужно в файл `/etc/resolv.conf` добавить что то вроде такого:

    nameserver 8.8.8.8

Можно как то через консоль управиться с помощью команды `resolvconf`

**Перезапуск**

    /etc/rc.d/netif restart
    /etc/rc.d/routing restart
    /etc/rc.d/resolv restart

**Hyper-V**

Для работы сети из под Hyper-V нужно удалить тамошнюю сетевуху и создать Legacy Adapter. Но и после этого оно не заработает, чтобы работало правим rc.conf вот так:

    ifconfig_de0="DHCP media 100baseTX mediaopt full-duplex"

После чего:

    ifconfig de0 down
    ifconfig de0 up
    dhclient de0



Порты
-----

http://adw0rd.com/2009/3/3/freebsd-ports-and-pkg/

Первый раз:

    portsnap fetch
    portsnap extract

Обновление

    portsnap fetch update


Порты
-----

    make install #установка
    make reinstall #переустановка
    make deinstall #удаление
    make clean #очистка от промежуточных сборок
    make distclean #очистка скачаных файлов
    make config #предустановочная настройка
    make search key=КЛЮЧ #поиск по ключу
    make search name=ИМЯ #поиск по имени

Пример:

    cd /usr/ports/www/apache22/
    make config
    make install clean
    rehash

`rehash` обновляет пути к приложениям чтобы можно было не писать `/path/to/programm`

Обновление дерева портов

    portsnap fetch update

Обновление порта

Выполняется командой `portupgrade` которую вначале нужно поставить:

    cd /usr/ports/ports-mgmt/portupgrade
    make install clean

Обновление:

    portupgrade название_программы

Аргументы `portupgrade`:

`-r` - так же обновить зависимости
`-R` - так же обновить зависимости


Обновление системы
------------------

    freebsd-update fetch
    freebsd-update install

Замена shell'а
--------------

    cd /usr/ports/shells/bash
    make install clean
    rehash
    chsh -s /usr/local/bin/bash

Добавить в ~/.bashrc

    [[ -s ~/.bashrc ]] && source ~/.bashrc

Так же ставим `/usr/ports/shells/bash-completion`, после чего в `~/.bashrc` добавляем:

    export TERM=xterm-color

    if [ -f /usr/local/etc/bash_completion ]; then
            . /usr/local/etc/bash_completion
    fi

    alias ls='ls -G'
    alias la='ls -laG'

Для обновления конфига пользуем комманду `source ~/.bashrc`

apt-get update
apt-get install pygmentize
alias pcat='pygmentize'

pkg install source-highlight-3.1.6
src-hilite-lesspipe.sh test.php

touch ~/.bash_it/aliases/custom.aliases.bash
echo alias cat=\'src-hilite-lesspipe.sh\' > ~/.bash_it/aliases/custom.aliases.bash


http://wiki.pcprobleemloos.nl/my_freebsd_installation_and_configuration_guide/start
http://www.hypexr.org/freebsd_ports_help.php
http://mebsd.com/make-build-your-freebsd-word/pkgng-first-look-at-freebsds-new-package-manager.html
http://bin63.com/how-to-install-nginx-and-php-fpm-on-freebsd


После установки
===============

Обновление системы и портов
---------------------------
    freebsd-update fetch
    freebsd-update install
    portsnap fetch
    portsnap extract


http://itblog.su/linux-screen.html


# Update for locate
/usr/libexec/locate.updatedb


http://www.freebsd.org/doc/ru_RU.KOI8-R/books/handbook/consoles.html

/etc/ttys - настройки консолей, можно повыключать чтобы за зря не крутились

http://www.freebsd.org/doc/ru_RU.KOI8-R/books/handbook/permissions.html

Права доступа
-------------

0 --- Ничего
1 --x Исполнение
2 -w- Запись
3 -wx Запись, исполнение
4 r-- Чтение
5 r-x Чтение, исполнение
6 rw- Чтение, запись
7 rwx Все

Для каталога `x` говорит о том что в него можно перейти (`cd`) и работать в нем с файлами к которым есть доступ.
Для получения списка файлов командой `ls` у каталога должен стоят флаг `r`

Символические обозначения прав
------------------------------

u user
g group
o other
a all
+ add
- remove
= set
r read
w write
x execute
t sticky bit
s suid or sgid

Запрет на удаление файла (даже для root)
----------------------------------------

    chflags sunlink file1

Для снятия запрета:

    chflags nosunlink file1

Просмотр флагов:

    ls -lo file1

setuid
------

uid - id пользователя **запустившего** процесс
euid - (effective uid) id пользователя с которым **выполняется** процесс

chmod 4755 suidexample.sh
ls -la suidexample.sh
-rwsr-xr-x   1 trhodes  trhodes    63 Aug 29 06:36 suidexample.sh

Заменяет `x` на `s`

setgid
------

Аналогично `setuid`, программе запущенной с этим битом будут обеспечены права в соотв. с групой владельца файла, а не с группой пользователя

chmod 2755 sgidexample.sh
ls -la sgidexample.sh
-rwxr-sr-x   1 trhodes  trhodes    44 Aug 31 01:49 sgidexample.sh

Заменяет `x` на `s` у группы

TODO: Почему это не работает?

touch test.py
cat test.py
#!/usr/bin/env python
from subprocess import call
call('whoami')

chmod 2755 test.py

Всеравно выводит root

sticky
------

sticky - установленный на каталог - позволяет производить удаление файла только владельцу файла.

chmod 1777 /tmp
ls -al / | grep tmp
drwxrwxrwt  10 root  wheel         512 Aug 31 01:49 tmp

добавляет `t` в хвост

http://www.freebsd.org/doc/ru_RU.KOI8-R/books/handbook/disk-organization.html

**Преимущества нескольких файловых систем**

* Могут иметь различные опции монтирования. Например корневая - только чтение, а /home с параметром nosuid - который отменит s(g)uid для всех исполняемых файлов в этом разделе что в теории повышает безопасность системы.
* FreeBSD по разному оптимизирует файловые системы, к примеру: с большим количеством маленьких файлов или с малым количеством больших файлов
* Разделив часто используемые разделы от редко используемых - понижается риск поломки файловой системы на последних.

Для увеличение раздела используется комманда `growfs`

TODO: всетаки есть смысл оставить пару гигабайт винта для того чтобы в случае острой необходимости можно было рассширить раздел.


export EDITOR="/usr/local/bin/vim"
echo $EDITOR


http://www.freebsd.org/doc/ru_RU.KOI8-R/books/handbook/basics-more-information.html

Поиск
=====

man -k mail # поиск man'а с названием содержащим слово mail

cd /usr/bin
man -f *
whatis *

покажут информацию о файлах


http://www.freebsd.org/doc/ru_RU.KOI8-R/books/handbook/ports-finding-applications.html

Поиск:

cd /usr/ports
make search name=mongo


Ядро
====

Зачем?
------

* Меньшее время загрузки
* Уменьшение использования памяти
* Поддержка дополнительного аппаратного обеспечения

`dmesg` и `pciconf -lv` - отображает список обнаруженных железяк

`/boot/kernel/` - доступные модули ядра
`/boot/loader.conf` - настройки загружаемых модулей

svn checkout svn://svn.freebsd.org/base/releng/9.0/ /usr/src

options UFS_ACL - ACL для файловой системы


http://taer-naguur.livejournal.com/149354.html
http://habrahabr.ru/post/143546/


Пользователи
============

adduser, rmuser, passwd

Группы
------

pw groupadd teamtwo # создает группу
pw groupshow teamtwo # показывает инфу о группе
pw groupmod teamtwo -M mac # изменяет группу, -M перечисленные через запятую пользователи группы
pw groupmod teamtwo -m mac # добавляет пользователя mac в группу
id mac # выводит инфу о пользователе



VIM
===

pkg_add -r -v vim-lite

иначе начинает происходить какой то бред - оно ставит все что не попадя

Вопросы
=======

Тюнинг файловой системы для файлового кеша
http://nginx.org/r/sendfile/ru
man sendfile
zero_copy
sysctl kern.maxvnodes
