using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers.Controllers
{
    public class PersonSessionsController : ApiControllerBase
    {
        public PersonSessionsController(ICodeCamperDataService dataService)
        {
            DataService = dataService;
        }
       
        // GET: api/events/sessions
        public HttpResponseMessage<IQueryable<PersonSession>> GetPersonSessions()
        {
            return new HttpResponseMessage<IQueryable<PersonSession>>(HttpStatusCode.Forbidden); //security violation
            //return new HttpResponseMessage(HttpStatusCode.BadRequest);
            //return Repository.PersonSessions().OrderBy(ps => ps.SessionId);
        }

        public IQueryable<PersonSession> GetPersonSessionsByPersonId(int id)
        {
            return DataService.PersonSessions.GetByPersonId(id).OrderBy(ps => ps.SessionId);
        }
        
        //// GET /api/{controller}/
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST /api/{controller}
        //public void Post(Session value)
        //{
        //}

        //// PUT /api/{controller}/
        //public void Put(Session value)
        //{
        //}

        //// DELETE /api/{controller}/{id}
        //public void Delete(int id)
        //{
        //}
    }
}