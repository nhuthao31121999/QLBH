(function (angular) {
    'use strict';

    osApp.controller('feedBackController', [
        '$scope', 'feedBackService', '$window',
        function ($scope, feedBackService, $window) {

            // Declare scope varibles
            $scope.FeedBackList = [];
            $scope.FeedBackDataSource = {};
            $scope.IsSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;

            $scope.feedback = {
                FeedBackID: 0,
                Name: STRING_EMPTY,
                Phone: STRING_EMPTY,
                Email: STRING_EMPTY,
                Address: STRING_EMPTY,
                Content: STRING_EMPTY,
                Status: false,
                CreatedDate: STRING_EMPTY,
                LastUpdatedBy: STRING_EMPTY,
                LastUpdatedByName: STRING_EMPTY,
                LastUpdatedDate: STRING_EMPTY,
                IsDelete: false
            };


            // Get all data to grid
            $scope.loadIndexData = function () {
                loadingOS();
                feedBackService.getAllFeedBacks().then(function (response) {
                    if (response.status === 200) {
                        $scope.FeedBackList = response.data.Data;
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
                    data: $scope.FeedBackList,
                    pageSize: 10,
                    schema: {
                        model: feedBackModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.FeedBackDataSource = source;
                $('#FeedBackTable').data('kendoGrid').setDataSource($scope.FeedBackDataSource);
                $('#FeedBackTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.FeedBackSection = {
                dataSource: $scope.FeedBackDataSource,
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
                            {
                                name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditFeedBack(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteFeedBack(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "FeedBackID" },
                    { "field": "Name", "title": "Họ Và Tên", "width": "150px" },
                    { "field": "Phone", "title": "Điện Thoại", "width": "150px" },
                    { "field": "Email", "title": "Email", "width": "150px" },
                    { "field": "Address", "title": "Địa Chỉ", "width": "150px" },
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
                        template: "<span>#= (Status == true) ? 'Đã Xem': 'Chưa Xem' # ",
                        type: "boolean",
                        filterable: {
                            messages: {
                                info: "Sắp xếp:",
                                isTrue: "Đã Xem",
                                isFalse: "Chưa Xem"
                            }
                        }
                    }
                ],
                toolbar: [
                    {
                        template:
                            '<a class="k-button k-button-icontext"></a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Update the FeedBack
            $scope.update = function (form) {
                $scope.IsSave = true;
                loadingPopUpOS();
                var data = angular.copy($scope.feedback);
                feedBackService.updateFeedBacks(data).then(function success(response) {
                    if (response.status === 200) {
                        $("#KenWindownFeedBack").data("kendoWindow").close();
                        //bootbox.alert(MSG_FEEDBACK_UPDATED);
                        $scope.loadIndexData();
                        stopLoadingPopUpOS();
                    }
                    else {
                        $("#KenWindownFeedBack").data("kendoWindow").close();
                        //bootbox.alert(MSG_FEEDBACK_UPDATED_FAIL);
                        stopLoadingPopUpOS();
                    }
                });
            };

            //Delete FeedBack
            $scope.DeleteFeedBack = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        feedBackService.deleteFeedBacks(data).then(function (response) {
                            if (response.status === 200) {
                                bootbox.alert(MSG_FEEDBACK_DELETED);
                                $scope.loadIndexData();
                            }
                            else {
                                bootbox.alert(MSG_FEEDBACK_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close FeedBack
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownFeedBack").closest(".k-window-content").data("kendoWindow").close();
            };

            // Edit FeedBack
            $scope.EditFeedBack = function (dataItem) {
                $scope.feedback = {
                    FeedBackID: 0,
                    Name: STRING_EMPTY,
                    Phone: STRING_EMPTY,
                    Email: STRING_EMPTY,
                    Address: STRING_EMPTY,
                    Content: STRING_EMPTY,
                    Status: false,
                    CreatedDate: STRING_EMPTY,
                    LastUpdatedBy: STRING_EMPTY,
                    LastUpdatedByName: STRING_EMPTY,
                    LastUpdatedDate: STRING_EMPTY,
                    IsDelete: false
                };

                $scope.ShowBtnUpdate = true;
                $scope.DisabledBtnUpdate = false;

                $scope.feedback.FeedBackID = dataItem.FeedBackID;
                $scope.feedback.Name = dataItem.Name;
                $scope.feedback.Phone = dataItem.Phone;
                $scope.feedback.Email = dataItem.Email;
                $scope.feedback.Address = dataItem.Address;
                $scope.feedback.Content = dataItem.Content;

                $scope.feedback.Status = dataItem.Status;
                $scope.feedback.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.feedback.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.feedback.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.feedback.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.feedback.IsDelete = dataItem.IsDelete;

                var updateEditFWindow = $("#KenWindownFeedBack").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewFClosed,
                    resizable: false,
                    width: "65%"
                }).data('kendoWindow');
                updateEditFWindow.title("Màn Hình Xem Dữ Liệu");
                updateEditFWindow.open();
                updateEditFWindow.center();
            };
        }]);

})(window.angular);