(function (angular) {
    'use strict';

    osApp.controller('paymentShoppingCartController', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {


            // Declare scope varibles
            $scope.EnableShoppingCart = false;
            $scope.IsSave = false;
            $scope.formErrors = {};

            $scope.PaymentMethodCOD = "COD";
            $scope.PaymentMethodCK = "Chuyển khoản";
            $scope.PaymentMethodATM = "Thanh toán bằng thẻ visa và master";

            $scope.order = {
                OrderID: 0,
                OrderName: STRING_EMPTY,
                OrderMobile: STRING_EMPTY,
                OrderAdress: STRING_EMPTY,
                OrderEmail: STRING_EMPTY,
                PaymentMethod: STRING_EMPTY,
                Status: STRING_EMPTY,
                CreatedDate: STRING_EMPTY,
                LastUpdatedBy: STRING_EMPTY,
                LastUpdatedByName: STRING_EMPTY,
                LastUpdatedDate: STRING_EMPTY,
                IsDelete: false
            };

            // Save the Order
            $scope.save = function (form) {
                $scope.IsSave = true;
                if (form !== null && !form.$valid) {
                    return;
                }

                if ($("#engine1")[0].checked === true) {
                    $scope.order.PaymentMethod = $scope.PaymentMethodCOD;
                }

                if ($("#engine2")[0].checked === true) {
                    $scope.order.PaymentMethod = $scope.PaymentMethodATM;
                }

                if ($("#engine3")[0].checked === true) {
                    $scope.order.PaymentMethod = $scope.PaymentMethodCK;
                }
                var data = angular.copy($scope.order);

                clientHomePageService.insertOrders(data).then(function success(response) {
                    if (response.status === 200) {
                        bootbox.alert(MSG_ORDER_SAVED, function () {
                            window.location = "/Client/HomeClient";
                        });
                    }
                    else {
                        bootbox.alert(MSG_ORDER_SAVED_FAIL);
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

            $scope.ShowPayment = function () {
                $scope.EnableShoppingCart = true;
            };

            $scope.close = function () {
                $scope.EnableShoppingCart = false;
            };

        }]);

})(window.angular);