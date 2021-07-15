(function () {

    "use strict";

    osApp.service("clientHomePageService", ["$http", function ($http) {

        var service = {
            bindSlideForClientHomePage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindSlideForClientHomePage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            bindHotProductForClientHomePage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindHotProductForClientHomePage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            bindNewProductForClientHomePage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindNewProductForClientHomePage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            bindFooterForClientHomePage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindFooterForClientHomePage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            bindTopViewProductForClientHomePage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindTopViewProductForClientHomePage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            bindNewNewsForClientHomePage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindNewNewsForClientHomePage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            bindCategoryForClientHomePage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindCategoryForClientHomePage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            bindCategoryContentForClientContentPage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindCategoryContentForClientContentPage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            getProductByCategoryForClientHomePage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/GetProductByCategoryForClientHomePage/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            getContentByCategoryContentForClientHomePage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/GetContentByCategoryContentForClientHomePage/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            getCategoryForClientHomePage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/GetCategoryForClientHomePage/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            getCategoryContentForClientHomePage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/GetCategoryContentForClientHomePage/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            bindDataForClientContentPage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindDataForClientContentPage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            bindDataForClientAboutPage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindDataForClientAboutPage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            getContentByIdForClientHomePage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/GetContentByIdForClientHomePage/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            getProductByIdForClientHomePage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/GetProductByIdForClientHomePage/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            bindProductRelatedForClientProductDetailPage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindProductRelatedForClientProductDetailPage/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            bindContentRelatedForClientContentDetailPage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindContentRelatedForClientContentDetailPage/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            bindDataForClientContactPage: function () {
                var response = $http({
                    method: "GET",
                    url: "/api/client/BindDataForClientContactPage",
                    cache: false,
                    data: {},
                    contentType: "application/json"
                });
                return response;
            },

            insertFeedBacks: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/client/insertfeedback",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            insertUsersForClient: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/client/InsertUsersForClient",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            updateUsersForClient: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/api/client/UpdateUsersForClient",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

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

            insertOrders: function (data) {
                var response = $http({
                    method: "POST",
                    url: "/ShoppingCart/InsertOrders",
                    cache: false,
                    data: data,
                    contentType: "application/json"
                });
                return response;
            },

            findProductForClientHomePage: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/FindProductForClientHomePage/" + item,
                    cache: false,
                    data: { productName: item },
                    contentType: "application/json"
                });
                return response;
            },

            filterNameASC: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/FilterNameASC/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            filterNewProduct: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/FilterNewProduct/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            filterPriceASC: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/FilterPriceASC/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            filterPriceDESC: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/FilterPriceDESC/" + parseInt(item),
                    cache: false,
                    data: { id: item },
                    contentType: "application/json"
                });
                return response;
            },

            filterTopViewProduct: function (item) {
                var response = $http({
                    method: "GET",
                    url: "/api/client/FilterTopViewProduct/" + parseInt(item),
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