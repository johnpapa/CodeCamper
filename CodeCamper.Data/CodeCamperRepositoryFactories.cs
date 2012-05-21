using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    /// <summary>
    /// The <see cref="RepositoryFactories"/> needed by CodeCamper.
    /// </summary>
    /// <remarks>
    /// Registers the custom repository factories specific to CodeCamper.
    /// The base class knows how to make a standard <see cref="IRepository{T}"/>
    /// for an entity type, T.
    /// </remarks>
    public class CodeCamperRepositoryFactories : RepositoryFactories
    {
        protected override IDictionary<Type, Func<DbContext, object>> GetInitialFactoryFunctions()
        {
            return new Dictionary<Type, Func<DbContext, object>>
                {
                   {typeof(IAttendanceRepository), dbContext => new AttendanceRepository(dbContext)},
                   {typeof(IPersonsRepository), dbContext => new PersonsRepository(dbContext)},
                   {typeof(ISessionsRepository), dbContext => new SessionsRepository(dbContext)},
                };
        }
    }
}
