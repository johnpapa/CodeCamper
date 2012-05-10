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
        public HttpResponseMessage<IQueryable<AttendanceLink>> GetAttendanceLinks()
        {
            return new HttpResponseMessage<IQueryable<AttendanceLink>>(DataService.AttendanceLinks.GetAll());
            //return new HttpResponseMessage<IQueryable<AttendanceLink>>(HttpStatusCode.Forbidden); //security violation
        }

        // GET: api/attendancelinks/pid,sid
        public AttendanceLink GetAttendanceLinks(int pid, int sid)
        {
            var attendanceLink = DataService.AttendanceLinks.GetByIds(pid, sid);
            if (attendanceLink != null) return attendanceLink;
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