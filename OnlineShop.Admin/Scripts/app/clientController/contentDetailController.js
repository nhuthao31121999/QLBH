(function (angular) {
    'use strict';

    osApp.controller('contentDetailController', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {


            // Declare scope varibles
            $scope.GetContentByIdForClientHomePage = {};
            $scope.BindContentRelatedForClientContentDetailPage = [];

            var contentID = window.location.search.split('=')[1];
            clientHomePageService.getContentByIdForClientHomePage(contentID).then(function (response) {
                if (response.status === 200) {
                    $scope.GetContentByIdForClientHomePage = response.data.Data;
                }
            });

            clientHomePageService.bindContentRelatedForClientContentDetailPage(contentID).then(function (response) {
                if (response.status === 200) {
                    $scope.BindContentRelatedForClientContentDetailPage = response.data.Data;
                }
            });

        }]);

})(window.angular);