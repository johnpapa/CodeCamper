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
            var sessions = AddSessions(context, persons, rooms, timeSlots, tracks);
            AddAttendance(context, sessions, persons.Take(2).ToArray());
        }

        private List<Room> _roomsForGeneratedSessions;
        private List<Room> _roomsForWellKnownSessions;

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

            var seed1 = new DateTime(2013, 5, 18, 8, 0, 0);
            var seed2 = new DateTime(2013, 5, 19, 8, 0, 0);
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
            var sessions = new List<Session>();
            var slots = timeSlots.Where(t => t.IsSessionSlot).ToArray();

            TheChosen.AddSessions(
                sessions, slots, tracks, _levels, _roomsForWellKnownSessions);

            AddGeneratedSessions(sessions, persons, slots , tracks);

            // Done populating sessions
            sessions.ForEach(s => context.Sessions.Add(s));
            context.SaveChanges();
            return sessions;
        }

        private readonly string[] _levels = new string[] {"Beginner", "Intermediate", "Advanced"};

        private void AddGeneratedSessions(List<Session> sessions, IList<Person> persons,  IEnumerable<TimeSlot> timeSlots, IList<Track> tracks)
        {
            var rand = new Random();

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
                var speakerIx = rand.Next(firstKnownSpeakerIx, firstCrowdIx+5);
                if (speakerIx >= firstCrowdIx || speakerIxs.Contains(speakerIx))
                {
                    do
                    {
                        speakerIx = rand.Next(firstCrowdIx, personsCount);
                    } while (speakerIxs.Contains(speakerIx));
                }
                speakerIxs.Add(speakerIx);

                var speaker = persons[speakerIx];
                var level = levels[rand.Next(0, levelCount)];
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
            var rand = new Random();
            var textGenerator = new SampleTextGenerator();
            var textSource = SampleTextGenerator.SourceNames.Faust;

            // Indexes for the 3rd through nth sessions (sessions #1 and #2 are forced in manually).
            var sessionIxs = Enumerable.Range(2, sessions.Count - 1).ToArray();
            var AttendanceList = new List<Attendance>();

            foreach(var person in attendees)
            {
                // indexes of attended sessions
                var ixs = new List<int>(new []{0,1}); // Sessions #1 and #2 are always attended

                // Add between 8 and 13 "random" session indexes
                ixs.AddRange(sessionIxs.OrderBy(_ => Guid.NewGuid()).Take(rand.Next(8, 13)));

                var evalCount = 4; // person evals the first 'n' sessions attended
                foreach (var i in ixs)
                {
                    var attendance =
                        new Attendance
                            {
                                PersonId = person.Id,
                                SessionId = sessions[i].Id,
                            };
                    AttendanceList.Add(attendance);

                    if (evalCount <= 0) continue;

                    attendance.Rating = rand.Next(1, 6);
                    attendance.Text = textGenerator.GenSentences(10, textSource);
                    evalCount--;
                }
            }

            // Done populating Attendance
            AttendanceList.ForEach(ps => context.Attendance.Add(ps));
            context.SaveChanges();
        }
    
    }
}