sap.ui.define(["sap/ui/model/Filter", "sap/ui/model/FilterOperator"], function(Filter, FilterOperator) {
    "use strict";
    return {
        onReset: function() {
            this.setFilterValues("criticality_code");
        }
    };
});
