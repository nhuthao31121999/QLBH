(function () {

    "use strict";

    osApp.service("userGroupService", ["$http", function ($http) {

        var service = {
            getAllUserGroups: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/usergroup/getallusergroup",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertUserGroups: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/usergroup/insertusergroup",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateUserGroups: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/usergroup/updateusergroup",
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