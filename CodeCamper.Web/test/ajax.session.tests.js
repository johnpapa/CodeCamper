define(
    'ajax.session-tests-function',
    ['jquery'],
    function ($) {

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
                        start();
                    },
                    error: function (result) {
                        ok(false, 'Failed ajax call to ' + url + ' with error: ' + result.responseText);
                        start();
                    }
                });
            });
    });