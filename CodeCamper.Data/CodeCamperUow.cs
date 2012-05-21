using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    /// <summary>
    /// The Code Camper "Unit of Work"
    /// </summary>
    /// <remarks>
    /// This class implements the "Unit of Work" pattern in which
    /// the "UoW" serves as a facade for querying and saving to the database.
    /// Querying is delegated to "repositories".
    /// Each repository serves as a container dedicated to a particular
    /// root entity type such as a <see cref="Person"/>.
    /// A repository typically exposes "Get" methods for querying and
    /// will offer add, update, and delete methods if those features are supported.
    /// The repositories rely on their parent UoW to provide the interface to the
    /// data layer (which is the EF DbContext in Code Camper).
    /// </remarks>
    public class CodeCamperUow : ICodeCamperUow, IDisposable
    {
        public CodeCamperUow(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();

            repositoryProvider.DbContext = DbContext;
            RepositoryProvider = repositoryProvider;       
        }

        // Code Camper repositories

        public IRepository<Room> Rooms { get { return GetStandardRepo<Room>(); } }
        public IRepository<TimeSlot> TimeSlots { get { return GetStandardRepo<TimeSlot>(); } }
        public IRepository<Track> Tracks { get { return GetStandardRepo<Track>(); } }
        public ISessionsRepository Sessions { get { return GetRepo<ISessionsRepository>(); } }
        public IPersonsRepository Persons { get { return GetRepo<IPersonsRepository>(); } }
        public IAttendanceRepository Attendance { get { return GetRepo<IAttendanceRepository>(); } }

        /// <summary>
        /// Save pending changes to the database
        /// </summary>
        public void Commit()
        {
            // ToDo: Actually commit the save
            System.Diagnostics.Debug.WriteLine("Committed");
        }


        protected void CreateDbContext()
        {
            DbContext = new CodeCamperDbContext();

            // Do NOT enable proxied entities, else serialization fails
            DbContext.Configuration.ProxyCreationEnabled = false;

            // Load navigation properties explicitly (avoid serialization trouble)
            DbContext.Configuration.LazyLoadingEnabled = false;

            // Upshot does the following. We won't for now
            //DbContext.Configuration.ValidateOnSaveEnabled = false;
            //DbContext.Configuration.AutoDetectChangesEnabled = false;
        }

        protected IRepositoryProvider RepositoryProvider { get; set; }

        private IRepository<T> GetStandardRepo<T>() where T : class
        {
            return RepositoryProvider.GetStandardRepo<T>();
        }
        private T GetRepo<T>() where T : class
        {
            return RepositoryProvider.GetRepo<T>();
        }

        private CodeCamperDbContext DbContext { get; set; }

        #region IDisposable

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbContext != null)
                {
                    DbContext.Dispose();
                }
            }
        }

        #endregion
    
    }
}