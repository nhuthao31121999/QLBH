(function (angular) {
    'use strict';

    osApp.controller('bindDataForClientAboutPage', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {


            // Declare scope varibles
            $scope.BindDataForClientAboutPage = [];

            clientHomePageService.bindDataForClientAboutPage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindDataForClientAboutPage = response.data.Data;
                }
            });

        }]);

})(window.angular);