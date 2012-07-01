---
layout: post
title: PowerShell send email
permalink: /140
tags: [cmd, powershell, shell]
---

<code>$emailFrom = "user@yourdomain.com"

    $emailTo = "user@yourdomain.com"
    $subject = "your subject"
    $body = "your body"
    $smtpServer = "your smtp server"
    $smtp = new-object Net.Mail.SmtpClient($smtpServer)
    $smtp.Send($emailFrom, $emailTo, $subject, $body)

