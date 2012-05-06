using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Data;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers.Controllers
{
    public class PersonsController : ApiControllerBase
    {
        public PersonsController(ICodeCamperRepository repository)
        {
            Repository = repository;
        }

        // ToDo: Remove this poor man's IoC ctor
        public PersonsController()
        {
            Repository = new CodeCamperRepository();
        }

        // GET /api/<controller>
        public IEnumerable<Person> Get()
        {
            return Repository.Persons().OrderBy(p => p.FirstName).ToList();
        }

        // GET /api/<controller>/5
        public Person Get(int id)
        {
            return Repository.Persons().Where(p => p.Id == id).OrderBy(p => p.FirstName).First();
        }

        //// POST /api/<controller>
        //public void Post(string value)
        //{
        //}

        //// PUT /api/<controller>/5
        //public void Put(int id, string value)
        //{
        //}

        //// DELETE /api/<controller>/5
        //public void Delete(int id)
        //{
        //}
    }
}