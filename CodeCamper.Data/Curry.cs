using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace CodeCamper.Data
{
    // Belongs in a utility library. Not specific to Data or Entity Framework
    public static class Currier
    {
        /// <summary>
        /// Curry the expression, substituting one or more values for the parameters in the expression.
        /// </summary>
        /// <param name="ex">Expression to curry</param>
        /// <param name="parameters">
        /// <see cref="Expression.Constant"/> parameters to substitute, starting from the left.
        /// </param>
        /// <remarks>
        /// "Currying" is the process of reducing an <see cref="Expression"/> 
        /// by filling in some of the parameter values.
        /// For example, you could reduce sum(a,b) into sum(1,b) by currying with the value "1" for "a".
        /// Here's how you do it
        /// We use the second overload, <see cref="Curry(LambdaExpression, int, params Expression[])"/>
        /// to reduce query functions.
        /// The code in this class closely follows Bard De Smet's Curry
        /// http://community.bartdesmet.net/blogs/bart/archive/2008/08/13/curry-for-dummies.aspx
        /// </remarks>
        /// <example>
        /// Example follows:
        /// </example>
        /// <code>
        /// Expression<Func<int, int, int>> sum = (a,b) => a + b;
        /// Curry(sum, Expression.Contant(1)) //returns the expression sum(1,b) 
        /// </code>
        public static LambdaExpression Curry(LambdaExpression ex, params Expression[] parameters)
        {
            return Curry(ex, 0, parameters);
        }

        /// <summary>
        /// Curry the expression, substituting one or more values for the parameters in the expression,
        /// skiping the first <see paramname="skip"/> parameters.
        /// </summary>
        /// <param name="skip">Number of parameters to skip before substituting values</param>
        /// <remarks>
        /// See <see cref="ToSelector"/> for example of use.
        /// See <see cref="Curry(LambdaExpression, params Expression[])"/> for explanation of "currying".
        /// This overload skips the first <see paramname="skip"/> parameters before substituting
        /// parameter values. We need this variant to build "Where" clauses as when finding by id.
        /// For example, we curry "(room, id) => room.Id == id"  when we know the id==1
        /// into "(room) => room.Id == 1"
        /// </remarks>
        public static LambdaExpression Curry(LambdaExpression ex, int skip, params Expression[] parameters)
        {
            if (parameters.Length > ex.Parameters.Count-skip)
                throw new InvalidOperationException("Too many parameters specified.");

            var assignments = new Dictionary<ParameterExpression, Expression>();

            for (int i = 0; i < parameters.Length; i++)
            {
                ParameterExpression parameter = ex.Parameters[skip + i];
                Expression value = parameters[i];

                if (!parameter.Type.IsAssignableFrom(value.Type))
                    throw new InvalidOperationException("Incompatible parameter value type for parameter " + parameter.Name);

                assignments[parameter] = value;
            }

            var visitor = new CurryVisitor(assignments);
            //return Expression.Lambda(visitor.Clone(ex.Body), ex.Parameters.Skip(parameters.Length).ToArray()); 
            return Expression.Lambda(visitor.Clone(ex.Body),
                ex.Parameters.Take(skip).Concat(ex.Parameters.Skip(skip+parameters.Length)).ToArray());
        }

        /// <summary>
        /// Curry the GetByIdPredicate into a selector for a where clause.
        /// </summary>
        /// <typeparam name="T">Entity type</typeparam>
        /// <param name="byIdPredicate">Expression for finding an entity by its integer id.</param>
        /// <param name="id">The id of the entity to find.</param>
        /// <returns>A predicate for a LINQ "Where" clause.</returns>
        /// <example>
        /// For example, when we know the id==1, 
        /// we curry "(room, id) => room.Id == id" into "(room) => room.Id == 1"
        /// within a Room repository's GetById method by writing
        /// GetByIdPredicate.ToSelector(1);
        /// </remarks>
        public static Expression<Func<T, bool>> ToSelector<T>(this Expression<Func<T, int, bool>>byIdPredicate, int id)
        {
            return Currier.Curry(byIdPredicate, 1, Expression.Constant(id)) as Expression<Func<T, bool>>;
        }

        private class CurryVisitor : ExpressionVisitor
        {
            private Dictionary<ParameterExpression, Expression> _parameters;

            public CurryVisitor(Dictionary<ParameterExpression, Expression> parameters)
            {
                _parameters = parameters;
            }

            protected override Expression VisitParameter(ParameterExpression p)
            {
                if (_parameters.ContainsKey(p))
                    return _parameters[p];

                return base.VisitParameter(p);
            }

            public Expression Clone(Expression exp)
            {
                return base.Visit(exp);
            }
        }
    }

}
