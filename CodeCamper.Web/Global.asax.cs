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

            //PAPA: Revised all routes.

            // Routes without {action} tokens rely on Web API conventions
            // to find the matching method(s)

            // Routes with {action} tokens follow the RPC pattern;
            // WebAPI looks for a controller method that matches the {action}
            // typically a method decorated with [ActionName("token")]

            // ex: api/persons/2/attendancelinks
            // The {personId} is not optional, must be an integer, and 
            // must match a method with a parameter named "personId" (case insensitive)
            routes.MapHttpRoute(
                 name: "PersonAttendanceLinksApi",
                routeTemplate: "api/persons/{personId}/{action}",
                defaults: new { controller = Names.Controllers.Persons },
                // only match integer ids, action must be specified w/ non-digit
                constraints: new { personId = @"\d+" }
            );

            // ex: api/sessions/2/attendancelinks
            // The {sessionId} is not optional, must be an integer, and 
            // must match a method with a parameter named "sessionId" (case insensitive)
            routes.MapHttpRoute(
                name: "SessionAttendanceLinksApi",
                routeTemplate: "api/sessions/{sessionId}/{action}",
                defaults: new { controller = Names.Controllers.Sessions },
                // only match integer ids, action must be specified w/ non-digit
                constraints: new { sessionId = @"\d+" }
            );

            //PAPA: This ReSTful route finds the method on the controller using WebAPI conventions
            //The {id} is not optional, must be an integer, and 
            //must match a method with a parameter named "id" (case insensitive)

            // ex: api/sessions/1
            routes.MapHttpRoute(
                name: "ApiNumericId",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { },
                constraints: new { id = @"^\d+$" } // only match digits
            );

            // ex: api/attendancelinks/?pid=2,sid=1
            // ex: api/attendancelinks/2,1
            routes.MapHttpRoute(
                name: "AttendanceLinksByIds",
                routeTemplate: "api/attendancelinks/{pid},{sid}",
                defaults: new { controller = Names.Controllers.AttendanceLinks },
                constraints: new { pid = @"^\d+$", sid = @"^\d+$" } // only match digits
            );

            // ex: api/sessions/briefs
            //This RPC route finds the method on the controller 
            routes.MapHttpRoute(
                name: "ApiAction",
                routeTemplate: "api/{controller}/{action}"
            );

            // ex: api/sessions
            //This default ReSTful route finds the method on the controller using WebAPI conventions
            //The template has no parameters.
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