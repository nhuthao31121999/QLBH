(function (angular) {
    'use strict';

    osApp.controller('orderController', [
        '$scope', 'orderService', '$window',
        function ($scope, orderService, $window) {

            // Declare scope varibles
            $scope.OrderList = [];
            $scope.OrderDetailList = [];
            $scope.OrderDataSource = {};
            $scope.TotalOrderDetailList = {};
            $scope.OrderDetailDataSource = {};
            $scope.IsSave = false;

            $scope.StatusDropdownlist = [];
            $scope.StatusDropdownlist.push({ Name: 'Chờ Lấy Hàng', Id: '1' });
            $scope.StatusDropdownlist.push({ Name: 'Đang Giao', Id: '2' });
            $scope.StatusDropdownlist.push({ Name: 'Đã Giao', Id: '3' });
            $scope.StatusDropdownlist.push({ Name: 'Đã Hủy', Id: '4' });

            $scope.order = {
                OrderID: 0,
                OrderName: STRING_EMPTY,
                OrderMobile: STRING_EMPTY,
                OrderAdress: STRING_EMPTY,
                OrderEmail: STRING_EMPTY,
                PaymentMethod: STRING_EMPTY,
                Status: STRING_EMPTY,
                CreatedDate: STRING_EMPTY,
                LastUpdatedBy: STRING_EMPTY,
                LastUpdatedByName: STRING_EMPTY,
                LastUpdatedDate: STRING_EMPTY,
                IsDelete: false
            };

            // Get all data to grid
            $scope.loadIndexData = function () {
                loadingOS();
                orderService.getAllOrders().then(function (response) {
                    if (response.status === 200) {
                        $scope.OrderList = response.data.Data;
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
                    data: $scope.OrderList,
                    pageSize: 10,
                    schema: {
                        model: orderModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.OrderDataSource = source;
                $('#OrderTable').data('kendoGrid').setDataSource($scope.OrderDataSource);
                $('#OrderTable').data('kendoGrid').refresh();
            };

            // Designer gird
            $scope.OrderSection = {
                dataSource: $scope.OrderDataSource,
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
                            { name: "edit", text: "", template: '<span class="k-button k-button-icontext k-grid-edit" ng-click="EditOrder(dataItem)"><span class="k-icon k-i-edit"></span></span>' }
                        ],
                        "title": "",
                        width: "50px"
                    },
                    { "field": "OrderID", "title": "Mã Đơn", "width": "100px" },
                    { "field": "OrderName", "title": "Họ Và Tên", "width": "150px" },
                    { "field": "OrderMobile", "title": "Số Điện Thoại", "width": "150px" },
                    { "field": "PaymentMethod", "title": "Hình Thức Thanh Toán", "width": "150px" },
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
                        template: "<span>#= (Status == 1) ? 'Chờ Lấy Hàng': (Status == 2) ? 'Đang Giao': (Status == 3) ? 'Đã Giao' :  'Đã Hủy' # ",
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
                            '<a id="addButtonGridSection" class="k-button k-button-icontext" data-toggle="modal" data-target=".bs-example-modal-lg" href="\\#"></a>'
                    }
                ],
                dataBound: function () {

                },
                edit: function (e) {

                }
            };

            $scope.loadDataForOrderDetail = function () {
                loadingPopUpOS();
                var orderID = $scope.order.OrderID;
                orderService.getAllOrderDetails(orderID).then(function (response) {
                    if (response.status === 200) {
                        $scope.OrderDetailList = response.data.Data;
                        $scope.RefreshGridOrderDetail();
                        stopLoadingPopUpOS();
                    }
                });

                orderService.totalOrderDetail(orderID).then(function (response) {
                    if (response.status === 200) {
                        $scope.TotalOrderDetailList = response.data.Data;
                    }
                });
            };

            $scope.RefreshGridOrderDetail = function () {
                var source = new kendo.data.DataSource({
                    data: $scope.OrderDetailList,
                    pageSize: 10,
                    schema: {
                        model: orderDetailModel
                    },
                    requestEnd: function (e) {
                        e.preventDefault();
                    }
                });
                $scope.OrderDetailDataSource = source;
                $('#OrderDetailTable').data('kendoGrid').setDataSource($scope.OrderDetailDataSource);
                $('#OrderDetailTable').data('kendoGrid').refresh();
            };

            // Designer gird Order Detail
            $scope.OrderDetailSection = {
                dataSource: $scope.OrderDetailDataSource,
                resizeable: true,
                sortable: {
                    mode: "single",
                    allowUnsort: true
                },
                pageable: { "refresh": false, "pageSize": 10, "pageSizes": [10, 50, 100] },
                columns: [
                    {
                        "field": "Image", "title": "Hình Ảnh", "width": "60px",
                        template: '<img src="#= Image #" alt="image" style="height: 60px;" />'
                    },
                    { "field": "ProductName", "title": "Tên Sản Phẩm", "width": "250px" },
                    { "field": "Price", "title": "Giá Sản Phẩm", "width": "100px", template: "<span>#= kendo.format('{0:n0}', parseFloat(Price)) # <sup>vnđ</sup> " },
                    { "field": "Discount", "title": "Giá Khuyến Mãi", "width": "100px", template: "<span>#= (Discount == 0) ? 'Không Có' : kendo.format('{0:n0}', parseFloat(Discount)) + '<sup>vnđ</sup>' # " },
                    { "field": "Quantity", "title": "Số Lượng", "width": "100px" }
                ]
            };

            // Update the Order
            $scope.update = function (form) {
                $scope.IsSave = true;

                loadingPopUpOS();
                var data = angular.copy($scope.order);
                orderService.updateOrders(data).then(function success(response) {
                    if (response.status === 200) {
                        $("#KenWindownOrder").data("kendoWindow").close();
                        bootbox.alert(MSG_ORDER_UPDATED);
                        $scope.loadIndexData();
                        stopLoadingPopUpOS();
                    }
                    else {
                        $("#KenWindownOrder").data("kendoWindow").close();
                        bootbox.alert(MSG_ORDER_UPDATED_FAIL);
                        stopLoadingPopUpOS();
                    }
                });
            };

            // Close Order
            $scope.close = function () {
                $scope.IsSave = false;
                $("#KenWindownOrder").closest(".k-window-content").data("kendoWindow").close();
            };

            // Edit Order
            $scope.EditOrder = function (dataItem) {
                $scope.order = {
                    OrderID: 0,
                    OrderName: STRING_EMPTY,
                    OrderMobile: STRING_EMPTY,
                    OrderAdress: STRING_EMPTY,
                    OrderEmail: STRING_EMPTY,
                    PaymentMethod: STRING_EMPTY,
                    Status: STRING_EMPTY,
                    CreatedDate: STRING_EMPTY,
                    LastUpdatedBy: STRING_EMPTY,
                    LastUpdatedByName: STRING_EMPTY,
                    LastUpdatedDate: STRING_EMPTY,
                    IsDelete: false
                };

                $scope.order.OrderID = dataItem.OrderID;
                $scope.order.OrderName = dataItem.OrderName;
                $scope.order.OrderMobile = dataItem.OrderMobile;
                $scope.order.OrderAdress = dataItem.OrderAdress;
                $scope.order.OrderEmail = dataItem.OrderEmail;
                $scope.order.PaymentMethod = dataItem.PaymentMethod;

                $scope.order.Status = dataItem.Status;
                $scope.order.CreatedDate = kendo.toString(dataItem.CreatedDate, 'dd/MM/yyyy');
                $scope.order.LastUpdatedBy = dataItem.LastUpdatedBy;
                $scope.order.LastUpdatedByName = dataItem.LastUpdatedByName;
                $scope.order.LastUpdatedDate = kendo.toString(dataItem.LastUpdatedDate, 'dd/MM/yyyy');
                $scope.order.IsDelete = dataItem.IsDelete;

                var updateEditOWindow = $("#KenWindownOrder").kendoWindow({
                    actions: ["Close"],
                    draggable: true,
                    modal: true,
                    pinned: false,
                    position: {
                        top: 10
                    },
                    close: $scope.onAddNewOClosed,
                    resizable: false,
                    width: "85%"
                }).data('kendoWindow');
                updateEditOWindow.title("Màn Hình Xem Chi Tiết Đơn Hàng");
                updateEditOWindow.open();
                updateEditOWindow.center();
                $scope.loadDataForOrderDetail();
            };

        }]);

})(window.angular);