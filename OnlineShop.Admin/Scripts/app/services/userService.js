(function () {

    "use strict";

    osApp.service("userService", ["$http", function ($http) {

        var service = {
            getAllUsers: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/user/getalluser",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            getAllUserGroupForUser: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/user/getallusergroupforuser",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertUsers: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/user/insertuser",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateUsers: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/user/updateuser",
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