---
layout: page
title: FreeBSD
---

from murka laptop
-----------------

FreeBSD Course Notes
====================

`mount_smbfs` - mount windows share without samba

howe work: read about ZFS

Создаем в памяти, форматируем, монтируем

    mdconfig -a -t malloc -s 10m
    # -a - append
    # -t malloc - how much
    # -s 10m - size of allocation
    # optional -u md10 - to give it a name
    #mdconfig -l -f my.iso

    #mkfs /dev/md0 for linux

    newfs /dev/md0
    mount /dev/md0 /mnt/

    #размонтируем и удаляем ноду
    umount /mnt/
    mdconfig -d -u md0


Example

    mount -t msdosfs /dev/fs0 /mnt/ -o ro
    mount_smbfs -I 192.168.1.33 -W WORKGOUP //plim@sweethome/photos /media
    # -W - optional coz we are write fron name

    ll /user/share/lo
    locale # show current locale

    setenv LANG 'ru_RU.UTF-8' # on sh
    export LANG='ru_RU.UTF-8' # on bash

homework: newfs, tunefs


Для работы с диском рекомендую установить /usr/ports/sysutils/linuxfdisk


    df -h # show available space on hard drives
    du -d1 # show directories sizes, -d1 - deep

    -rwxrwxrwx # - - file
    d......... # d - directory
    l......... # l - link
    c......... # c - device (from /dev/), in linux - c - is последовательное, b - паралельное etc, s - socket

soft link - аналог ярлыка в винде (-s)
hard link - жесткие ссылки

touch 1.txt
echo hello2 > 2.txt
ln -s 1.txt 3.txt
ln 1.txt 4.txt


hard link - еще одна запись в таблице файловой системе, можно делать только в пределах одной файловой системы, это более низкоуровневая ссылка (ярлык)

место на винте никогда не перетреться пока мы не удалим все ссылающиеся hard link файлы

привелегии меняются сразу для всех

ls -lA # вывести список папок без ./ и ../ - очень удобно для скриптов!

Дополнительне флаги
-------------------

chflags - обязательно посмотреть

    arch - архивирован (меняется сразу после изменения файла пользователем, удобно для бекапов - берем все файлы у которых изменился параметр arch - соотв. только они менялись с прошлого раза и только их нужно бекапить)

    sappnd - файл только для Дозаписи, нельзя перетереть предыдущую инфу

chmod +x 1.txt - сделать файл исполняемым для всех


http://lleo.me/arhive/humor/serafim.htm


chown - может использоваться только рутом?

chown admin:mail 2.txt
chown :mail 2.txt - пеменять только группу!

-R - recursive

Поиск
-----

where ls - поиск исполняемых файлов
whereis ls - поиск исполняемых файлов, манов и исходников

locate ls

find /etc  -iname \*rc\*

-iname - case insensetive

homework: find, mount, newfs, tunefs, chmod



homework:

grep +posix metacharactes

man grep

grep regex



ntpdate pool.ntp.org # fet times

date +"Today: %d.%m.%Y%nTime: %H:%M"

#!/bin/sh

datevar=`date +%d%m%Y`
echo $datevar
touch file$datevar


сброс пароля
------------

грузимся в сингл моде

/bin/csh
/rescue/mount # посмотреть че смонтировалось
/rescue/mount -a # смотнировать все по файлу fstab
passwd # сменит пароль рута
/rescue/reboot

запрет сброса пароля рута
-------------------------

/etc/ttys

заменяем опцию secure на insecure
что запрещает вход рута без пароля
в однопользовательском режиме

sys v5
------
runlevels
one for single user
next for multi user
next for multi user in X
6 for reboot
0 for halt
other - зарезервированны

в linux в init.d все скрипты
в rc0-6 - симлинки на rc.d

bsd stye
--------

/etc/rc.local - каждая строчка - команда
/etc/rc.conf - каждая строчка - переменная вкл\выкл

в /rc.d/ в файлах (напр. sshd) имеют включение . /etc/rc.subr
обрабатывают набор команд типа start, stop etc и самое гланвое он смотрит наличие переменной rcvar в файле rc.conf чтобы знать запускать сервис или нет

init - смотрит в rc.conf на переменные которые YES и запускает скрипты из rc.d соотв. скрипты

но вначале в /etc/defaults/rc.conf

* скрипты запускаются по алфавиту

* сервисы можно перезапускать
/etc/rc.d/sshd - выведет список допустимых команд
напр:  /etc/rc.d/sshd


modules
-------

kldstat - показывает загруженные модули
kldload sound - загрузить модуль
kldload /boot/kernel/sound.ko
kldunload sound - выгрузить модуль


/boot/loader.conf - модули которые загружать при закгрущке

/boot/defaults/loader.conf - модули загружаемые по умолчанию

/etc/syctl.conf - параметры ядра

net.inet.ip.forwarding - ф-ии роутера

#изменение параметра ядра
sysctl net.inet.ip.forwarding=0

чтобы оставались после перезагрузки нужно их прописать в

/etc/rc.conf

выключение
----------

shutdown -r - reboot
shutdown -h - poweroff
shutdown -r +10 min - reboot in 10 mins
shutdown -r now -reboot now
killall shutdown - cancel

ll /var/db/pkg # - показывает че стоит


pkg_add -r vim-lite



http://vds-admin.ru/freebsd/obnovlenie-yadra-i-mira-freebsd


vim
---

shift+z - закрывает вим в фоновый режим
делаем что надо в консоли и потом коммандой fg возвращаемся в вим - мега штука!

iconv - проверить еще раз под виндой


/usr/local/share/vim/vim73/vimrc_example.vim

UTF-8
-----

Исправляем файл /etc/login.conf:

    russian|Russian Users Accounts:\
    :charset=UTF-8:\
    :lang=ru_RU.UTF-8:\
    :tc=default:

Затем выполняем в консоли:

    cap_mkdb /etc/login.conf
    pw usermod -n $username -L russian

Вместо "$username" пишете имя пользователя, к примеру "root".

Дополнительно к вышеприведенному способу, можно прописать переменные в используемом shell


#ee /etc/csh.cshrc



setenv LANG ru_RU.UTF-8
setenv LC_CTYPE ru_RU.UTF-8
setenv LC_COLLATE POSIX
setenv LC_ALL ru_RU.UTF-8


Опционально, для тех кто любит bash


# ee /etc/profile



LANG="ru_RU.UTF-8"; export LANG
LC_CTYPE="ru_RU.UTF-8"; export LC_CTYPE
LC_COLLATE="POSIX"; export LC_COLLATE
LC_ALL="ru_RU.UTF-8"; export LC_ALL



# ee /root/.cshrc



setenv LANG ru_RU.UTF-8
setenv LC_CTYPE ru_RU.UTF-8
setenv LC_COLLATE POSIX
setenv LC_ALL ru_RU.UTF-8


http://habrahabr.ru/post/143546/

http://dadv.livejournal.com/162099.html
http://kvasdopil.livejournal.com/31964.html






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



pkg_add -r portaudit
rehash
portaudit -Fda

pkg_add -r portupgrade
rehash
pkgdb -F
portupgrade -a



Добавление новго диска
----------------------

atacontrol list

/rescue/mount -a # монтируем наш диск (ad0)
setenv TERM cons25 # нужно для запуска sysinstall
/usr/sbin/sysinstall # разбиваем новый диск (ad1)
# Configure > Fdisk > A (use entire disk), W (write), Q (quit)
# Configure > Label > C (create, full size, FS file system, /mnt mount point), W (write), Q (quit)
cp -r /var /mnt # копируем содержимое старого раздела



/rescue/dmesg # смотрим наш новый винт (IDE винты называются ad0, ad1, SCSI 0 da0, da1)
/rescue/fdisk -BI /dev/ad1 # Инизиализируем новый диск
/rescue/bsdlabel -wB /dev/ad1s1   # Размечаем его
/rescue/newfs /dev/ad1s1a # Создаем новую FS
/rescue/mount /dev/ad1s1a /mnt



vim
---

Shift+z - закрывает вим в фон (но при этом не закрывает)
делаем что надо и потом запускаем комманду `fg` и возвращаемся назад в vim


users
-----

adduser - add user
deluser - можно просто через vipw
vigr - редактирование груп (после сохранения перестраиваются базы)

если просто редактировать то потом нужно вызывать pwd_mkdb

passwd - смена пароля
UID - user id
GID - group id

frebds defaul shell is /bin/csh or /bin/tcsh (alias)

.cshrc (rc - round config - аббревиатура, запускается вместе с софтом)

.history - история шела
.login - читается ВСЕМИ шелами для унификации параметров

.cshrc
umask 22 - создавать все файлы 400
setenv EDITOR vim

Поиск по истории!!!!

    r<UP> - покажет первую команду которая начинается на r

/usr/share/skel - шаблон копирующийся при создании новго файла (но обычно он в /etc)

в папке /etc/ находятся глобальные файлы, которые применяются до файлов в папке пользователя

Переменные среды
----------------

env # show all
setenv VAR1 "Hello World" # for sh, for bash use export

setenv http_proxy user:passwd@host:port # set proxy for current session




su - # повышение привилегий
su admin # получить права admin
whoami # показывает под кем мы сейчас
who # кто залогинен

pkg_add -r sudo

visudo # аналог vipw, для редактирования файла sudoers

root ALL=(ALL) ALL # root может все
%wheel ALL=(ALL) ALL # гурппа wheel может все



!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

visudo
расскоментить строку:
%wheel ALL=(ALL) NOPASSWD: ALL

но лучьше вместо %wheel написать имя пользователя!!!!

для пользователя:

mac ALL=(ALL) NOPASSWD: ALL # важно чтобы эта строка было после правил для груп (как можно ниже в файле)

Так же вместо полседнего ALL можно перечислять через запятую полные пути к комманадм


!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



pw # управлять параметрами пользователя home work man pw
w # аналог whoami
id # тоже анало, оба показывают немного разную инфу

###########

pkg_add -r tmux

TMUX
----

    http://the-bosha.ru/2010/06/01/terminal-window-manager-tmux/
    еще тут глянуть =- распечать с картинками http://blog.hawkhost.com/2010/06/28/tmux-the-terminal-multiplexer/

    Команды следует вводить после префикса (в данном случае Ctrl-b):
    Функция  Клавиша
    Справка по командам  ?
    Командная строка  :
    Увести tmux в фон  d
    Создать новое окно  c
    Следующее окно  n
    Предыдущее окно  p
    Выбрать окно под соответствующим номером  1\2\3\4\5\6\7\8\9\0
    Предыдущее окно  l
    Выбрать окно из списка  w
    Выбрать сессию  s
    Разделить окно вертикально  "
    Разделить окно горизонтально  %
    Листать "слои"  Space(пробел)
    Удалить фрейм  !
    Переместить фрейм вверх  {
    Переместить фрейм вниз  }
    Следущий фрейм  o
    Изменить размеры фрейма  Alt + Стрелки
    Удалить окно  &
    Обновить клиент  r
    Часики :)  t
    Найти окно  f
    Переименовать окно  ,
    Изменить номер окна  .
    Перейти в режим копирования  [
    Вставить содержимое буфера обмена  ]



    После "детача", вернуть tmux на родину можно передав ему параметр attach:

        tmux attach
        tmux attach

    В случае если сессий несколько, то можно посмотреть их список с помощью ls, и выбрать нужную передав к attach ещё и аргумент в виде номера сессии:

        --[bosha@home-pc]--(~)
        L-[% >tmux ls # Вывод списка всех сессий
        0: 1 windows (created Mon May 31 23:08:16 2010) [104x48] (attached)
        1: 1 windows (created Mon May 31 23:33:19 2010) [80x23]
        --[bosha@home-pc]--(~)
        L-[% >tmux attach -t 1 # Подключение к конкретной сессии



 PROCESSES
 =========

 top
 ---

 load averages:
 3 - цифры, первая - 15мин, 5мин, 1мин - очередь к процессу

 если однопроцессораная система и очередь меньше единицы - то процессор не нагружен, (если моного процессораня - том ножим на количество процессоров)

    cpu
    ---

    user - пользвоательские приложения
    nice - ?
    system - ядро
    interrupt - прерывания (долнжо быть меньше 1% ! на вритуалке больше но это не правильно, говорит о том что что то не так с железом или типа того)
    iddle - простой системы

    mem
    ---

    active - память используется процессами
    inactive - память зарезервировання процесами
    wired - ?
    cache - кеш приложений
    buf - то что приложения используют в качестве ресурсов

    swap
    ----

    total - free - тут все ясно
    фря очень не хочет свопиться и всячески этому препятсвует

в самом верхнем правом углу - up - это uptime

    PID
    USERNAEM
    THR - кол потоков
    PRI - приоритет задаваемым системой
    NICE - приоритет который мы можем задать для проги
    SIZE - сколько зарезервированно памяти в РАМ
    RES - сколько занимает сама прога в РАМ
    STATE - статус (надо почитать)
    TIME - сколька прога затратила процессорного времени с момента старта (удобно - сейчас прога может не использовать проц, но за все время грузить все систему на 99%)
    WCPU - процент процессорных ресурсов которые использованы сейчас

h - запуск справки (q - выход из справки)
r - вводим новое значение для nice и pid (r 10 1612)
    0 - нейтрально
    +1 - низко приоритетно
    -1 - высоко приоритетно
    +20 - min priority
    -20 - max priority


ps u # программы запущенные нами

suid - позволяет сказать интерпретатору что нужно запускать прогу из под рута
guid - тож самое только для группы

home work - почитать как их ставить!

chmod 4000 - suid
chmod 2000 - guid
chmod 1000 - sticky ???

ps aux # показывает все процессы
в top показываются не все процессы, в пред. комманде системные процессы показываются обрамленные в квадратные скобки - это те процессы без которых система просто не будет работать




!!! начинаем с  Задания. Потоки ввода и вывода

