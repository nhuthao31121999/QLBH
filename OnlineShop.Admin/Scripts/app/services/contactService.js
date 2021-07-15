(function () {

    "use strict";

    osApp.service("contactService", ["$http", function ($http) {

        var service = {
            getAllContacts: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/contact/getallcontact",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertContacts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/contact/insertcontact",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateContacts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/contact/updatecontact",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteContacts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/contact/deletecontact",
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