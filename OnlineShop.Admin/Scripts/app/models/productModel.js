var productModel = productModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            ProductID: { editable: false, nullable: true },
            Name: { type: "string" },
            Code: { type: "string" },
            Price: { type: "number" },
            Discount: { type: "number" },
            Image: { type: "string" },
            Available: { type: "boolean" },
            Description: { type: "string" },
            Detail: { type: "string" },
            Warranty: { type: "string" },
            Quantity: { type: "number" },
            Special: { type: "date" },
            Views: { type: "number" },
            CategoryID: { type: "number" },
            ProducerID: { type: "number" },
            Status: { type: "boolean" },
            CreatedBy: { type: "string" },
            CreatedByName: { type: "string" },
            CreatedDate: { type: "date" },
            LastUpdatedBy: { type: "string" },
            LastUpdatedByName: { type: "string" },
            LastUpdatedDate: { type: "date" },
            IsDelete: { type: "boolean" }
        }
    };
})();