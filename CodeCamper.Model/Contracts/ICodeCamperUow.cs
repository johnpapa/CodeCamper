namespace CodeCamper.Model
{
    /// <summary>
    /// Interface for the Code Camper "Unit of Work"
    /// </summary>
    public interface ICodeCamperUow
    {
        // Save pending changes to the data store.
        void Commit();

        // Repositories
        IPersonsRepository Persons { get; }
        IRepository<Room> Rooms { get; }
        ISessionsRepository Sessions { get; }
        IRepository<TimeSlot> TimeSlots { get; }
        IRepository<Track> Tracks { get; }
        IAttendanceRepository Attendance { get; }

    }
}