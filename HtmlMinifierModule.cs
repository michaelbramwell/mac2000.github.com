using System;
using System.Web;

namespace MinifyModule
{
    public class HtmlMinifierModule : IHttpModule
    {
        public void Dispose()
        {
        }

        public void Init(HttpApplication context)
        {
            context.ReleaseRequestState += InstallHtmlMinifierFilter;
        }

        private void InstallHtmlMinifierFilter(object sender, EventArgs e)
        {
            if (HttpContext.Current.Response.ContentType != "text/html") return;

            HttpContext.Current.Response.Filter = new HtmlMinifierFilter(HttpContext.Current.Response.Filter);
        }
    }
}