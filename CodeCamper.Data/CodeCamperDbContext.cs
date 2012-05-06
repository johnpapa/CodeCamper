using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using CodeCamper.Model;
using CodeCamper.SampleData;

namespace CodeCamper.Data
{
    public class CodeCamperDbContext : DbContext 
    {
        // ToDo: Move Initializer out; don't want dependence on SampleData
        static CodeCamperDbContext()
        {
            Database.SetInitializer(new CodeCamperDatabaseInitializer());
        }

        public CodeCamperDbContext()
            : base(nameOrConnectionString: "CodeCamper") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Use singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            // ToDo: Move to config files
            modelBuilder.Entity<Session>()
                .HasRequired(s => s.Speaker)
                .WithMany(p => p.SpeakerSessions)
                .HasForeignKey(s => s.SpeakerId);

            modelBuilder.Entity<PersonSession>()
                .HasKey(ps => new { ps.SessionId, ps.PersonId});

            modelBuilder.Entity<PersonSession>()
                .HasRequired(ps => ps.Session)
                .WithMany(s => s.AttendeeSessions)
                .HasForeignKey(ps => ps.SessionId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<PersonSession>()
                .HasRequired(ps => ps.Person)
                .WithMany(p => p.AttendingSessions)
                .HasForeignKey(ps => ps.PersonId)
                .WillCascadeOnDelete(false);
        }

        public DbSet<Session> Sessions { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<PersonSession> PersonSessions { get; set; }

        // Reference Lists
        public DbSet<Room> Rooms { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<Track> Tracks { get; set; }
    }
}