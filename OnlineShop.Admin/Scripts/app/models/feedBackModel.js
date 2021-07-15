var feedBackModel = feedBackModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            FeedBackID: { editable: false, nullable: true },
            Name: { type: "string" },
            Phone: { type: "string" },
            Email: { type: "string" },
            Address: { type: "string" },
            Content: { type: "string" },
            Status: { type: "boolean" },
            CreatedDate: { type: "date" },
            LastUpdatedBy: { type: "string" },
            LastUpdatedByName: { type: "string" },
            LastUpdatedDate: { type: "date" },
            IsDelete: { type: "boolean" }
        }
    };
})();