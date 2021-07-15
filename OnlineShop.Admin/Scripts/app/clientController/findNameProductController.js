(function (angular) {
    'use strict';

    osApp.controller('findNameProductController', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {

            // Declare scope varibles
            $scope.GetProduct = [];

            $scope.findproduct = {
                ProductName: STRING_EMPTY
            };

            $scope.find = function () {
                window.location = "/Client/HomeClient/FindNameProduct?productName=" + $scope.findproduct.ProductName;
            };

            var productName = $("#productNameQuery").text();
            $scope.GetProducts = function () {
                if (!productName || productName === "")
                    return;
                clientHomePageService.findProductForClientHomePage(productName).then(function success(response) {
                    if (response.status === 200) {
                        $scope.GetProduct = response.data.Data;
                    }
                });
            };

            $scope.GetProducts();

        }]);

})(window.angular);