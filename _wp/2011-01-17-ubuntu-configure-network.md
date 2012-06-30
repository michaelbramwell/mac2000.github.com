---
layout: post
title: Ubuntu configure network
permalink: /333
tags: [admin, administration, config, dhcp, dns, eth0, ifconfig, init.d, interface, ip, network, ubuntu]
----

[http://www.ubuntugeek.com/ubuntu-networking-configuration-using-command-
line.html](http://www.ubuntugeek.com/ubuntu-networking-configuration-using-
command-line.html)


Configs are here:

    
    <code>/etc/network/interfaces</code>


DHCP

    
    <code>auto eth0
    iface eth0 inet dhcp</code>


Static

    
    <code>auto eth0
    iface eth0 inet static
    address 192.168.7.101
    gateway 192.168.7.1
    netmask 255.255.255.0
    network 192.168.7.0
    broadcast 192.168.7.255</code>


Static second IP on the same interface

    
    <code>auto eth0:1
    iface eth0:1 inet static
    address 192.168.7.102
    gateway 192.168.7.1
    netmask 255.255.255.0
    network 192.168.7.0
    broadcast 192.168.7.255</code>


Apply settings

    
    <code>sudo /etc/init.d/networking restart</code>


Hostname

    
    <code>sudo /bin/hostname newname</code>


DNS

    
    <code>sudo nano /etc/resolv.conf</code>


in config:

    
    <code>search example.com
    nameserver 192.168.7.1</code>

