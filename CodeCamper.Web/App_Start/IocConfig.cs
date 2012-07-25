using System.Web.Http;
using CodeCamper.Data;
using Ninject;

namespace CodeCamper.Web
{
    public class IocConfig
    {
        // PAPA: Added "Configure" in order to introduce IoC and JsonNet serializer
        public static void RegisterIoc(HttpConfiguration config)
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
    }
}