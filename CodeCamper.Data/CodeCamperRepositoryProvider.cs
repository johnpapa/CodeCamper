using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    /// <summary>
    /// A <see cref="RepositoryProvider"/> that knows how to make
    /// custom repositories needed by CodeCamper.
    /// </summary>
    public class CodeCamperRepositoryProvider : RepositoryProvider
    {
        public CodeCamperRepositoryProvider ()
	    {
            SetRepositoryFactory<ISessionsRepository>(
                dbContext => new SessionsRepository(dbContext));

           SetRepositoryFactory<IAttendanceRepository>(
               dbContext => new AttendanceRepository(dbContext));

	    }
    }
}
