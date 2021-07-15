(function () {

    "use strict";

    osApp.service("slideService", ["$http", function ($http) {

        var service = {
            getAllSlides: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/slide/getallslide",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertSlides: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/slide/insertslide",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateSlides: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/slide/updateslide",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteSlides: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/slide/deleteslide",
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