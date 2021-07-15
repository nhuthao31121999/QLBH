var footerModel = footerModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            FooterID: { editable: false, nullable: true },
            Name: { type: "string" },
            Content: { type: "string" },
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