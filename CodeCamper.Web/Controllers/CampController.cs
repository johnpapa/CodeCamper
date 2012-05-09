using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class CampController : ApiControllerBase
    {
        public CampController(ICodeCamperDataService dataService)
        {
            DataService = dataService;
        }

        // ToDo: Remove this poor man's IoC ctor
        //public CampController()
        //{
        //    Repository = new CodeCamperRepository();
        //}

        // GET: api/events/rooms
        [ActionName("rooms")]
        public IQueryable<Room> GetRooms()
        {
            return DataService.Rooms.GetAll().OrderBy(r => r.Name);
        }

        // GET: api/events/timeslots
        [ActionName("timeslots")]
        public IQueryable<TimeSlot> GetTimeSlots()
        {
            return DataService.TimeSlots.GetAll().OrderBy(ts => ts.Start);
        }

        // GET: api/events/tracks
        [ActionName("tracks")]
        public IQueryable<Track> GetTracks()
        {
            return DataService.Tracks.GetAll().OrderBy(t => t.Name);
        }

        // Lookups: aggregates the many little lookup lists in one payload
        // to reduce roundtrips when the client launches.
        // GET: api/events/lookups
        [ActionName("lookups")]
        public Lookups GetLookups()
        {
            var lookups = new Lookups
            {
                Rooms = GetRooms().ToList(),
                TimeSlots = GetTimeSlots().ToList(),
                Tracks = GetTracks().ToList(),
            };
            return lookups;
        }

        // GET: api/events/sessionbriefs
        [ActionName("sessionbriefs")]
        public IQueryable<SessionBrief> GetSessionBriefs()
        {
            return DataService.Sessions.SessionBriefs().OrderBy(sb => sb.TimeSlotId);
        }

        // GET: api/events/taggroups
        [ActionName("taggroups")]
        public IQueryable<TagGroup> GetTagGroups()
        {
            return DataService.Sessions.TagGroups().AsQueryable();
        }
    }
}