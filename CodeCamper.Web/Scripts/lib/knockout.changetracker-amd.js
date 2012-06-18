// Knockout.ChangeTracker
//
// John Papa 
//          http://johnpapa.net
//          http://twitter.com/@john_papa
//
// Depends on scripts:
//          Knockout 
//
//  Notes:
//          Special thanks to Steve Sanderson for his influence and help on
//          this change tracker.
//
//  Usage:      
//          To Setup Tracking, add this tracker property to your viewModel    
//              ===> viewModel.tracker = new ChangeTracker(viewModel);
//
//          Hook these into your view ...
//              Did It Change?          
//              ===> viewModel.tracker().isDirty();
//
//          Hook this into your view model functions (ex: load, save) ...
//              Resync Changes
//              ===> viewModel.tracker().reset;
//
//          Optionally, you can pass your own hashFunction for state tracking.
////////////////////////////////////////////////////////////////////////////////////////
define(['ko'], function(ko) {
    //    (function (ko) {
    ko.DirtyFlag = function (objectToTrack, isInitiallyDirty, hashFunction) {

        hashFunction = hashFunction || ko.toJSON;

        var
            _objectToTrack = objectToTrack,
            _lastCleanState = ko.observable(hashFunction(_objectToTrack)),
            _isInitiallyDirty = ko.observable(isInitiallyDirty),

            result = function () {
                var self = this;

                self.isDirty = ko.computed(function () {
                    return _isInitiallyDirty() || hashFunction(_objectToTrack) !== _lastCleanState();
                });

                self.reset = function () {
                    _lastCleanState(hashFunction(_objectToTrack));
                    _isInitiallyDirty(false);
                };

                return self;
            };
            
        return result;
    };

//}(ko));
});