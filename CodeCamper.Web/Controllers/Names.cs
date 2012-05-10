using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CodeCamper.Web.Controllers
{
    public static class Names
    {
        /// <summary>
        /// Names used to define specific actions in both controller methods
        /// and in the routes of Global.asax
        /// </summary>
        public static class Actions
        {
            public const string AttendanceLinks = "attendancelinks";
        }

        /// <summary>
        /// Names used to define {controller} token in the routes of Global.asax
        /// </summary>
        public static class Controllers
        {
            public const string AttendanceLinks = "attendancelinks";
            public const string Persons = "persons";
            public const string Sessions = "sessions";
        }
    }

}