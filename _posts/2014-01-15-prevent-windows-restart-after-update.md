---
layout: post
title: Prevent Windows restart after updates
tags: [windows, update, restart, admin, administration, gpedit, gpupdate, rsop, wuauserv]
---

Navigate to:

Windows \ Run \ gpedit.msc \ Local Computer Policy \ Administrative Templates \ Windows Components \ Windows Update

You should enable `No auto-restart with logged on users for scheduled automatic updates installations` and optionally enable `Re-prompt for restart with scheduled installations` with maximum value `1440`

For policies to take effect you may run `gpupdate /force`

To check is policy applied you may run `rsop.msc`

If restart prompt still opens you should restart Windows Update service or restart your machine.
