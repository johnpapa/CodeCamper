using System.Collections.Generic;
using System.Linq;

namespace CodeCamper.Model
{
    public interface ICodeCamperDataService
    {
        void Commit();

        IRepository<Person> Persons { get; }
        IRepository<Room> Rooms { get; }
        ISessionsRepository Sessions { get; }
        IRepository<TimeSlot> TimeSlots { get; }
        IRepository<Track> Tracks { get; }
        IAttendanceLinksRepository AttendanceLinks { get; }

    }
}