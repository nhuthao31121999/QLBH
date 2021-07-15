var userGroupModel = userGroupModel || (function () {
    "use strict";
    return {
        id: "Id",
        fields: {
            UserGroupID: { editable: false, nullable: true },
            Name: { type: "string" },
            Description: { type: "string" },
            CreatedDate: { type: "date" },
            LastUpdatedDate: { type: "date" }
        }
    };
})();