using System;
using System.Net;
using System.Web.Http;
using CodeCamper.Model;


namespace CodeCamper.Web.Controllers
{
    public abstract class ApiControllerBase : ApiController
    {
        protected ICodeCamperDataService Repository { get; set; }

        // base ApiController is IDisposable
        // Dispose of the repository if it is IDisposable
        protected override void Dispose(bool disposing)
        {
            if (Repository != null && Repository is IDisposable)
            {
                ((IDisposable)Repository).Dispose();
                Repository = null;
            }
            base.Dispose(disposing);
        }
    }

}
