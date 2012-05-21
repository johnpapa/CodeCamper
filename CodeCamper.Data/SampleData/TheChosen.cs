using System;
using System.Collections.Generic;
using System.Linq;
using CodeCamper.Model;

namespace CodeCamper.SampleData
{
    public static class TheChosen
    {

        private static List<Person> _theChosen;

        /// <summary>Add the "well-known" _theChosen</summary>
        public static void AddPersons(List<Person> persons)
        {
            _theChosen = new List<Person>();

            _theChosen.Add(new Person
            {
                FirstName = "John",
                LastName = "Papa",
                Email = "johnp@contoso.com",
                Blog = "http://johnp.contoso.com",
                Twitter = "https://twitter.com/#!/john_papa",
                Gender = "M",
                Bio = "Husband and father enjoying every minute with my family. Microsoft Regional Director, Evangelist, speaker, and author for MSDN Magazine and Pluralsight.",
            });
            _theChosen.Add(new Person
            {
                FirstName = "Dan",
                LastName = "Wahlin",
                Email = "danw@contoso.com",
                Blog = "http://danw.contoso.com",
                Twitter = "https://twitter.com/#!/danwahlin",
                Gender = "M",
                Bio = "Chief Architect at Wahlin Consulting. Provide consulting & training on jQuery, HTML5, ASP.NET, SharePoint. Husband & father, like to write and record music.",
            });
            _theChosen.Add(new Person
            {
                FirstName = "Ward",
                LastName = "Bell",
                Email = "wardb@contoso.com",
                Blog = "http://wardb.contoso.com",
                Twitter = "https://twitter.com/#!/wardbell",
                Gender = "M",
                Bio = "V.P. of Technology at IdeaBlade. Speaks often on client application development issues to anyone who will listen. Likes sociology, history, poetry, and ridiculous clothes.",
            });
            _theChosen.Add(new Person
            {
                FirstName = "Hans",
                LastName = "Fjällemark",
                Email = "hansf@contoso.com",
                Blog = "http://hansf.contoso.com",
                Twitter = "https://twitter.com/#!/hfjallemark",
                Gender = "M",
                Bio = "Freelancing developer & designer based in Sweden. I spend most of my time implementing usable and attractive UX in HTML5 or Silverli.. no wait, just HTML5:) ",
            });
            _theChosen.Add(new Person
            {
                FirstName = "Jim",
                LastName = "Cowart",
                Email = "jimc@contoso.com",
                Blog = "http://jimc.contoso.com",
                Twitter = "https://twitter.com/#!/ifandelse",
                Gender = "M",
                Bio = "Husband, father, architect, developer, tea drinker. Opinions are my own. Unless they're good",
            });
            _theChosen.Add(new Person
            {
                FirstName = "Ryan",
                LastName = "Niemeyer",
                Email = "ryann@contoso.com",
                Blog = "http://ryann.contoso.com/",
                Twitter = "https://twitter.com/#!/rpniemeyer",
                Gender = "M",
                Bio = "Coder, tester, father, and husband. Never short on ideas. Love to learn and collaborate.",
            });
            _theChosen.Add(new Person
            {
                FirstName = "Scott",
                LastName = "Guthrie",
                Email = "scottg@contoso.com",
                Blog = "http://scottg.contoso.com",
                Twitter = "https://twitter.com/#!/scottgu",
                Gender = "M",
                Bio = "I live in Seattle and build a few products for Microsoft",
            });

            persons.AddRange(_theChosen);
        }

        public static void AddSessions(
            List<Session> sessions,
            IList<TimeSlot> timeSlots,
            IList<Track> tracks,
            string[] levels,
            IList<Room> roomsForSessions)
        {

            // John Papa
            var johnPapa = _theChosen[0];
            int roomId = roomsForSessions[0].Id;

            sessions.Add(new Session
            {
                Title = "Building HTML and JavaScript Apps with KnockoutJS and MVVM",
                Code = "JVS300",
                SpeakerId = johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[2].Id,
                RoomId = roomId,
                Level = levels[2],
                Tags = "JavaScript|Knockout|MVVM|HTML5",
                Description =
                    "Do you write a lot of HTML and JavaScript code to push and pull data? In this session, learn popular techniques to use data binding to bind your data to your target controls in HTML writing less code, but gaining more power. See how to consume json data, use json objects in JavaScript, use declarative binding, using KnockoutJS. Also, see how to use the MVVM pattern to write data centric JavaScript code that follows good separation patterns and creates highly maintainable code.",
            });
            sessions.Add(new Session
            {
                Title = "JsRender Fundamentals",
                Code = "JVS201",
                SpeakerId = johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[4].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "JavaScript|JsRender",
                Description =
                    "Learn how to build fast, robust, and maintainable Web applications with JavaScript, jQuery and JsRender: the successor to jQuery Templates.",
            });
            sessions.Add(new Session
            {
                Title = "Introduction to Building Windows 8 Metro Applications",
                Code = "WIN102",
                SpeakerId = johnPapa.Id,
                TrackId = tracks.First(t => t.Name == "Windows 8").Id,
                TimeSlotId = timeSlots[7].Id,
                RoomId = roomId,
                Level = levels[0],
                Tags = "Windows|Metro",
                Description =
                    "This session covers everything you need to know to get started building Metro apps.",
            });

            // Dan Wahlin
            var danWahlin = _theChosen[1];
            roomId = roomsForSessions[1].Id;
            sessions.Add(new Session
            {
                Title = "Building ASP.NET MVC Apps with EF Code First, HTML5, and jQuery",
                Code = "ASP310",
                SpeakerId = danWahlin.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = timeSlots[5].Id,
                RoomId = roomId,
                Level = levels[2],
                Tags = "MVC|HTML5|Entity Framework|jQuery",
                Description = "This session provides an end-to-end look at building a Web application using several different technologies.",
            });
            sessions.Add(new Session
            {
                Title = "jQuery Fundamentals",
                Code = "JVS111",
                SpeakerId = danWahlin.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[7].Id,
                RoomId = roomId,
                Level = levels[0],
                Tags = "jQuery|JavaScript",
                Description =
                    "This session guides you through the features of the jQuery \"write less, do more\" library",
            });
            sessions.Add(new Session
            {
                Title = "Structuring JavaScript Code",
                Code = "JVS212",
                SpeakerId = danWahlin.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[11].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "Web Forms|ASP",
                Description =
                    "This session walks through several key patterns that can be used to encapsulate and modularize JavaScript code. Throughout the course you’ll learn how closures and other techniques can be used to better organize your JavaScript code and make it easier to re-use and maintain in HTML5 applications.",
            });

            // Ward Bell
            var wardBell = _theChosen[2];
            roomId = roomsForSessions[2].Id;
            sessions.Add(new Session
            {
                Title = "Dressing for Success",
                Code = "DSN320",
                SpeakerId = wardBell.Id,
                TrackId = tracks.First(t => t.Name == "Design").Id,
                TimeSlotId = timeSlots[5].Id,
                RoomId = roomId,
                Level = levels[2],
                Tags = "Design|Animation|Metro",
                Description = "You must have style to design with style. A proper wardrobe is an essential first step to application success. Learn to dress from this old pro.",
            });
            sessions.Add(new Session
            {
                Title = "Entity Framework for Poets",
                Code = "DAT121",
                SpeakerId = wardBell.Id,
                TrackId = tracks.First(t => t.Name == "Data").Id,
                TimeSlotId = timeSlots[7].Id,
                RoomId = roomId,
                Level = levels[0],
                Tags = "Data|Entity Framework|ORM",
                Description =
                    "If you can pronounce 'O-R-M', you're on your way to a lucrative career in the fast-paced world of data processing. Discover how Entity Framework can make you a star, in the office and around town.",
            });
            sessions.Add(new Session
            {
                Title = "A JavaScript Toolbox",
                Code = "JVS222",
                SpeakerId = wardBell.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[11].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "JavaScript",
                Description =
                    "You need a good set of tools to be a rock star JavaScript developer. What does Ward use to write, test and debug? Come to this session and find out.",
            });

            // Hans Fjällemark
            var hansFjallemark = _theChosen[3];
            roomId = roomsForSessions[3].Id;
            sessions.Add(new Session
            {
                Title = "Fjällemark Magic 1",
                Code = "ASP331",
                SpeakerId = hansFjallemark.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = timeSlots[4].Id,
                RoomId = roomId,
                Level = levels[2],
                Tags = "MVC|HTML5|Entity Framework|jQuery",
                Description = "TBD",
            });
            sessions.Add(new Session
            {
                Title = "Fjällemark Magic 2",
                Code = "JVS132",
                SpeakerId = hansFjallemark.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[6].Id,
                RoomId = roomId,
                Level = levels[0],
                Tags = "jQuery|JavaScript",
                Description =
                    "TBD",
            });
            sessions.Add(new Session
            {
                Title = "Fjällemark Magic 3",
                Code = "JVS233",
                SpeakerId = hansFjallemark.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[10].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "Web Forms|ASP",
                Description =
                    "TBD",
            });

            // Jim Cowart
            var jimCowart = _theChosen[4];
            roomId = roomsForSessions[4].Id;
            sessions.Add(new Session
            {
                Title = "Jim Cowart Underscores",
                Code = "JVS340",
                SpeakerId = jimCowart.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[4].Id,
                RoomId = roomId,
                Level = levels[2],
                Tags = "JavaScript|Underscore|jQuery",
                Description = "TBD",
            });
            sessions.Add(new Session
            {
                Title = "Straighten Your Backbone with Jim Coward",
                Code = "JVS141",
                SpeakerId = jimCowart.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[6].Id,
                RoomId = roomId,
                Level = levels[0],
                Tags = "Backbone|JavaScript",
                Description =
                    "TBD",
            });
            sessions.Add(new Session
            {
                Title = "Going for the Knockout",
                Code = "JVS242",
                SpeakerId = jimCowart.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[9].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "Knockout|JavaScript",
                Description =
                    "TBD",
            });

            // Ryan Niemeyer
            var ryanNiemeyer = _theChosen[5];
            roomId = roomsForSessions[5].Id;
            sessions.Add(new Session
            {
                Title = "Knockback a few cold ones",
                Code = "JVS351",
                SpeakerId = ryanNiemeyer.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = timeSlots[3].Id,
                RoomId = roomId,
                Level = levels[2],
                Tags = "JavaScript|Knockout|jQuery",
                Description = "TBD",
            });
            sessions.Add(new Session
            {
                Title = "Knockout Performance Gotchas",
                Code = "JVS152",
                SpeakerId = ryanNiemeyer.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[4].Id,
                RoomId = roomId,
                Level = levels[0],
                Tags = "Knockout|JavaScript",
                Description = "TBD",
            });
            sessions.Add(new Session
            {
                Title = "The Expert jsFiddler",
                Code = "JVS253",
                SpeakerId = ryanNiemeyer.Id,
                TrackId = tracks.First(t => t.Name == "JavaScript").Id,
                TimeSlotId = timeSlots[6].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "jsFiddle|JavaScript",
                Description = "TBD",
            });

            // Scott Guthrie
            var scottGuthrie = _theChosen[6];
            roomId = roomsForSessions[6].Id;
            sessions.Add(new Session
            {
                Title = "Keynote",
                Code = "KEY001",
                SpeakerId = scottGuthrie.Id,
                TrackId = tracks.First(t => t.Name == ".NET").Id,
                TimeSlotId = timeSlots[0].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "Keynote",
                Description = "",
            });
            sessions.Add(new Session
            {
                Title = "MVC 4 in Perspective",
                Code = "ASP162",
                SpeakerId = scottGuthrie.Id,
                TrackId = tracks.First(t => t.Name == "ASP.NET").Id,
                TimeSlotId = timeSlots[1].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "ASP|MVC",
                Description = 
                    "MVC 4 enables a wider variety of web applications than ever before. The libraries that are easily managed through Nuget and are truly opens source. Learn about the new capabilities and how you can contribute to ASP.NET MVC's evolution.",
            });
            sessions.Add(new Session
            {
                Title = "Azure: the agnostic cloud",
                Code = "CLD163",
                SpeakerId = scottGuthrie.Id,
                TrackId = tracks.First(t => t.Name == "Cloud").Id,
                TimeSlotId = timeSlots[3].Id,
                RoomId = roomId,
                Level = levels[1],
                Tags = "Cloud|Azure|Node",
                Description = "Windows Azure offers reliable, affordable cloud computing for almost any application of any scale, built with any technology. Scott demonstates with examples of both Windows and non-Windows applications.",
            });
        }
    }
}
