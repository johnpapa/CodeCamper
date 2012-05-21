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
using CodeCamper.Web.Controllers;

namespace CodeCamper.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        // PAPA: Added "Configure" in order to introduce IoC
        public static void Configure(HttpConfiguration config)
        {
            ConfigureIoC(config);
            ConfigureSerializer(config);
        }

        private static void ConfigureIoC(HttpConfiguration config) 
        {
            var kernel = new StandardKernel(); // Ninject IoC

            // These registrations are "per instance request".
            // See http://blog.bobcravens.com/2010/03/ninject-life-cycle-management-or-scoping/
            kernel.Bind<RepositoryFactories>().To<CodeCamperRepositoryFactories>().InSingletonScope();
            kernel.Bind<IRepositoryProvider>().To<RepositoryProvider>();
            kernel.Bind<ICodeCamperUow>().To<CodeCamperUow>();

            // Tell WebApi how to use our Ninject IoC
            config.ServiceResolver.SetResolver(
                t => kernel.TryGet(t),
                t => kernel.GetAll(t));
        }

        private static void ConfigureSerializer(HttpConfiguration config)
        {
            // The first formatter is known to be the JsonFormatter.
            // Per http://blogs.msdn.com/b/henrikn/archive/2012/02/18/using-json-net-with-asp-net-web-api.aspx
            // Could play it safe and search for it but we'll take the easy route
            config.Formatters[0] = new JsonNetFormatter();
        }

        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            /****************************************************
             * PAPA: Revised all routes.
             * 
             * The most detailed and specific routes are first, 
             * followed by less specific, ending in a final, "default" route.
             * 
             * Routes without {action} tokens rely on Web API conventions
             * to find the matching method(s)
             *
             * Routes with {action} tokens follow the RPC pattern;
             * WebAPI looks for a controller method that matches the {action},
             * typically a method decorated with [ActionName("token")]
            ******************************************************/

            // Use the following route in CodeCamper to get 
            // the Attendance of a particular Person, e.g.
            // to find all sessions attended by the current user.
            // 
            // It matches an {action} (e.g., "attendence") to a method
            // of the controller (e.g., "SessionsController").
            // That method identifies a single parent entity (e.g., Person or Session)
            // by a {id}. The {id} is not optional, must be an integer, and 
            // must match the {action} method with a parameter named "Id" (case insensitive)
            //
            // ex: api/persons/2/attendance
            // ex: api/sessions/2/attendance
            routes.MapHttpRoute(
                name: "ApiGetAttendance",
                routeTemplate: "api/{controller}/{id}/{action}",
                defaults: new { },
                constraints: new { id = @"^\d+$" } // id must be all digits
            );

            // This controller-per-type route lets us fetch a single resource by numeric id
            // It finds the appropriate method on the controller using WebAPI conventions
            // The {id} is not optional, must be an integer, and 
            // must match a method with a parameter named "id" (case insensitive)
            //
            //  ex: api/sessions/1
            //  ex: api/persons/1
            routes.MapHttpRoute(
                name: "ApiGetItemByIntegerId",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { },
                constraints: new { id = @"^\d+$" } // id must be all digits
            );

            // The integer id constraint is necessary to distinguish this route
            // from the next route. For example, this route handles
            // "api/sessions/1" whereas the next route handles
            // "api/sessions/speakers"

            // This RPC style route is great for lookups and custom calls
            // It matches the {action} to a method on the controller 
            //
            // ex: api/sessions/briefs
            // ex: api/lookups/rooms
            routes.MapHttpRoute(
                name: "ApiAction",
                routeTemplate: "api/{controller}/{action}"
            );

            // This default controller-per-type route is ideal for GetAll calls.
            // It finds the method on the controller using WebAPI conventions
            // The template has no parameters.
            //
            // ex: api/sessions
            // ex: api/persons
            routes.MapHttpRoute(
                name: "ApiControllerOnly",
                routeTemplate: "api/{controller}"
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