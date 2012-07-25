using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using CodeCamper.Data.Contracts;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class SessionsRepository : EFRepository<Session>, ISessionsRepository
    {
        public SessionsRepository(DbContext context) : base(context) { }

        /// <summary>
        /// Get <see cref="SessionBrief"/>s, 
        /// a cutdown version of <see cref="Session"/> entities.
        /// </summary>
        ///<remarks>
        ///See <see cref="ISessionsRepository.GetSessionBriefs"/> for details.
        ///</remarks>
        public IQueryable<SessionBrief> GetSessionBriefs()
        {
            return DbSet.Select(s => new SessionBrief
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
        ///See <see cref="ISessionsRepository.GetTagGroups"/> for details.
        /// </remarks>
        public IEnumerable<TagGroup> GetTagGroups()
        {

            var tagGroups = 
                // extract the delimited tags string and session id from all sessions
                DbSet.Select(s => new { s.Tags, s.Id })
                    .ToArray() // we'll process them in memory.

                    // split the "Tags" string into individual tags 
                    // and flatten into {tag, id} pairs
                    .SelectMany(
                        s =>
                        s.Tags.Split(_tagDelimiter, StringSplitOptions.RemoveEmptyEntries)
                            .Select(t => new { Tag = t, s.Id })
                    )

                    // group {tag, id} by tag into unique {tag, [session-id-array]}
                    .GroupBy(g => g.Tag, data => data.Id)

                    // project the group into TagGroup instances
                    // ensuring that ids array in each array are unique
                    .Select(tg => new TagGroup 
                                    {
                                        Tag = tg.Key, 
                                        Ids = tg.Distinct().ToArray(),
                                    })
                    .OrderBy(tg => tg.Tag);

            return tagGroups;
        }

        private readonly char[] _tagDelimiter = new[] { '|' };
    }
}
