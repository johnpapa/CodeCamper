using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Objects;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    /// <summary>
    /// The EF-dependent generic repository for Code Camper data access
    /// </summary>
    /// <typeparam name="T">Type of entity for this Repository.</typeparam>
    public class CodeCamperRepository<T> : IRepository<T> where T : class
    {
        public CodeCamperRepository(CodeCamperDbContext dbContext)
        {
            if (dbContext == null) 
                throw new ArgumentNullException("dbContext");
            DbContext = dbContext;
        }

        public CodeCamperRepository(CodeCamperDbContext dbContext, Expression<Func<T, int, bool>> getByIdPredicate)
            : this(dbContext)
        {
            GetByIdPredicate = getByIdPredicate;
        }

        protected CodeCamperDbContext DbContext { get; set; }

        protected DbSet<T> DbSet { get { return DbContext.Set<T>(); } }

        /// <summary>
        /// Predicate ("Where" clause) that queries by id,
        /// </summary>
        protected virtual Expression<Func<T, int, bool>> GetByIdPredicate { get; set; }

        public virtual T GetById(int id)
        {
            if (GetByIdPredicate == null) throw new NotImplementedException();
            var selector = GetByIdPredicate.ToSelector(id);
            return DbSet.FirstOrDefault(selector);
        }

        public virtual IQueryable<T> GetAll()
        {
            return DbContext.Set<T>();
        }

        public virtual void Add(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Detached)
            {
                dbEntityEntry.State = EntityState.Added;
            }
            else
            {
                DbSet.Add(entity);
            }
        }

        public virtual void Update(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                DbSet.Attach(entity);
            }  
            dbEntityEntry.State = EntityState.Modified;
        }

        public virtual void Delete(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry(entity);
            if (dbEntityEntry.State != EntityState.Deleted)
            {
                dbEntityEntry.State = EntityState.Deleted;
            }
            else
            {
                DbSet.Attach(entity);
                DbSet.Remove(entity);
            }
        }

        public virtual void Delete(int id)
        {
            if (GetByIdPredicate == null) throw new NotImplementedException();
            var entity = GetById(id);
            if (entity == null) return; // not found; assume already deleted.
            Delete(entity);
        }
    }
}
