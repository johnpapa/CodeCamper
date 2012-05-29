using System;
using System.Collections.Generic;
using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.SampleData
{
    public static class TheChosen
    {
        private static List<Person> _theChosen;
        private static Person 
            _johnPapa, _danWahlin, _wardBell, _hansFjallemark, 
            _jimCowart, _ryanNiemeyer, _scottGuthrie;

        /// <summary>Add the Chosen people</summary>
        public static void AddPersons(List<Person> persons)
        {
            _theChosen = new List<Person>();

            _theChosen.Add(_johnPapa = new Person
            {
                FirstName = "John",
                LastName = "Papa",
                Email = "johnp@contoso.com",
                Blog = "http://johnp.contoso.com",
                Twitter = "https://twitter.com/#!/john_papa",
                Gender = "M",
                Bio = "Husband and father enjoying every minute with my family. Microsoft Regional Director, Evangelist, speaker, and author for MSDN Magazine and Pluralsight.",
            });
            _theChosen.Add(_danWahlin =new Person
            {
                FirstName = "Dan",
                LastName = "Wahlin",
                Email = "danw@contoso.com",
                Blog = "http://danw.contoso.com",
                Twitter = "https://twitter.com/#!/danwahlin",
                Gender = "M",
                Bio = "Chief Architect at Wahlin Consulting. Provide consulting & training on jQuery, HTML5, ASP.NET, SharePoint. Husband & father, like to write and record music.",
            });
            _theChosen.Add(_wardBell = new Person
            {
                FirstName = "Ward",
                LastName = "Bell",
                Email = "wardb@contoso.com",
                Blog = "http://wardb.contoso.com",
                Twitter = "https://twitter.com/#!/wardbell",
                Gender = "M",
                Bio = "V.P. of Technology at IdeaBlade. Speaks often on client application development issues to anyone who will listen. Likes sociology, history, poetry, and ridiculous clothes.",
            });
            _theChosen.Add(_hansFjallemark = new Person
            {
                FirstName = "Hans",
                LastName = "Fjällemark",
                Email = "hansf@contoso.com",
                Blog = "http://hansf.contoso.com",
                Twitter = "https://twitter.com/#!/hfjallemark",
                Gender = "M",
                Bio = "Freelancing developer & designer based in Sweden. I spend most of my time implementing usable and attractive UX in HTML5 or Silverli.. no wait, just HTML5:) ",
            });
            _theChosen.Add(_jimCowart = new Person
            {
                FirstName = "Jim",
                LastName = "Cowart",
                Email = "jimc@contoso.com",
                Blog = "http://jimc.contoso.com",
                Twitter = "https://twitter.com/#!/ifandelse",
                Gender = "M",
                Bio = "Husband, father, architect, developer, tea drinker. Opinions are my own. Unless they're good",
            });
            _theChosen.Add(_ryanNiemeyer = new Person
            {
                FirstName = "Ryan",
                LastName = "Niemeyer",
                Email = "ryann@contoso.com",
                Blog = "http://ryann.contoso.com/",
                Twitter = "https://twitter.com/#!/rpniemeyer",
                Gender = "M",
                Bio = "Coder, tester, father, and husband. Never short on ideas. Love to learn and collaborate.",
            });
            _theChosen.Add(_scottGuthrie = new Person
            {
                FirstName = "Scott",
                LastName = "Guthrie",
                Email = "scottg@contoso.com",
                Blog = "http://scottg.contoso.com",
                Twitter = "https://twitter.com/#!/scottgu",
                Gender = "M",
                Bio = "I live in Seattle and build a few products for Microsoft",
            });

            _theChosen.ForEach(p => p.ImageSource = 
                (p.FirstName + "_" + p.LastName + ".jpg").ToLowerInvariant());

            _hansFjallemark.ImageSource = "hans_fjallemark.jpg"; // get rid of 'ä'

            persons.AddRange(_theChosen);
        }

        public static List<Session> AddSessions(
            IList<TimeSlot> timeSlots,
            IList<Track> tracks,
            string[] levels,
            IList<Room> roomsForSessions)
        {

            var sessions = new List<Session>();
            ChoosenAttendeeSessions = new List<Session>();

            // Adds session to Sessions and optionally to ChoosenAttendeeSessions
            Func<bool, Session, Session> addSession = 
                (choosen, s) =>
                    {
                        sessions.Add(s);
                        if (choosen)
                        {
                            ChoosenAttendeeSessions.Add(s);  
                        } 
                        return s;
                    };

            // Non-keynote timeslot ids (the 1st is the keynote)
            var slotIds = timeSlots.Skip(1).Select(ts => ts.Id).ToArray();

            var nextSlotIx = -1;
            // Deterministic way to get id of next speaker timeslot
            Func<int> getNextSpeakerTimeSlotId =
                () =>
                    {
                       if (++nextSlotIx == slotIds.Count()) nextSlotIx = 0;
                        return slotIds[nextSlotIx];
                    };

            // Scott Guthrie
            var roomId = roomsForSessions[0].Id;
            addSession(true, new Session
            {
                Title = "Keynote",
                Code = "KEY001",
                SpeakerId = _scottGuthrie.Id,
                TrackId = tracks.First(t => t.Name == ".NET").Id,
                TimeSlotId = timeSlots[0].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "Keynote",
                Description = "",
            });
            addSession(false, new Session
            {
                Title = "MVC 4 in Perspective",
                Code = "ASP162",
                SpeakerId = _scottGuthrie.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[1],
                Tags = "ASP|MVC",
                Description =
                    "MVC 4 enables a wider variety of web applications than ever before. The libraries that are easily managed through Nuget and are truly opens source. Learn about the new capabilities and how you can contribute to ASP.NET MVC's evolution.",
            });
            addSession(true, new Session
            {
                Title = "Azure: the agnostic cloud",
                Code = "CLD163",
                SpeakerId = _scottGuthrie.Id,
                TrackId = tracks.First(t => t.Name == "Cloud").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[1],
                Tags = "Cloud|Azure|Node",
                Description = "Windows Azure offers reliable, affordable cloud computing for almost any application of any scale, built with any technology. Scott demonstates with examples of both Windows and non-Windows applications.",
            });


                
            // John Papa
            roomId = roomsForSessions[1].Id;

            addSession(true, new Session
            {
                Title = "Building HTML/JavaScript Apps with Knockout and MVVM",
                Code = "JVS300",
                SpeakerId = _johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[2],
                Tags = "JavaScript|Knockout|MVVM|HTML5",
                Description =
                    "Do you write a lot of HTML and JavaScript code to push and pull data? In this session, learn popular techniques to use data binding to bind your data to your target controls in HTML writing less code, but gaining more power. See how to consume json data, use json objects in JavaScript, use declarative binding, using KnockoutJS. Also, see how to use the MVVM pattern to write data centric JavaScript code that follows good separation patterns and creates highly maintainable code.",
            });
            addSession(false, new Session
            {
                Title = "JsRender Fundamentals",
                Code = "JVS201",
                SpeakerId = _johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[1],
                Tags = "JavaScript|JsRender",
                Description =
                    "Learn how to build fast, robust, and maintainable Web applications with JavaScript, jQuery and JsRender: the successor to jQuery Templates.",
            });
            addSession(true, new Session
            {
                Title = "Introduction to Building Windows 8 Metro Applications",
                Code = "WIN102",
                SpeakerId = _johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "Windows 8").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[0],
                Tags = "Windows|Metro",
                Description =
                    "This session covers everything you need to know to get started building Metro apps.",
            });

            // Dan Wahlin
            roomId = roomsForSessions[2].Id;
            addSession(false, new Session
            {
                Title = "Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery",
                Code = "ASP310",
                SpeakerId = _danWahlin.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[2],
                Tags = "MVC|HTML5|Entity Framework|jQuery",
                Description = "This session provides an end-to-end look at building a Web application using several different technologies.",
            });
            addSession(false, new Session
            {
                Title = "jQuery Fundamentals",
                Code = "JVS111",
                SpeakerId = _danWahlin.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[0],
                Tags = "jQuery|JavaScript",
                Description =
                    "This session guides you through the features of the jQuery \"write less, do more\" library",
            });
            addSession(true, new Session
            {
                Title = "Structuring JavaScript Code",
                Code = "JVS212",
                SpeakerId = _danWahlin.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[1],
                Tags = "Web Forms|ASP",
                Description =
                    "This session walks through several key patterns that can be used to encapsulate and modularize JavaScript code. Throughout the course you’ll learn how closures and other techniques can be used to better organize your JavaScript code and make it easier to re-use and maintain in HTML5 applications.",
            });

            // Ward Bell
            roomId = roomsForSessions[3].Id;
            addSession(false, new Session
            {
                Title = "Dressing for Success",
                Code = "DSN320",
                SpeakerId = _wardBell.Id,
                TrackId = tracks.First(t => t.Name == "Design").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[2],
                Tags = "Design|Animation|Metro",
                Description = "You must have style to design with style. A proper wardrobe is an essential first step to application success. Learn to dress from this old pro.",
            });
            addSession(false, new Session
            {
                Title = "Entity Framework for Poets",
                Code = "DAT121",
                SpeakerId = _wardBell.Id,
                TrackId = tracks.First(t => t.Name == "Data").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[0],
                Tags = "Data|Entity Framework|ORM",
                Description =
                    "If you can pronounce 'O-R-M', you're on your way to a lucrative career in the fast-paced world of data processing. Discover how Entity Framework can make you a star, in the office and around town.",
            });
            addSession(true, new Session
            {
                Title = "A JavaScript Toolbox",
                Code = "JVS222",
                SpeakerId = _wardBell.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[1],
                Tags = "JavaScript",
                Description =
                    "You need a good set of tools to be a rock star JavaScript developer. What does Ward use to write, test and debug? Come to this session and find out.",
            });

            // Hans Fjällemark
            roomId = roomsForSessions[4].Id;
            addSession(false, new Session
            {
                Title = "Fjällemark Magic 1",
                Code = "ASP331",
                SpeakerId = _hansFjallemark.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[2],
                Tags = "MVC|HTML5|Entity Framework|jQuery",
                Description = "TBD",
            });
            addSession(false, new Session
            {
                Title = "Fjällemark Magic 2",
                Code = "JVS132",
                SpeakerId = _hansFjallemark.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[0],
                Tags = "jQuery|JavaScript",
                Description =
                    "TBD",
            });
            addSession(true, new Session
            {
                Title = "Fjällemark Magic 3",
                Code = "JVS233",
                SpeakerId = _hansFjallemark.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[1],
                Tags = "Web Forms|ASP",
                Description =
                    "TBD",
            });

            // Jim Cowart
            roomId = roomsForSessions[5].Id;
            addSession(false, new Session
            {
                Title = "Jim Cowart Underscores",
                Code = "JVS340",
                SpeakerId = _jimCowart.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[2],
                Tags = "JavaScript|Underscore|jQuery",
                Description = "TBD",
            });
            addSession(false, new Session
            {
                Title = "Straighten Your Backbone with Jim Cowart",
                Code = "JVS141",
                SpeakerId = _jimCowart.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[0],
                Tags = "Backbone|JavaScript",
                Description =
                    "TBD",
            });
            addSession(true, new Session
            {
                Title = "Going for the Knockout",
                Code = "JVS242",
                SpeakerId = _jimCowart.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[1],
                Tags = "Knockout|JavaScript",
                Description =
                    "TBD",
            });

            // Ryan Niemeyer
            roomId = roomsForSessions[6].Id;
            addSession(true, new Session
            {
                Title = "Knockback a few cold ones",
                Code = "JVS351",
                SpeakerId = _ryanNiemeyer.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[2],
                Tags = "JavaScript|Knockout|jQuery",
                Description = "TBD",
            });
            addSession(false, new Session
            {
                Title = "Knockout Performance Gotchas",
                Code = "JVS152",
                SpeakerId = _ryanNiemeyer.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[0],
                Tags = "Knockout|JavaScript",
                Description = "TBD",
            });
            addSession(false, new Session
            {
                Title = "The Expert jsFiddler",
                Code = "JVS253",
                SpeakerId = _ryanNiemeyer.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = roomId,
                Level = levels[1],
                Tags = "jsFiddle|JavaScript",
                Description = "TBD",
            });

            return sessions;
        }

        public static List<Session> ChoosenAttendeeSessions { get; private set; }

    }
}
