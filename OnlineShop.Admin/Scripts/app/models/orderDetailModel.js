var orderDetailModel = orderDetailModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            OrderDetailID: { editable: false, nullable: true },
            ProductID: { type: "number" },
            Image: { type: "string" },
            ProductName: { type: "string" },
            OrderID: { type: "number" },
            Quantity: { type: "number" },
            Price: { type: "number" },
            Discount: { type: "number" }
        }
    };
})();