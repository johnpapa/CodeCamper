define(['moment'],
    function (moment) {
        var
            endOfDay = function (day) {
                return moment(new Date(day))
                    .add('days', 1)
                    .add('seconds', -1)
                    .toDate();
            },
            
            hasProperties = function (obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        return true;
                    }
                }
                return false;
            },
            
            mapMemoToArray = function (items) {
                var underlyingArray = [];
                for (var prop in items) {
                    if (items.hasOwnProperty(prop)) {
                        underlyingArray.push(items[prop]);
                    }
                }
                return underlyingArray;
            },
            
            regExEscape = function (text) {
                // Removes regEx characters from search filter boxes in our app
                return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            };

        return {
            endOfDay: endOfDay,
            hasProperties: hasProperties,
            mapMemoToArray: mapMemoToArray,
            regExEscape: regExEscape
        };
    });

