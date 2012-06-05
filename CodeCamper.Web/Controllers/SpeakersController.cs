using System.Linq;
using System.Web.Http;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class SpeakersController : ApiControllerBase
    {
        public SpeakersController(ICodeCamperUow uow)
        {
            Uow = uow;
        }

        // http://localhost:1922/api/speakers/?$filter=FirstName%20eq%20Hans
        // GET /api/speakers
        [Queryable]
        public IQueryable<Speaker> Get()
        //public IEnumerable<Speaker> Get()
        {
            return Uow.Persons.GetSpeakers().OrderBy(s => s.FirstName);
        }
    }
}