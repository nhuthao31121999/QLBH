(function (angular) {
    'use strict';

    osApp.controller('clientHomePage', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {
            // Declare scope varibles
            $scope.BindSlideForClientHomePage = [];
            $scope.BindHotProductForClientHomePage = [];
            $scope.BindNewProductForClientHomePage = [];
            $scope.BindFooterForClientHomePage = [];
            $scope.BindTopViewProductForClientHomePage = [];
            $scope.BindNewNewsForClientHomePage = [];
            $scope.BindCategoryForClientHomePage = [];
            $scope.BindCategoryContentForClientContentPage = [];

           
            // Get all data to grid
            clientHomePageService.bindSlideForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindSlideForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindHotProductForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindHotProductForClientHomePage = response.data.Data;
                    //$scope.RefreshGrid();
                }
            });

            clientHomePageService.bindNewProductForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindNewProductForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindFooterForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindFooterForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindTopViewProductForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindTopViewProductForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindNewNewsForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindNewNewsForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindCategoryForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindCategoryForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindCategoryContentForClientContentPage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindCategoryContentForClientContentPage = response.data.Data;
                }
            });

        }]);

})(window.angular);