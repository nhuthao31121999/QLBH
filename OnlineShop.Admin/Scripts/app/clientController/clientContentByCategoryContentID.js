(function (angular) {
    'use strict';

    osApp.controller('clientContentByCategoryContentID', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {


            // Declare scope varibles
            $scope.GetContentByCategoryContentForClientHomePage = [];
            $scope.GetCategoryContentForClientHomePage = [];
            $scope.ShowContentDontBlank = false;
            $scope.ShowContentBlank = false;

            var categoryContentID = window.location.search.split('=')[1];
            clientHomePageService.getContentByCategoryContentForClientHomePage(categoryContentID).then(function (response) {
                if (response.status === 200) {
                    $scope.GetContentByCategoryContentForClientHomePage = response.data.Data;
                    if ($scope.GetContentByCategoryContentForClientHomePage !== null) {
                        $scope.ShowContentDontBlank = true;
                        $scope.ShowContentBlank = false;
                    }
                    else {
                        $scope.ShowContentDontBlank = false;
                        $scope.ShowContentBlank = true;
                    }
                }
            });

            clientHomePageService.getCategoryContentForClientHomePage(categoryContentID).then(function (response) {
                if (response.status === 200) {
                    $scope.GetCategoryContentForClientHomePage = response.data.Data;
                }
            });

        }]);

})(window.angular);