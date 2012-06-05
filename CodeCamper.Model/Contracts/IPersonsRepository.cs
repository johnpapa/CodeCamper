using System.Linq;
namespace CodeCamper.Model
{
    public interface IPersonsRepository : IRepository<Person>
    {
        /// <summary>
        /// Get <see cref="Speaker"/>s at sessions.
        /// </summary>
        /// <remarks>
        /// <see cref="Speaker"/> is a subset of  
        /// <see cref="Person"/> properties suitable for 
        /// quick client-side filtering and presentation.
        /// </remarks>
        IQueryable<Speaker> GetSpeakers();

    }
}
