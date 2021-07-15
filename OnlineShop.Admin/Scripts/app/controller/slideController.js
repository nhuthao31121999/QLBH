(function (angular) {
    'use strict';

    osApp.controller('slideController', [
        '$scope', 'slideService', '$window',
        function ($scope, slideService, $window) {

            // Declare scope varibles
            $scope.SlideList = [];
            $scope.SlideDataSource = {};
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.slide = {
                SlideID: 0,
                Image: STRING_EMPTY,
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
                slideService.getAllSlides().then(function (response) {
                    if (response.status === 200) {
                        $scope.SlideList = response.data.Data;
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
                    data: $scope.SlideList,
                    pageSize: 10,
                    schema: {
                        model: slideModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.SlideDataSource = source;
                $('#SlideTable').data('kendoGrid').setDataSource($scope.SlideDataSource);
                $('#SlideTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.SlideSection = {
                dataSource: $scope.SlideDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditSlide(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteSlide(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "SlideID" },
                    {
                        "field": "Image", "title": "Hình Ảnh", "width": "150px",
                        template: '<img src="#= Image #" alt="image" style="height: 110px;width: 240px;" />'
                    },
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddSlide()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the Slide
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
                if ($scope.SlideList) {
                    var length = $scope.SlideList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.SlideList[i];
                        if (item.DisplayOrder === parseInt($scope.slide.DisplayOrder)) {
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
                    var data = angular.copy($scope.slide);
                    slideService.insertSlides(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownSlide").data("kendoWindow").close();
                            bootbox.alert(MSG_SLIDE_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownSlide").data("kendoWindow").close();
                            bootbox.alert(MSG_SLIDE_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the Slide
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
                if ($scope.SlideList) {
                    var length = $scope.SlideList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.SlideList[i];
                        if (item.DisplayOrder === parseInt($scope.slide.DisplayOrder) && item.SlideID !== $scope.slide.SlideID) {
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
                    var data = angular.copy($scope.slide);
                    slideService.updateSlides(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownSlide").data("kendoWindow").close();
                            bootbox.alert(MSG_SLIDE_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownSlide").data("kendoWindow").close();
                            bootbox.alert(MSG_SLIDE_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete Slide
            $scope.DeleteSlide = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        slideService.deleteSlides(data).then(function (response) {
                            if (response.status === 200) {
                                bootbox.alert(MSG_SLIDE_DELETED);
                                $scope.loadIndexData();
                            }
                            else {
                                bootbox.alert(MSG_SLIDE_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close Slide
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownSlide").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add Slide 
            $scope.AddSlide = function () {

                $scope.IsSave = false;
                $scope.slide = {
                    SlideID: 0,
                    Image: STRING_EMPTY,
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

                var addNewSWindow = $("#KenWindownSlide").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewSClosed,
                    resizable: false,
                    width: "85%"

                }).data('kendoWindow');
                addNewSWindow.title("Thêm Mới Dữ Liệu");
                addNewSWindow.open();
                $scope.slideValid.$setUntouched();
                addNewSWindow.center();
            };

            // Edit Slide
            $scope.EditSlide = function (dataItem) {
                $scope.slide = {
                    SlideID: 0,
                    Image: STRING_EMPTY,
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

                $scope.slide.SlideID = dataItem.SlideID;
                $scope.slide.Image = dataItem.Image;
                $scope.slide.DisplayOrder = dataItem.DisplayOrder;

                $scope.slide.Status = dataItem.Status;
                $scope.slide.CreatedBy = dataItem.CreatedBy;
                $scope.slide.CreatedByName = dataItem.CreatedByName;
                $scope.slide.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.slide.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.slide.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.slide.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.slide.IsDelete = dataItem.IsDelete;

                var updateEditAWindow = $("#KenWindownSlide").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewSClosed,
                    resizable: false,
                    width: "85%"
                }).data('kendoWindow');
                updateEditAWindow.title("Sửa Dữ Liệu");
                updateEditAWindow.open();
                updateEditAWindow.center();
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
                if ($scope.SlideList) {
                    var length = $scope.SlideList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.SlideList[i];
                        if (item.DisplayOrder === parseInt($scope.slide.DisplayOrder) && item.SlideID !== $scope.slide.SlideID) {
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
                    $scope.slide.Image = fileUrl;
                    $scope.$apply();
                };
                finder.popup();
            };

        }]);

})(window.angular);