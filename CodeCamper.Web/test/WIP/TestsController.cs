using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Data.Contracts;
using CodeCamper.Model;
using CodeCamper.Web.Controllers;

#if DEBUG
namespace CodeCamper.Web.Test
{
    /// <summary>
    /// Test-only Web API controller to do things during testing
    /// that the real clients should NOT be able to do 
    /// (e.g., delete Sessions).
    /// DO NOT DEPLOY
    /// </summary>
    public class TestsController : ApiControllerBase
    {
        public TestsController(ICodeCamperUow uow)
        {
            Uow = uow;
        }

        // GET: api/tests/testsessions
        [ActionName("TestSessions")]
        [Queryable]
        public IQueryable<Session> GetTestSessions()
        {
            return Uow.Sessions.GetAll().Where(s => s.Title.StartsWith("TEST"));
        }

        // DELETE: api/tests/testsession/?id=42
        [HttpDelete, ActionName("TestSession")]
        public HttpResponseMessage DeleteTestSessionById(int id)
        {
            var session = Uow.Sessions.GetById(id);
            if (null != session)
            {
                if (!session.Title.StartsWith("TEST"))
                {
                    // not a TEST session; refuse to delete it
                    return new HttpResponseMessage(HttpStatusCode.Forbidden);
                }
                Uow.Sessions.Delete(session);
                Uow.Commit();
            }
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        // DELETE: api/tests/testsessions
        [HttpDelete, ActionName("TestSessions")]
        public HttpResponseMessage DeleteAllTestSessions()
        {
            var testSessions = GetTestSessions().ToList();
            var container = Uow.Sessions;
            testSessions.ForEach(container.Delete);
            Uow.Commit();
            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
#endif