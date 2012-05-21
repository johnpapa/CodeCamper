using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    /// <summary>
    /// A maker of Repositories.
    /// </summary>
    /// <remarks>
    /// An instance of this class contains repository factory functions for different types.
    /// Each factory function takes an EF <see cref="DbContext"/> and returns
    /// a repository bound to that DbContext.
    /// <para>
    /// Designed to be a "Singleton", configured at web application start with
    /// all of the factory functions needed to create any type of repository.
    /// Should be thread-safe to use because it is configured at app start,
    /// before any request for a factory, and is immutable thereafter.
    /// </para>
    /// </remarks>
    public abstract class RepositoryFactories
    {
        public RepositoryFactories( )
        {
            _repositoryFactories = 
                new Dictionary<Type, Func<DbContext, object>>(GetInitialFactoryFunctions());
        }

        /// <summary>
        /// Return the dictionary of repository factory functions,
        /// each the factory for a repository of a particular type.
        /// </summary>
        /// <remarks>
        /// The initializing dictionary of repository factory functions.
        /// If contents are copied into the base class's private dictionary;
        /// the derived class can not (easily) alter the base class's private factories.
        /// This is necessary to preserve the immutability guarantee that
        /// supports thread safety.
        /// </remarks>
        protected abstract IDictionary<Type, Func<DbContext, object>> GetInitialFactoryFunctions();

        /// <summary>
        /// Get the repository factory object for the given factory type.
        /// </summary>
        /// <param name="factoryType">Typically the repository type.</param>
        /// <returns>The repository object if found, else null.</returns>
        public Func<DbContext, object> GetRepositoryFactory(Type factoryType)
        {
            Func<DbContext, object> factory;
            _repositoryFactories.TryGetValue(factoryType, out factory);
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
        /// Looks first for a custom factory in <see cref="_repositoryFactories"/>.
        /// If not, falls back to the <see cref="DefaultStandardRepositoryFactory"/>.
        /// You can substitute an alternative factory for the default one by adding
        /// a repository factory for type "T" to <see cref="_repositoryFactories"/>.
        /// </remarks>
        public virtual Func<DbContext, object> GetStandardRepositoryFactory<T>() where T : class
        {
            return GetRepositoryFactory(typeof(T)) ?? DefaultStandardRepositoryFactory<T>();
        }

        /// <summary>
        /// Default factory for any of the "standard" <see cref="IRepository{T}"/>
        /// </summary>
        /// <typeparam name="T">Type of the repository's root entity</typeparam>
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
        private IDictionary<Type, Func<DbContext, object>> _repositoryFactories;

    }
}
