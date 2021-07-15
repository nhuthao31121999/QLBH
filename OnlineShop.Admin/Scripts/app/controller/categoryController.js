(function (angular) {
    'use strict';

    osApp.controller('categoryController', [
        '$scope', 'categoryService', '$window',
        function ($scope, categoryService, $window) {

            // Declare scope varibles
            $scope.CategoryList = [];
            $scope.CategoryDataSource = {};
            $scope.ParentDropdownlist = [];
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.category = {
                CategoryID: 0,
                Name: STRING_EMPTY,
                ParentId: STRING_EMPTY,
                ParentName: STRING_EMPTY,
                DisplayOrder: STRING_EMPTY,
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
                categoryService.getAllCategories().then(function (response) {
                    if (response.status === 200) {
                        $scope.CategoryList = response.data.Data;
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
                    data: $scope.CategoryList,
                    pageSize: 10,
                    schema: {
                        model: categoryModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.CategoryDataSource = source;
                $('#CategoryTable').data('kendoGrid').setDataSource($scope.CategoryDataSource);
                $('#CategoryTable').data('kendoGrid').refresh();
            };

            // Get all GetAllCategoryForCategoryParent
            categoryService.getAllCategoryForCategoryParent().then(function (response) {
                $scope.ParentDropdownlist = angular.copy(response.data.Data);
            });

            // Designer gird
            $scope.CategorySection = {
                dataSource: $scope.CategoryDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditCategory(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteCategory(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "CategoryID" },
                    { "field": "Name", "title": "Tên Danh Mục", "width": "150px" },
                    { "field": "ParentName", "title": "Danh Mục Cha", "width": "150px" },
                    { "field": "DisplayOrder", "title": "Thứ Tự Hiển Thị", "width": "150px" },
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddCategory()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the Category
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
                if ($scope.CategoryList) {
                    var length = $scope.CategoryList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.CategoryList[i];
                        if (item.Name === $scope.category.Name) {
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
                    var data = angular.copy($scope.category);
                    categoryService.insertCategories(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownCategory").data("kendoWindow").close();
                            bootbox.alert(MSG_CATEGORY_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownCategory").data("kendoWindow").close();
                            bootbox.alert(MSG_CATEGORY_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the Category
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
                if ($scope.CategoryList) {
                    var length = $scope.CategoryList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.CategoryList[i];
                        if (item.Name === $scope.category.Name && item.CategoryID !== $scope.category.CategoryID) {
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
                    var data = angular.copy($scope.category);
                    categoryService.updateCategories(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownCategory").data("kendoWindow").close();
                            bootbox.alert(MSG_CATEGORY_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownCategory").data("kendoWindow").close();
                            bootbox.alert(MSG_CATEGORY_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete Category
            $scope.DeleteCategory = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        categoryService.deleteCategories(data).then(function (response) {
                            if (response.status === 200) {
                                if (response.data.Data === 0) {
                                    bootbox.alert(MSG_DELETE_ERROR_CATEGORY);
                                }
                                else {
                                    bootbox.alert(MSG_CATEGORY_DELETED);
                                    $scope.loadIndexData();
                                }
                            }
                            else {
                                bootbox.alert(MSG_CATEGORY_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close Category
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownCategory").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add Category 
            $scope.AddCategory = function () {
                $scope.IsSave = false;
                $scope.category = {
                    CategoryID: 0,
                    Name: STRING_EMPTY,
                    ParentId: STRING_EMPTY,
                    ParentName: STRING_EMPTY,
                    DisplayOrder: STRING_EMPTY,
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

                var addNewCWindow = $("#KenWindownCategory").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewCClosed,
                    resizable: false,
                    width: "85%"

                }).data('kendoWindow');
                addNewCWindow.title("Thêm Mới Dữ Liệu");
                addNewCWindow.open();
                $scope.categoryValid.$setUntouched();
                addNewCWindow.center();
            };

            // Edit Category
            $scope.EditCategory = function (dataItem) {
                $scope.category = {
                    CategoryID: 0,
                    Name: STRING_EMPTY,
                    ParentId: STRING_EMPTY,
                    ParentName: STRING_EMPTY,
                    DisplayOrder: STRING_EMPTY,
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

                $scope.category.CategoryID = dataItem.CategoryID;
                $scope.category.Name = dataItem.Name;
                $scope.category.ParentId = dataItem.ParentId;
                $scope.category.ParentName = dataItem.ParentName;
                $scope.category.DisplayOrder = dataItem.DisplayOrder;

                $scope.category.Status = dataItem.Status;
                $scope.category.CreatedBy = dataItem.CreatedBy;
                $scope.category.CreatedByName = dataItem.CreatedByName;
                $scope.category.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.category.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.category.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.category.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.category.IsDelete = dataItem.IsDelete;

                var updateEditCWindow = $("#KenWindownCategory").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewCClosed,
                    resizable: false,
                    width: "85%"
                }).data('kendoWindow');
                updateEditCWindow.title("Sửa Dữ Liệu");
                updateEditCWindow.open();
                updateEditCWindow.center();
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
                if ($scope.CategoryList) {
                    var length = $scope.CategoryList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.CategoryList[i];
                        if (item.Name === $scope.category.Name && item.CategoryID !== $scope.category.CategoryID) {
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