using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Data.Contracts;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class PersonsController : ApiControllerBase
    {
        public PersonsController(ICodeCamperUow uow)
        {
            Uow = uow;
        }

        #region OData Future: IQueryable<T>
        //[Queryable]
        // public IQueryable<Person> Get()
        #endregion

        // GET /api/persons
        public IEnumerable<Person> Get()
        {
            return Uow.Persons.GetAll()
                .OrderBy(p => p.FirstName);
        }

        // GET /api/persons/5
        public Person Get(int id)
        {
            var person = Uow.Persons.GetById(id);
            if (person != null) return person;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // OData: GET /api/persons/?firstname=\'Hans\''
        // With OData query syntax we would not need such methods
        // /api/persons/getbyfirstname?value=Joe1
        [ActionName("getbyfirstname")]
        public Person GetByFirstName(string value)
        {
            var person = Uow.Persons.GetAll()
                .FirstOrDefault(p => p.FirstName.StartsWith(value));

            if (person != null) return person;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // Update an existing person
        // PUT /api/persons/
        public HttpResponseMessage Put(Person person)
        {
            Uow.Persons.Update(person);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

    }
}