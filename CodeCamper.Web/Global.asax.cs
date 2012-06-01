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
        // PAPA: Added "Configure" in order to introduce IoC and JsonNet serializer
        public static void Configure(HttpConfiguration config)
        {
            ConfigureIoC(config);
        }

        private static void ConfigureIoC(HttpConfiguration config) 
        {
            var kernel = new StandardKernel(); // Ninject IoC

            // These registrations are "per instance request".
            // See http://blog.bobcravens.com/2010/03/ninject-life-cycle-management-or-scoping/
            kernel.Bind<RepositoryFactories>().To<RepositoryFactories>().InSingletonScope();
            kernel.Bind<IRepositoryProvider>().To<RepositoryProvider>();
            kernel.Bind<ICodeCamperUow>().To<CodeCamperUow>();

            // Tell WebApi how to use our Ninject IoC
            config.DependencyResolver = new NinjectDependencyResolver(kernel);
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            //PAPA: Commented out next 2 lines because we use our own DB and repository
            //   Use LocalDB for Entity Framework by default
            //   Database.DefaultConnectionFactory = new SqlConnectionFactory("Data Source=(localdb)\v11.0; Integrated Security=True; MultipleActiveResultSets=True");

            Configure(GlobalConfiguration.Configuration);   // Tell WebApi to use our custom configuration

            // web api beta stuff below. 
            //RegisterGlobalFilters(GlobalFilters.Filters);
            //RegisterRoutes(RouteTable.Routes);
            //BundleTable.Bundles.RegisterTemplateBundles();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

        }
    }
}