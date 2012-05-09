using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeCamper.Model
{
    public interface IPersonSessionsRepository : IRepository<PersonSession>
    {
        IQueryable<PersonSession> GetByPersonId(int id);
        IQueryable<PersonSession> GetBySessionId(int id);
    }
}
