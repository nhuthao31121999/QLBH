var contactModel = contactModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            ContactID: { editable: false, nullable: true },
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