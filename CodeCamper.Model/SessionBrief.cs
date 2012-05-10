namespace CodeCamper.Model
{
    /// <summary>
    /// A cutdown version of <see cref="Session"/>
    /// with the minimal amount of Session information needed by a client
    /// </summary>
    /// <remarks>
    /// This is a DTO, not an entity backed by a database object
    /// although it derives from <see cref="Session"/>
    /// </remarks>
    public class SessionBrief
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Code { get; set; }
        public int SpeakerId { get; set; }
        public int TrackId { get; set; }
        public int TimeSlotId { get; set; }
        public int RoomId { get; set; }
        public string Level { get; set; }
        public string Tags { get; set; }
    }
}
