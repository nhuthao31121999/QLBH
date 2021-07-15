(function (angular) {
    'use strict';

    osApp.controller('contactController', [
        '$scope', 'contactService', '$window',
        function ($scope, contactService, $window) {

            // Declare scope varibles
            $scope.ContactList = [];
            $scope.ContactDataSource = {};
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};

            $scope.contact = {
                ContactID: 0,
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
                contactService.getAllContacts().then(function (response) {
                    if (response.status === 200) {
                        $scope.ContactList = response.data.Data;
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
                    data: $scope.ContactList,
                    pageSize: 10,
                    schema: {
                        model: contactModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.ContactDataSource = source;
                $('#ContactTable').data('kendoGrid').setDataSource($scope.ContactDataSource);
                $('#ContactTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.ContactSection = {
                dataSource: $scope.ContactDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditContact(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteContact(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "ContactID" },
                    { "field": "ContactID", "title": "Mã Liên Hệ", "width": "100px" },
                    {
                        "field": "Content", "title": "Nội Dung", "width": "300px",
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddContact()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the Contact
            $scope.save = function (form) {
                $scope.IsSave = true;
                if (form !== null && !form.$valid) {
                    $scope.DisabledBtnSave = false;
                    return;
                }
                else {
                    $scope.DisabledBtnSave = true;
                }

                loadingPopUpOS();
                var data = angular.copy($scope.contact);
                contactService.insertContacts(data).then(function success(response) {
                    if (response.status === 200) {
                        $("#KenWindownContact").data("kendoWindow").close();
                        bootbox.alert(MSG_CONTACT_SAVED);
                        $scope.loadIndexData();
                        stopLoadingPopUpOS();
                    }
                    else {
                        $("#KenWindownContact").data("kendoWindow").close();
                        bootbox.alert(MSG_CONTACT_SAVED_FAIL);
                        stopLoadingPopUpOS();
                    }
                });
            };

            // Update the Contact
            $scope.update = function (form) {
                $scope.IsSave = true;
                if (form !== null && !form.$valid) {
                    $scope.DisabledBtnUpdate = false;
                    return;
                }
                else {
                    $scope.DisabledBtnUpdate = true;
                }

                loadingPopUpOS();
                var data = angular.copy($scope.contact);
                contactService.updateContacts(data).then(function success(response) {
                    if (response.status === 200) {
                        $("#KenWindownContact").data("kendoWindow").close();
                        bootbox.alert(MSG_CONTACT_UPDATED);
                        $scope.loadIndexData();
                        stopLoadingPopUpOS();
                    }
                    else {
                        $("#KenWindownContact").data("kendoWindow").close();
                        bootbox.alert(MSG_CONTACT_UPDATED_FAIL);
                        stopLoadingPopUpOS();
                    }
                });
            };

            //Delete Contact
            $scope.DeleteContact = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        contactService.deleteContacts(data).then(function (response) {
                            if (response.status === 200) {
                                bootbox.alert(MSG_CONTACT_DELETED);
                                $scope.loadIndexData();
                            }
                            else {
                                bootbox.alert(MSG_CONTACT_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close Contact
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownContact").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add Contact 
            $scope.AddContact = function () {
                $scope.IsSave = false;
                $scope.contact = {
                    ContactID: 0,
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
                $scope.ShowBtnUpdate = false;
                $scope.DisabledBtnSave = false;

                var addNewCindow = $("#KenWindownContact").kendoWindow({
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
                addNewCindow.title("Thêm Mới Dữ Liệu");
                addNewCindow.open();
                $scope.contactValid.$setUntouched();
                addNewCindow.center();
            };

            // Edit Contact
            $scope.EditContact = function (dataItem) {
                $scope.contact = {
                    ContactID: 0,
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
                $scope.contact.ContactID = dataItem.ContactID;
                $scope.contact.Content = dataItem.Content;

                $scope.contact.Status = dataItem.Status;
                $scope.contact.CreatedBy = dataItem.CreatedBy;
                $scope.contact.CreatedByName = dataItem.CreatedByName;
                $scope.contact.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.contact.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.contact.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.contact.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.contact.IsDelete = dataItem.IsDelete;

                var updateEditCWindow = $("#KenWindownContact").kendoWindow({
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