using System.Data.Entity.ModelConfiguration;
using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    class AttendanceConfiguration : EntityTypeConfiguration<Attendance>
    {
        public AttendanceConfiguration()
        {
            HasKey(ps => new { ps.SessionId, ps.PersonId });

            Ignore(ps => ps.Id); // a convenience property, not mapped.

            HasRequired(ps => ps.Session)
                .WithMany(s => s.AttendanceList)
                .HasForeignKey(ps => ps.SessionId)
                .WillCascadeOnDelete(false);

            HasRequired(ps => ps.Person)
                .WithMany(p => p.AttendanceList)
                .HasForeignKey(ps => ps.PersonId)
                .WillCascadeOnDelete(false);
        }
    }
}
