(function (angular) {
    'use strict';

    osApp.controller('producerController', [
        '$scope', 'producerService', '$window',
        function ($scope, producerService, $window) {

            // Declare scope varibles
            $scope.ProducerList = [];
            $scope.ProducerDataSource = {};
            $scope.IsSave = false;
            $scope.ShowBtnSave = false;
            $scope.DisabledBtnSave = false;
            $scope.DisabledBtnUpdate = false;
            $scope.ShowBtnUpdate = false;
            $scope.formErrors = {};
            $scope.CheckDuplicate = false;

            $scope.producer = {
                ProducerID: 0,
                Name: STRING_EMPTY,
                Logo: STRING_EMPTY,
                Email: STRING_EMPTY,
                Phone: STRING_EMPTY,
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
                producerService.getAllProducers().then(function (response) {
                    if (response.status === 200) {
                        $scope.ProducerList = response.data.Data;
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
                    data: $scope.ProducerList,
                    pageSize: 10,
                    schema: {
                        model: producerModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.ProducerDataSource = source;
                $('#ProducerTable').data('kendoGrid').setDataSource($scope.ProducerDataSource);
                $('#ProducerTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.ProducerSection = {
                dataSource: $scope.ProducerDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditProducer(dataItem)"><span class="k-icon k-i-edit"></span></span>' },
                            { name: "destroy", text: "", template: '<span class="k-button k-button-icontext k-grid-delete" ng-click="DeleteProducer(dataItem)"><span class="k-icon k-i-delete"></span></span>' }
                        ],
                        "title": "",
                        width: "100px"
                    },
                    { "hidden": "true", "field": "ProducerID" },
                    { "field": "Name", "title": "Tên Nhà Sản Xuất", "width": "150px" },
                    {
                        "field": "Logo", "title": "Logo", "width": "150px",
                        template: '<img src="#= Logo #" alt="image" style="height: 100px;" />'
                    },
                    { "field": "Email", "title": "Email", "width": "150px" },
                    { "field": "Phone", "title": "Điện Thoại", "width": "150px" },
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" ng-click = "AddProducer()" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"><span class="k-icon k-i-add"></span> Thêm mới dữ liệu </a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            // Save the Producer
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
                if ($scope.ProducerList) {
                    var length = $scope.ProducerList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ProducerList[i];
                        if (item.Name === $scope.producer.Name) {
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
                    var data = angular.copy($scope.producer);
                    producerService.insertProducers(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownProducer").data("kendoWindow").close();
                            bootbox.alert(MSG_PRODUCER_SAVED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownProducer").data("kendoWindow").close();
                            bootbox.alert(MSG_PRODUCER_SAVED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            // Update the Producer
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
                if ($scope.ProducerList) {
                    var length = $scope.ProducerList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ProducerList[i];
                        if (item.Name === $scope.producer.Name && item.ProducerID !== $scope.producer.ProducerID) {
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
                    var data = angular.copy($scope.producer);
                    producerService.updateProducers(data).then(function success(response) {
                        if (response.status === 200) {
                            $("#KenWindownProducer").data("kendoWindow").close();
                            bootbox.alert(MSG_PRODUCER_UPDATED);
                            $scope.loadIndexData();
                            stopLoadingPopUpOS();
                        }
                        else {
                            $("#KenWindownProducer").data("kendoWindow").close();
                            bootbox.alert(MSG_PRODUCER_UPDATED_FAIL);
                            stopLoadingPopUpOS();
                        }
                    });
                }
            };

            //Delete Producer
            $scope.DeleteProducer = function (data) {
                bootbox.confirm(MSG_DELETE, function (result) {
                    if (result === true) {
                        producerService.deleteProducers(data).then(function (response) {
                            if (response.status === 200) {
                                if (response.data.Data === 0) {
                                    bootbox.alert(MSG_DELETE_ERROR_PRODUCER);
                                }
                                else {
                                    bootbox.alert(MSG_PRODUCER_DELETED);
                                    $scope.loadIndexData();
                                }
                            }
                            else {
                                bootbox.alert(MSG_PRODUCER_DELETED_FAIL);
                            }
                        });
                    }
                });
            };

            // Close Producer
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownProducer").closest(".k-window-content").data("kendoWindow").close();
            };

            // Add Producer 
            $scope.AddProducer = function () {

                $scope.IsSave = false;
                $scope.producer = {
                    ProducerID: 0,
                    Name: STRING_EMPTY,
                    Logo: STRING_EMPTY,
                    Email: STRING_EMPTY,
                    Phone: STRING_EMPTY,
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

                var addNewPWindow = $("#KenWindownProducer").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewPClosed,
                    resizable: false,
                    width: "85%"

                }).data('kendoWindow');
                addNewPWindow.title("Thêm Mới Dữ Liệu");
                addNewPWindow.open();
                $scope.producerValid.$setUntouched();
                addNewPWindow.center();
            };

            // Edit Producer
            $scope.EditProducer = function (dataItem) {
                $scope.producer = {
                    ProducerID: 0,
                    Name: STRING_EMPTY,
                    Logo: STRING_EMPTY,
                    Email: STRING_EMPTY,
                    Phone: STRING_EMPTY,
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

                $scope.producer.ProducerID = dataItem.ProducerID;
                $scope.producer.Name = dataItem.Name;
                $scope.producer.Logo = dataItem.Logo;
                $scope.producer.Email = dataItem.Email;
                $scope.producer.Phone = dataItem.Phone;

                $scope.producer.Status = dataItem.Status;
                $scope.producer.CreatedBy = dataItem.CreatedBy;
                $scope.producer.CreatedByName = dataItem.CreatedByName;
                $scope.producer.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.producer.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.producer.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.producer.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.producer.IsDelete = dataItem.IsDelete;

                var updateEditPWindow = $("#KenWindownProducer").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewPClosed,
                    resizable: false,
                    width: "85%"
                }).data('kendoWindow');
                updateEditPWindow.title("Sửa Dữ Liệu");
                updateEditPWindow.open();
                updateEditPWindow.center();
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
                if ($scope.ProducerList) {
                    var length = $scope.ProducerList.length;
                    for (var i = 0; i < length; i++) {
                        var item = $scope.ProducerList[i];
                        if (item.Name === $scope.producer.Name && item.ProducerID !== $scope.producer.ProducerID) {
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
                    $scope.producer.Logo = fileUrl;
                    $scope.$apply();
                };
                finder.popup();
            };

        }]);

})(window.angular);