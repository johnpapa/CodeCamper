using System.Data.Entity.ModelConfiguration;
using CodeCamper.Model;

namespace CodeCamper.Data
{
    public class AttendanceConfiguration : EntityTypeConfiguration<Attendance>
    {
        public AttendanceConfiguration()
        {
            HasKey(ps => new { ps.SessionId, ps.PersonId });

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
