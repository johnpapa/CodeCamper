using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        // GET /api/persons/?firstname=\'Hans\''
        // With OData query syntax we would not need such methods
        [ActionName("getbyfirstname")]
        public Person GetByFirstName(string value)
        {
            var person = Uow.Persons.GetAll()
                .FirstOrDefault(p => p.FirstName.StartsWith(value));

            if (person != null) return person;
            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }
    }
}