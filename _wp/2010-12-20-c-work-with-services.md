---
layout: post
title: C# Work with Services
permalink: /175
tags: [.net, admin, c#, services]
----

To work with services you need to add reference to System.ServiceProccess

## Example List Installed Services


    
    <code>ServiceController[] services = ServiceController.GetServices();
    StringBuilder sb = new StringBuilder();
    foreach (ServiceController service in services) sb.AppendLine(service.ServiceName);
    textBox1.Text = sb.ToString();</code>


## Example Restart Service


[http://www.csharp-examples.net/restart-windows-service/](http://www.csharp-
examples.net/restart-windows-service/)

    
    <code>ServiceController service = new ServiceController(serviceName);
    service.Stop();                
    service.WaitForStatus(ServiceControllerStatus.Stopped);
    service.Start();
    service.WaitForStatus(ServiceControllerStatus.Running);</code>


To work with services you must have administrator privilegies so in manifest
file change requestedExecutionLevel to:

    
    <code><requestedExecutionLevel level="requireAdministrator" uiAccess="false" /></code>

