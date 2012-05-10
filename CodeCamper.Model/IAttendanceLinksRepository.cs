using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeCamper.Model
{
    public interface IAttendanceLinksRepository : IRepository<AttendanceLink>
    {
        IQueryable<AttendanceLink> GetByPersonId(int id);
        IQueryable<AttendanceLink> GetBySessionId(int id);
        AttendanceLink GetByIds(int personId, int sessionId);
    }
}
