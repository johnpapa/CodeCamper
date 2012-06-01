using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
            //PAPA - June 1
            //routes.MapHttpRoute(
            //    name: "ApiGetAttendance",
            //    routeTemplate: "api/{controller}/{id}/{action}",
            //    defaults: null,
            //    constraints: new { id = @"^\d+$" } // id must be all digits
            //);

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
                defaults: null,
                constraints: new { id = @"^\d+$" } // id must be all digits
            );

            // The integer id constraint is necessary to distinguish this route
            // from the next route. For example, this route handles
            // "api/sessions/1" whereas the next route handles
            // "api/sessions/briefs"

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
            //routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            //routes.MapRoute(
            //    name: "Default",
            //    url: "{controller}/{action}/{id}",
            //    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            //);


        }
    }
}