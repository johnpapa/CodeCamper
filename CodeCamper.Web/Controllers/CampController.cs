using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CodeCamper.Data;
using CodeCamper.Model;

namespace CodeCamper.Web.Controllers
{
    public class CampController : ApiControllerBase
    {
        public CampController(ICodeCamperRepository repository)
        {
            Repository = repository;
        }

        // ToDo: Remove this poor man's IoC ctor
        //public CampController()
        //{
        //    Repository = new CodeCamperRepository();
        //}

        // GET: api/events/rooms
        [ActionName("rooms")]
        public IEnumerable<Room> GetRooms()
        {
            return Repository.Rooms().OrderBy(r => r.Name).ToList();
        }

        // GET: api/events/timeslots
        [ActionName("timeslots")]
        public IEnumerable<TimeSlot> GetTimeSlots()
        {
            return Repository.TimeSlots().OrderBy(ts => ts.Start).ToList();
        }

        // GET: api/events/tracks
        [ActionName("tracks")]
        public IEnumerable<Track> GetTracks()
        {
            return Repository.Tracks().OrderBy(t => t.Name).ToList();
        }

        // GET: api/events/sessionbriefs
        [ActionName("sessionbriefs")]
        public IEnumerable<SessionBrief> GetSessionBriefs()
        {
            return Repository.SessionBriefs().OrderBy(sb => sb.TimeSlotId).ToList();
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

        // GET: api/events/taggroups
        [ActionName("taggroups")]
        public IEnumerable<TagGroup> GetTagGroups()
        {
            return Repository.TagGroups().ToList();
        }
    }
}