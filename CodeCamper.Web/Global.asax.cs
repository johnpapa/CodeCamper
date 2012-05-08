using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Ninject;

using CodeCamper.Model;
using CodeCamper.Data;

namespace CodeCamper.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        ////Ward: Added Ninject IoC and registering our DataService
        public static void Configure(HttpConfiguration config)
        {
            var kernel = new StandardKernel();
            kernel.Bind<ICodeCamperDataService>().To<CodeCamperDataService>();
            config.ServiceResolver.SetResolver(
                t => kernel.TryGet(t),
                t => kernel.GetAll(t));
        }

        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            ////PAPA: I added this because its a special one.
            // This route will work for the explictly defined 
            // action controllers that follow the RPC pattern.
            routes.MapHttpRoute(
                name: "CampApi", 
                //routeTemplate: "api/{controller}/{action}/{id}",
                routeTemplate: "api/camp/{action}/{id}",
                defaults: new { controller = "Camp", id = RouteParameter.Optional }
            );

            // PAPA: The names in the templates MATTER
            //       The name {id} matters and will match the signature of GetById param
            //       AND will match the "Id" property of an entity.
            // This route will work for the type per controller
            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //PAPA: I commented this out because we wont be using MVC views
            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            //PAPA: I commented this out because we use our own DB and repository
            // Use LocalDB for Entity Framework by default
            //Database.DefaultConnectionFactory = new SqlConnectionFactory("Data Source=(localdb)\v11.0; Integrated Security=True; MultipleActiveResultSets=True");

            RegisterGlobalFilters(GlobalFilters.Filters);
            Configure(GlobalConfiguration.Configuration);        ////Ward: Tell WebApi to use our IoC
            RegisterRoutes(RouteTable.Routes);

            BundleTable.Bundles.RegisterTemplateBundles();
        }
    }
}