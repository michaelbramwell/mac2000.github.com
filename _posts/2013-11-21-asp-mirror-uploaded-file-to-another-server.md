---
layout: post
title: ASP.NET Mirror Uploaded File To Another Server
tags: [iis, asp, net, mirror, storage, farm]
---

We have two sites `website1.com` and `website2.com` and want to mirror file uploaded into first site to second.

website1.com upload
-------------------

*Default.aspx*

	<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="fileupload.Default" %>
	<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head runat="server">
		<title>upload</title>
	</head>
	<body>
		<form id="form1" runat="server">
			<asp:FileUpload runat="server" ID="fileUpload" />
			<asp:Button runat="server" ID="submit" OnClick="submit_OnClick" />
		</form>
	</body>
	</html>

*Default.aspx.cs*

	using System;
	using System.IO;
	using System.Net;
	using System.Web.UI;

	namespace fileupload
	{
		public partial class Default : Page
		{
			protected void submit_OnClick(object sender, EventArgs e)
			{
				string filename = Path.Combine(Server.MapPath("~/App_Data"), fileUpload.PostedFile.FileName);

				fileUpload.PostedFile.SaveAs(filename); // save uploaded file as usual
				(new WebClient()).UploadFile(new Uri("http://mirrorer.mac.rabota.ua/Upload.ashx"), filename); // mirror uploaded file to another server
			}
		}
	}

website2.com mirror
-------------------

*Upload.ashx.cs*

This handler used to receive upload requests from first site. There is no security or validation checks.

	using System.IO;
	using System.Web;

	namespace Mirrorer
	{
		public class Upload : IHttpHandler
		{

			public void ProcessRequest(HttpContext context)
			{
				var file = context.Request.Files[0];
				file.SaveAs(Path.Combine(context.Server.MapPath("~/App_Data"), file.FileName));
			}

			public bool IsReusable
			{
				get
				{
					return false;
				}
			}
		}
	}