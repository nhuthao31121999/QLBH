(function (angular) {
    'use strict';

    osApp.controller('clientProductByCategoryHomePage', [
        '$scope', 'clientHomePageService', '$window',
        function ($scope, clientHomePageService, $window) {

            // Declare scope varibles
            $scope.GetProductByCategoryForClientHomePage = [];
            $scope.BindFooterForClientHomePage = [];
            $scope.BindTopViewProductForClientHomePage = [];
            $scope.BindCategoryForClientHomePage = [];
            $scope.GetCategoryForClientHomePage = [];
            $scope.FilterNameASC = [];
            $scope.FilterNewProduct = [];
            $scope.FilterPriceASC = [];
            $scope.FilterPriceDESC = [];
            $scope.FilterTopViewProduct = [];
            $scope.ShowProductDontBlank = false;
            $scope.ShowProductBlank = false;

            $scope.sapxepsanpham = false;
            $scope.ShowFilterNameASC = false;
            $scope.ShowFilterNewProduct = false;
            $scope.ShowFilterPriceASC = false;
            $scope.ShowFilterPriceDESC = false;
            $scope.ShowFilterTopViewProduct = false;

            $scope.FilterDropdownlist = [];
            $scope.FilterDropdownlist.push({ Name: 'Sắp xếp sản phẩm', Id: '0' });
            $scope.FilterDropdownlist.push({ Name: 'Mới nhất', Id: '1' });
            $scope.FilterDropdownlist.push({ Name: 'Giá: thấp -> cao', Id: '2' });
            $scope.FilterDropdownlist.push({ Name: 'Giá: cao -> thấp', Id: '3' });
            $scope.FilterDropdownlist.push({ Name: 'Xem nhiều nhất', Id: '4' });
            $scope.FilterDropdownlist.push({ Name: 'Tên A -> Z', Id: '5' });

            var categoryID = window.location.search.split('=')[1];
            clientHomePageService.getProductByCategoryForClientHomePage(categoryID).then(function (response) {
                if (response.status === 200) {
                    $scope.GetProductByCategoryForClientHomePage = response.data.Data;
                    if ($scope.GetProductByCategoryForClientHomePage !== null) {
                        $scope.ShowProductDontBlank = true;
                        $scope.ShowProductBlank = false;
                    } else {
                        $scope.ShowProductDontBlank = false;
                        $scope.ShowProductBlank = true;
                    }
                }
            });

            clientHomePageService.filterNameASC(categoryID).then(function (response) {
                if (response.status === 200) {
                    $scope.FilterNameASC = response.data.Data;
                    if ($scope.FilterNameASC !== null) {
                        $scope.ShowProductDontBlank = true;
                        $scope.ShowProductBlank = false;
                    } else {
                        $scope.ShowProductDontBlank = false;
                        $scope.ShowProductBlank = true;
                    }
                }
            });

            clientHomePageService.filterNewProduct(categoryID).then(function (response) {
                if (response.status === 200) {
                    $scope.FilterNewProduct = response.data.Data;
                    if ($scope.FilterNewProduct !== null) {
                        $scope.ShowProductDontBlank = true;
                        $scope.ShowProductBlank = false;
                    } else {
                        $scope.ShowProductDontBlank = false;
                        $scope.ShowProductBlank = true;
                    }
                }
            });

            clientHomePageService.filterPriceASC(categoryID).then(function (response) {
                if (response.status === 200) {
                    $scope.FilterPriceASC = response.data.Data;
                    if ($scope.FilterPriceASC !== null) {
                        $scope.ShowProductDontBlank = true;
                        $scope.ShowProductBlank = false;
                    } else {
                        $scope.ShowProductDontBlank = false;
                        $scope.ShowProductBlank = true;
                    }
                }
            });

            clientHomePageService.filterPriceDESC(categoryID).then(function (response) {
                if (response.status === 200) {
                    $scope.FilterPriceDESC = response.data.Data;
                    if ($scope.FilterPriceDESC !== null) {
                        $scope.ShowProductDontBlank = true;
                        $scope.ShowProductBlank = false;
                    } else {
                        $scope.ShowProductDontBlank = false;
                        $scope.ShowProductBlank = true;
                    }
                }
            });

            clientHomePageService.filterTopViewProduct(categoryID).then(function (response) {
                if (response.status === 200) {
                    $scope.FilterTopViewProduct = response.data.Data;
                    if ($scope.FilterTopViewProduct !== null) {
                        $scope.ShowProductDontBlank = true;
                        $scope.ShowProductBlank = false;
                    } else {
                        $scope.ShowProductDontBlank = false;
                        $scope.ShowProductBlank = true;
                    }
                }
            });

            clientHomePageService.getCategoryForClientHomePage(categoryID).then(function (response) {
                if (response.status === 200) {
                    $scope.GetCategoryForClientHomePage = response.data.Data;
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

            clientHomePageService.bindCategoryForClientHomePage().then(function (response) {
                if (response.status === 200) {
                    $scope.BindCategoryForClientHomePage = response.data.Data;
                    $scope.BindCategoryForClientHomePage.forEach(item => {
                        item.isActive = item.CategoryID === parseInt(categoryID);
                    });
                }
            });

            $scope.ChangeShowFilter = function () {
                if ($scope.filter && $scope.filter === '0') {
                    $scope.sapxepsanpham = true;
                    $scope.ShowFilterNameASC = false;
                    $scope.ShowFilterNewProduct = false;
                    $scope.ShowFilterPriceASC = false;
                    $scope.ShowFilterPriceDESC = false;
                    $scope.ShowFilterTopViewProduct = false;
                }
                else if ($scope.filter && $scope.filter === '1') {
                    $scope.sapxepsanpham = false;
                    $scope.ShowFilterNameASC = true;
                    $scope.ShowFilterNewProduct = false;
                    $scope.ShowFilterPriceASC = false;
                    $scope.ShowFilterPriceDESC = false;
                    $scope.ShowFilterTopViewProduct = false;
                }
                else if ($scope.filter && $scope.filter === '2') {
                    $scope.sapxepsanpham = false;
                    $scope.ShowFilterNameASC = false;
                    $scope.ShowFilterNewProduct = true;
                    $scope.ShowFilterPriceASC = false;
                    $scope.ShowFilterPriceDESC = false;
                    $scope.ShowFilterTopViewProduct = false;
                }
                else if ($scope.filter && $scope.filter === '3') {
                    $scope.sapxepsanpham = false;
                    $scope.ShowFilterNameASC = false;
                    $scope.ShowFilterNewProduct = false;
                    $scope.ShowFilterPriceASC = true;
                    $scope.ShowFilterPriceDESC = false;
                    $scope.ShowFilterTopViewProduct = false;
                }
                else if ($scope.filter && $scope.filter === '4') {
                    $scope.sapxepsanpham = false;
                    $scope.ShowFilterNameASC = false;
                    $scope.ShowFilterNewProduct = false;
                    $scope.ShowFilterPriceASC = false;
                    $scope.ShowFilterPriceDESC = true;
                    $scope.ShowFilterTopViewProduct = false;
                }
                else if ($scope.filter && $scope.filter === '5') {
                    $scope.sapxepsanpham = false;
                    $scope.ShowFilterNameASC = false;
                    $scope.ShowFilterNewProduct = false;
                    $scope.ShowFilterPriceASC = false;
                    $scope.ShowFilterPriceDESC = false;
                    $scope.ShowFilterTopViewProduct = true;
                }
            };

        }]);


})(window.angular);
