using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Data;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers.Controllers
{
    public class SessionsController : ApiControllerBase
    {
       public SessionsController(ICodeCamperRepository repository)
        {
            Repository = repository;
        }

        // ToDo: Remove this poor man's IoC ctor
        public SessionsController()
        {
            Repository = new CodeCamperRepository();
        }

        // GET /api/<controller>
        public IEnumerable<Session> Get()
        {
            return Repository.Sessions().OrderBy(s => s.TimeSlotId).ToList();
        }

        // GET /api/<controller>/5
        public Session Get(int id)
        {
            return Repository.Sessions().Where(s => s.Id == id).First();
        }
    }
}