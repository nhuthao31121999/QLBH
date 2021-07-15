var slideModel = slideModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            SlideID: { editable: false, nullable: true },
            Image: { type: "string" },
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