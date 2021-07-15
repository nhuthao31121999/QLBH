(function (angular) {
    'use strict';

    osApp.controller('userGroupController', [
        '$scope', 'userGroupService', '$window',
        function ($scope, userGroupService, $window) {

            // Declare scope varibles
            $scope.UserGroupList = [];
            $scope.UserGroupDataSource = {};
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.usergroup = {
                UserGroupID: 0,
                Name: STRING_EMPTY,
                Description: STRING_EMPTY,
                CreatedDate: STRING_EMPTY,
                LastUpdatedDate: STRING_EMPTY
            };


            // Get all data to grid
            $scope.loadIndexData = function () {
                loadingOS();
                userGroupService.getAllUserGroups().then(function (response) {
                    if (response.status === 200) {
                        $scope.UserGroupList = response.data.Data;
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
                    data: $scope.UserGroupList,
                    pageSize: 10,
                    schema: {
                        model: userGroupModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.UserGroupDataSource = source;
                $('#UserGroupTable').data('kendoGrid').setDataSource($scope.UserGroupDataSource);
                $('#UserGroupTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.UserGroupSection = {
                dataSource: $scope.UserGroupDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditUserGroup(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteUserGroup(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "UserGroupID" },
                    { "field": "Name", "title": "Tên Giới Thiệu", "width": "150px" },
                    { "field": "Description", "title": "Tiêu Đề", "width": "150px" },
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
                        "field": "LastUpdatedDate", "title": "Ngày Sửa", "width": "150px", template: "<span>#= (LastUpdatedDate == 0 || LastUpdatedDate == null) ? '' : kendo.toString(kendo.parseDate(LastUpdatedDate, 'dd/MM/yyyy'), 'dd/MM/yyyy') # ", format: "{0:dd/MM/yyyy}", parseFomats: "{0:dd/MM/yyyy}", filterable: {
                            ui: function (element) {
                                element.kendoDatePicker({
                                    format: "dd/MM/yyyy"
                                });
                            }
                        }
                    },
                ],
                toolbar: [
                    {
                        template:
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddUserGroup()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the UserGroup
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
                if ($scope.UserGroupList) {
                    var length = $scope.UserGroupList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserGroupList[i];
                        if (item.Name === $scope.usergroup.Name) {
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
                    var data = angular.copy($scope.usergroup);
                    userGroupService.insertUserGroups(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownUserGroup").data("kendoWindow").close();
                            bootbox.alert(MSG_USERGROUP_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownUserGroup").data("kendoWindow").close();
                            bootbox.alert(MSG_USERGROUP_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the UserGroup
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
                if ($scope.UserGroupList) {
                    var length = $scope.UserGroupList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserGroupList[i];
                        if (item.Name === $scope.usergroup.Name && item.UserGroupID !== $scope.usergroup.UserGroupID) {
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
                    var data = angular.copy($scope.usergroup);
                    userGroupService.updateUserGroups(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownUserGroup").data("kendoWindow").close();
                            bootbox.alert(MSG_USERGROUP_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownUserGroup").data("kendoWindow").close();
                            bootbox.alert(MSG_USERGROUP_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete UserGroup
            $scope.DeleteUserGroup = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        UserGroupService.deleteEmailTemplate(data).then(function (response) {
                            if (response.status === 200) {
                                bootbox.alert(MSG_UserGroup_DELETED);
                                UserGroupService.getAllUserGroup().then(function (response) {
                                    if (response.status === 200) {
                                        $scope.EmailTemplateList = response.data.Data;
                                        $scope.RefreshGrid();
                                    }
                                });
                            }
                            else {
                                bootbox.alert(MSG_UserGroup_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close UserGroup
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownUserGroup").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add UserGroup 
            $scope.AddUserGroup = function () {

                $scope.IsSave = false;
                $scope.usergroup = {
                    UserGroupID: 0,
                    Name: STRING_EMPTY,
                    Description: STRING_EMPTY,
                    CreatedDate: STRING_EMPTY,
                    LastUpdatedDate: STRING_EMPTY
                };
                $scope.ShowBtnSave = true;
                $scope.CheckDuplicate = false;
                $scope.ShowBtnUpdate = false;
                $scope.DisabledBtnSave = false;

                var addNewUGWindow = $("#KenWindownUserGroup").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewUGClosed,
                    resizable: false,
                    width: "65%"

                }).data('kendoWindow');
                addNewUGWindow.title("Thêm Mới Dữ Liệu");
                addNewUGWindow.open();
                $scope.userGroupValid.$setUntouched();
                addNewUGWindow.center();
            };

            // Edit UserGroup
            $scope.EditUserGroup = function (dataItem) {
                $scope.usergroup = {
                    UserGroupID: 0,
                    Name: STRING_EMPTY,
                    Description: STRING_EMPTY,
                    CreatedDate: STRING_EMPTY,
                    LastUpdatedDate: STRING_EMPTY
                };

                $scope.ShowBtnSave = false;
                $scope.ShowBtnUpdate = true;
                $scope.DisabledBtnUpdate = false;
                $scope.CheckDuplicate = false;

                $scope.usergroup.UserGroupID = dataItem.UserGroupID;
                $scope.usergroup.Name = dataItem.Name;
                $scope.usergroup.Description = dataItem.Description;

                $scope.usergroup.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.usergroup.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');

                var updateEditUGWindow = $("#KenWindownUserGroup").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewUGClosed,
                    resizable: false,
                    width: "65%"
                }).data('kendoWindow');
                updateEditUGWindow.title("Sửa Dữ Liệu");
                updateEditUGWindow.open();
                updateEditUGWindow.center();
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
                if ($scope.UserGroupList) {
                    var length = $scope.UserGroupList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserGroupList[i];
                        if (item.Name === $scope.usergroup.Name && item.UserGroupID !== $scope.usergroup.UserGroupID) {
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