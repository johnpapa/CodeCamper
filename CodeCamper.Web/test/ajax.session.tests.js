define(
    'ajax.session-tests-function',
    ['jquery', 'ko', 'model', 'model.mapper'],
    function ($, ko, model, mapper) {

        module('AJAX Calls');

        asyncTest('$.ajax call to getSessions returns data', 
            function (){
                var url = '/api/sessions';
                $.ajax({
                    url: url,
                    dataType: 'json',
                    success: function (result) {
                        ok(true, 'GET succeeded for ' + url);
                        ok(!!result, 'GET retrieved some data');
                        //debugger;
                        var underlyingArray = [];
                        for (var i = 0; i < result.length; i++) {
                            underlyingArray.push(mapper.session.fromDto(result[i]));
                        }
                        var sessions = ko.observableArray(underlyingArray);
                        equal(result[0].title, sessions()[0].title(), 'Model mapped properly');
                        start();
                    },
                    error: function (result) {
                        ok(false, 'Failed ajax call to ' + url + ' with error: ' + result.responseText);
                        start();
                    }
                });
            });
    });