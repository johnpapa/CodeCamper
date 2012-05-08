using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class CodeCamperDataService : ICodeCamperDataService, IDisposable
    {
        private CodeCamperDbContext DbContext { get; set; }

        public CodeCamperDataService()
        {
            Initialize();

            //Rooms = new Repository<Room>(DbContext, (item, id) => item.Id == id));
        }

        // public IRepository<Room> Rooms {get; private set;}

        protected void Initialize()
        {
            DbContext = new CodeCamperDbContext();

            // Do NOT enable proxied entities, else serialization fails
            DbContext.Configuration.ProxyCreationEnabled = false;

            // Load navigation properties explicitly (avoid serialization trouble)
            DbContext.Configuration.LazyLoadingEnabled = false;

            // Upshot does the following. We won't for now
            //DbContext.Configuration.ValidateOnSaveEnabled = false;
            //DbContext.Configuration.AutoDetectChangesEnabled = false;
        }

        public void Commit()
        {
            Console.WriteLine("Committed");
        }
        //public IRepository<Foo> Foos
        //{
        //    get { return _foos ?? (_foos = new FakeRepository<Foo>()); } 
        //}
        //private IRepository<Foo> _foos;

        public IRepository<Room> Rooms {
            get { return _rooms ?? (_rooms = new CodeCamperRepository<Room>(DbContext, (item, id) => item.Id == id)); } 
        }
        private IRepository<Room> _rooms;

        public IRepository<TimeSlot> TimeSlots
        {
            get { return _timeSlots ?? (_timeSlots = new CodeCamperRepository<TimeSlot>(DbContext, (item, id) => item.Id == id)); }
        }
        private IRepository<TimeSlot> _timeSlots;

        public IRepository<Track> Tracks
        {
            get { return _tracks ?? (_tracks = new CodeCamperRepository<Track>(DbContext, (item, id) => item.Id == id)); }
        }
        private IRepository<Track> _tracks;


        public IRepository<Session> Sessions
        {
            get { return _sessions ?? (_sessions = new CodeCamperRepository<Session>(DbContext, (item, id) => item.Id == id)); }
        }
        private IRepository<Session> _sessions;

        public IRepository<Person> Persons
        {
            get { return _persons ?? (_persons = new CodeCamperRepository<Person>(DbContext, (item, id) => item.Id == id)); }
        }
        private IRepository<Person> _persons;

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