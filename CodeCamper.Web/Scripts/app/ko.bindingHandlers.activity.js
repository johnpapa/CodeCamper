// By: Hans Fjällemark and John Papa
// https://github.com/CodeSeven/KoLite

define(['jquery', 'ko'],
function ($, ko) {
    ko.bindingHandlers.activity = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $(element).activityEx(false)
            })
        },

        update: function (element, valueAccessor) {
            var activity = valueAccessor()()

            typeof activity !== 'boolean' || $(element).activityEx(activity)
        }
    }
});