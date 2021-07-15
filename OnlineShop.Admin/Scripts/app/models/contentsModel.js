var contentsModel = contentsModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            ContentID: { editable: false, nullable: true },
            Title: { type: "string" },
            Image: { type: "string" },
            Description: { type: "string" },
            Detail: { type: "string" },
            ContenSource: { type: "string" },
            CategoryContentID: { type: "number" },
            CategoryContentName: { type: "string" },
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