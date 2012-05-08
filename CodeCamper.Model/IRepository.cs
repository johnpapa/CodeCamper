using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CodeCamper.Model
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T GetById(int id);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
        void Delete(int id);
    }
}
