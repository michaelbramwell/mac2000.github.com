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
