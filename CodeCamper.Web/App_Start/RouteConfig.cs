using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace CodeCamper.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            /****************************************************
             * PAPA: Revised all routes.
             * 
             * Routes without {action} tokens rely on Web API conventions
             * to find the matching method(s)
             *
             * Routes with {action} tokens follow the RPC pattern;
             * WebAPI looks for a controller method that matches the {action},
             * typically a method decorated with [ActionName("token")]
             ******************************************************/

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

            // This is the default route that a "File | New MVC 4 " project creates.
            //
            // This controller-per-type route lets us fetch a single resource by numeric id
            // It finds the appropriate method GetById method
            // on the controller using WebAPI conventions
            // The {id} is not optional, must be an integer, and 
            // must match a method with a parameter named "id" (case insensitive)
            //
            //  ex: api/sessions/1
            //  ex: api/persons/1
            routes.MapHttpRoute(
                name: "ApiControllerAndIntegerId",
                routeTemplate: "api/{controller}/{id}",
                defaults: null,
                constraints: new { id = @"^\d+$" } // id must be all digits
            );

            /********************************************************
            * The integer id constraint is necessary to distinguish 
            * the {id} route above from the {action} route below.
            * For example, the route above handles
            *     "api/sessions/1" 
            * whereas the route below handles
            *     "api/lookups/all"
            ********************************************************/

            // This RPC style route is great for lookups and custom calls
            // It matches the {action} to a method on the controller 
            //
            // ex: api/lookups/all
            // ex: api/lookups/rooms
            routes.MapHttpRoute(
                name: "ApiControllerAction",
                routeTemplate: "api/{controller}/{action}"
            );

            //PAPA: Commented this out because we wont be using MVC views
            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);

        }
    }
}