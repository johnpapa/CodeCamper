using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class PersonsRepository : EFRepository<Person>, IPersonsRepository
    {
        public PersonsRepository(DbContext context) : base(context) { }

        /// <summary>
        /// Get <see cref="Speaker"/>s at sessions.
        /// </summary>
        ///<remarks>
        ///See <see cref="IPersonsRepository.Speakers"/> for details.
        ///</remarks>

        public IQueryable<Speaker> GetSpeakers()
        {
            return DbContext
                .Set<Session>()
                .Select(session => session.Speaker)
                .Distinct().Select(s =>
                    new Speaker
                        {    
                                PersonId = s.Id,
                                FirstName = s.FirstName,
                                LastName = s.LastName,
                                ImageSource = s.ImageSource,
                        });
       
        }
    }
}
