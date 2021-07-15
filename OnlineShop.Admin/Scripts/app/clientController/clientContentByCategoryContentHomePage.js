(function (angular) {
    'use strict';

    osApp.controller('clientContentByCategoryContentHomePage', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {


            // Declare scope varibles
            $scope.BindFooterForClientHomePage = [];
            $scope.BindNewNewsForClientHomePage = [];
            $scope.BindCategoryContentForClientContentPage = [];
            $scope.BindDataForClientContentPage = [];

            clientHomePageService.bindFooterForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindFooterForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindNewNewsForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindNewNewsForClientHomePage = response.data.Data;
                }
            });

            var categoryContentID = window.location.search.split('=')[1];
            clientHomePageService.bindCategoryContentForClientContentPage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindCategoryContentForClientContentPage = response.data.Data;
                    $scope.BindCategoryContentForClientContentPage.forEach(item => {
                        item.isActive = item.CategoryContentID === parseInt(categoryContentID);
                    });
                }
            });

            clientHomePageService.bindDataForClientContentPage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindDataForClientContentPage = response.data.Data;
                }
            });

        }]);

})(window.angular);