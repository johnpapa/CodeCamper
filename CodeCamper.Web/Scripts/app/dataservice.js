define('dataservice',
    [
        'dataservice.attendance',
        'dataservice.lookup',
        'dataservice.person',
        'dataservice.session'
    ],
    function (attendance, lookup, person, session) {
        return {
            attendance: attendance,
            lookup: lookup,
            person: person,
            session: session
        };
    });