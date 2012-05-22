using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class PersonsController : ApiControllerBase
    {
        public PersonsController(ICodeCamperUow uow)
        {
            Uow = uow;
        }

        // GET /api/persons
        public IQueryable<Person> Get()
        {
            return Uow.Persons.GetAll().OrderBy(p => p.FirstName);
        }

        // GET /api/persons/5
        public Person Get(int id)
        {
            var person = Uow.Persons.GetById(id);
            if (person != null) return person;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        // PUT /api/persons/
        public void Put(Person person)
        {
            Uow.Persons.Update(person);
            Uow.Commit();
        }

        #region Actions (RPC methods)

        // GET: api/sessions/speakers
        [ActionName("speakers")]
        public IQueryable<Speaker> GetSpeakers()
        {
            return Uow.Persons.GetSpeakers().OrderBy(s => s.FirstName);
        }

        // GET: api/persons/{personId}/attendance
        [ActionName("attendance")]
        public IQueryable<Attendance> GetAttendanceByPersonId(int id)
        {
            return Uow.Attendance.GetByPersonId(id).OrderBy(ps => ps.Session.Title);
        }

        #endregion
    }
}