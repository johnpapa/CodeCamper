using System.Collections.Generic;
using System.Linq;

namespace CodeCamper.Model
{
    public interface ICodeCamperDataService
    {
        Room RoomById(int id); // ToDo: for early exploration; remove promptly
        IQueryable<Room> Rooms();
        IQueryable<TimeSlot> TimeSlots(); 
        IQueryable<Track> Tracks();

        IQueryable<Session> Sessions();
        Session SessionById(int id);

        IQueryable<Person> Persons();
        Person PersonById(int id);

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