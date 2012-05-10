using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CodeCamper.Model
{
    /// <summary>
    /// A class representing a case of a <see cref="Person"/> attending a <see cref="Session"/>.
    /// A many-to-many link between <see cref="Person"/> and <see cref="Session"/>
    /// with a session evaluation payload.
    /// </summary>
    public class AttendanceLink
    {
        public int SessionId { get; set; }
        public Session Session { get; set; }

        public int PersonId { get; set; }
        public Person Person { get; set; }

        /// <summary>Get and set the person's rating of the session from 1-5 (0=not rated).</summary>
        [Range(0,5)]
        public int Rating { get; set; }

        /// <summary>Get and set the person's session evaluation text.</summary>
        public string Text { get; set; }
    }
}
