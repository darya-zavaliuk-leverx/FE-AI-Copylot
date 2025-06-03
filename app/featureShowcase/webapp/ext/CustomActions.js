sap.ui.define(
  ["sap/m/MessageBox", "sap/ui/core/library"],
  function (MessageBox, coreLibrary) {
    "use strict";
    //Search-Term: CustomActions
    return {
      messageBox: function () {
        MessageBox.alert(
          "Are you sure you want to perform this critical action?"
        );
      },
      enabled: function () {
        return true;
      },
      enabledForSingleSelect: function (oBindingContext, aSelectedContexts) {
        if (aSelectedContexts && aSelectedContexts.length === 1) {
          return true;
        }
        return false;
      },
      openCriticalDialog: function () {
        var dialog = new sap.m.Dialog({
          title: "Critical Action",
          type: "Message",
          content: [
            new sap.m.Text({
              text: "This is a critical operation. Are you sure you want to proceed?",
            }),
          ],
          beginButton: new sap.m.Button({
            text: "Critical",
            type: "Reject",
            press: function () {
              sap.m.MessageBox.success("Critical action confirmed!");
              dialog.close();
            },
          }),
          endButton: new sap.m.Button({
            text: "Cancel",
            press: function () {
              dialog.close();
            },
          }),
          afterClose: function () {
            dialog.destroy();
          },
        });
        dialog.open();
      },
    };
  }
);
