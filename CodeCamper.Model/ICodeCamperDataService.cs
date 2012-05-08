using System.Collections.Generic;
using System.Linq;

namespace CodeCamper.Model
{
    public interface ICodeCamperDataService
    {
        void Commit();

        IRepository<Person> Persons { get; }
        IRepository<Room> Rooms { get; }
        IRepository<Session> Sessions { get; }
        IRepository<TimeSlot> TimeSlots { get; }
        IRepository<Track> Tracks { get; }

        IQueryable<PersonSession> PersonSessions();
        IQueryable<PersonSession> PersonSessionsByPersonId(int id);
            
        /// <summary>
        /// Get the unique tags from sessions
        /// as a list of <see cref="TagGroup"/>.
        /// </summary>
        IQueryable<SessionBrief> SessionBriefs();

        /// <summary>
        /// Get the unique tags from sessions
        /// as a list of <see cref="TagGroup"/>.
        /// </summary>
        IEnumerable<TagGroup> TagGroups();
    }
}