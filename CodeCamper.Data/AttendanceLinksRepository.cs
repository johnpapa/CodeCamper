using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class AttendanceLinksRepository : EFRepository<AttendanceLink>, IAttendanceLinksRepository
    {
        public AttendanceLinksRepository(DbContext context) : base(context) { }

        public override AttendanceLink GetById(int id)
        {
            throw new InvalidOperationException("Cannot return a single AttendanceLinks object by id.");
        }

        public AttendanceLink GetByIds(int personId, int sessionId)
        {
            return DbSet.FirstOrDefault(ps => ps.PersonId == personId && ps.SessionId == sessionId);
        }

        public IQueryable<AttendanceLink> GetByPersonId(int id)
        {
            return DbSet.Where(ps => ps.PersonId == id);
        }

        public IQueryable<AttendanceLink> GetBySessionId(int id)
        {
            return DbSet.Where(ps => ps.SessionId == id);
        }
    }
}
