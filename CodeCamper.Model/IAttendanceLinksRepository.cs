using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeCamper.Model
{
    public interface IAttendanceRepository : IRepository<Attendance>
    {
        IQueryable<Attendance> GetByPersonId(int id);
        IQueryable<Attendance> GetBySessionId(int id);
        Attendance GetByIds(int personId, int sessionId);
    }
}
