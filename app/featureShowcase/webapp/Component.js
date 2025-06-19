sap.ui.define(['sap/fe/core/AppComponent', 'sap/ui/model/json/JSONModel'], function(AppComponent, JSONModel) {
    'use strict';

    return AppComponent.extend("sap.fe.featureShowcase.mainApp.Component", {
        metadata: {
            manifest: "json"
        },

        init: function() {
            AppComponent.prototype.init.apply(this, arguments);
            var oModel = new JSONModel();
            this.setModel(oModel, "random");
            fetch("/srv1/randomNumbers")
                .then(function(res) { return res.json(); })
                .then(function(data) { oModel.setData(data); })
                .catch(function(err) { console.error("Random number fetch failed", err); });
        }
    });
});
