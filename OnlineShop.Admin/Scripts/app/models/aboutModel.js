var aboutModel = aboutModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            AboutID: { editable: false, nullable: true },
            Name: { type: "string" },
            Description: { type: "string" },
            Image: { type: "string" },
            Detail: { type: "string" },
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