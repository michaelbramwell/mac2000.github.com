---
layout: page
title: puppet
---

Install
=======

Master
------

	sudo apt-get install puppet puppetmaster facter

Client
------

	sudo apt-get install puppet facter

DNS
---

Add something like this to all machines:

	# /etc/hosts
	127.0.0.1	localhost
	192.168.0.1	puppet.example.com puppet

Firewall
--------

Clients connects to masters 8140 port, so following rule is required:

	-A INPUT -p tcp -m state --state NEW --dport 8140 -j ACCEPT

Or even more secure:

	-A INPUT -p tcp -m state --state NEW -s 192.168.0.0/24 --dport 8140 -j ACCEPT

First start
-----------

	mkdir /etc/puppet/manifests
	touch /etc/puppet/manifests/site.pp # file needed for puppet master to start
	service puppetmaster start

First client
------------

On client machine run:

	puppet agent --no-daemonize --verbose

Puppet will create certificate for client machine and send it to master.

Now on master run:

	puppet cert --list # to see awaiting certificates
	puppet cert --sign node1.example.com # to add client machine certificate



