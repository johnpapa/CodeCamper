using System.Collections.Generic;
using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class SessionBriefsController : ApiControllerBase
    {
        public SessionBriefsController(ICodeCamperUow uow)
        {
            Uow = uow;
        }

        #region OData Future: IQueryable<T>
        //[Queryable]
        // public IQueryable<SessionBrief> Get()
        #endregion

        // GET /api/sessionbriefs
        public IEnumerable<SessionBrief> Get()
        {
            return Uow.Sessions.GetSessionBriefs()
                .OrderBy(sb => sb.TimeSlotId);
        }
    }
}