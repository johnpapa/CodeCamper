using System;
using System.Net;
using System.Web.Http;
using CodeCamper.Model;


namespace CodeCamper.Web.Controllers
{
    public abstract class ApiControllerBase : ApiController
    {
        protected ICodeCamperDataService DataService { get; set; }

        // base ApiController is IDisposable
        // Dispose of the repository if it is IDisposable
        protected override void Dispose(bool disposing)
        {
            if (DataService != null && DataService is IDisposable)
            {
                ((IDisposable)DataService).Dispose();
                DataService = null;
            }
            base.Dispose(disposing);
        }
    }

}
