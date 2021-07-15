var producerModel = producerModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            ProducerID: { editable: false, nullable: true },
            Name: { type: "string" },
            Logo: { type: "string" },
            Email: { type: "string" },
            Phone: { type: "string" },
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