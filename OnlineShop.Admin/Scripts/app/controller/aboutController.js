(function (angular) {
    'use strict';

    osApp.controller('aboutController', [
        '$scope', 'aboutService', '$window',
        function ($scope, aboutService, $window) {

            // Declare scope varibles
            $scope.AboutList = [];
            $scope.AboutDataSource = {};
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.about = {
                AboutID: 0,
                Name: STRING_EMPTY,
                Description: STRING_EMPTY,
                Image: STRING_EMPTY,
                Detail: STRING_EMPTY,
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
                aboutService.getAllAbouts().then(function (response) {
                    if (response.status === 200) {
                        $scope.AboutList = response.data.Data;
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
                    data: $scope.AboutList,
                    pageSize: 10,
                    schema: {
                        model: aboutModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.AboutDataSource = source;
                $('#AboutTable').data('kendoGrid').setDataSource($scope.AboutDataSource);
                $('#AboutTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.AboutSection = {
                dataSource: $scope.AboutDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditAbout(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteAbout(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "AboutID" },
                    { "field": "Name", "title": "Tên Giới Thiệu", "width": "150px" },
                    {
                        "field": "Image", "title": "Hình Ảnh", "width": "150px",
                        template: '<img src="#= Image #" alt="image" style="height: 100px;" />'
                    },
                    { "field": "Description", "title": "Tiêu Đề", "width": "150px" },
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddAbout()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the About
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
                if ($scope.AboutList) {
                    var length = $scope.AboutList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.AboutList[i];
                        if (item.Name === $scope.about.Name) {
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
                    var data = angular.copy($scope.about);
                    aboutService.insertAbouts(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownAbout").data("kendoWindow").close();
                            bootbox.alert(MSG_ABOUT_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownAbout").data("kendoWindow").close();
                            bootbox.alert(MSG_ABOUT_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the About
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
                if ($scope.AboutList) {
                    var length = $scope.AboutList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.AboutList[i];
                        if (item.Name === $scope.about.Name && item.AboutID !== $scope.about.AboutID) {
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
                    var data = angular.copy($scope.about);
                    aboutService.updateAbouts(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownAbout").data("kendoWindow").close();
                            bootbox.alert(MSG_ABOUT_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownAbout").data("kendoWindow").close();
                            bootbox.alert(MSG_ABOUT_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete About
            $scope.DeleteAbout = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        aboutService.deleteAbouts(data).then(function (response) {
                            if (response.status === 200) {
                                bootbox.alert(MSG_ABOUT_DELETED);
                                $scope.loadIndexData();
                            }
                            else {
                                bootbox.alert(MSG_ABOUT_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close About
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownAbout").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add About 
            $scope.AddAbout = function () {

                $scope.IsSave = false;
                $scope.about = {
                    AboutID: 0,
                    Name: STRING_EMPTY,
                    Description: STRING_EMPTY,
                    Image: STRING_EMPTY,
                    Detail: STRING_EMPTY,
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

                var addNewAWindow = $("#KenWindownAbout").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewAClosed,
                    resizable: false,
                    width: "85%"

                }).data('kendoWindow');
                addNewAWindow.title("Thêm Mới Dữ Liệu");
                addNewAWindow.open();
                $scope.aboutValid.$setUntouched();
                addNewAWindow.center();
            };

            // Edit About
            $scope.EditAbout = function (dataItem) {
                $scope.about = {
                    AboutID: 0,
                    Name: STRING_EMPTY,
                    Description: STRING_EMPTY,
                    Image: STRING_EMPTY,
                    Detail: STRING_EMPTY,
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

                $scope.about.AboutID = dataItem.AboutID;
                $scope.about.Name = dataItem.Name;
                $scope.about.Description = dataItem.Description;
                $scope.about.Image = dataItem.Image;
                $scope.about.Detail = dataItem.Detail;

                $scope.about.Status = dataItem.Status;
                $scope.about.CreatedBy = dataItem.CreatedBy;
                $scope.about.CreatedByName = dataItem.CreatedByName;
                $scope.about.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.about.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.about.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.about.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.about.IsDelete = dataItem.IsDelete;

                var updateEditAWindow = $("#KenWindownAbout").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewAClosed,
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
                if ($scope.AboutList) {
                    var length = $scope.AboutList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.AboutList[i];
                        if (item.Name === $scope.about.Name && item.AboutID !== $scope.about.AboutID) {
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
                    $scope.about.Image = fileUrl;
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

        }]);

})(window.angular);