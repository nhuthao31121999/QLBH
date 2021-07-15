(function () {

    "use strict";

    osApp.service("categoryService", ["$http", function ($http) {

        var service = {
            getAllCategories: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/category/getallcategory",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            getAllCategoryForCategoryParent: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/category/getallcategoryforcategoryparent",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertCategories: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/category/insertcategory",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateCategories: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/category/updatecategory",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteCategories: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/category/deletecategory",
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