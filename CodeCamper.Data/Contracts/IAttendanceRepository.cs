using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public interface IAttendanceRepository : IRepository<Attendance>
    {
        IQueryable<Attendance> GetByPersonId(int id);
        IQueryable<Attendance> GetBySessionId(int id);
        Attendance GetByIds(int personId, int sessionId);
        void Delete(int personId, int sessionId);
    }
}
