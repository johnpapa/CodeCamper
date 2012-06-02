﻿using System;
using System.Net;
using System.Web.Http;
using CodeCamper.Model;


namespace CodeCamper.Web.Controllers
{
    // TODO: Remove this class and relocate Uow property to the derived controllers?
    //       It isn't doing enough now to justify it's existence.
    public abstract class ApiControllerBase : ApiController
    {
        protected ICodeCamperUow Uow { get; set; }

        //// base ApiController is IDisposable
        //// Dispose of the repository if it is IDisposable
        //protected override void Dispose(bool disposing)
        //{
        //    if (Uow != null && Uow is IDisposable)
        //    {
        //        ((IDisposable)Uow).Dispose();
        //        Uow = null;
        //    }
        //    base.Dispose(disposing);
        //}
    }

}
