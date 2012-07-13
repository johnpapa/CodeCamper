using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace CodeCamper.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            //PAPA: Commented out next 2 lines because we use our own DB and repository
            //   Use LocalDB for Entity Framework by default
            //   Database.DefaultConnectionFactory = new SqlConnectionFactory("Data Source=(localdb)\v11.0; Integrated Security=True; MultipleActiveResultSets=True");

            // Tell WebApi to use our custom Ioc (Ninject)
            IocConfig.RegisterIoc(GlobalConfiguration.Configuration);   

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            GlobalConfig.CustomizeConfig(GlobalConfiguration.Configuration);
        }
    }
}