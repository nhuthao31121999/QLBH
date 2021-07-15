(function (angular) {
    'use strict';

    osApp.controller('categoryContentController', [
        '$scope', 'categoryContentService', '$window',
        function ($scope, categoryContentService, $window) {

            // Declare scope varibles
            $scope.CategoryContentList = [];
            $scope.CategoryContentDataSource = {};
            $scope.ParentDropdownlist = [];
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.categorycontent = {
                CategoryContentID: 0,
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
                categoryContentService.getAllCategoryContent().then(function (response) {
                    if (response.status === 200) {
                        $scope.CategoryContentList = response.data.Data;
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
                    data: $scope.CategoryContentList,
                    pageSize: 10,
                    schema: {
                        model: categoryContentModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.CategoryContentDataSource = source;
                $('#CategoryContentTable').data('kendoGrid').setDataSource($scope.CategoryContentDataSource);
                $('#CategoryContentTable').data('kendoGrid').refresh();
            };

            // Get all GetAllCategoryContentForCategoryContentParent
            categoryContentService.getAllCategoryContentForCategoryContentParent().then(function (response) {
                $scope.ParentDropdownlist = angular.copy(response.data.Data);
            });

            // Designer gird
            $scope.CategoryContentSection = {
                dataSource: $scope.CategoryContentDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditCategoryContent(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteCategoryContent(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "CategoryContentID" },
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddCategoryContent()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the CategoryContent
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
                if ($scope.CategoryContentList) {
                    var length = $scope.CategoryContentList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.CategoryContentList[i];
                        if (item.Name === $scope.categorycontent.Name) {
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
                    var data = angular.copy($scope.categorycontent);
                    categoryContentService.insertCategoryContent(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownCategoryContent").data("kendoWindow").close();
                            bootbox.alert(MSG_CATEGORYCONTENT_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownCategoryContent").data("kendoWindow").close();
                            bootbox.alert(MSG_CATEGORYCONTENT_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the CategoryContent
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
                if ($scope.CategoryContentList) {
                    var length = $scope.CategoryContentList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.CategoryContentList[i];
                        if (item.Name === $scope.categorycontent.Name && item.CategoryContentID !== $scope.categorycontent.CategoryContentID) {
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
                    var data = angular.copy($scope.categorycontent);
                    categoryContentService.updateCategoryContent(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownCategoryContent").data("kendoWindow").close();
                            bootbox.alert(MSG_CATEGORYCONTENT_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownCategoryContent").data("kendoWindow").close();
                            bootbox.alert(MSG_CATEGORYCONTENT_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete CategoryContent
            $scope.DeleteCategoryContent = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        categoryContentService.deleteCategoryContent(data).then(function (response) {
                            if (response.status === 200) {
                                if (response.data.Data === 0) {
                                    bootbox.alert(MSG_DELETE_ERROR_CATEGORYCONTENT);
                                }
                                else {
                                    bootbox.alert(MSG_CATEGORYCONTENT_DELETED);
                                    $scope.loadIndexData();
                                }
                            }
                            else {
                                bootbox.alert(MSG_CATEGORYCONTENT_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close CategoryContent
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownCategoryContent").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add CategoryContent 
            $scope.AddCategoryContent = function () {
                $scope.IsSave = false;
                $scope.categorycontent = {
                    CategoryContentID: 0,
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

                var addNewCCWindow = $("#KenWindownCategoryContent").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewCCClosed,
                    resizable: false,
                    width: "85%"

                }).data('kendoWindow');
                addNewCCWindow.title("Thêm Mới Dữ Liệu");
                addNewCCWindow.open();
                $scope.categoryContentValid.$setUntouched();
                addNewCCWindow.center();
            };

            // Edit CategoryContent
            $scope.EditCategoryContent = function (dataItem) {
                $scope.categorycontent = {
                    CategoryContentID: 0,
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

                $scope.categorycontent.CategoryContentID = dataItem.CategoryContentID;
                $scope.categorycontent.Name = dataItem.Name;
                $scope.categorycontent.ParentId = dataItem.ParentId;
                $scope.categorycontent.ParentName = dataItem.ParentName;
                $scope.categorycontent.DisplayOrder = dataItem.DisplayOrder;

                $scope.categorycontent.Status = dataItem.Status;
                $scope.categorycontent.CreatedBy = dataItem.CreatedBy;
                $scope.categorycontent.CreatedByName = dataItem.CreatedByName;
                $scope.categorycontent.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.categorycontent.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.categorycontent.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.categorycontent.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.categorycontent.IsDelete = dataItem.IsDelete;

                var updateEditCCWindow = $("#KenWindownCategoryContent").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewCCClosed,
                    resizable: false,
                    width: "85%"
                }).data('kendoWindow');
                updateEditCCWindow.title("Sửa Dữ Liệu");
                updateEditCCWindow.open();
                updateEditCCWindow.center();
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
                if ($scope.CategoryContentList) {
                    var length = $scope.CategoryContentList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.CategoryContentList[i];
                        if (item.Name === $scope.categorycontent.Name && item.CategoryContentID !== $scope.categorycontent.CategoryContentID) {
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