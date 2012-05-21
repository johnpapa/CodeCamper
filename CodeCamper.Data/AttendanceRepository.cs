using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class AttendanceRepository : EFRepository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(DbContext context) : base(context) { }

        public override Attendance GetById(int id)
        {
            throw new InvalidOperationException("Cannot return a single Attendance object by id.");
        }

        public Attendance GetByIds(int personId, int sessionId)
        {
            return DbSet.FirstOrDefault(ps => ps.PersonId == personId && ps.SessionId == sessionId);
        }

        public IQueryable<Attendance> GetByPersonId(int id)
        {
            return DbSet.Where(ps => ps.PersonId == id);
        }

        public IQueryable<Attendance> GetBySessionId(int id)
        {
            return DbSet.Where(ps => ps.SessionId == id);
        }
    }
}
