using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers.Controllers
{
    public class SessionsController : ApiControllerBase
    {
       public SessionsController(ICodeCamperDataService dataService)
        {
            DataService = dataService;
        }

        // ToDo: Remove this poor man's IoC ctor
        //public SessionsController()
        //{
        //    Repository = new CodeCamperRepository();
        //}

        // GET /api/<controller>
        public IEnumerable<Session> Get()
        {
            return DataService.Sessions.GetAll().OrderBy(s => s.TimeSlotId).ToList();
        }

        // GET /api/<controller>/5
        public Session Get(int id)
        {
            var session = DataService.Sessions.GetById(id);
            if (session != null) return session;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }
    }
}