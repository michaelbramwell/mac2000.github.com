---
layout: page
title: Windows console
---

Add path
--------

User:

    SETX PATH "%PATH%;C:\MyDir"

System:

    SETX PATH "%PATH%;C:\MyDir" /M

Symlink
-------

    mklink [LINK_NAME] [TARGET_PATH]

And for directories:

    mklink /D [LINK_NAME] [TARGET_PATH]

Robocopy
--------

    robocopy [SOURCE] [TARGET] /MIR

Cd to current directory when run as admin
-----------------------------------------

    cd %~dp0

Get host name by ip
-------------------

    nbtstat -a 192.168.5.42

