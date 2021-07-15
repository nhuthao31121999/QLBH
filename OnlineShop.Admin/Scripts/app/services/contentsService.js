(function () {

    "use strict";

    osApp.service("contentsService", ["$http", function ($http) {

        var service = {
            getAllContents: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/content/getallcontent",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            getAllCategoryContentForContent: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/content/getallcategorycontentforcontent",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertContents: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/content/insertcontent",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateContents: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/content/updatecontent",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteContents: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/content/deletecontent",
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