---
layout: post
title: IIS Log Parser
permalink: /210
tags: [admin, iis, log, logparser]
----

link to download logparser

[http://www.microsoft.com/downloads/details.aspx?FamilyID=890cd06b-abf8-4c25-9
1b2-f8d975cf8c07&displaylang=en](http://www.microsoft.com/downloads/details.as
px?FamilyID=890cd06b-abf8-4c25-91b2-f8d975cf8c07&displaylang=en)



**Functions**
[http://logparserplus.com/Functions](http://logparserplus.com/Functions)



**Fields**

    
    <code>date time s-sitename s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs-version cs(User-Agent) cs(Referer) cs-host sc-status sc-substatus sc-win32-status sc-bytes cs-bytes time-taken </code>


**Export logs to tab separated CSV**

    
    <code>C:\Program Files (x86)\Log Parser 2.2\LogParser.exe -i:IISW3C -o:TSV "SELECT tim
    e,c-ip INTO C:\Users\mac\Desktop\111.csv FROM C:\Users\mac\Desktop\ex100804.log"</code>


**Select pages and requests count**

    
    <code>SELECT cs-uri-stem AS UrlWithoutParams, COUNT(*) AS Total FROM C:\Users\mac\Desktop\ex100802\ex100802.log GROUP BY cs-uri-stem ORDER BY Total DESC</code>


**Make timestamp from string**

    
    <code>LogParser.exe -i:IISW3C "SELECT TIMESTAMP('10/08/04 10:00:00', 'yy/MM/dd hh:mm:ss') FROM C:\Users\mac\Desktop\ex100804.log"</code>


**Make timestamp from log date and time**

    
    <code>LogParser.exe -i:IISW3C "SELECT TO_TIMESTAMP(date, time) FROM C:\Users\mac\Desktop\ex100804.log"</code>


**Select logs between two timestamps**

    
    <code>LogParser.exe -i:IISW3C "SELECT date, time, cs-uri-stem FROM C:\Users\mac\Desktop\ex100804.log WHERE TO_TIMESTAMP(date, time) BETWEEN TIMESTAMP('10/08/04 10:00:00', 'yy/MM/dd hh:mm:ss') AND TIMESTAMP('10/08/04 10:03:00', 'yy/MM/dd hh:mm:ss')"</code>


**Select Urls, Requests count between two dates**

    
    <code>LogParser.exe -i:IISW3C "SELECT cs-uri-stem AS UrlWithoutParams, COUNT(*) AS Total FROM C:\Users\mac\Desktop\ex100804.log WHERE TO_TIMESTAMP(date, time) BETWEEN TIMESTAMP('10/08/04 10:00:00', 'yy/MM/dd hh:mm:ss') AND TIMESTAMP('10/08/04 10:03:00', 'yy/MM/dd hh:mm:ss') GROUP BY cs-uri-stem ORDER BY Total DESC"</code>


**Export previous results to CSV**

    
    <code>LogParser.exe -i:IISW3C -o:TSV "SELECT cs-uri-stem AS UrlWithoutParams, COUNT(*) AS Total INTO C:\Users\mac\Desktop\res.txt FROM C:\Users\mac\Desktop\ex100804.log WHERE TO_TIMESTAMP(date, time) BETWEEN TIMESTAMP('TI10/08/04 10:00:00', 'yy/MM/dd hh:mm:ss') AND TIMESTAMP('10/08/04 10:03:00', 'yy/MM/dd hh:mm:ss') GROUP BY cs-uri-stem ORDER BY Total DESC"</code>


**Like previous but filtered static files**

    
    <code>LogParser.exe -i:IISW3C -o:TSV "SELECT cs-uri-stem AS UrlWithoutParams, COUNT(*) AS Total INTO C:\Users\mac\Desktop\res.txt FROM C:\Users\mac\Desktop\ex100803\ex100803.log WHERE TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) <> 'JPG' AND TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) <> 'JPEG' AND TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) <> 'GIF' AND TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) <> 'PNG' AND TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) <> 'CSS' AND TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) <> 'JS' AND TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) <> 'SWF' AND TO_TIMESTAMP(date, time) BETWEEN TIMESTAMP('10/08/03 10:00:00', 'yy/MM/dd hh:mm:ss') AND TIMESTAMP('10/08/03 14:00:00', 'yy/MM/dd hh:mm:ss') GROUP BY cs-uri-stem ORDER BY Total DESC"</code>


**SOME LINKS**
[http://habrahabr.ru/blogs/sql/85758/](http://habrahabr.ru/blogs/sql/85758/)

[http://weblogs.asp.net/steveschofield/archive/2006/12/20/logparser-and-
finding-information-between-two-
dates.aspx](http://weblogs.asp.net/steveschofield/archive/2006/12/20
/logparser-and-finding-information-between-two-dates.aspx)


Some Examples From Log Parser Lizard


**All on port 80**

    
    <code>SELECT * FROM #IISW3C#
    WHERE s-port = 80</code>


**Total bytes sent**

    
    <code>SELECT SUM(sc-bytes) AS TotalKiloBytesSent, Count(*) as TotalHits
    FROM #IISW3C# </code>


**ASP app errors**

    
    <code>SELECT  EXTRACT_TOKEN(FullUri, 0, '|') AS Uri,
           EXTRACT_TOKEN(cs-uri-query, -1, '|') AS ErrorMsg,
           EXTRACT_TOKEN(cs-uri-query, 1, '|') AS LineNo,
           COUNT(*) AS Total
    USING   STRCAT( cs-uri-stem,
                   REPLACE_IF_NOT_NULL(cs-uri-query, STRCAT('?', cs-uri-query))
           ) AS FullUri
    FROM #IISW3C#
    WHERE (sc-status = 500) AND (cs-uri-stem LIKE '%.asp')
    GROUP BY Uri, ErrorMsg, LineNo
    ORDER BY Total DESC</code>


**Total by hour**

    
    <code>SELECT
    TO_STRING(time, 'HH') AS Hour,
    COUNT(*) AS Hits
    FROM c:\tst\ex*.log
    GROUP BY Hour</code>


**HTTP Status codes**

    
    <code>SELECT     STRCAT(TO_STRING(sc-status), STRCAT('.', TO_STRING(sc-substatus))) AS Status,
        COUNT(*) AS Total
    FROM #IISW3C#
    GROUP BY Status
    ORDER BY Total DESC</code>


**Requests and full status by number of hits**

    
    <code>SELECT     STRCAT(    cs-uri-stem,
            REPLACE_IF_NOT_NULL(cs-uri-query, STRCAT('?',cs-uri-query))
            ) AS Request,
        STRCAT(    TO_STRING(sc-status),        
            STRCAT(    '.',
                COALESCE(TO_STRING(sc-substatus), '?' )
                )
            ) AS Status,
        COUNT(*) AS Total
    FROM #IISW3C#
    WHERE (sc-status >= 400)
    GROUP BY Request, Status
    ORDER BY Total DESC</code>


**Hit counts for each extension**

    
    <code>SELECT  TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) AS Extension,
        COUNT(*) AS [Total Hits]
    FROM #IISW3C#
    GROUP BY Extension
    ORDER BY [Total Hits] DESC</code>


Total number of bytes generated by each extension

    
    <code>SELECT    TO_UPPERCASE(EXTRACT_EXTENSION( cs-uri-stem )) AS Extension,
        MUL(PROPSUM(sc-bytes),100.0) AS [Total Bytes]
    FROM #IISW3C#
    GROUP BY Extension
    ORDER BY [Total Bytes] DESC</code>


**Distinct users**

    
    <code>SELECT COUNT(DISTINCT cs-username) AS Users
    FROM #IISW3C#</code>


**All .htm pages**

    
    <code>SELECT date, cs-uri-stem
    FROM #IISW3C#
    WHERE INDEX_OF(cs-uri-stem,'.htm') > -1</code>


**All IP Addresses between 192.168.0.0. and 192.168.255.255**

    
    <code>select c-ip, count(c-ip)
    from #IISW3C#
    WHERE IPV4_TO_INT(c-ip) BETWEEN IPV4_TO_INT('192.168.0.0') AND IPV4_TO_INT('192.168.255.255')
    GROUP BY c-ip</code>


**Configure logs**

[![](http://mac-blog.org.ua/wp-content/uploads/image02-300x164.png)](http
://mac-blog.org.ua/wp-content/uploads/image02.png)

