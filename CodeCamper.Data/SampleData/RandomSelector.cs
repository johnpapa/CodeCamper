using System;
using System.Collections.Generic;

namespace CodeCamper.Data.SampleData
{
    public static class RandomSelector
    {
        public static Random Rand = new Random();

        public static List<T> Deal<T>(IList<T> items, int needed)
        {
            var selected = new List<T>();

            var available = items.Count;

            while (selected.Count < needed)
            {
                if (Rand.NextDouble() < (double) needed / available)
                {
                    selected.Add(items[available - 1]);
                    needed--;
                }
                available--;
            }
            return selected;
        }
    }
}