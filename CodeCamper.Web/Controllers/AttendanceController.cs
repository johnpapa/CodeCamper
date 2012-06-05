using System;
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
        [Queryable]
        public IQueryable<Attendance> GetAttendance()
        {
            return Uow.Attendance.GetAll();
            //throw new HttpResponseException(HttpStatusCode.Forbidden); //security violation
        }

        // GET: api/attendance/?pid=2&sid=1
        public Attendance GetAttendance(int pid, int sid)
        {
            var attendance = Uow.Attendance.GetByIds(pid, sid);
            if (attendance != null) return attendance;
            //throw new HttpResponseException(HttpStatusCode.NotFound);
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // Create a new Attendance
        // POST /api/attendance
        public HttpResponseMessage Post(Attendance attendance)
        {
            Uow.Attendance.Add(attendance);
            Uow.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, attendance);

            // Compose location header that tells how to get this attendance
            // e.g. ~/api/attendance/?pid=2&sid=1
            var queryString = string.Format(
                "?pid={0}&sid={1}", attendance.PersonId, attendance.SessionId);
            response.Headers.Location =
                new Uri(Url.Link(RouteConfig.ControllerOnly, null)+queryString);

            return response;
        }

        // Update an existing Attendance 
        // PUT /api/attendance/
        public HttpResponseMessage Put(Attendance attendance)
        {
            Uow.Attendance.Update(attendance);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE /api/attendance/?pid=2&sid=1
        public HttpResponseMessage Delete(int pid, int sid)
        {
            Uow.Attendance.Delete(pid, sid);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}