define([
        'vm.favorites',
        'vm.session',
        'vm.sessions',
        'vm.shell',
        'vm.speakers'
],
    function (favorites, session, sessions, shell, speakers) {
        return {
            favorites: favorites,
            session: session,
            sessions: sessions,
            shell: shell,
            speakers: speakers
        };
    });