(function () {
    
    var okAsync = QUnit.okAsync;
    
    module('Web API GET result has expected shape');
    
    test('Lookups url should return array of Rooms, Tracks, TimeSlots',
            function () {
                stop();
                $.ajax({
                    url: '/api/lookups/all',
                    dataType: 'json',
                    success: function (result) {
                        okAsync(!!result.Rooms && !!result.Tracks && !!result.TimeSlots,
                            'Got Rooms, Tracks, TimeSlots');
                        start();
                    },
                    error: function (result) {
                        okAsync(false, 'Failed with: ' + result.responseText);
                    }
                });
            }
        );
    
    var expectedHansImageSource = "hans_fjallemark.jpg";
    test('Find Hans among speakers and his ImageSource is ' + expectedHansImageSource,
        function() {
            stop();
            $.ajax({
                url: '/api/speakers/?$filter=firstName%20eq%20\'Hans\'',
                dataType: 'json',
                success: function(result) {
                    okAsync(!!result, "Got data when searching for Hans");
                    okAsync(result.length === 1 && result[0].FirstName === 'Hans',
                        "Got exactly one speaker w/ firstName = 'Hans'");
                    
                    okAsync(result[0].ImageSource === expectedHansImageSource,
                        "Got expected ImageSource = " + expectedHansImageSource);
                    start();
                },
                error: function(result) {
                    okAsync(false, 'Failed with: ' + result.responseText);
                }
            });
        }
    );
}());
