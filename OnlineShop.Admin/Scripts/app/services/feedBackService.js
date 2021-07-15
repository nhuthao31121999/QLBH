(function () {

    "use strict";

    osApp.service("feedBackService", ["$http", function ($http) {

        var service = {
            getAllFeedBacks: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/feedback/getallfeedback",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            updateFeedBacks: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/feedback/updatefeedback",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteFeedBacks: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/feedback/deletefeedback",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            }
        };

        return service;
    }]);
})();