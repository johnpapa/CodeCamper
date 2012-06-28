define('filter',
    [
        'filter.sessions',
        'filter.speakers'
],
    function (sessionsFilter, speakersFilter) {
        return {
            SessionsFilter: sessionsFilter.Sessions,
            SpeakersFilter: speakersFilter.Speakers
        };
    });