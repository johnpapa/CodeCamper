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
        public PersonsController(ICodeCamperUow dataService)
        {
            DataService = dataService;
        }

        // GET /api/{controller}
        public IQueryable<Person> Get()
        {
            return DataService.Persons.GetAll().OrderBy(p => p.FirstName);
        }

        // GET /api/{controller}/5
        public Person Get(int id)
        {
            var person = DataService.Persons.GetById(id);
            if (person != null) return person;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        // PUT /api/{controller}/
        public void Put(Person person)
        {
            DataService.Persons.Update(person);
            DataService.Commit();
        }

        #region Actions (RPC methods)

        // GET: api/sessions/speakers
        [ActionName("speakers")]
        public IQueryable<Speaker> GetSpeakers()
        {
            return DataService.Persons.GetSpeakers().OrderBy(s => s.FirstName);
        }

        // GET: api/persons/{personId}/attendance
        [ActionName(Names.Actions.Attendance)]
        public IQueryable<Attendance> GetAttendanceByPersonId(int id)
        {
            return DataService.Attendance.GetByPersonId(id).OrderBy(ps => ps.Session.Title);
        }

        #endregion
    }
}