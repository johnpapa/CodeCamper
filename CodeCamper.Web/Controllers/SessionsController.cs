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

       #region OData Future: IQueryable<T>
       //[Queryable]
       // public IQueryable<Session> Get()
       #endregion

        // GET /api/sessions
        public IEnumerable<Session> Get()
        {
            return Uow.Sessions.GetAll()
                .OrderBy(s => s.TimeSlotId);
        }

        // GET /api/sessions/5
        public Session Get(int id)
        {
            var session = Uow.Sessions.GetById(id);
            if (session != null) return session;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // Create a new Session
        // POST /api/session
        public HttpResponseMessage Post(Session session)
        {
            Uow.Sessions.Add(session);
            Uow.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, session);

            // Compose location header that tells how to get this session
            // e.g. ~/api/session/5
            response.Headers.Location =
                new Uri(Url.Link(RouteConfig.ControllerAndId, new {id = session.Id}));

            return response;
        }

        // Update an existing Session
        // PUT /api/sessions/
        public HttpResponseMessage Put(Session session)
        {
            Uow.Sessions.Update(session);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}