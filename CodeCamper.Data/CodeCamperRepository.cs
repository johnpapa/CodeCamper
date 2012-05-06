using System;
using System.Collections.Generic;
using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class CodeCamperRepository : ICodeCamperRepository, IDisposable
    {
        private CodeCamperDbContext DbContext { get; set; }

        public CodeCamperRepository()
        {
            Initialize();
        }

        protected void Initialize()
        {
            DbContext = new CodeCamperDbContext();

            // Uncomment following if do NOT want proxied entities. Let's assume they are ok for now
            //var objectContext = (DbContext as IObjectContextAdapter).ObjectContext;
            //objectContext.ContextOptions.ProxyCreationEnabled = false;
            DbContext.Configuration.ProxyCreationEnabled = false;

            // Upshot does the following. We won't for now
            //DbContext.Configuration.ValidateOnSaveEnabled = false;
            //DbContext.Configuration.AutoDetectChangesEnabled = false;

            // Load navigation properties explicitly (avoid serialization trouble)
            DbContext.Configuration.LazyLoadingEnabled = false;
        }

        // ToDo: for early exploration; remove promptly
        public Room RoomById(int id)
        {
            return DbContext.Rooms.FirstOrDefault(r => r.Id == id);
        }

        public IQueryable<Room> Rooms()
        {
            return DbContext.Rooms;
        }

        public IQueryable<TimeSlot> TimeSlots()
        {
            return DbContext.TimeSlots;
        }

        public IQueryable<Track> Tracks()
        {
            return DbContext.Tracks;
        }

        public IQueryable<Session> Sessions()
        {
            return DbContext.Sessions;
        }

        public Session SessionById(int id)
        {
            return DbContext.Sessions.FirstOrDefault(s => s.Id == id);
        }

        public IQueryable<Person> Persons()
        {
            return DbContext.Persons;
        }

        public Person PersonById(int id)
        {
            return DbContext.Persons.FirstOrDefault(p => p.Id == id);
        }

        public IQueryable<PersonSession> PersonSessions()
        {
            return DbContext.PersonSessions;
        }

        public IQueryable<PersonSession> PersonSessionsByPersonId(int id)
        {
            return DbContext.PersonSessions.Where(ps => ps.PersonId == id);
        }

        public IQueryable<SessionBrief> SessionBriefs()
        {
            return DbContext.Sessions
                .Select(s => new SessionBrief
                    {
                        Id = s.Id,
                        Title = s.Title,
                        Code = s.Code,
                        SpeakerId = s.SpeakerId,
                        TrackId = s.TrackId,                                                          
                        TimeSlotId = s.TimeSlotId,
                        RoomId = s.RoomId,
                        Level = s.Level,
                        Tags = s.Tags,
                    });
        }

        /// <summary>
        /// Get the unique tags from all of the sessions
        /// as a list of <see cref="TagGroup"/>.
        /// </summary>
        /// <remarks>
        /// Each session has a "Tags" property with its tags in a
        /// delimited string such as "WP7|MVVM|Mobile".
        /// This TagGroups method creates a list of unique tags and
        /// the ids of the sessions that have each tag.
        /// e.g., {WP7, [1,4,5]}, {MVVM, [1,28]}, ...
        /// Each item in the list is a <see cref="TagGroup"/> consisting 
        /// of a tag and an array of ids of sessions with that tag.
        /// </remarks>
        public IEnumerable<TagGroup> TagGroups()
        {
            // get the session tags from all sessions in the database
            var sessionTags = DbContext.Sessions

                // select just the delimited tags string and session id
                .Select(s => new {s.Tags, s.Id}).ToArray()

                // split the "Tags" string into individual tags 
                // and flatten into {tag, id} pairs
                .SelectMany(
                    s =>
                    s.Tags.Split(_tagDelimiter, StringSplitOptions.RemoveEmptyEntries)
                        .Select(t => new {Tag = t, s.Id})
                )

                // group {tag, id} by tag into unique {tag, [session-id-array]}
                .GroupBy(g => g.Tag, data => data.Id)

                // project the group into TagGroup instances
                // ensuring that ids array in each array are unique
                .Select(tg => new TagGroup(tg.Key, tg.Distinct().ToArray()))
                .OrderBy(tg => tg.Tag);

            return sessionTags;
        }

        private readonly char[] _tagDelimiter = new[] { '|' };

        #region IDisposable

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null) DbContext.Dispose();
            }
        }

        #endregion
    }
}