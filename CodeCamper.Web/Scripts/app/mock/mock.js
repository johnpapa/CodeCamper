define([
    'mock/mock.generator',
    'mock/mock.dataservice.attendance',
    'mock/mock.dataservice.lookup',
    'mock/mock.dataservice.person',
    'mock/mock.dataservice.session'
    ],
    function (generator, attendance, lookup, person, session) {
        var model = generator.model,
            
            dataserviceInit = function () {
                lookup.defineApi(model);
                person.defineApi(model);
                session.defineApi(model);
                attendance.defineApi(model);
        };

    return {
        dataserviceInit: dataserviceInit    
    };
});