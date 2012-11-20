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
    make config
    make install
    make clean
    make distclean
    rehash
    chsh -s /usr/local/bin/bash



http://www.freebsd.org/doc/ru_RU.KOI8-R/books/handbook/consoles.html

