(function () {

    "use strict";

    osApp.service("orderService", ["$http", function ($http) {

        var service = {
            getAllOrders: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/order/getallorder",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            updateOrders: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/order/UpdateOrders",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            getAllOrderDetails: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/order/GetAllOrderDetails/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            totalOrderDetail: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/order/TotalOrderDetail/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            }
        };

        return service;
    }]);
})();