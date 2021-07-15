(function (angular) {
    'use strict';

    osApp.controller('registerForClientRegisterPage', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {


            // Declare scope varibles
            $scope.UserList = [];
            $scope.IsSave = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.register = {
                UserID: 0,
                CodeUserName: STRING_EMPTY,
                UserName: STRING_EMPTY,
                Password: STRING_EMPTY,
                Name: STRING_EMPTY,
                Address: STRING_EMPTY,
                Email: STRING_EMPTY,
                Phone: STRING_EMPTY,
                UserGroupID: STRING_EMPTY,
                UserGroupName: STRING_EMPTY,
                Status: false,
                CreatedDate: STRING_EMPTY,
                LastUpdatedDate: STRING_EMPTY,
                IsDelete: false
            };

            clientHomePageService.getAllUsers().then(function (response) {
                if (response.status === 200) {
                    $scope.UserList = response.data.Data;
                }
            });

            // Save the User
            $scope.save = function (form) {
                $scope.IsSave = true;
                if (form !== null && !form.$valid) {
                    return;
                }

                var hasDuplicate = false;
                if ($scope.UserList) {
                    var length = $scope.UserList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserList[i];
                        if (item.UserName === $scope.register.UserName) {
                            hasDuplicate = true;
                            break;
                        }
                    }
                }

                //check duplicate Name
                if (hasDuplicate) {
                    // show message 
                    $scope.CheckDuplicate = true;
                    return;
                }
                else {
                    $scope.CheckDuplicate = false;
                    var data = angular.copy($scope.register);
                    clientHomePageService.insertUsersForClient(data).then(function success(response) {
                        if (response.status === 200) {
                            bootbox.alert(MSG_REGISTER_SAVED, function () {
                                window.location = "/Client/HomeClient/Login";
                            });
                        }
                        else {
                            bootbox.alert(MSG_REGISTER_SAVED_FAIL, function () {
                                window.location = "/Client/HomeClient/Register";
                            });
                        }
                    });
                }
            };

            // Update the User
            $scope.update = function (form) {
                $scope.IsSave = true;
                if (form !== null && !form.$valid) {
                    return;
                }

                var hasDuplicate = false;
                if ($scope.UserList) {
                    var length = $scope.UserList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserList[i];
                        if (item.UserName === $scope.register.UserName && item.UserID !== $scope.register.UserID) {
                            hasDuplicate = true;
                            break;
                        }
                    }
                }

                //check duplicate Name
                if (hasDuplicate) {
                    $scope.CheckDuplicate = true;
                    // show message 
                    return;
                }
                else {
                    loadingPopUpOS();
                    $scope.CheckDuplicate = false;
                    var data = angular.copy($scope.register);
                    clientHomePageService.updateUsersForClient(data).then(function success(response) {
                        if (response.status === 200) {
                            bootbox.alert(MSG_REGISTER_UPDATED, function () {
                                window.location = "/Client/HomeClient/Register";
                            });
                        }
                        else {
                            bootbox.alert(MSG_REGISTER_UPDATED_FAIL, function () {
                                window.location = "/Client/HomeClient/Register";
                            });
                        }
                    });
                }
            };

            // Check valid
            $scope.formHasError = function () {
                var hasErrors = false;
                for (var input in $scope.formErrors) {
                    hasErrors = hasErrors || $scope.formErrors[input];
                }
                hasErrors = hasErrors || $scope.CheckDuplicate;
                return hasErrors;
            };

            $scope.showErrorMsg = function (input) {
                if (!input) return false;
                if ($scope.IsSave) input.$touched = $scope.IsSave;

                var hasDuplicate = false;
                if ($scope.UserList) {
                    var length = $scope.UserList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserList[i];
                        if (item.UserName === $scope.register.UserName && item.UserID !== $scope.register.UserID) {
                            hasDuplicate = true;
                            break;
                        }
                    }
                }
                //check duplicate name
                if (hasDuplicate) {
                    // show message 
                    $scope.CheckDuplicate = true;
                }
                else
                    $scope.CheckDuplicate = false;
                var hasError = (input.$touched || $scope.IsSave) && (input.$error.required || input.$error.invalid);
                $scope.formErrors[input.$name] = hasError;
                return hasError;
            };

        }]);

})(window.angular);