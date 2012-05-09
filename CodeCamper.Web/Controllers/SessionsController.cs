using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

       // GET /api/{controller}
        public IQueryable<Session> Get()
        {
            return DataService.Sessions.GetAll().OrderBy(s => s.TimeSlotId);
        }

        // GET /api/{controller}/5
        public Session Get(int id)
        {
            var session = DataService.Sessions.GetById(id);
            if (session != null) return session;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        #region Actions (RPC methods)

        // These actions are invoked by specific routes defined in the Global.asax

        // GET: api/sessions/briefs
        [ActionName("briefs")]
        public IQueryable<SessionBrief> GetSessionBriefs()
        {
            return DataService.Sessions.SessionBriefs().OrderBy(sb => sb.TimeSlotId);
        }

        // GET: api/sessions/taggroups
        [ActionName("taggroups")]
        public IQueryable<TagGroup> GetTagGroups()
        {
            return DataService.Sessions.TagGroups().AsQueryable();
        }

        #endregion
    }
}