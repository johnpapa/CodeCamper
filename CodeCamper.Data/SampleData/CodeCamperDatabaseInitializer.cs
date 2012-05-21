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

        private List<TimeSlot> AddTimeSlots(CodeCamperDbContext context)
        {

            var seed1 = new DateTime(2013, 5, 18, 8, 0, 0);
            var seed2 = new DateTime(2013, 5, 19, 8, 0, 0);
            var slots = 
                new List<TimeSlot>
                    {
                        // Sat March 31, 2012 - Registration
                        new TimeSlot {Start = seed1, Duration = 45, IsSessionSlot = false},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(60), Duration = 60},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        // Lunch
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(60), Duration = 60, IsSessionSlot = false},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        new TimeSlot {Start = seed1 = seed1.AddMinutes(70), Duration = 60},
                        // Close
                        new TimeSlot {Start = seed1.AddMinutes(70), Duration = 30, IsSessionSlot = false},

                        // Sun April 1, 2012 - Registration
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
            AddTheChoosenPeople(persons);
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
                Bio = bioTextGenerator.GenSentences(20, bioTextSource),
            });
        }

        /// <summary>Add the "well-known" speakers</summary>
        private void AddTheChoosenPeople( List<Person> persons)
        {
            persons.Add(_JohnPapa = new Person
            {
                FirstName = "John",
                LastName = "Papa",
                Email = "john@johnpapa.net",
                Blog = "http://johnpapa.net",
                Twitter = "https://twitter.com/#!/john_papa",
                Gender = "M",
                Bio = "Husband and father enjoying every minute with my family. Microsoft Regional Director, Evangelist, speaker, and author for MSDN Magazine and Pluralsight.",
            });
            persons.Add(_WardBell = new Person
            {
                FirstName = "Ward",
                LastName = "Bell",
                Email = "wardb@ideablade.com",
                Blog = "http://www.neverindoubtnet.blogspot.com",
                Twitter = "https://twitter.com/#!/wardbell",
                Gender = "M",
                Bio = "V.P. of Technology at IdeaBlade. Speaks often on client application development issues to anyone who will listen. Likes sociology, history, poetry, and ridiculous clothes.",
            });
            persons.Add(_DanWahlin = new Person
            {
                FirstName = "Dan",
                LastName = "Wahlin",
                Email = "dwahlin@xmlforasp.net",
                Blog = "http://www.TheWahlinGroup.com",
                Twitter = "https://twitter.com/#!/danwahlin",
                Gender = "M",
                Bio = "Chief Architect at Wahlin Consulting. Provide consulting & training on jQuery, HTML5, ASP.NET, SharePoint. Husband & father, like to write and record music.",
            });
            persons.Add(_HansFajallemark = new Person
            {
                FirstName = "Hans",
                LastName = "Fjällemark",
                Email = "hans@tellurian.se",
                Blog = "http://www.keepitslickstupid.com",
                Twitter = "https://twitter.com/#!/hfjallemark",
                Gender = "M",
                Bio = "Freelancing developer & designer based in Sweden. I spend most of my time implementing usable and attractive UX in HTML5 or Silverli.. no wait, just HTML5:) ",
            });
            persons.Add(_ScottGuthrie = new Person
            {
                FirstName = "Scott",
                LastName = "Guthrie",
                Email = "",
                Blog = "http://weblogs.asp.net/scottgu",
                Twitter = "https://twitter.com/#!/scottgu",
                Gender = "M",
                Bio = "I live in Seattle and build a few products for Microsoft",
            });
            persons.Add(_JimCowart = new Person
            {
                FirstName = "Jim",
                LastName = "Cowart",
                Email = "",
                Blog = "http://freshbrewedcode.com/jimcowart/",
                Twitter = "https://twitter.com/#!/ifandelse",
                Gender = "M",
                Bio = "Husband, father, architect, developer, tea drinker. Opinions are my own. Unless they're good",
            });
            persons.Add(_RyanNiemeyer = new Person
            {
                FirstName = "Ryan",
                LastName = "Niemeyer",
                Email = "",
                Blog = "http://www.knockmeout.net/",
                Twitter = "https://twitter.com/#!/rpniemeyer",
                Gender = "M",
                Bio = "Coder, tester, father, and husband. Never short on ideas. Love to learn and collaborate.",
            });
        }

        private Person 
            _JohnPapa, _WardBell, _DanWahlin, _HansFajallemark,
            _ScottGuthrie, _JimCowart, _RyanNiemeyer;

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

            AddWellKnownSessions(sessions, slots, tracks);
            AddGeneratedSessions(sessions, persons, slots, tracks);

            // Done populating sessions
            sessions.ForEach(s => context.Sessions.Add(s));
            context.SaveChanges();
            return sessions;
        }

        private readonly string[] _levels = new string[] {"Beginner", "Intermediate", "Advanced"};

        #region Well Known Sessions

        private void AddWellKnownSessions(List<Session> sessions, IList<TimeSlot> timeSlots, IList<Track> tracks)
        {
            // John Papa
            int roomId = _roomsForWellKnownSessions[0].Id;

            sessions.Add(new Session
                {
                    Title = "Building HTML and JavaScript Apps with KnockoutJS and MVVM",
                    Code = "JVS310",
                    SpeakerId = _JohnPapa.Id,
                    TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                    TimeSlotId = timeSlots[2].Id,
                    RoomId = roomId,
                    Level = _levels[2],
                    Tags = "JavaScript|Knockout|MVVM|HTML5",
                    Description =
                        "Do you write a lot of HTML and JavaScript code to push and pull data? In this session, learn popular techniques to use data binding to bind your data to your target controls in HTML writing less code, but gaining more power. See how to consume json data, use json objects in JavaScript, use declarative binding, using KnockoutJS. Also, see how to use the MVVM pattern to write data centric JavaScript code that follows good separation patterns and creates highly maintainable code.",
                });
            sessions.Add(new Session
                {
                    Title = "JsRender Fundamentals",
                    Code = "JVS211",
                    SpeakerId = _JohnPapa.Id,
                    TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                    TimeSlotId = timeSlots[4].Id,
                    RoomId = roomId,
                    Level = _levels[1],
                    Tags = "JavaScript|JsRender",
                    Description =
                        "Learn how to build fast, robust, and maintainable Web applications with JavaScript, jQuery and JsRender: the successor to jQuery Templates.",
                });
            sessions.Add(new Session
               {
                   Title = "Introduction to Building Windows 8 Metro Applications",
                   Code = "WIN112",
                   SpeakerId = _JohnPapa.Id,
                   TrackId = tracks.First(t => t.Name == "Windows 8").Id,
                   TimeSlotId = timeSlots[7].Id,
                   RoomId = roomId,
                   Level = _levels[0],
                   Tags = "Windows|Metro",
                   Description =
                       "This session covers everything you need to know to get started building Metro apps.",
               });

           // Dan Wahlin
           roomId = _roomsForWellKnownSessions[1].Id;
           sessions.Add(new Session
               {
                   Title = "Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery",
                   Code = "ASP315",
                   SpeakerId = _DanWahlin.Id,
                   TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                   TimeSlotId = timeSlots[5].Id,
                   RoomId = roomId,
                   Level = _levels[2],
                   Tags = "MVC|HTML5|Entity Framework|jQuery",
                   Description = "This session provides an end-to-end look at building a Web application using several different technologies.",
               });
            sessions.Add(new Session
               {
                   Title = "jQuery Fundamentals",
                   Code = "JVS116",
                   SpeakerId = _DanWahlin.Id,
                   TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                   TimeSlotId = timeSlots[7].Id,
                   RoomId = roomId,
                   Level = _levels[0],
                   Tags = "jQuery|JavaScript",
                   Description =
                       "This session guides you through the features of the jQuery \"write less, do more\" library",
               });
            sessions.Add(new Session
               {
                   Title = "Structuring JavaScript Code",
                   Code = "JVS217",
                   SpeakerId = _DanWahlin.Id,
                   TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                   TimeSlotId = timeSlots[11].Id,
                   RoomId = roomId,
                   Level = _levels[1],
                   Tags = "Web Forms|ASP",
                   Description =
                       "This session walks through several key patterns that can be used to encapsulate and modularize JavaScript code. Throughout the course you’ll learn how closures and other techniques can be used to better organize your JavaScript code and make it easier to re-use and maintain in HTML5 applications.",
               });

           // Ward Bell
           roomId = _roomsForWellKnownSessions[2].Id;
           sessions.Add(new Session
               {
                   Title = "Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery",
                   Code = "ASP315",
                   SpeakerId = _WardBell.Id,
                   TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                   TimeSlotId = timeSlots[5].Id,
                   RoomId = roomId,
                   Level = _levels[2],
                   Tags = "MVC|HTML5|Entity Framework|jQuery",
                   Description = "This session provides an end-to-end look at building a Web application using several different technologies.",
               });
            sessions.Add(new Session
               {
                   Title = "jQuery Fundamentals",
                   Code = "JVS116",
                   SpeakerId = _WardBell.Id,
                   TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                   TimeSlotId = timeSlots[7].Id,
                   RoomId = roomId,
                   Level = _levels[0],
                   Tags = "jQuery|JavaScript",
                   Description =
                       "This session guides you through the features of the jQuery \"write less, do more\" library",
               });
            sessions.Add(new Session
               {
                   Title = "Structuring JavaScript Code",
                   Code = "JVS217",
                   SpeakerId = _WardBell.Id,
                   TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                   TimeSlotId = timeSlots[11].Id,
                   RoomId = roomId,
                   Level = _levels[1],
                   Tags = "Web Forms|ASP",
                   Description =
                       "This session walks through several key patterns that can be used to encapsulate and modularize JavaScript code. Throughout the course you’ll learn how closures and other techniques can be used to better organize your JavaScript code and make it easier to re-use and maintain in HTML5 applications.",
               });

           // Jim Cowart
           roomId = _roomsForWellKnownSessions[3].Id;
           sessions.Add(new Session
               {
                   Title = "Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery",
                   Code = "ASP315",
                   SpeakerId = _JimCowart.Id,
                   TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                   TimeSlotId = timeSlots[5].Id,
                   RoomId = roomId,
                   Level = _levels[2],
                   Tags = "MVC|HTML5|Entity Framework|jQuery",
                   Description = "This session provides an end-to-end look at building a Web application using several different technologies.",
               });
            sessions.Add(new Session
               {
                   Title = "jQuery Fundamentals",
                   Code = "JVS116",
                   SpeakerId = _JimCowart.Id,
                   TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                   TimeSlotId = timeSlots[7].Id,
                   RoomId = roomId,
                   Level = _levels[0],
                   Tags = "jQuery|JavaScript",
                   Description =
                       "This session guides you through the features of the jQuery \"write less, do more\" library",
               });
            sessions.Add(new Session
               {
                   Title = "Structuring JavaScript Code",
                   Code = "JVS217",
                   SpeakerId = _JimCowart.Id,
                   TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                   TimeSlotId = timeSlots[11].Id,
                   RoomId = roomId,
                   Level = _levels[1],
                   Tags = "Web Forms|ASP",
                   Description =
                       "This session walks through several key patterns that can be used to encapsulate and modularize JavaScript code. Throughout the course you’ll learn how closures and other techniques can be used to better organize your JavaScript code and make it easier to re-use and maintain in HTML5 applications.",
               });

           // Ryan Niemeyer
           roomId = _roomsForWellKnownSessions[4].Id;
           sessions.Add(new Session
               {
                   Title = "Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery",
                   Code = "ASP315",
                   SpeakerId = _RyanNiemeyer.Id,
                   TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                   TimeSlotId = timeSlots[5].Id,
                   RoomId = roomId,
                   Level = _levels[2],
                   Tags = "MVC|HTML5|Entity Framework|jQuery",
                   Description = "This session provides an end-to-end look at building a Web application using several different technologies.",
               });
            sessions.Add(new Session
               {
                   Title = "jQuery Fundamentals",
                   Code = "JVS116",
                   SpeakerId = _RyanNiemeyer.Id,
                   TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                   TimeSlotId = timeSlots[7].Id,
                   RoomId = roomId,
                   Level = _levels[0],
                   Tags = "jQuery|JavaScript",
                   Description =
                       "This session guides you through the features of the jQuery \"write less, do more\" library",
               });
            sessions.Add(new Session
               {
                   Title = "Structuring JavaScript Code",
                   Code = "JVS217",
                   SpeakerId = _RyanNiemeyer.Id,
                   TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                   TimeSlotId = timeSlots[11].Id,
                   RoomId = roomId,
                   Level = _levels[1],
                   Tags = "Web Forms|ASP",
                   Description =
                       "This session walks through several key patterns that can be used to encapsulate and modularize JavaScript code. Throughout the course you’ll learn how closures and other techniques can be used to better organize your JavaScript code and make it easier to re-use and maintain in HTML5 applications.",
               });

            // Scott Guthrie
            roomId = _roomsForWellKnownSessions[5].Id;
            sessions.Add(new Session
               {
                   Title = "Keynote",
                   Code = "KEY001",
                   SpeakerId = _ScottGuthrie.Id,
                   TrackId = tracks.First(t => t.Name == ".NET").Id,
                   TimeSlotId = timeSlots[0].Id,
                   RoomId = roomId,
                   Level = _levels[1],
                   Tags = "Keynote",
                   Description = "",
               });
        }
        #endregion

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

            var slots = timeSlots.Where(t => t.IsSessionSlot).ToArray();
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