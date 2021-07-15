(function () {

    "use strict";

    osApp.service("productService", ["$http", function ($http) {

        var service = {
            getAllProducts: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/product/getallproduct",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            getAllCategoryForProduct: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/product/getallcategoryforproduct",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            getAllProducerForProduct: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/product/getallproducerforproduct",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertProducts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/product/insertproduct",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateProducts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/product/updateproduct",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            deleteProducts: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/product/deleteproduct",
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