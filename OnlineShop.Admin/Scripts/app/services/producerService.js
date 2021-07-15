(function () {

    "use strict";

    osApp.service("producerService", ["$http", function ($http) {

        var service = {
            getAllProducers: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/producer/getallproducer",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertProducers: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/producer/insertproducer",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateProducers: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/producer/updateproducer",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteProducers: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/producer/deleteproducer",
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