using System.Collections.Generic;

namespace CodeCamper.Model
{
    /// <summary>
    /// A brief version (e.g., no Bio) of a Person who is a speaker.
    /// </summary>
    /// <remarks>
    /// This is a DTO, not an entity backed by a database object
    /// although it derives from <see cref="Person"/>
    /// </remarks>
    public class Speaker
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ImageSource { get; set; }
    }
}