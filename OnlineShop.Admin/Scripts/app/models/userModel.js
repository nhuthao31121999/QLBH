var userModel = userModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            UserID: { editable: false, nullable: true },
            CodeUserName: { type: "string" },
            UserName: { type: "string" },
            Password: { type: "string" },
            Name: { type: "string" },
            Address: { type: "string" },
            Email: { type: "string" },
            Phone: { type: "string" },
            UserGroupID: { type: "number" },
            UserGroupName: { type: "string" },
            Status: { type: "boolean" },
            CreatedDate: { type: "date" },
            LastUpdatedDate: { type: "date" },
            IsDelete: { type: "boolean" }
        }
    };
})();