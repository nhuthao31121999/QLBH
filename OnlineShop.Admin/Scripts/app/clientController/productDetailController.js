(function (angular) {
    'use strict';

    osApp.controller('productDetailController', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {


            // Declare scope varibles
            $scope.GetProductByIdForClientHomePage = {};
            $scope.BindProductRelatedForClientProductDetailPage = [];

            var productByID = window.location.search.split('=')[1];
            clientHomePageService.getProductByIdForClientHomePage(productByID).then(function (response) {
                if (response.status === 200) {
                    $scope.GetProductByIdForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindProductRelatedForClientProductDetailPage(productByID).then(function (response) {
                if (response.status === 200) {
                    $scope.BindProductRelatedForClientProductDetailPage = response.data.Data;
                }
            });

        }]);

})(window.angular);