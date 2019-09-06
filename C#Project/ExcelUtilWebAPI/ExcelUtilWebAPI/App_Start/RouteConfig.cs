using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ExcelUtilWebAPI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);

            routes.MapRoute(
                "HelpPage", // 路由名称
                "{controller}/{action}/{id}", // 带有参数的 URL
                new { controller = "help", action = "Index", id = UrlParameter.Optional }, // 参数默认值
                new string[] { "mvcProject.Areas.HelpPage.Controllers" }
            ).DataTokens.Add("Area", "HelpPage");

        }
    }
}