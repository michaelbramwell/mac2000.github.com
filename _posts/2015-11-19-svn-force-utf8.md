---
layout: post
title: TortoiseSVN Force UTF-8
tags: [svn, hook, utf8]
---

To prevent commits with not valid UTF-8 files in it you may create `pre_commit_hook` in your TortoiseSVN and from now on do not worry about encodings.

The trick is to check is file is valid utf8 one. In linux there is [isutf8](https://github.com/madx/moreutils/blob/master/isutf8.c) utility which checks file in pretty nice way - it compares raw bytes in file with bytes its retrieve while reading file as utf8 one - if they are same - then file is valid.

Setup pre commit hook
---------------------

Right click on your repository, navigate to TortoiseSVN \ Settings \ Hook Scripts and press Add...

![TortoiseSVN Settings](/images/posts/force_utf8_tortoisesvn_settings.png)

Hook Type: Pre-Commit Hook

Working Copy Path: Path to your repository, e.g.: `C:\Users\Alexandr\Desktop\Sample`

Command Line To Execute: `powershell -executionpolicy bypass -file C:\Users\Alexandr\Desktop\ForceUTF8.ps1`

Check __Wait for the script to finish__ and __Hide the script while running__ checkboxes

![TortoiseSVN Adding Pre Commit Hook](/images/posts/force_utf8_tortoisesvn_add_hook.png)

Force UTF8
----------

Here is `ForceUTF8.ps1`:

	$errors = 0

	Get-Content -Path $args[0] | %{
	    if(Test-Path $_) {
	        $bytes1 = Get-Content -Path $_ -Encoding Byte -Raw
	        $bytes2 = [System.Text.Encoding]::UTF8.GetBytes((Get-Content -Path $_ -Encoding UTF8 -Raw))

	        if(Compare-Object $bytes1 $bytes2) {
	            Write-Error $_
	            $errors += 1
	        }
	    }
	}

	exit $errors

As first argument `$args[0]` to our script we retrieve path to temporary file that contains file paths that are going to be commited.

We are checking each file to be valid UTF-8, and if its not, we are writing then to stderr and returning non zero exit code.

From now one if you will try to commit non utf8 files you will get something like this:

![TortoiseSVN Pre Commit Hook Error Message](/images/posts/force_utf8_tortoisesvn_settings.png)
