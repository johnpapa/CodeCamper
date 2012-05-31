// Depends on
//	Knockout, Config
// ----------------------------------------------
define(['ko', 'config'],
function (ko, config) {

    //track the number of re-evaluations for a computed observable
    ko.observableArray.fn.trackReevaluations = function () {
        var self = this;
        self.reevaluationCount = ko.observable(0);
        self.subscribe(function () {
            this.reevaluationCount(this.reevaluationCount() + 1);
        }, self);
        return self;
    };

    // Plug debugInfo into config
    config.debugInfo = function (items) {
        return ko.computed(function () {
            //new in KO 2.1. it used to be JSON.stringify(ko.toJS(timeslots), null, 2)
            return ko.toJSON(items, null, 2);
        });
    };

});