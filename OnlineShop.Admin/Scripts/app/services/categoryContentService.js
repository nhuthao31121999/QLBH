(function () {

    "use strict";

    osApp.service("categoryContentService", ["$http", function ($http) {

        var service = {
            getAllCategoryContent: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/categorycontent/getallcategorycontent",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            getAllCategoryContentForCategoryContentParent: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/categorycontent/getallcategorycontentforcategorycontentparent",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertCategoryContent: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/categorycontent/insertcategorycontent",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateCategoryContent: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/categorycontent/updatecategorycontent",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteCategoryContent: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/categorycontent/deletecategorycontent",
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