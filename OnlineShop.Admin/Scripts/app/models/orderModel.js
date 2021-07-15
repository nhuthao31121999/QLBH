var orderModel = orderModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            OrderID: { editable: false, nullable: true },
            OrderName: { type: "string" },
            OrderMobile: { type: "string" },
            OrderAdress: { type: "string" },
            OrderEmail: { type: "string" },
            PaymentMethod: { type: "string" },
            Status: { type: "number" },
            CreatedDate: { type: "date" },
            LastUpdatedBy: { type: "string" },
            LastUpdatedByName: { type: "string" },
            LastUpdatedDate: { type: "date" },
            IsDelete: { type: "boolean" },

            ProductID: { type: "number" },
            Quantity: { type: "number" },
            ProductName: { type: "string" },
            Price: { type: "number" },
            Discount: { type: "number" }
        }
    };
})();