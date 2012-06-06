using System;

namespace CodeCamper.Data.SampleData
{
    public static class TagsGenerator
    {
        public static string TagSeparator = "|";

        public static Random Rand = new Random();

        /// <summary>
        /// Generate a session tag string for a given track in form of "foo|bar|baz"
        /// </summary>
        public static string GenTags(string track = null)
        {
            var tagDomain = SampleTrack.GetTags(track);
            var selected = RandomSelector.Deal(tagDomain, Rand.Next(1, 6));
            return string.Join(TagSeparator, selected);
        }
  
    }
}