using System.Collections.Generic;
using System.Linq;
using CodeCamper.Data.Contracts;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class SpeakersController : ApiControllerBase
    {
        public SpeakersController(ICodeCamperUow uow)
        {
            Uow = uow;
        }

        #region OData Future: IQueryable<T>
        // http://localhost:1922/api/speakers/?$filter=FirstName%20eq%20Hans
        //[Queryable]
        //public IQueryable<Speaker> Get()
        #endregion

        // GET /api/speakers
        public IEnumerable<Speaker> Get()
        {
            return Uow.Persons.GetSpeakers()
                .OrderBy(s => s.FirstName);
        }
    }
}