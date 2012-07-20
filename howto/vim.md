---
layout: page
title: Vim
---

Apply recorded macro to all opened buffers
------------------------------------------

    :bufdo execute "normal @a" | write

Replace two or more empty lines by one
--------------------------------------

    :%s/\n\{3,}/^M^M/g

To type `^M` - press `Ctrl + v, Enter`

Remove lines that do not contains word
--------------------------------------

    :v/warning/d

Commenting code
---------------

    Ctrl + -, Ctrl + -

Plugin: https://github.com/tomtom/tcomment_vim

List loaded scripts (plugins)
-----------------------------

    :sriptnames

Get output of external programm
-------------------------------

    :read !date

Get output of vim command
-------------------------

    :redir @a
    :scriptnames
    :redir END
    "ap

`:redir @a` - will redirect output to `a` register, `"ap` - paste text from register
