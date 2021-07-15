(function (angular) {
    'use strict';

    osApp.controller('userController', [
        '$scope', 'userService', '$window',
        function ($scope, userService, $window) {

            // Declare scope varibles
            $scope.UserList = [];
            $scope.UserDataSource = {};
            $scope.UserGroupDropdownlist = [];
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.user = {
                UserID: 0,
                CodeUserName: STRING_EMPTY,
                UserName: STRING_EMPTY,
                Password: STRING_EMPTY,
                Name: STRING_EMPTY,
                Address: STRING_EMPTY,
                Email: STRING_EMPTY,
                Phone: STRING_EMPTY,
                UserGroupID: STRING_EMPTY,
                UserGroupName: STRING_EMPTY,
                Status: false,
                CreatedDate: STRING_EMPTY,
                LastUpdatedDate: STRING_EMPTY,
                IsDelete: false
            };


            // Get all data to grid
            $scope.loadIndexData = function () {
                loadingOS();
                userService.getAllUsers().then(function (response) {
                    if (response.status === 200) {
                        $scope.UserList = response.data.Data;
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

            // Get all the UserGroup for dropdowlist
            userService.getAllUserGroupForUser().then(function (response) {
                $scope.UserGroupDropdownlist = angular.copy(response.data.Data);
            });

            $scope.RefreshGrid = function () {
                var source = new kendo.data.DataSource({
                    data: $scope.UserList,
                    pageSize: 10,
                    schema: {
                        model: userModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.UserDataSource = source;
                $('#UserTable').data('kendoGrid').setDataSource($scope.UserDataSource);
                $('#UserTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.UserSection = {
                dataSource: $scope.UserDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditUser(dataItem)"><span class="k-icon k-i-edit"></span></span>' }
                        ],
                        "title": "",
                        width: "70px"
                    },
                    { "hidden": "true", "field": "UserID" },
                    { "field": "CodeUserName", "title": "Mã Tài Khoản", "width": "150px" },
                    { "field": "UserName", "title": "Tên Đăng Nhập", "width": "150px" },
                    { "field": "Name", "title": "Tên Nguời Dùng", "width": "150px" },
                    { "field": "Email", "title": "Email", "width": "150px" },
                    { "field": "UserGroupName", "title": "Quyền Hạn", "width": "150px" },
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddUser()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the User
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
                if ($scope.UserList) {
                    var length = $scope.UserList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserList[i];
                        if (item.UserName === $scope.user.UserName) {
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
                    var data = angular.copy($scope.user);
                    userService.insertUsers(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownUser").data("kendoWindow").close();
                            bootbox.alert(MSG_USER_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownUser").data("kendoWindow").close();
                            bootbox.alert(MSG_USER_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the User
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
                if ($scope.UserList) {
                    var length = $scope.UserList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserList[i];
                        if (item.UserName === $scope.user.UserName && item.UserID !== $scope.user.UserID) {
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
                    var data = angular.copy($scope.user);
                    userService.updateUsers(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownUser").data("kendoWindow").close();
                            bootbox.alert(MSG_USER_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownUser").data("kendoWindow").close();
                            bootbox.alert(MSG_USER_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Close User
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownUser").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add User 
            $scope.AddUser = function () {

                $scope.IsSave = false;
                $scope.user = {
                    UserID: 0,
                    CodeUserName: STRING_EMPTY,
                    UserName: STRING_EMPTY,
                    Password: STRING_EMPTY,
                    Name: STRING_EMPTY,
                    Address: STRING_EMPTY,
                    Email: STRING_EMPTY,
                    Phone: STRING_EMPTY,
                    UserGroupID: STRING_EMPTY,
                    UserGroupName: STRING_EMPTY,
                    Status: false,
                    CreatedDate: STRING_EMPTY,
                    LastUpdatedDate: STRING_EMPTY,
                    IsDelete: false
                };
                $scope.ShowBtnSave = true;
                $scope.CheckDuplicate = false;
                $scope.ShowBtnUpdate = false;
                $scope.DisabledBtnSave = false;

                var addNewUWindow = $("#KenWindownUser").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewUClosed,
                    resizable: false,
                    width: "85%"

                }).data('kendoWindow');
                addNewUWindow.title("Thêm Mới Dữ Liệu");
                addNewUWindow.open();
                $scope.userValid.$setUntouched();
                addNewUWindow.center();
            };

            // Edit User
            $scope.EditUser = function (dataItem) {
                $scope.user = {
                    UserID: 0,
                    CodeUserName: STRING_EMPTY,
                    UserName: STRING_EMPTY,
                    Password: STRING_EMPTY,
                    Name: STRING_EMPTY,
                    Address: STRING_EMPTY,
                    Email: STRING_EMPTY,
                    Phone: STRING_EMPTY,
                    UserGroupID: STRING_EMPTY,
                    UserGroupName: STRING_EMPTY,
                    Status: false,
                    CreatedDate: STRING_EMPTY,
                    LastUpdatedDate: STRING_EMPTY,
                    IsDelete: false
                };

                $scope.ShowBtnSave = false;
                $scope.ShowBtnUpdate = true;
                $scope.DisabledBtnUpdate = false;
                $scope.CheckDuplicate = false;

                $scope.user.UserID = dataItem.UserID;
                $scope.user.CodeUserName = dataItem.CodeUserName;
                $scope.user.UserName = dataItem.UserName;
                $scope.user.Password = dataItem.Password;
                $scope.user.Name = dataItem.Name;
                $scope.user.Address = dataItem.Address;
                $scope.user.Email = dataItem.Email;
                $scope.user.Phone = dataItem.Phone;
                $scope.user.UserGroupID = dataItem.UserGroupID;
                $scope.user.UserGroupName = dataItem.UserGroupName;

                $scope.user.Status = dataItem.Status;
                $scope.user.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.user.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.user.IsDelete = dataItem.IsDelete;

                var updateEditUWindow = $("#KenWindownUser").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewUClosed,
                    resizable: false,
                    width: "85%"
                }).data('kendoWindow');
                updateEditUWindow.title("Sửa Dữ Liệu");
                updateEditUWindow.open();
                updateEditUWindow.center();
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
                if ($scope.UserList) {
                    var length = $scope.UserList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.UserList[i];
                        if (item.UserName === $scope.user.UserName && item.UserID !== $scope.user.UserID) {
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