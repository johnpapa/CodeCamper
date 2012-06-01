using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class SessionsController : ApiControllerBase
    {
       public SessionsController(ICodeCamperUow uow)
        {
            Uow = uow;
        }

        // GET /api/sessions
        [Queryable]
        public IQueryable<Session> Get()
        {
            return Uow.Sessions.GetAll().OrderBy(s => s.TimeSlotId);
        }

        // GET /api/sessions/5
        public Session Get(int id)
        {
            var session = Uow.Sessions.GetById(id);
            if (session != null) return session;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }
    }
}