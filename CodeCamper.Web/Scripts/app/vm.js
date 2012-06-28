define('vm',
[
        'vm.favorites',
        'vm.session',
        'vm.sessions',
        'vm.shell',
        'vm.speaker',
        'vm.speakers'
],
    function (favorites, session, sessions, shell, speaker, speakers) {
        return {
            favorites: favorites,
            session: session,
            sessions: sessions,
            shell: shell,
            speaker: speaker,
            speakers: speakers
    };
});