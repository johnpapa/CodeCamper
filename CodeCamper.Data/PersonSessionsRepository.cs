using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class PersonSessionsRepository : EFRepository<PersonSession>, IPersonSessionsRepository
    {
        public PersonSessionsRepository(DbContext context) : base(context) { }

        public override PersonSession GetById(int id)
        {
            throw new InvalidOperationException("Cannot return a single PersonSessions object by id.");
        }

        public PersonSession GetByIds(int personId, int sessionId)
        {
            return DbSet.FirstOrDefault(ps => ps.PersonId == personId && ps.SessionId == sessionId);
        }

        public IQueryable<PersonSession> GetByPersonId(int id)
        {
            return DbSet.Where(ps => ps.PersonId == id);
        }

        public IQueryable<PersonSession> GetBySessionId(int id)
        {
            return DbSet.Where(ps => ps.SessionId == id);
        }
    }
}
