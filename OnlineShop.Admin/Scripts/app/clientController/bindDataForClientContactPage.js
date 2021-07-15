(function (angular) {
    'use strict';

    osApp.controller('bindDataForClientContactPage', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {


            // Declare scope varibles
            $scope.BindDataForClientContactPage = [];
            $scope.IsSave = false;
            $scope.formErrors = {};

            $scope.feebback = {
                FeedBackID: 0,
                Name: STRING_EMPTY,
                Phone: STRING_EMPTY,
                Email: STRING_EMPTY,
                Address: STRING_EMPTY,
                Content: STRING_EMPTY,
                Status: false,
                CreatedDate: STRING_EMPTY,
                LastUpdatedBy: STRING_EMPTY,
                LastUpdatedByName: STRING_EMPTY,
                LastUpdatedDate: STRING_EMPTY,
                IsDelete: false
            };

            clientHomePageService.bindDataForClientContactPage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindDataForClientContactPage = response.data.Data;
                }
            });

            // Save the
            $scope.save = function (form) {
                $scope.IsSave = true;
                if (form !== null && !form.$valid) {
                    return;
                }

                var data = angular.copy($scope.feebback);
                clientHomePageService.insertFeedBacks(data).then(function success(response) {
                    if (response.status === 200) {
                        bootbox.alert(MSG_FEEDBACK_SAVED, function () {
                            window.location = "/Client/HomeClient/Contact";
                        });
                    }
                    else {
                        bootbox.alert(MSG_FEEDBACK_SAVED_FAIL);
                    }
                });
            };

            // Check valid
            $scope.formHasError = function () {
                var hasErrors = false;
                for (var input in $scope.formErrors) {
                    hasErrors = hasErrors || $scope.formErrors[input];
                }
                hasErrors = hasErrors;
                return hasErrors;
            };

            $scope.showErrorMsg = function (input) {
                if (!input) return false;
                if ($scope.IsSave) input.$touched = $scope.IsSave;
                var hasError = (input.$touched || $scope.IsSave) && (input.$error.required || input.$error.invalid);
                $scope.formErrors[input.$name] = hasError;
                return hasError;
            };

        }]);

})(window.angular);