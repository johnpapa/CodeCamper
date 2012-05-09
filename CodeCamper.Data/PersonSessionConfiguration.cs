using System.Data.Entity.ModelConfiguration;
using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    class PersonSessionConfiguration : EntityTypeConfiguration<PersonSession>
    {
        public PersonSessionConfiguration()
        {
            HasKey(ps => new { ps.SessionId, ps.PersonId });

            HasRequired(ps => ps.Session)
                .WithMany(s => s.AttendeeSessions)
                .HasForeignKey(ps => ps.SessionId)
                .WillCascadeOnDelete(false);

            HasRequired(ps => ps.Person)
                .WithMany(p => p.AttendingSessions)
                .HasForeignKey(ps => ps.PersonId)
                .WillCascadeOnDelete(false);
        }
    }
}
