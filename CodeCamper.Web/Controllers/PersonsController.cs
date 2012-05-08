using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using CodeCamper.Model;

namespace CodeCamper.Web.Controllers.Controllers
{
    public class PersonsController : ApiControllerBase
    {
        public PersonsController(ICodeCamperDataService dataService)
        {
            DataService = dataService;
        }

        // GET /api/<controller>
        public IQueryable<Person> Get()
        {
            return DataService.Persons.GetAll().OrderBy(p => p.FirstName);
        }

        // GET /api/<controller>/5
        public Person Get(int id)
        {
            var person = DataService.Persons.GetById(id);
            if (person != null) return person;
            throw new HttpResponseException(HttpStatusCode.NotFound);
        }

        //// POST /api/<controller>
        //public void Post(string value)
        //{
        //}

        // PUT /api/<controller>/5
        public void Put(Person person)
        {
            DataService.Persons.Update(person);
            DataService.Commit();
        }

        //// DELETE /api/<controller>/5
        //public void Delete(int id)
        //{
        //}
    }
}