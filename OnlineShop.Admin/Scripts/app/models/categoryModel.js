var categoryModel = categoryModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            CategoryID: { editable: false, nullable: true },
            Name: { type: "string" },
            ParentId: { type: "number" },
            ParentName: { type: "string" },
            DisplayOrder: { type: "number" },
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