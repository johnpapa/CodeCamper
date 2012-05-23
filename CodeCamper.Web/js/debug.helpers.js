var my = my || {};

//track the number of re-evaluations for a computed observable
ko.observableArray.fn.trackReevaluations = function () {
    this.reevaluationCount = ko.observable(0);
    this.subscribe(function () {
        this.reevaluationCount(this.reevaluationCount() + 1);
    }, this);
    return this;
};

my.debugInfo = function (items) {
    return ko.computed(function () {
        //new in KO 2.1. it used to be JSON.stringify(ko.toJS(timeslots), null, 2)
        return ko.toJSON(items, null, 2)
    })
};