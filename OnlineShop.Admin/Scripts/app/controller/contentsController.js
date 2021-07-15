(function (angular) {
    'use strict';

    osApp.controller('contentsController', [
        '$scope', 'contentsService', '$window',
        function ($scope, contentsService, $window) {

            // Declare scope varibles
            $scope.ContentList = [];
            $scope.CategoryContentDropdownlist = [];
            $scope.ContentDataSource = {};
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.content = {
                ContentID: 0,
                Title: STRING_EMPTY,
                Image: STRING_EMPTY,
                Description: STRING_EMPTY,
                Detail: STRING_EMPTY,
                ContenSource: STRING_EMPTY,
                CategoryContentID: STRING_EMPTY,
                CategoryContentName: STRING_EMPTY,
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
                contentsService.getAllContents().then(function (response) {
                    if (response.status === 200) {
                        $scope.ContentList = response.data.Data;
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
                    data: $scope.ContentList,
                    pageSize: 10,
                    schema: {
                        model: contentsModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.ContentDataSource = source;
                $('#ContentTable').data('kendoGrid').setDataSource($scope.ContentDataSource);
                $('#ContentTable').data('kendoGrid').refresh();
            };

            // Get all the Category for dropdowlist
            contentsService.getAllCategoryContentForContent().then(function (response) {
                $scope.CategoryContentDropdownlist = angular.copy(response.data.Data);
            });

            // Designer gird
            $scope.ContentSection = {
                dataSource: $scope.ContentDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditContent(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteContent(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "ContentID" },
                    { "field": "Title", "title": "Tiêu Đề", "width": "150px" },
                    {
                        "field": "Image", "title": "Hình Ảnh", "width": "150px",
                        template: '<img src="#= Image #" alt="image" style="height: 100px;" />'
                    },
                    { "field": "Description", "title": "Mô Tả", "width": "150px" },
                    { "field": "ContenSource", "title": "Nguồn", "width": "150px" },
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddContent()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the Content
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
                if ($scope.ContentList) {
                    var length = $scope.ContentList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ContentList[i];
                        if (item.Title === $scope.content.Title) {
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
                    var data = angular.copy($scope.content);
                    contentsService.insertContents(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownContent").data("kendoWindow").close();
                            bootbox.alert(MSG_CONTENT_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownContent").data("kendoWindow").close();
                            bootbox.alert(MSG_CONTENT_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the Content
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
                if ($scope.ContentList) {
                    var length = $scope.ContentList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ContentList[i];
                        if (item.Title === $scope.content.Title && item.ContentID !== $scope.content.ContentID) {
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
                    var data = angular.copy($scope.content);
                    contentsService.updateContents(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownContent").data("kendoWindow").close();
                            bootbox.alert(MSG_CONTENT_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownContent").data("kendoWindow").close();
                            bootbox.alert(MSG_CONTENT_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete Content
            $scope.DeleteContent = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        contentsService.deleteContents(data).then(function (response) {
                            if (response.status === 200) {
                                bootbox.alert(MSG_CONTENT_DELETED);
                                $scope.loadIndexData();
                            }
                            else {
                                bootbox.alert(MSG_CONTENT_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close Content
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownContent").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add Content 
            $scope.AddContent = function () {
                $scope.IsSave = false;
                $scope.content = {
                    ContentID: 0,
                    Title: STRING_EMPTY,
                    Image: STRING_EMPTY,
                    Description: STRING_EMPTY,
                    Detail: STRING_EMPTY,
                    ContenSource: STRING_EMPTY,
                    CategoryContentID: STRING_EMPTY,
                    CategoryContentName: STRING_EMPTY,
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

                var addNewCWindow = $("#KenWindownContent").kendoWindow({
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
                $scope.contentValid.$setUntouched();
                addNewCWindow.center();

                var categorycontent_dropdownlist = $('#CategoryContentID').data('kendoMultiColumnComboBox');
                categorycontent_dropdownlist.value(STRING_EMPTY);
                categorycontent_dropdownlist.text(STRING_EMPTY);
                $('#CategoryContentID').data('kendoMultiColumnComboBox').refresh();
            };

            // Edit Content
            $scope.EditContent = function (dataItem) {
                $scope.content = {
                    ContentID: 0,
                    Title: STRING_EMPTY,
                    Image: STRING_EMPTY,
                    Description: STRING_EMPTY,
                    Detail: STRING_EMPTY,
                    ContenSource: STRING_EMPTY,
                    CategoryContentID: STRING_EMPTY,
                    CategoryContentName: STRING_EMPTY,
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

                $scope.content.ContentID = dataItem.ContentID;
                $scope.content.Title = dataItem.Title;
                $scope.content.Image = dataItem.Image;
                $scope.content.Description = dataItem.Description;
                $scope.content.Detail = dataItem.Detail;
                $scope.content.ContenSource = dataItem.ContenSource;
                $scope.content.CategoryContentID = dataItem.CategoryContentID;
                $scope.content.CategoryContentName = dataItem.CategoryContentName;

                $scope.content.Status = dataItem.Status;
                $scope.content.CreatedBy = dataItem.CreatedBy;
                $scope.content.CreatedByName = dataItem.CreatedByName;
                $scope.content.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.content.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.content.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.content.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.content.IsDelete = dataItem.IsDelete;

                var updateEditCWindow = $("#KenWindownContent").kendoWindow({
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
                if ($scope.ContentList) {
                    var length = $scope.ContentList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ContentList[i];
                        if (item.Title === $scope.content.Title && item.ContentID !== $scope.content.ContentID) {
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
                    $scope.content.Image = fileUrl;
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