using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class FakeFooRepository<T> : IRepository<T> where T : class
    {
        T IRepository<T>.GetById(int id)
        {
            throw new NotImplementedException();
        }

        IQueryable<T> IRepository<T>.GetAll()
        {
            throw new NotImplementedException();
        }

        public void Add(T entity)
        {
            throw new NotImplementedException();
        }

        public void Update(T entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
