using System;
using System.Collections.Generic;
using System.Linq;
namespace CodeCamper.Model
{
    public interface ISessionsRepository : IRepository<Session>
    {
        /// <summary>
        /// Get <see cref="SessionBrief"/>s, 
        /// a cutdown version of <see cref="Session"/> entities.
        /// </summary>
        /// <remarks>
        /// <see cref="SessionBrief"/> is a subset of  
        /// <see cref="Session"/> properties suitable for 
        /// quick client-side filtering and presentation.
        /// </remarks>
        IQueryable<SessionBrief> GetSessionBriefs();

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
        IEnumerable<TagGroup> GetTagGroups();
    }
}
