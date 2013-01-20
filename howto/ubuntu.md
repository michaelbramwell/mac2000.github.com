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
