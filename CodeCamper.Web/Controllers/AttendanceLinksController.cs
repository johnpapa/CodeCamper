using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class AttendanceLinksController : ApiControllerBase
    {
        public AttendanceLinksController(ICodeCamperDataService dataService)
        {
            DataService = dataService;
        }
       
        // GET: api/attendancelinks
        public HttpResponseMessage<IQueryable<PersonSession>> GetPersonSessions()
        {
            return new HttpResponseMessage<IQueryable<PersonSession>>(DataService.PersonSessions.GetAll());
            //return new HttpResponseMessage<IQueryable<PersonSession>>(HttpStatusCode.Forbidden); //security violation
        }

        // GET: api/attendancelinks/pid,sid
        public PersonSession GetPersonSessions(int pid, int sid)
        {
            var link = DataService.PersonSessions.GetByIds(pid, sid);
            if (link != null) return link;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        //// POST /api/attendancelinks
        //public void Post(Session value)
        //{
        //}

        //// PUT /api/attendancelinks/
        //public void Put(Session value)
        //{
        //}

        //// DELETE /api/attendancelinks/{id}
        //public void Delete(int id)
        //{
        //}
    }
}