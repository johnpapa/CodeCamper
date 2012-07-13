using System;
using System.Collections.Generic;
using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.Data.SampleData
{
    public static class TheChosen
    {
        public static List<Person> _theChosen;
        private static Person 
            _johnPapa, _danWahlin, _wardBell, _hansFjallemark, 
            _jimCowart, _ryanNiemeyer, _scottGuthrie, _steveSanderson, 
            _aaronSkonnard, _fritzOnion, _scottHunter, _howardDierking, 
            _madsKristensen, _elijahManor, _johnSmith, _estebanGarcia,
            _shawnWildermuth, _peteBrown, _timHeuer, _julieLerman,
            _scottHanselman, _glennBlock, _jesseLiberty, _ericBarnard,
            _daveWard;

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
                Twitter = "@john_papa",
                Gender = "M",
                Bio = "Husband, father, and Catholic enjoying every minute with my family. Microsoft Regional Director, Evangelist, speaker, and author, and Pluralsight trainer.",
            });
            _theChosen.Add(_danWahlin =new Person
            {
                FirstName = "Dan",
                LastName = "Wahlin",
                Email = "danw@contoso.com",
                Blog = "http://danw.contoso.com",
                Twitter = "@danwahlin",
                Gender = "M",
                Bio = "Chief Architect at Wahlin Consulting. Provide consulting & training on jQuery, HTML5, ASP.NET, SharePoint. Husband & father, like to write and record music.",
            });
            _theChosen.Add(_wardBell = new Person
            {
                FirstName = "Ward",
                LastName = "Bell",
                Email = "wardb@contoso.com",
                Blog = "http://wardb.contoso.com",
                Twitter = "@wardbell",
                Gender = "M",
                Bio = "V.P. of Technology at IdeaBlade. Speaks often on client application development issues to anyone who will listen. Likes sociology, history, poetry, and ridiculous clothes.",
            });
            _theChosen.Add(_hansFjallemark = new Person
            {
                FirstName = "Hans",
                LastName = "Fjällemark",
                Email = "hansf@contoso.com",
                Blog = "http://hansf.contoso.com",
                Twitter = "@hfjallemark",
                Gender = "M",
                Bio = "Freelancing developer & designer based in Sweden. I spend most of my time implementing usable and attractive UX in HTML5 or Silverli.. no wait, just HTML5:) ",
            });
            _theChosen.Add(_jimCowart = new Person
            {
                FirstName = "Jim",
                LastName = "Cowart",
                Email = "jimc@contoso.com",
                Blog = "http://jimc.contoso.com",
                Twitter = "@ifandelse",
                Gender = "M",
                Bio = "Husband, father, architect, developer, tea drinker. Opinions are my own. Unless they're good",
            });
            _theChosen.Add(_ryanNiemeyer = new Person
            {
                FirstName = "Ryan",
                LastName = "Niemeyer",
                Email = "ryann@contoso.com",
                Blog = "http://ryann.contoso.com/",
                Twitter = "@rpniemeyer",
                Gender = "M",
                Bio = "Coder, tester, father, and husband. Never short on ideas. Love to learn and collaborate.",
            });
            _theChosen.Add(_scottGuthrie = new Person
            {
                FirstName = "Scott",
                LastName = "Guthrie",
                Email = "scottg@contoso.com",
                Blog = "http://scottg.contoso.com",
                Twitter = "@scottgu",
                Gender = "M",
                Bio = "I live in Seattle and build a few products for Microsoft",
            });
            _theChosen.Add(_steveSanderson = new Person
            {
                FirstName = "Steve",
                LastName = "Sanderson",
                Email = "steves@contoso.com",
                Blog = "http://steves.contoso.com",
                Twitter = "@stevensanderson",
                Gender = "M",
                Bio = "Also known as Steven Sanderson",
            });
            _theChosen.Add(_aaronSkonnard = new Person
            {
                FirstName = "Aaron",
                LastName = "Skonnard",
                Email = "aarons@contoso.com",
                Blog = "http://aarons.contoso.com",
                Twitter = "@skonnard",
                Gender = "M",
                Bio = "Changing the way software professionals learn. President/CEO of Pluralsight.",
            });
            _theChosen.Add(_fritzOnion = new Person
            {
                FirstName = "Fritz",
                LastName = "Onion",
                Email = "fritzo@contoso.com",
                Blog = "http://fritzo.contoso.com",
                Twitter = "",
                Gender = "M",
                Bio = "A co-founder of Pluralsight where he serves as the Editor in Chief.",
            });
            _theChosen.Add(_johnSmith = new Person
            {
                FirstName = "John",
                LastName = "Smith",
                Email = "johns@contoso.com",
                Blog = "http://johns.contoso.com",
                Twitter = "@onefloridacoder",
                Gender = "M",
                Bio = "Christian .NET Dev & Orlando .NET User Group VP; 4,5,6-string bass player.",
            });
            _theChosen.Add(_scottHunter = new Person
            {
                FirstName = "Scott",
                LastName = "Hunter",
                Email = "scotth@contoso.com",
                Blog = "http://scotth.contoso.com",
                Twitter = "@coolcsh",
                Gender = "M",
                Bio = "Program Manager at Microsoft on web technologies such as Azure, ASP.NET, MVC, Web API, Entity Framework, NuGet and more...",
            });
            _theChosen.Add(_madsKristensen = new Person
            {
                FirstName = "Mads",
                LastName = "Kristensen",
                Email = "madsk@contoso.com",
                Blog = "http://madsk.contoso.com",
                Twitter = "@mkristensen",
                Gender = "M",
                Bio = "Program Manager for Microsoft Web Platform & Tools and founder of BlogEngine.NET",
            });
            _theChosen.Add(_howardDierking = new Person
            {
                FirstName = "Howard",
                LastName = "Dierking",
                Email = "howardd@contoso.com",
                Blog = "http://howardd.contoso.com",
                Twitter = "@howard_dierking",
                Gender = "M",
                Bio = "I like technology...a lot...",
            });
            _theChosen.Add(_elijahManor = new Person
            {
                FirstName = "Elijah",
                LastName = "Manor",
                Email = "elijahm@contoso.com",
                Blog = "http://elijiahm.contoso.com",
                Twitter = "@elijahmanor",
                Gender = "M",
                Bio = "I am a Christian and a family man. I develops at appendTo as a Senior Architect providing corporate jQuery support, training, and consulting.",
            });
            _theChosen.Add(_estebanGarcia = new Person
            {
                FirstName = "Esteban",
                LastName = "Garcia",
                Email = "estebang@contoso.com",
                Blog = "http://estebang.contoso.com",
                Twitter = "@EstebanFGarcia",
                Gender = "M",
                Bio = "TFS | Visual Studio ALM Ranger | Scrum | .NET Development | Solutions Architect at @AgileThought | @ONETUG President | UCF Knight",
            });
            _theChosen.Add(_shawnWildermuth = new Person
            {
                FirstName = "Shawn",
                LastName = "Wildermuth",
                Email = "shawnw@contoso.com",
                Blog = "http://shawnw.contoso.com",
                Twitter = "@ShawnWildermuth",
                Gender = "M",
                Bio = "Author, trainer, software guy, Braves fan, guitar player, Xbox maven, coffee addict and astronomy fan.",
            });
            _theChosen.Add(_peteBrown = new Person
            {
                FirstName = "Pete",
                LastName = "Brown",
                Email = "peteb@contoso.com",
                Blog = "http://peteb.contoso.com",
                Twitter = "@Pete_Brown",
                Gender = "M",
                Bio = "Microsoft XAML and blinky lights guy. Father of two, author, woodworker, C64.",
            });
            _theChosen.Add(_timHeuer = new Person
            {
                FirstName = "Tim",
                LastName = "Heuer",
                Email = "timh@contoso.com",
                Blog = "http://timh.contoso.com",
                Twitter = "@timheuer",
                Gender = "M",
                Bio = "I work on XAML client platforms at Microsoft and trying to be the best dad/husband I can be when I'm not working.",
            });
            _theChosen.Add(_julieLerman = new Person
            {
                FirstName = "Julie",
                LastName = "Lerman",
                Email = "juliel@contoso.com",
                Blog = "http://juliel.contoso.com",
                Twitter = "@julielerman",
                Gender = "F",
                Bio = "Vermont Geekette, .NET (and Entity Framework) Mentor/Consultant, Author, MS MVP, INETA Speaker, Vermont.NET User Group Leader",
            });
            _theChosen.Add(_glennBlock = new Person
            {
                FirstName = "Glenn",
                LastName = "Block",
                Email = "glennb@contoso.com",
                Blog = "http://glennb.contoso.com",
                Twitter = "@gblock",
                Gender = "M",
                Bio = "Father, Husband, Spiritualist, Software geek, Change agent, REST Head",
            });
            _theChosen.Add(_scottHanselman = new Person
            {
                FirstName = "Scott",
                LastName = "Hanselman",
                Email = "shanselman@contoso.com",
                Blog = "http://shanselman.contoso.com",
                Twitter = "@shanselman",
                Gender = "M",
                Bio = "Tech, Diabetes, Parenting, Race, Linguistics, Fashion, Podcasting, Open Source, Culture, Code, Ratchet, Phony.",
            });
            _theChosen.Add(_jesseLiberty = new Person
            {
                FirstName = "Jesse",
                LastName = "Liberty",
                Email = "jliberty@contoso.com",
                Blog = "http://jliberty.contoso.com",
                Twitter = "@JesseLiberty",
                Gender = "M",
                Bio = "Telerik XAML Evangelist",
            });
            _theChosen.Add(_ericBarnard = new Person
            {
                FirstName = "Eric",
                LastName = "Barnard",
                Email = "ebarnard@contoso.com",
                Blog = "http://ebarnard.contoso.com",
                Twitter = "@EricBarnard",
                Gender = "M",
                Bio = "Technologist and Entrepreneur trying to find my where my path and the world's needs cross",
            });
            _theChosen.Add(_daveWard = new Person
            {
                FirstName = "Dave",
                LastName = "Ward",
                Email = "dward@contoso.com",
                Blog = "http://dward.contoso.com",
                Twitter = "@encosia",
                Gender = "M",
                Bio = "Microsoft Regional Director",
            });
            

            _theChosen.ForEach(p => p.ImageSource = 
                (p.FirstName + "_" + p.LastName + ".jpg").ToLowerInvariant());

            _hansFjallemark.ImageSource = "hans_fjallemark.jpg"; // get rid of 'ä'

            persons.AddRange(_theChosen);
        }

        /**
         * Hard-coded sessions for TheChoosen people
         * 
         * Speaker:
         *   Each "Chosen" one gets own variable (e.g., _scottGuthrie)
         *   as assigned in AddPersons method above.
         *   Organize your added sessions by person.
         *   
         * Rooms:
         *   Each person gets his/her own room (easier to prevent conflicts)
         *   taken from 'roomsForSessions' which are rooms NOT assigned during 
         *   session autogeneration; that constraint is obtained by limiting
         *   auto-generation session room assignment to the "Track Set" of rooms,
         *   the first 'n' rooms where 'n'==number of tracks.
         *   The remaining rooms are available for TheChoosen;
         *   (see the 'roomsForSessions' param).
         *   The getRoomId(person) func assigns the next chosen one's room.
         *   
         *   Make sure that the total number of rooms is adequate 
         *   (see CodeCamperDatabaseInitializer.cs)
         *   
         * TimeSlots:
         *   Only 'session' TimeSlots can be assigned (see the 'timeSlots' param).
         *   The first such TimeSlot is the keynote timeslot 
         *   which is assigned to Gu's keynote session.
         *   Subsequent addeded sessions are assigned round-robin, in order,
         *   to the non-keynote, session TimeSlots.
         *   (see getNextSpeakerTimeSlotId()).
         * 
         * Track: Hard coded for each session
         * 
         * Code:
         *   Each added session gets a 6 char "Code". 
         *   The naming convention is
         *       (1-3) are the three char SampleTrack.CodeRoot) +
         *       (4) the level (a number {1..3}) + 
         *       (5-6) two arbitrary digits.
         *       
         * The remaining session values are up to you.
         * 
         * ChoosenAttendeeSessions:
         *    These are the sessions which are the favorite of the
         *    well-known current user.
         *    
         *    You determine which sessions the current user has
         *    "favorited" (decided to attend) by setting the first
         *    parameter of the addSession method to 'true';
         *    the default is 'false', meaning that session is not
         *    the current user's "favorite."
         *    
         *    For example, Scott Gu's keynote has been favorited.
         *    
         *   EnsureTimeSlotIdIsFree guards against conflicting attendee timeslots
         *    
         *    Logic in CodeCamperDatabaseInitializer.AddAttendance
         *    arbitrarily assigns ratings and evals to the first
         *    'n' (n==4?) ChoosenAttendeeSessions.
         */
        public static List<Session> AddSessions(
            IList<TimeSlot> timeSlots,
            IList<Track> tracks,
            string[] levels,
            IList<Room> roomsForSessions)
        {

            var sessions = new List<Session>();
            ChoosenAttendeeSessions = new List<Session>();

            var choosenAttendeeTimeSlotIds = new List<int>();

            // **Non-keynote** timeslot ids (the 1st is the keynote)
            var availableTimeSlotIds = timeSlots.Skip(1).Select(ts => ts.Id).ToArray();

            var nextSlotIx = -1;
            // Deterministic way to get id of next speaker timeslot
            Func<int> getNextSpeakerTimeSlotId =
                () =>
                    {
                       if (++nextSlotIx == availableTimeSlotIds.Count()) nextSlotIx = 0;
                        return availableTimeSlotIds[nextSlotIx];
                    };

            Func<Person, int> getRoomId = choosenOne => roomsForSessions[_theChosen.IndexOf(choosenOne)].Id;

            // Adds session to Sessions and optionally to ChoosenAttendeeSessions
            Func<bool, Session, Session> addSession =
                (choosen, s) =>
                {
                    sessions.Add(s);
                    if (choosen)
                    {
                        EnsureTimeSlotIdIsFree(choosenAttendeeTimeSlotIds, s, getNextSpeakerTimeSlotId);
                        ChoosenAttendeeSessions.Add(s);
                    }
                    return s;
                };

            // Scott Guthrie
            addSession(true, new Session
            {
                Title = "Keynote",
                Code = "KEY001",
                SpeakerId = _scottGuthrie.Id,
                TrackId = tracks.First(t => t.Name == ".NET").Id,
                TimeSlotId = timeSlots[0].Id,
                RoomId = getRoomId(_scottGuthrie),
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
                RoomId = getRoomId(_scottGuthrie),
                Level = levels[1],
                Tags = "ASP|MVC|Web",
                Description =
                    "MVC 4 enables a wider variety of web applications than ever before. The libraries that are easily managed through Nuget and are truly opens source. Learn about the new capabilities and how you can contribute to ASP.NET MVC's evolution.",
            });

            //Scott Hunter
            addSession(true, new Session
            {
                Title = "Azure: to the Cloud",
                Code = "CLD163",
                SpeakerId = _scottHunter.Id,
                TrackId = tracks.First(t => t.Name == "Cloud").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_scottHunter),
                Level = levels[1],
                Tags = "Cloud|Azure|Node|Web",
                Description = "Windows Azure offers reliable, affordable cloud computing for almost any application of any scale, built with any technology. Scott demonstates with examples of both Windows and non-Windows applications.",
            });
                
            // John Papa
            addSession(false, new Session
            {
                Title = "Building HTML/JavaScript Apps with Knockout and MVVM",
                Code = "JVS300",
                SpeakerId = _johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_johnPapa),
                Level = levels[2],
                Tags = "JavaScript|Knockout|MVVM|HTML5|Web",
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
                RoomId = getRoomId(_johnPapa),
                Level = levels[1],
                Tags = "JavaScript|JsRender|Web",
                Description =
                    "Learn how to build fast, robust, and maintainable Web applications with JavaScript, jQuery and JsRender: the successor to jQuery Templates.",
            });
            addSession(false, new Session
            {
                Title = "Introduction to Building Windows 8 Metro Applications",
                Code = "WIN102",
                SpeakerId = _johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "Windows 8").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_johnPapa),
                Level = levels[0],
                Tags = "Windows|Metro",
                Description =
                    "This session covers everything you need to know to get started building Metro apps.",
            });
            addSession(true, new Session
            {
                Title = "Build a Custom Single Page Application",
                Code = "JVS277",
                SpeakerId = _johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_johnPapa),
                Level = levels[2],
                Tags = "Knockout|JavaScript|Web",
                Description =
                    "Build a SPA, then hang out in one.",
            });

            // Dan Wahlin;
            addSession(false, new Session
            {
                Title = "Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery",
                Code = "ASP310",
                SpeakerId = _danWahlin.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_danWahlin),
                Level = levels[2],
                Tags = "MVC|HTML5|Entity Framework|jQuery|Web",
                Description = "This session provides an end-to-end look at building a Web application using several different technologies.",
            });

            // Eric Barnard
            addSession(true, new Session
            {
                Title = "KnockoutJS Validation",
                Code = "JVS234",
                SpeakerId = _ericBarnard.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_ericBarnard),
                Level = levels[0],
                Tags = "Knockout|JavaScript|Web",
                Description =
                    "This session guides you through model validation with Knockout",
            });

            // Mads Kristensen
            addSession(true, new Session
            {
                Title = "Be More Productive in Visual Studio 2012",
                Code = "NET282",
                SpeakerId = _madsKristensen.Id,
                TrackId = tracks.First(t => t.Name == ".NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_madsKristensen),
                Level = levels[1],
                Tags = "Web Forms|ASP|Web|.NET|",
                Description =
                    "Scale tall buildings, defeat fire breathing dragons, and be more productive in Visual Studio!",
            });

            // Ward Bell
            addSession(false, new Session
            {
                Title = "Dressing for Success",
                Code = "DSN320",
                SpeakerId = _wardBell.Id,
                TrackId = tracks.First(t => t.Name == "Design").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_wardBell),
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
                RoomId = getRoomId(_wardBell),
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
                RoomId = getRoomId(_wardBell),
                Level = levels[1],
                Tags = "JavaScript|Web",
                Description =
                    "You need a good set of tools to be a rock star JavaScript developer. What does Ward use to write, test and debug? Come to this session and find out.",
            });

            // Howard Dierking
            addSession(false, new Session
            {
                Title = "ASP.NET MVC 4 Loves HTML5",
                Code = "ASP333",
                SpeakerId = _howardDierking.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_howardDierking),
                Level = levels[2],
                Tags = "MVC|HTML5|Entity Framework|jQuery|Web",
                Description = "TBD",
            });

            // Julie Lerman
            addSession(false, new Session
            {
                Title = "Entity Framework Code First",
                Code = "DAT192",
                SpeakerId = _julieLerman.Id,
                TrackId = tracks.First(t => t.Name == "Data").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_julieLerman),
                Level = levels[0],
                Tags = "Data|Entity Framework|ORM",
                Description =
                    "Discover how Entity Framework Code First can improve your life!",
            });

            // Hans Fjällemark
            addSession(false, new Session
            {
                Title = "Bootstrap and Back",
                Code = "CSS132",
                SpeakerId = _hansFjallemark.Id,
                TrackId = tracks.First(t => t.Name == "CSS").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_hansFjallemark),
                Level = levels[0],
                Tags = "CSS|Responsive Design|Web",
                Description =
                    "TBD",
            });
            addSession(true, new Session
            {
                Title = "Responsive Web Design with CSS3",
                Code = "CSS233",
                SpeakerId = _hansFjallemark.Id,
                TrackId = tracks.First(t => t.Name == "CSS").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_hansFjallemark),
                Level = levels[1],
                Tags = "CSS3|Responsive Design|Web",
                Description =
                    "TBD",
            });

            // Jim Cowart
            addSession(false, new Session
            {
                Title = "Jim Cowart Underscores",
                Code = "JVS340",
                SpeakerId = _jimCowart.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_jimCowart),
                Level = levels[2],
                Tags = "JavaScript|Underscore|jQuery|Web",
                Description = "TBD",
            });

            // Shawn Wildermuth
            addSession(false, new Session
            {
                Title = "A Better CSS: LESS is More",
                Code = "CSS142",
                SpeakerId = _shawnWildermuth.Id,
                TrackId = tracks.First(t => t.Name == "CSS").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_shawnWildermuth),
                Level = levels[0],
                Tags = "CSS|Web",
                Description =
                    "TBD",
            });

            // Tim Heuer
            addSession(true, new Session
            {
                Title = "Building Windows 8 Business Apps",
                Code = "WIN348",
                SpeakerId = _timHeuer.Id,
                TrackId = tracks.First(t => t.Name == "Windows 8").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_timHeuer),
                Level = levels[2],
                Tags = "Windows 8|XAML|WinRT|Metro|C#",
                Description =
                    "TBD",
            });

            // Pete Brown
            addSession(true, new Session
            {
                Title = "Windows 8 Form Factors",
                Code = "WIN338",
                SpeakerId = _peteBrown.Id,
                TrackId = tracks.First(t => t.Name == "Windows 8").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_peteBrown),
                Level = levels[2],
                Tags = "Windows 8|XAML|WinRT|Metro|C#",
                Description =
                    "TBD",
            });

            // Steve Sanderson
            addSession(false, new Session
            {
                Title = "The Upshot is ...",
                Code = "JVS250",
                SpeakerId = _steveSanderson.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_steveSanderson),
                Level = levels[2],
                Tags = "Knockout|JavaScript|Web",
                Description =
                    "TBD",
            });

            // Ryan Niemeyer
            addSession(false, new Session
            {
                Title = "Knockout Performance Gotchas",
                Code = "JVS152",
                SpeakerId = _ryanNiemeyer.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_ryanNiemeyer),
                Level = levels[0],
                Tags = "Knockout|JavaScript|Web",
                Description = "TBD",
            });

            // Jesse Liberty
            addSession(false, new Session
            {
                Title = "Building A Succesful Windows 8 Metro App",
                Code = "WIN110",
                SpeakerId = _jesseLiberty.Id,
                TrackId = tracks.First(t => t.Name == "Windows 8").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_jesseLiberty),
                Level = levels[1],
                Tags = "XAML|WinRT|C#|Metro|Windows",
                Description = "TBD",
            });

            // Elijiah Manor
            addSession(false, new Session
            {
                Title = "Amplify It!",
                Code = "JVS271",
                SpeakerId = _elijahManor.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_elijahManor),
                Level = levels[1],
                Tags = "Amplify|JavaScript|Web",
                Description = "TBD",
            });

            // Aaron Skonnard
            addSession(true, new Session
            {
                Title = "Web Services at their Finest",
                Code = "NET451",
                SpeakerId = _aaronSkonnard.Id,
                TrackId = tracks.First(t => t.Name == ".NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_aaronSkonnard),
                Level = levels[2],
                Tags = "WCF|REST|Web",
                Description = "TBD",
            });

            // Fritz Onion
            addSession(true, new Session
            {
                Title = "What's New in ASP.NET 4",
                Code = "ASP141",
                SpeakerId = _fritzOnion.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_fritzOnion),
                Level = levels[1],
                Tags = "ASP.NET|Web",
                Description = "TBD",
            });

            // John Smith
            addSession(true, new Session
            {
                Title = "Azure: 0 to 60",
                Code = "CLD172",
                SpeakerId = _johnSmith.Id,
                TrackId = tracks.First(t => t.Name == "Cloud").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_johnSmith),
                Level = levels[1],
                Tags = "ASP.NET|Web|Azure",
                Description = "TBD",
            });

            // Esteban Garcia
            addSession(false, new Session
            {
                Title = "TFS For the Win!",
                Code = "PRC141",
                SpeakerId = _estebanGarcia.Id,
                TrackId = tracks.First(t => t.Name == "Practices").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_estebanGarcia),
                Level = levels[0],
                Tags = "TFS|Practices",
                Description =
                    "TBD",
            });

            // Glenn BLock
            addSession(true, new Session
            {
                Title = "Web API Best Practices",
                Code = "ASP245",
                SpeakerId = _glennBlock.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_glennBlock),
                Level = levels[1],
                Tags = "ASP.NET|Web|Web API",
                Description = "TBD",
            });

            // Dave Ward
            addSession(true, new Session
            {
                Title = "RPC and REST with Web API",
                Code = "ASP285",
                SpeakerId = _daveWard.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_daveWard),
                Level = levels[1],
                Tags = "ASP.NET|Web|Web API",
                Description = "TBD",
            });

            // Scott Hanselman
            addSession(true, new Session
            {
                Title = "NuGet Package Management",
                Code = "PRC150",
                SpeakerId = _scottHanselman.Id,
                TrackId = tracks.First(t => t.Name == "Practices").Id,
                TimeSlotId = getNextSpeakerTimeSlotId(),
                RoomId = getRoomId(_scottHanselman),
                Level = levels[1],
                Tags = "NuGet",
                Description = "TBD",
            });

            return sessions;
        }

        public static List<Session> ChoosenAttendeeSessions { get; private set; }

        private static void EnsureTimeSlotIdIsFree(List<int> usedAttendeeSlots, Session session, Func<int> getNextTimeSlotId)
        {
            var origSlot = session.TimeSlotId;
            var slot = origSlot;
            while (usedAttendeeSlots.Contains(slot))
            {
                slot = getNextTimeSlotId();
                if (origSlot == slot) return; // couldn't find a free slot
                session.TimeSlotId = slot;
            }
            usedAttendeeSlots.Add(slot); // used a free slot
        }
    }
}
