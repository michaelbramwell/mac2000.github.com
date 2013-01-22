---
layout: page
title: Ubuntu
---

Sublime Text 2
--------------

	sudo add-apt-repository ppa:webupd8team/sublime-text-2
	sudo apt-get update
	sudo apt-get install sublime-text

Make sublime as default editor:

	wget https://raw.github.com/mac2000/dot.files/master/mimeapps.list -O ~/.local/share/applications/mimeapps.list

Here is how to check what mime types are opened by default gedit:

	cat /usr/share/applications/defaults.list | grep gedit

To open sublime text from console and detach it add following to your `.bashrc`:

    # usage: sl my.txt
    function sl(){
        /usr/bin/subl $1 &
    }



Skype
-----

Turn on partners repositories, and then run:

	sudo apt-get update
	sudo apt-get install skype

Dropbox
-------

	sudo apt-get install nautilus-dropbox

Java
----

    sudo add-apt-repository ppa:webupd8team/java
    sudo apt-get update
    sudo apt-get install oracle-java7-installer

Node.js
-------

    sudo apt-get install python-software-properties python g++ make
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs npm

MongoDB
-------

    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10

Create a `/etc/apt/sources.list.d/10gen.list` file and include the following line for the 10gen repository.

    deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen

    sudo apt-get update
    sudo apt-get install mongodb-10gen
s
