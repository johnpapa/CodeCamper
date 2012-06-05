using System;
using System.Data.Entity;
using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class AttendanceRepository : EFRepository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(DbContext context) : base(context) { }

        public override Attendance GetById(int id)
        {
            throw new InvalidOperationException("Cannot return a single Attendance object by single id value.");
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

        public override void Delete(int id)
        {
            throw new InvalidOperationException("Cannot delete an Attendance object by a single id value.");
        }

        public void Delete(int personId, int sessionId)
        {
            // EF needs an attendance entity to delete (can't delete with the id)
            // Don't need the REAL entity though. A placeholder with the ids in it will do.
            var attendance = new Attendance {PersonId = personId, SessionId = sessionId};
            Delete(attendance);
        }
    }
}
