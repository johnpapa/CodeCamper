using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class CodeCamperDataService : ICodeCamperDataService, IDisposable
    {
        private CodeCamperDbContext DbContext { get; set; }

        // TODO: Inject RepositoryProvider?
        public CodeCamperDataService(IRepositoryProvider repositoryProvider)
        {
            CreateDbContext();

            repositoryProvider.DbContext = DbContext;
            RepositoryProvider = repositoryProvider;       
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

        public IRepository<Room> Rooms { get { return GetStandardRepo<Room>(); } }
        public IRepository<TimeSlot> TimeSlots { get { return GetStandardRepo<TimeSlot>(); } }
        public IRepository<Track> Tracks { get { return GetStandardRepo<Track>(); } }
        public ISessionsRepository Sessions { get { return GetRepo<ISessionsRepository>(); } }
        public IRepository<Person> Persons { get { return GetStandardRepo<Person>(); } }
        public IPersonSessionsRepository PersonSessions { get { return GetRepo<IPersonSessionsRepository>(); } }

        public void Commit()
        {
            // ToDo: Actually commit the save
            System.Diagnostics.Debug.WriteLine("Committed");
        }

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