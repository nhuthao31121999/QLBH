(function (angular) {
    'use strict';

    osApp.controller('productController', [
        '$scope', 'productService', '$window',
        function ($scope, productService, $window) {

            // Declare scope varibles
            $scope.ProductList = [];
            $scope.CategoriesDropdownlist = [];
            $scope.ProducerDropdownlist = [];
            $scope.ProductDataSource = {};
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.WarrantyDropdownlist = [];
            $scope.WarrantyDropdownlist.push({ Name: '3 Tháng', Id: '3 Tháng' });
            $scope.WarrantyDropdownlist.push({ Name: '6 Tháng', Id: '6 Tháng' });
            $scope.WarrantyDropdownlist.push({ Name: '1 Năm', Id: '1 Năm' });

            $scope.product = {
                ProductID: 0,
                Name: STRING_EMPTY,
                Code: STRING_EMPTY,
                Price: 0,
                Discount: 0,
                Image: STRING_EMPTY,
                Available: false,
                Description: STRING_EMPTY,
                Detail: STRING_EMPTY,
                Warranty: STRING_EMPTY,
                Quantity: 0,
                Special: STRING_EMPTY,
                Views: STRING_EMPTY,
                CategoryID: STRING_EMPTY,
                ProducerID: STRING_EMPTY,
                Status: false,
                CreatedBy: STRING_EMPTY,
                CreatedByName: STRING_EMPTY,
                CreatedDate: STRING_EMPTY,
                LastUpdatedBy: STRING_EMPTY,
                LastUpdatedByName: STRING_EMPTY,
                LastUpdatedDate: STRING_EMPTY,
                IsDelete: false
            };


            // Get all data to grid
            $scope.loadIndexData = function () {
                loadingOS();
                productService.getAllProducts().then(function (response) {
                    if (response.status === 200) {
                        $scope.ProductList = response.data.Data;
                        $scope.RefreshGrid();
                        stopLoadingOS();
                    }
                });
            };

            $(document).ready(function () {
                $scope.loadIndexData();
                //$('.navbar-right ul li').removeClass('active');
                //$('.navbar-right ul li:nth-child(5)').addClass('active');

            });

            $scope.RefreshGrid = function () {
                var source = new kendo.data.DataSource({
                    data: $scope.ProductList,
                    pageSize: 10,
                    schema: {
                        model: productModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.ProductDataSource = source;
                $('#ProductTable').data('kendoGrid').setDataSource($scope.ProductDataSource);
                $('#ProductTable').data('kendoGrid').refresh();
            };

            // Get all the Category for dropdowlist
            productService.getAllCategoryForProduct().then(function (response) {
                $scope.CategoriesDropdownlist = angular.copy(response.data.Data);
            });

            // Get all the Producer for dropdowlist
            productService.getAllProducerForProduct().then(function (response) {
                $scope.ProducerDropdownlist = angular.copy(response.data.Data);
            });

            //$scope.DateDayFirstSelectorOptions = {
            //    format: "dd/MM/yyyy",
            //    parseFormats: ["dd/MM/yyyy"]
            //};

            // Designer gird
            $scope.ProductSection = {
                dataSource: $scope.ProductDataSource,
                resizeable: true,
                sortable: {
                    mode: "single",
                    allowUnsort: true
                },
                filterable: {
                    extra: false,
                    operators: {
                        number: {
                            eq: 'Equal to'
                        },
                        date: {
                            eq: 'Equal to'
                        },
                        string: {
                            contains: "Contains",
                            startswith: "Starts with",
                            eq: "Is equal to",
                            neq: "Is not equal to"
                        }
                    }
                },
                pageable: { "refresh": false, "pageSize": 10, "pageSizes": [10, 50, 100] },
                columns: [
                    {
                        "command": [
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditProduct(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteProduct(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "ProductID" },
                    { "field": "Code", "title": "Mã Sản Phẩm", "width": "150px" },
                    { "field": "Name", "title": "Tên Sản Phẩm", "width": "150px" },
                    {
                        "field": "Image", "title": "Hình Ảnh", "width": "150px",
                        template: '<img src="#= Image #" alt="image" style="height: 100px;" />'
                    },
                    { "field": "Price", "title": "Đơn Giá", "width": "150px", template: "<span>#= kendo.format('{0:n0}', parseFloat(Price)) # <sup>vnđ</sup> " },
                    //{ "field": "Price", "title": "Đơn Giá", "width": "150px", template: "<span>#= introduceDot(Price) # <sup>vnđ</sup> " },
                    { "field": "CreatedByName", "title": "Người Tạo", "width": "150px" },
                    {
                        "field": "CreatedDate", "title": "Ngày Tạo", "width": "150px", template: "<span>#= (CreatedDate == 0 || CreatedDate == null) ? '' : kendo.toString(kendo.parseDate(CreatedDate, 'dd/MM/yyyy'), 'dd/MM/yyyy') # ", format: "{0:dd/MM/yyyy}", parseFomats: "{0:dd/MM/yyyy}", filterable: {
                            ui: function (element) {
                                element.kendoDatePicker({
                                    format: "dd/MM/yyyy"
                                });
                            }
                        }
                    },
                    {
                        "field": "Status", "title": "Trạng Thái", "width": "150px",
                        template: "<span>#= (Status == true) ? 'Kích Hoạt': 'Khóa' # ",
                        type: "boolean",
                        filterable: {
                            messages: {
                                info: "Sắp xếp:",
                                isTrue: "Kích Hoạt",
                                isFalse: "Khóa"
                            }
                        }
                    }
                ],
                toolbar: [
                    {
                        template:
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddProduct()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the Product
            $scope.save = function (form) {
                $scope.IsSave = true;
                if (form !== null && !form.$valid) {
                    $scope.DisabledBtnSave = false;
                    return;
                }
                else {
                    $scope.DisabledBtnSave = true;
                }

                var hasDuplicate = false;
                if ($scope.ProductList) {
                    var length = $scope.ProductList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ProductList[i];
                        if (item.Code === $scope.product.Code) {
                            hasDuplicate = true;
                            break;
                        }
                    }
                }

                //check duplicate Name
                if (hasDuplicate) {
                    // show message 
                    $scope.CheckDuplicate = true;
                    $scope.DisabledBtnSave = false;
                    return;
                }
                else {
                    loadingPopUpOS();
                    $scope.CheckDuplicate = false;
                    var data = angular.copy($scope.product);
                    data.Special = kendo.toString(data.Special, "dd/MMM/yyyy");
                    productService.insertProducts(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownProduct").data("kendoWindow").close();
                            bootbox.alert(MSG_PRODUCT_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownProduct").data("kendoWindow").close();
                            bootbox.alert(MSG_PRODUCT_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the Product
            $scope.update = function (form) {
                $scope.IsSave = true;
                if (form !== null && !form.$valid) {
                    $scope.DisabledBtnUpdate = false;
                    return;
                }
                else {
                    $scope.DisabledBtnUpdate = true;
                }

                var hasDuplicate = false;
                if ($scope.ProductList) {
                    var length = $scope.ProductList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ProductList[i];
                        if (item.Code === $scope.product.Code && item.ProductID !== $scope.product.ProductID) {
                            hasDuplicate = true;
                            break;
                        }
                    }
                }

                //check duplicate Name
                if (hasDuplicate) {
                    $scope.CheckDuplicate = true;
                    $scope.DisabledBtnUpdate = false;
                    // show message 
                    return;
                }
                else {
                    loadingPopUpOS();
                    $scope.CheckDuplicate = false;
                    var data = angular.copy($scope.product);
                    data.Special = kendo.toString(data.Special, "dd/MMM/yyyy");
                    productService.updateProducts(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownProduct").data("kendoWindow").close();
                            bootbox.alert(MSG_PRODUCT_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownProduct").data("kendoWindow").close();
                            bootbox.alert(MSG_PRODUCT_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete Product
            $scope.DeleteProduct = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        productService.deleteProducts(data).then(function (response) {
                            if (response.status === 200) {
                                bootbox.alert(MSG_PRODUCT_DELETED);
                                $scope.loadIndexData();
                            }
                            else {
                                bootbox.alert(MSG_PRODUCT_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close Product
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownProduct").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add Product 
            $scope.AddProduct = function () {

                $scope.IsSave = false;
                $scope.product = {
                    ProductID: 0,
                    Name: STRING_EMPTY,
                    Code: STRING_EMPTY,
                    Price: 0,
                    Discount: 0,
                    Image: STRING_EMPTY,
                    Available: false,
                    Description: STRING_EMPTY,
                    Detail: STRING_EMPTY,
                    Warranty: STRING_EMPTY,
                    Quantity: 0,
                    Special: STRING_EMPTY,
                    Views: STRING_EMPTY,
                    CategoryID: STRING_EMPTY,
                    ProducerID: STRING_EMPTY,
                    Status: false,
                    CreatedBy: STRING_EMPTY,
                    CreatedByName: STRING_EMPTY,
                    CreatedDate: STRING_EMPTY,
                    LastUpdatedBy: STRING_EMPTY,
                    LastUpdatedByName: STRING_EMPTY,
                    LastUpdatedDate: STRING_EMPTY,
                    IsDelete: false
                };
                $scope.ShowBtnSave = true;
                $scope.CheckDuplicate = false;
                $scope.ShowBtnUpdate = false;
                $scope.DisabledBtnSave = false;

                var addNewPWindow = $("#KenWindownProduct").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewPClosed,
                    resizable: false,
                    width: "85%"

                }).data('kendoWindow');
                addNewPWindow.title("Thêm Mới Dữ Liệu");
                addNewPWindow.open();
                $scope.productValid.$setUntouched();
                addNewPWindow.center();

                var category_dropdownlist = $('#CategoryID').data('kendoMultiColumnComboBox');
                category_dropdownlist.value(STRING_EMPTY);
                category_dropdownlist.text(STRING_EMPTY);
                $('#CategoryID').data('kendoMultiColumnComboBox').refresh();

                var producer_dropdownlist = $('#ProducerID').data('kendoMultiColumnComboBox');
                producer_dropdownlist.value(STRING_EMPTY);
                producer_dropdownlist.text(STRING_EMPTY);
                $('#ProducerID').data('kendoMultiColumnComboBox').refresh();
            };

            // Edit Product
            $scope.EditProduct = function (dataItem) {
                $scope.product = {
                    ProductID: 0,
                    Name: STRING_EMPTY,
                    Code: STRING_EMPTY,
                    Price: 0,
                    Discount: 0,
                    Image: STRING_EMPTY,
                    Available: false,
                    Description: STRING_EMPTY,
                    Detail: STRING_EMPTY,
                    Warranty: STRING_EMPTY,
                    Quantity: 0,
                    Special: STRING_EMPTY,
                    Views: STRING_EMPTY,
                    CategoryID: STRING_EMPTY,
                    ProducerID: STRING_EMPTY,
                    Status: false,
                    CreatedBy: STRING_EMPTY,
                    CreatedByName: STRING_EMPTY,
                    CreatedDate: STRING_EMPTY,
                    LastUpdatedBy: STRING_EMPTY,
                    LastUpdatedByName: STRING_EMPTY,
                    LastUpdatedDate: STRING_EMPTY,
                    IsDelete: false
                };

                $scope.ShowBtnSave = false;
                $scope.ShowBtnUpdate = true;
                $scope.DisabledBtnUpdate = false;
                $scope.CheckDuplicate = false;

                $scope.product.ProductID = dataItem.ProductID;
                $scope.product.Name = dataItem.Name;
                $scope.product.Code = dataItem.Code;
                $scope.product.Price = dataItem.Price;
                $scope.product.Discount = dataItem.Discount;
                $scope.product.Image = dataItem.Image;
                $scope.product.Available = dataItem.Available;
                $scope.product.Description = dataItem.Description;
                $scope.product.Detail = dataItem.Detail;
                $scope.product.Warranty = dataItem.Warranty;
                $scope.product.Quantity = dataItem.Quantity;
                $scope.product.Special = dataItem.Special;
                $scope.product.Views = dataItem.Views;
                $scope.product.CategoryID = dataItem.CategoryID;
                $scope.product.ProducerID = dataItem.ProducerID;

                $scope.product.Status = dataItem.Status;
                $scope.product.CreatedBy = dataItem.CreatedBy;
                $scope.product.CreatedByName = dataItem.CreatedByName;
                $scope.product.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.product.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.product.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.product.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.product.IsDelete = dataItem.IsDelete;

                var updateEditPWindow = $("#KenWindownProduct").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewPClosed,
                    resizable: false,
                    width: "85%"
                }).data('kendoWindow');
                updateEditPWindow.title("Sửa Dữ Liệu");
                updateEditPWindow.open();
                updateEditPWindow.center();
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
                if ($scope.ProductList) {
                    var length = $scope.ProductList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ProductList[i];
                        if (item.Code === $scope.product.Code && item.ProductID !== $scope.product.ProductID) {
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

            $scope.ChoonseImage = function () {
                var finder = new CKFinder();
                finder.selectActionFunction = function (fileUrl) {
                    $scope.product.Image = fileUrl;
                    $scope.$apply();
                };
                finder.popup();
            };

            // Custom Content Email Editor
            $scope.CustomDetailEditorOptions = {
                resizable: {
                    content: false,
                    toolbar: false
                },
                encoded: false,
                tools: [
                    "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "createTable", "tableWizard", "viewHtml", "fontSize", "foreColor", "backColor"
                ]
            };

            $scope.OnPriceChange = function () {
                if ($scope.product.Price === '' || $scope.product.Price === undefined)
                    $scope.product.Price = null;
            };

            $scope.OnDiscountChange = function () {
                if ($scope.product.Discount === '' || $scope.product.Discount === undefined)
                    $scope.product.Discount = null;
            };

            $scope.OnQuantityChange = function () {
                if ($scope.product.Quantity === '' || $scope.product.Quantity === undefined)
                    $scope.product.Quantity = null;
            };
        }]);

})(window.angular);