using System.Data.Entity.ModelConfiguration;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class SessionConfiguration : EntityTypeConfiguration<Session>
    {
        public SessionConfiguration()
        {
            // Session has 1 Speaker, Speaker has many Session records
            HasRequired(s => s.Speaker)
               .WithMany(p => p.SpeakerSessions)
               .HasForeignKey(s => s.SpeakerId);
        }
    }
}
