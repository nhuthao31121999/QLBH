(function () {

    "use strict";

    osApp.service("aboutService", ["$http", function ($http) {

        var service = {
            getAllAbouts: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/about/getallabout",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertAbouts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/about/insertabout",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateAbouts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/about/updateabout",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteAbouts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/about/deleteabout",
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