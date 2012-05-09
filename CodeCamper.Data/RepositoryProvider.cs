using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class RepositoryProvider : CodeCamper.Data.IRepositoryProvider
    {
        public RepositoryProvider()
        {
            Repositories = new Dictionary<Type, object>();
            RepositoryFactories = new Dictionary<Type, Func<DbContext, object>>();
        }

        /// <summary>
        /// Get and set the <see cref="DbContext"/> with which to initialize a repository
        /// if one must be created.
        /// </summary>
        public DbContext DbContext { get; set; }

        /// <summary>
        /// Get or create-and-cache a <see cref="IRepository{T}"/>.
        /// </summary>
        /// <typeparam name="T">
        /// Root type of the <see cref="IRepository{T}"/>, typically an entity type.
        /// </typeparam>
        public IRepository<T> GetStandardRepo<T>() where T : class
        {
            return GetRepo<IRepository<T>>(GetStandardRepositoryFactory<T>());
        }

        /// <summary>
        /// Get or create-and-cache a repository of type T.
        /// </summary>
        /// <typeparam name="T">
        /// Type of the repository, typically a custom repository interface.
        /// </typeparam>
        /// <param name="factory">
        /// An optional repository creation function that takes a DbContext argument
        /// and returns a repository of T. Used if the repository must be created.
        /// </param>
        /// <remarks>
        /// Looks for the requested repository in its cache, returning if found.
        /// If not found, tries to make one using <see cref="MakeRepository{T}"/>.
        /// </remarks>
        public virtual T GetRepo<T>(Func<DbContext, object> factory = null) where T : class
        {
            // Look for T dictionary cache under typeof(T).
            object repoObj;
            Repositories.TryGetValue(typeof(T), out repoObj);
            if (repoObj != null)
            {
                return (T)repoObj;
            }

            // Not found or null; make one, add to dictionary cache, and return it.
            return MakeRepository<T>(factory, DbContext);
        }

        /// <summary>
        /// Set the repository to return from this provider.
        /// </summary>
        /// <remarks>
        /// Set a repository if you don't want this provider to create one.
        /// Useful in testing and when developing without a backend
        /// implementation of the object returned by a repository of type T.
        /// </remarks>
        public void SetRepository<T>(T repository)
        {
            Repositories[typeof(T)] = repository;
        }

        /// <summary>
        /// Set the repository factory for a type, typically the repository type.
        /// </summary>
        /// <remarks>
        /// Set a factory for each custom repository that this
        /// provider should be able to create.
        /// </remarks>
        public void SetRepositoryFactory<T>(Func<DbContext, object> factory)
        {
            RepositoryFactories[typeof(T)] = factory;
        }

        /// <summary>
        /// Get the dictionary of repository objects, keyed by repository type.
        /// </summary>
        /// <remarks>
        /// Caller must know how to cast the repository object to a useful type.
        /// <p>This is an extension point. You can register fully made repositories here
        /// and they will be used instead of the ones this provider would otherwise create.</p>
        /// </remarks>
        protected Dictionary<Type, object> Repositories { get; private set; }

        /// <summary>Make a repository of type T.</summary>
        /// <typeparam name="T">Type of repository to make.</typeparam>
        /// <param name="dbContext">
        /// The <see cref="DbContext"/> with which to initialize the repository.
        /// </param>        
        /// <param name="factory">
        /// Factory with <see cref="DbContext"/> argument. Used to make the repository.
        /// If null, gets factory from <see cref="GetRepositoryFactory"/>.
        /// </param>
        /// <returns></returns>
        protected virtual T MakeRepository<T>(Func<DbContext, object> factory, DbContext dbContext)
        {
            var f = factory ?? GetRepositoryFactory(typeof(T));
            if (f == null)
            {
                throw new NotImplementedException("No factory for repository type, " + typeof(T).FullName);
            }
            T repo = (T)f(dbContext);
            Repositories[typeof(T)] = repo;
            return repo;
        }

        /// <summary>
        /// Get the repository factory object for the given factory type.
        /// </summary>
        /// <param name="factoryType">Typically the repository type.</param>
        /// <returns>The repository object if found, else null.</returns>
        protected Func<DbContext, object> GetRepositoryFactory(Type factoryType)
        {
            Func<DbContext, object> factory;
            RepositoryFactories.TryGetValue(factoryType, out factory);
            return factory;
        }

        /// <summary>
        /// Get the factory for a standard <see cref="IRepository{T}"/>
        /// </summary>
        /// <typeparam name="T">The root type of the repository, typically an entity type.</typeparam>
        /// <returns>
        /// A factory that creates the <see cref="IRepository{T}"/>, given an EF <see cref="DbContext"/>.
        /// </returns>
        /// <remarks>
        /// Looks first for a custom factory in <see cref="RepositoryFactories"/>.
        /// If not, falls back to the <see cref="DefaultStandardRepositoryFactory"/>.
        /// You can substitute an alternative factory for the default one by adding
        /// a repository factory for type "T" to <see cref="RepositoryFactories"/>.
        /// </remarks>
        protected virtual Func<DbContext, object> GetStandardRepositoryFactory<T>() where T : class
        {
            return GetRepositoryFactory(typeof(T)) ?? DefaultStandardRepositoryFactory<T>();
        }

        protected virtual Func<DbContext, object> DefaultStandardRepositoryFactory<T>() where T : class
        {
            return dbContext => new EFRepository<T>(dbContext);
        }

        /// <summary>
        /// Get the dictionary of Repository factories, keyed by a type, typically the repository type.
        /// </summary>
        /// <remarks>
        /// A repository factory takes a <see cref="DbContext"/> argument and returns
        /// a repository object. Caller must know how to cast it.
        /// <p>This is an extension point. You can register factories here including
        /// repository factory that supercedes the default <see cref="StandardRepositoryFactory"/>.</p>
        /// </remarks>
        protected Dictionary<Type, Func<DbContext, object>> RepositoryFactories { get; private set; }

    }
}
