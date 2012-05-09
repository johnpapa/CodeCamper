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
        // PAPA: Added "Configure" in order to introduce IoC
        public static void Configure(HttpConfiguration config)
        {
            var kernel = new StandardKernel(); // Ninject IoC

            // These registrations are "per instance request".
            // See http://blog.bobcravens.com/2010/03/ninject-life-cycle-management-or-scoping/
            kernel.Bind<ICodeCamperDataService>().To<CodeCamperDataService>();
            kernel.Bind<IRepositoryProvider>().To<CodeCamperRepositoryProvider>();

            // Tell WebApi how to use our Ninject IoC
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

            ////PAPA: Added this specific route.
            //        Routes with {action} definitions follow the RPC pattern.
            //        This one routes {action} values to the LookupsController 
            //        They match methods marked with the [ActionName(...)] attribute.
            routes.MapHttpRoute(
                name: "LookupsApi", 
                routeTemplate: "api/lookups/{action}",
                defaults: new { controller = "lookups", action="lookups"}
            );

            // Ward: Action route to return SessionBriefs from Sessions controller
            //       The route is fully specified and must match exactly
            //       The tokens are well-known names to Web API
            routes.MapHttpRoute(
                 name: "SessionBriefsApi",
                routeTemplate: "api/sessions/briefs",
                defaults: new { controller = "sessions", action = "briefs" }
            );

            // Ward: Action route to return TagGroups from Sessions controller
            routes.MapHttpRoute(
                 name: "SessionTagGroupsApi",
                routeTemplate: "api/sessions/taggroups",
                defaults: new { controller = "sessions", action = "taggroups" }
            );

            // PAPA: This route works for the type per controller
            //       It is the default and should come after all more specific routes
            //       The spelling of token names in {...} in the templates really MATTER
            //       The name, {id} will match the param name 'id' in the GetById method
            //       AND will match the "Id" property (yes, uppercase) of an entity.

            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //PAPA: Commented this out because we wont be using MVC views
            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            //PAPA: Commented out because we use our own DB and repository
            // Use LocalDB for Entity Framework by default
            //Database.DefaultConnectionFactory = new SqlConnectionFactory("Data Source=(localdb)\v11.0; Integrated Security=True; MultipleActiveResultSets=True");

            RegisterGlobalFilters(GlobalFilters.Filters);
            Configure(GlobalConfiguration.Configuration);   //Ward: Tells WebApi to use our IoC
            RegisterRoutes(RouteTable.Routes);

            BundleTable.Bundles.RegisterTemplateBundles();
        }
    }
}