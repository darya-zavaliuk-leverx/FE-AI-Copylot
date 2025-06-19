sap.ui.define([
	"sap/m/MessageBox",
	"sap/ui/core/library"
], function(MessageBox, coreLibrary) {
    "use strict";
    //Search-Term: CustomActions
    return {
        messageBox: function() {
            MessageBox.alert("Button pressed");
        },
        enabled : function() {
            return true;
        },
        enabledForSingleSelect: function(oBindingContext, aSelectedContexts) {
            if (aSelectedContexts && aSelectedContexts.length === 1) {
               return true;
            }
            return false;
        },

        onCriticalAction: function(oEvent) {
            var sActionName = "service1.EntityContainer/criticalAction";
            var mParameters = {
                contexts: oEvent.getSource().getBindingContext(),
                model: oEvent.getSource().getModel(),
                label: "Confirm"
            };
            this.editFlow.invokeAction(sActionName, mParameters);
        }
    };
});