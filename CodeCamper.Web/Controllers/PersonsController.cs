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
        public PersonsController(ICodeCamperDataService dataService)
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

        // GET: api/persons/{personId}/attendancelinks
        [ActionName(Names.Actions.AttendanceLinks)]
        public IQueryable<AttendanceLink> GetAttendanceLinkByPersonId(int personId)
        {
            return DataService.AttendanceLinks.GetByPersonId(personId).OrderBy(ps => ps.Session.Title);
        }

        #endregion
    }
}