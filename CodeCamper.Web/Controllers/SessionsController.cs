using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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
        public IQueryable<Session> Get()
        {
            return Uow.Sessions.GetAll().OrderBy(s => s.TimeSlotId);
        }

        // GET /api/sessions/5
        public Session Get(int id)
        {
            var session = Uow.Sessions.GetById(id);
            if (session != null) return session;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        #region Actions (RPC methods)

        // These actions are invoked by specific routes defined in the Global.asax

        // GET: api/sessions/briefs
        [ActionName("briefs")]
        public IQueryable<SessionBrief> GetSessionBriefs()
        {
            return Uow.Sessions.GetSessionBriefs().OrderBy(sb => sb.TimeSlotId);
        }

        // GET: api/sessions/taggroups
        [ActionName("taggroups")]
        public IEnumerable<TagGroup> GetTagGroups()
        {
            return Uow.Sessions.GetTagGroups();
        }

        // GET: api/sessions/{sessionId}/attendance
        [ActionName("attendance")]
        public IQueryable<Attendance> GetAttendanceBySessionId(int id)
        {
            return Uow.Attendance.GetBySessionId(id).OrderBy(ps => ps.Person.FirstName);
        }

        #endregion
    }
}