using System.Collections.Generic;

namespace CodeCamper.Model
{
    /// <summary>
    /// A session tag and the ids of every <see cref="Session"/> that has this tag.
    /// </summary>
    /// <remarks>
    /// This is a DTO, not an entity backed by a database object
    /// </remarks>
    public class TagGroup
    {
        public string Tag { get; set; }
        public ICollection<int> Ids { get; set; } 
    }
}