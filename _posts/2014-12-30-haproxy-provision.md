---
layout: post
title: HAproxy provision sample
tags: [haproxy, provision, vagrant, vagrantfile]
---

Here is simple example of HAproxy

**Vagrantfile**

    Vagrant.configure("2") do |config|
      config.vm.provider :hyperv do |hv|
        config.vm.synced_folder ".", "/vagrant", type: "smb", smb_username: "Alexandr", smb_password: "henohn29"
      end

      config.vm.define "web1" do |node|
        node.vm.hostname = "web1"
        node.vm.box = "wildetech/hyper-u1404"
        node.vm.provision :shell, path: "Web.sh"
      end

      config.vm.define "web2" do |node|
        node.vm.hostname = "web2"
        node.vm.box = "wildetech/hyper-u1404"
        node.vm.provision :shell, path: "Web.sh"
      end

      config.vm.define "ha" do |node|
        node.vm.hostname = "ha"
        node.vm.box = "wildetech/hyper-u1404"
        node.vm.provision :shell, path: "HA.sh"
      end
    end

**Web.sh**

    #!/usr/bin/env bash

    sudo apt-get update
    sudo apt-get install -y apache2 php5 libapache2-mod-php5

    sudo rm /var/www/html/index.html
    sudo ln -s /vagrant/index.php /var/www/html/index.php

**HA.sh**

    #!/usr/bin/env bash

    sudo apt-get update
    sudo apt-get install -y haproxy

    sudo sed -i 's/ENABLED=0/ENABLED=1/' /etc/default/haproxy

    WEB1_IP=$(host web1 | awk '/has address/ { print $4 ; exit }')
    WEB2_IP=$(host web2 | awk '/has address/ { print $4 ; exit }')

    sudo tee --append /etc/haproxy/haproxy.cfg <<EOF

    frontend www
            bind *:80
            mode http
            default_backend nodes

    backend nodes
            mode http
            balance roundrobin
            option forwardfor
            server web1 $WEB1_IP:80 check
            server web2 $WEB2_IP:80 check

    listen stats *:1936
            stats enable
            stats uri /
            stats auth vagrant:vagrant
    EOF

    sudo service haproxy restart

**index.php**

    <?php sleep(1); ?>
    <h1 style="text-align:center">
    <?php echo `uname -n` ?>
    <?php echo date('h:i:s') ?>
    </h1>

Now you will be able to access: http://ha/ which will be balanced with roundrobin between two nodes (take a note that by making one request from browser you probably will always get to same node, use something like `ab`)

http://ha:1936/ - haproxy stats

