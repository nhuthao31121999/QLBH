(function () {

    "use strict";

    osApp.service("footerService", ["$http", function ($http) {

        var service = {
            getAllFooters: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/footer/getallfooter",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertFooters: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/footer/insertfooter",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateFooters: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/footer/updatefooter",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteFooters: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/footer/deletefooter",
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