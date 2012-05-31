define([
        'vm.favorites',
        'vm.session',
        'vm.sessions',
        'vm.speakers'
],
    function (favorites, session, sessions, speakers) {
        return {
            favorites: favorites,
            session: session,
            sessions: sessions,
            speakers: speakers
        };
    });