---
layout: post
title: Test SSL SMTP from command line
tags: [openssl, ssl, smtp, telnet]
---

To generate auth code use following command:

    perl -MMIME::Base64 -e 'print encode_base64("\000USERNAME\@gmail.com\000PASSWORD")'

Do not forget to change `USERNAME` and `PASSWORD`.

Output will be something like this:

    AZ1hcb1oZW5rb25hbGV4Y45kckBn5WFpbC8jb20ADTM0NDk0MA==

**SMTP.GMAIL.COM**

    openssl s_client -connect smtp.gmail.com:465 -crlf -ign_eof
    220 mx.google.com ESMTP f49sm4417402eep.12
    EHLO localhost
    250-mx.google.com at your service, [31.131.18.106]
    250-SIZE 35882577
    250-8BITMIME
    250-AUTH LOGIN PLAIN XOAUTH XOAUTH2
    250 ENHANCEDSTATUSCODES
    AUTH PLAIN AZ1hcb1oZW5rb25hbGV4Y45kckBn5WFpbC8jb20ADTM0NDk0MA==
    235 2.7.0 Accepted
    MAIL FROM: <marchenko.alexandr@gmail.com>
    250 2.1.0 OK f49sm4417402eep.12
    RCPT TO: <alexandrm@rabota.ua>
    250 2.1.5 OK f49sm4417402eep.12
    DATA
    354  Go ahead f49sm4417402eep.12
    Subject: TEST

    TEST
    .
    250 2.0.0 OK 1354650393 f49sm4417402eep.12
    QUIT
    221 2.0.0 closing connection f49sm4417402eep.12

**SMTP.UKR.NET**

    220 UkrNet SMTP.in (fsm2.ukr.net) ESMTP Tue, 04 Dec 2012 21:48:42 +0200
    EHLO localhost
    250-fsm2.ukr.net Hello localhost [31.131.18.106]
    250-SIZE 26214400
    250-8BITMIME
    250-PIPELINING
    250-AUTH PLAIN LOGIN
    250 HELP
    AUTH PLAIN AZ1hcb1oZW5rb25hbGV4Y45kckBn5WFpbC8jb20ADTM0NDk0MA==
    235 Authentication succeeded
    MAIL FROM: <mac2000@ukr.net>
    250 OK
    RCPT TO: <alexandrm@rabota.ua>
    250 Accepted
    DATA
    354 Enter message, ending with "." on a line by itself
    Subject: TEST

    TEST
    .
    250 OK id=1TfyUC-000Hev-99
    QUIT
    221 fsm2.ukr.net closing connection

As to usual smtp:

    telnet 192.168.5.1
    EHLO localhost
    MAIL FROM: alexandrm@rabota.ua
    RCPT TO: marchenko.alexandr@gmail.com
    DATA
    TEST
    .
    QUIT
