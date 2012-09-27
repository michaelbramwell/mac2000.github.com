---
layout: post
title: Windows 7 add virtual network cards

tags: [.net, adapter, admin, administration, eth, hdwwiz, lo, loopback, microsoft, virtual, virtualnetwork, windows]
---

Run cmd as Administrator and run `hdwwiz.exe`

Then select Next \ Install the hardware that I manually select from a list \ Network adapters

Select Microsoft as manufacturer and Microsoft Loopback Adapter

Then again Next \ Next ...

All done, you will now have newly added virtual network adapter, don't forget to give it ip.
