using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class AttendanceController : ApiControllerBase
    {
        public AttendanceController(ICodeCamperUow uow)
        {
            Uow = uow;
        }

        // GET: api/attendance
        public IQueryable<Attendance> GetAttendance()
        {
            return Uow.Attendance.GetAll();
            //throw new HttpResponseException(HttpStatusCode.Forbidden); //security violation
        }

        // GET: api/attendance/pid,sid
        public Attendance GetAttendance(int pid, int sid)
        {
            var attendance = Uow.Attendance.GetByIds(pid, sid);
            if (attendance != null) return attendance;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        //// POST /api/attendance
        //public void Post(Session value)
        //{
        //}

        //// PUT /api/attendance/
        //public void Put(Session value)
        //{
        //}

        //// DELETE /api/attendance/{id}
        //public void Delete(int id)
        //{
        //}
    }
}