using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using CodeCamper.Data;
using CodeCamper.Model;

namespace CodeCamper.SampleData
{
    public class CodeCamperDatabaseInitializer :
        //CreateDatabaseIfNotExists<CodeCamperDbContext>          // when model is stable
        DropCreateDatabaseIfModelChanges<CodeCamperDbContext> // when iterating
    {
        protected override void Seed(CodeCamperDbContext context)
        {
            // Seed code here
            var rooms = AddRooms(context);
            var tracks = AddTracks(context);

            // Keep well-known sessions in separate room from generated sessions
            _roomsForGeneratedSessions = rooms.Take(tracks.Count).ToList();
            _roomsForWellKnownSessions = rooms.Skip(tracks.Count).ToList();

            var timeSlots = AddTimeSlots(context);
            var persons = AddPersons(context, 100);
            var knownSessions = AddSessions(context, persons, rooms, timeSlots, tracks);
            _keynoteSession = knownSessions.First();
            AddAttendance(context, knownSessions, persons.Take(2).ToArray());
        }

        protected Random Rand = new Random();

        private List<Room> _roomsForGeneratedSessions;
        private List<Room> _roomsForWellKnownSessions;
        private Session _keynoteSession;

        private List<Room> AddRooms(CodeCamperDbContext context)
        {
            var names = new[] { 
                "Surf A", "Surf B", "Mendocino A", "Mendocino B", "Mendocino C",
                "Chico", "Levenworth", "Pelham Bay", "San Quentin", "Alcatraz", "Folsom", 
                "Aqueduct", "Saratoga", "Golden Gate", "Santa Anita", "Monmouth Park", "Caliente"
            };
            var rooms = new List<Room>();
            Array.ForEach(names, name =>
                {
                    var item = new Room {Name = name};
                    rooms.Add(item);
                    context.Rooms.Add(item);
                });
            context.SaveChanges();
            return rooms;
        }

        private TimeSlot _keyNoteTimeSlot;
        private List<TimeSlot> AddTimeSlots(CodeCamperDbContext context)
        {

            var seed1 = new DateTime(2013, 5, 18, 8, 0, 0).ToUniversalTime();
            var seed2 = new DateTime(2013, 5, 19, 8, 0, 0).ToUniversalTime();
            var slots = 
                new List<TimeSlot>
                    {
                        // Sat May 18, 2013 - Registration
                        new TimeSlot {Start = seed1, Duration = 45, IsSessionSlot = false},
                        (_keyNoteTimeSlot = new TimeSlot {Start = seed1 = seed1.AddMinutes(60), Duration = 60}),
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        // Lunch
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(60), Duration = 60, IsSessionSlot = false},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        // Close
                        new TimeSlot {Start = seed1.AddMinutes(70), Duration = 30, IsSessionSlot = false},

                        // Sun May 19, 2013 - Registration
                        new TimeSlot {Start = seed2, Duration = 45, IsSessionSlot = false},
                        new TimeSlot {Start = seed2 = seed2.AddMinutes(60), Duration = 60},
                        new TimeSlot {Start = seed2 = seed2.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed2 = seed2.AddMinutes(70), Duration = 60},
                        // Lunch
                        new TimeSlot {Start = seed2 = seed2.AddMinutes(70), Duration = 60, IsSessionSlot = false},
                        new TimeSlot {Start = seed2 = seed2.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed2 = seed2.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed2.AddMinutes(70), Duration = 60},
                    };

            slots.ForEach( slot => context.TimeSlots.Add(slot));
                context.SaveChanges();
                return slots;
        }

        private List<Track> AddTracks(CodeCamperDbContext context)
        {
            var names= SampleTrack.Names;
            var tracks = new List<Track>();
            names.ForEach(name =>
            {
                var item = new Track { Name = name };
                tracks.Add(item);
                context.Tracks.Add(item);
            });
            context.SaveChanges();
            return tracks;
        }

        private List<Person> AddPersons(CodeCamperDbContext context, int count)
        {
            var persons = new List<Person>();
            AddKnownAttendees( persons);
            TheChosen.AddPersons(persons);
            AddTheCrowd(count, persons);
            persons.ForEach(p => context.Persons.Add(p));
            context.SaveChanges();
            return persons;
        }

        /// <summary>Add the "well-known" attendees (who will not be speakers)</summary>
        private void AddKnownAttendees(List<Person> persons)
        {
            var bioTextGenerator = new SampleTextGenerator();
            const SampleTextGenerator.SourceNames bioTextSource =
                SampleTextGenerator.SourceNames.ChildHarold;

            persons.Add(new Person
            {
                FirstName = "Felix",
                LastName = "Fanboi",
                Email = "felix@fanboiz.com",
                Blog = "http://loveeverythingapple.com",
                Twitter = "@FelixDaBoy",
                Gender = "M",
                ImageSource = "felix_fanboi.jpg",
                Bio = bioTextGenerator.GenSentences(12, bioTextSource),
            });
            persons.Add(new Person
            {
                FirstName = "Sue",
                LastName = "Menot",
                Email = "Suem@litiginy.com",
                Blog = "http://tortsblog.com/",
                Twitter = "@Menotany",
                Gender = "F",
                ImageSource = "sue_menot.jpg",
                Bio = bioTextGenerator.GenSentences(20, bioTextSource),
            });
        }

        /// <summary>Add everyone else, some of whom may be speakers.</summary>
        private void AddTheCrowd(int count, List<Person> persons)
        {
            var enumerator = PeopleNames.RandomNameEnumerator();
            const string netNameFmt = "{0}.{1}{2}";
            var netNameCounter = 1;
            var bioTextGenerator = new SampleTextGenerator();
            const SampleTextGenerator.SourceNames bioTextSource = 
                SampleTextGenerator.SourceNames.TheRaven;

            while (count-- > 0)
            {
                enumerator.MoveNext();
                var name = enumerator.Current;

                var netName = string.Format(netNameFmt, name.First, name.Last, netNameCounter++);
                var item = 
                    new Person
                        {
                            FirstName = name.First,
                            LastName = name.Last,
                            Email = netName+"@smartie.com",
                            Blog = "http://"+netName+"/blogdog.com",
                            Twitter = "@"+netName,
                            Gender = name.Gender,
                            Bio = bioTextGenerator.GenSentences(8, bioTextSource),
                        };

                persons.Add(item);
            }
        }

        private List<Session> AddSessions(CodeCamperDbContext context, IList<Person> persons, IList<Room> rooms, IEnumerable<TimeSlot> timeSlots, IList<Track> tracks)
        {
            var slots = timeSlots.Where(t => t.IsSessionSlot).ToArray();

            var knownSessions = TheChosen.AddSessions(
                slots, tracks, _levels, _roomsForWellKnownSessions);

            var sessions = new List<Session>(knownSessions);

            AddGeneratedSessions(sessions, persons, slots , tracks);

            // Done populating sessions
            sessions.ForEach(s => context.Sessions.Add(s));
            context.SaveChanges();

            return knownSessions;
            // return sessions;
        }

        private readonly string[] _levels = new string[] {"Beginner", "Intermediate", "Advanced"};

        private void AddGeneratedSessions(List<Session> sessions, IList<Person> persons,  IEnumerable<TimeSlot> timeSlots, IList<Track> tracks)
        {
            var textGenerator = new SampleTextGenerator();
            const SampleTextGenerator.SourceNames descTextSource =
                SampleTextGenerator.SourceNames.Decameron;

            // levels setup so "intermediate" sessions occur more frequently
            var levels = new[] { _levels[0], _levels[1], _levels[1], _levels[1], _levels[2] };
            var levelCount = levels.Length;

            var trackCount = tracks.Count;
            var trackIx = 0;

            var slots = timeSlots.Where(t => t != _keyNoteTimeSlot).ToArray();
            var slotsCount = slots.Length;
 
            var personsCount = persons.Count;
            var firstKnownSpeakerIx = 2; // skip the "reserved" attendees who we know are not speakers.
            var firstCrowdIx = 4; // first person in the crowd who could be a speaker

            var speakerIxs = new List<int>(); // speakers assigned in the current timeslot


            // Populate sessions 
            var slotIx = 0; // current slot
            while (slotIx < slotsCount)
            {
                var slot = slots[slotIx];

                // Assign sessions by track, looping through tracks
                var track = tracks[trackIx];
                var room = _roomsForGeneratedSessions[trackIx]; // track sessions are in the same room

                // Weight the draw of speakers towards the "well-known" speakers
                // Ensure a person only speaks once in a timeslot
                var speakerIx = Rand.Next(firstKnownSpeakerIx, firstCrowdIx+5);
                if (speakerIx >= firstCrowdIx || speakerIxs.Contains(speakerIx))
                {
                    do
                    {
                        speakerIx = Rand.Next(firstCrowdIx, personsCount);
                    } while (speakerIxs.Contains(speakerIx));
                }
                speakerIxs.Add(speakerIx);

                var speaker = persons[speakerIx];
                var level = levels[Rand.Next(0, levelCount)];
                var session =
                    new Session
                    {
                        Title = textGenerator.GenWords(2)+" "+track.Name+" "+textGenerator.GenWords(5),
                        Code = GenSessionCode(track.Name, level),
                        SpeakerId = speaker.Id, 
                        TrackId = track.Id,
                        TimeSlotId = slot.Id,
                        RoomId = room.Id,
                        Level = level,
                        Tags = TagsGenerator.GenTags(track.Name),
                        Description = textGenerator.GenSentences(40, descTextSource),
                    };

                sessions.Add(session);

                if (++trackIx != trackCount) continue;

                // Ran around the tracks; bump to next TimeSlot and reset
                slotIx++;
                trackIx = 0;
                speakerIxs.Clear();
            }
        }

        private string GenSessionCode(string trackName, string level)
        {
            var codeNumber = (100 * Array.IndexOf(_levels, level)) + _sessionCodeNumberSeed++;
            return SampleTrack.GetCodeRoot(trackName) + codeNumber;
        }
        private int _sessionCodeNumberSeed = 142;

        private void AddAttendance(CodeCamperDbContext context, List<Session> sessions, IEnumerable<Person> attendees)
        {
            var attendanceList = new List<Attendance>();

            var textGenerator = new SampleTextGenerator();
            var textSource = SampleTextGenerator.SourceNames.Faust;

            // NEEDED FOR RANDOMIZING WHICH WE NO LONGER DO
            // Unique TimeSlot.Ids and Ids of Sessions in those slots
            //var slotAndSessionIds = GetSlotAndSessionIds(sessions);
            //var numberOfAttendedSessions = Math.Min(slotAndSessionIds.Count(), 8);

            var sids = TheChosen.ChoosenAttendeeSessions
                .Select(s => s.Id).ToList();

            foreach(var person in attendees)
            {
                // NO LONGER RANDOMIZING ASSIGNMENTS
                //var sids = GetRandomAttendeeSessionIds(
                //    numberOfAttendedSessions,
                //    slotAndSessionIds);

                var evalCount = 4; // person evals the first 'n' sessions attended
                foreach (var sid in sids)
                {
                    var attendance =
                        new Attendance
                            {
                                PersonId = person.Id,
                                SessionId = sid,
                            };
                    attendanceList.Add(attendance);

                    if (evalCount <= 0) continue;

                    attendance.Rating = Rand.Next(1, 6);// rating in 1..5
                    attendance.Text = textGenerator.GenSentences(10, textSource);
                    evalCount--;
                }
            }

            // Done populating Attendance
            attendanceList.ForEach(ps => context.Attendance.Add(ps));
            context.SaveChanges();
        }

        // NO LONGER ASSIGNING SESSION ATTENDANCE RANDOMLY
        #region For Random Session Attendance Assignment

        // Dictionary of non-keynote Session Ids, keyed by TimeSlot id
        private Dictionary<int, List<int>> GetSlotAndSessionIds(IEnumerable<Session> sessions)
        {
            // Unique TimeSlot.Ids and Ids of Sessions in those slots
            var slotsAndSessionIds = new Dictionary<int, List<int>>();
            sessions
                .Where(s => s.Id != _keynoteSession.Id)
                .GroupBy(s => s.TimeSlot).ToList()
                .ForEach(g =>
                            slotsAndSessionIds.Add(
                                g.Key.Id, g.Select(s => s.Id).ToList()));

            return slotsAndSessionIds;
        }

        // Get "attendedSlots" number of randomly selected sessions
        // where each session is in a different TimeSlot
        private List<int> GetRandomAttendeeSessionIds(
            int attendedSlots, Dictionary<int, List<int>> slotAndSessionIds)
        {
            // Random list of TimeSlot Ids
            var tsids = slotAndSessionIds.Keys
                        .OrderBy(_ => Guid.NewGuid())
                        .Take(attendedSlots).ToList();

            // The list of sessions in those TimeSlots
            var sids = new List<int>();

            // Populate with randomly selected session from each TimeSlot
            tsids.ForEach(tsid =>
            {
                var c = slotAndSessionIds[tsid];
                sids.Add(c[Rand.Next(0, c.Count)]);
            });

            // everyone attends the keynote.
            sids.Insert(0,_keynoteSession.Id);

            return sids;
        }

        #endregion
    }
}