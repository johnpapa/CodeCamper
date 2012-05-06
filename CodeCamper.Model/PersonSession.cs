using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CodeCamper.Model
{
    public class PersonSession
    {
        public int SessionId { get; set; }
        public Session Session { get; set; }

        public int PersonId { get; set; }
        public Person Person { get; set; }

        public int Rating { get; set; }
        public string Text { get; set; }
    }
}
