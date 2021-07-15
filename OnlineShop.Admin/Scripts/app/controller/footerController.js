(function (angular) {
    'use strict';

    osApp.controller('footerController', [
        '$scope', 'footerService', '$window',
        function ($scope, footerService, $window) {

            // Declare scope varibles
            $scope.FooterList = [];
            $scope.FooterDataSource = {};
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.footer = {
                FooterID: 0,
                Name: STRING_EMPTY,
                Content: STRING_EMPTY,
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
                footerService.getAllFooters().then(function (response) {
                    if (response.status === 200) {
                        $scope.FooterList = response.data.Data;
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
                    data: $scope.FooterList,
                    pageSize: 10,
                    schema: {
                        model: footerModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.FooterDataSource = source;
                $('#FooterTable').data('kendoGrid').setDataSource($scope.FooterDataSource);
                $('#FooterTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.FooterSection = {
                dataSource: $scope.FooterDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditFooter(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteFooter(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "FooterID" },
                    { "field": "Name", "title": "Tên Nội Dung", "width": "150px" },
                    {
                        "field": "Content", "title": "Nội Dung", "width": "150px",
                        encoded: false, template: "#=Content#"
                    },
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddFooter()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the Footer
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
                if ($scope.FooterList) {
                    var length = $scope.FooterList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.FooterList[i];
                        if (item.Name === $scope.footer.Name) {
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
                    var data = angular.copy($scope.footer);
                    footerService.insertFooters(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownFooter").data("kendoWindow").close();
                            bootbox.alert(MSG_FOOTER_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownFooter").data("kendoWindow").close();
                            bootbox.alert(MSG_FOOTER_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the Footer
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
                if ($scope.FooterList) {
                    var length = $scope.FooterList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.FooterList[i];
                        if (item.Name === $scope.footer.Name && item.FooterID !== $scope.footer.FooterID) {
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
                    var data = angular.copy($scope.footer);
                    footerService.updateFooters(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownFooter").data("kendoWindow").close();
                            bootbox.alert(MSG_FOOTER_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownFooter").data("kendoWindow").close();
                            bootbox.alert(MSG_FOOTER_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete Footer
            $scope.DeleteFooter = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        footerService.deleteFooters(data).then(function (response) {
                            if (response.status === 200) {
                                bootbox.alert(MSG_FOOTER_DELETED);
                                $scope.loadIndexData();
                            }
                            else {
                                bootbox.alert(MSG_FOOTER_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close Footer
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownFooter").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add Footer 
            $scope.AddFooter = function () {

                $scope.IsSave = false;
                $scope.footer = {
                    FooterID: 0,
                    Name: STRING_EMPTY,
                    Content: STRING_EMPTY,
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

                var addNewFWindow = $("#KenWindownFooter").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewFClosed,
                    resizable: false,
                    width: "85%"

                }).data('kendoWindow');
                addNewFWindow.title("Thêm Mới Dữ Liệu");
                addNewFWindow.open();
                $scope.footerValid.$setUntouched();
                addNewFWindow.center();
            };

            // Edit Footer
            $scope.EditFooter = function (dataItem) {
                $scope.footer = {
                    FooterID: 0,
                    Name: STRING_EMPTY,
                    Content: STRING_EMPTY,
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

                $scope.footer.FooterID = dataItem.FooterID;
                $scope.footer.Name = dataItem.Name;
                $scope.footer.Content = dataItem.Content;

                $scope.footer.Status = dataItem.Status;
                $scope.footer.CreatedBy = dataItem.CreatedBy;
                $scope.footer.CreatedByName = dataItem.CreatedByName;
                $scope.footer.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.footer.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.footer.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.footer.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.footer.IsDelete = dataItem.IsDelete;

                var updateEditFWindow = $("#KenWindownFooter").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewFClosed,
                    resizable: false,
                    width: "85%"
                }).data('kendoWindow');
                updateEditFWindow.title("Sửa Dữ Liệu");
                updateEditFWindow.open();
                updateEditFWindow.center();
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
                if ($scope.FooterList) {
                    var length = $scope.FooterList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.FooterList[i];
                        if (item.Name === $scope.footer.Name && item.FooterID !== $scope.footer.FooterID) {
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