// Define constants for static values
const DATA_MODEL_PATH = "sap/fe/featureShowcase/mainApp/ext/controller/data.json";
const GRAPH_MODEL_NAME = "graph";
const SETTINGS_MODEL_NAME = "settings";
const INITIAL_SETTINGS = {
	source: "atomicCircle",
	orientation: "LeftRight",
	arrowPosition: "End",
	arrowOrientation: "ParentOf",
	nodeSpacing: 55,
	mergeEdges: false
};
const MICROCHART_DATA = [
	{ title: "USA", color: "Neutral" },
	{ title: "EMEA", color: "Error" },
	{ title: "APAC", value: -20, color: "Good" },
	{ title: "LTA", color: "Critical", isNegative: true },
	{ title: "ALPS", max: 20, color: "Good" }
];

sap.ui.define([
	"sap/fe/core/PageController",
	"sap/ui/model/json/JSONModel",
	"sap/suite/ui/microchart/ComparisonMicroChart",
	"sap/suite/ui/microchart/ComparisonMicroChartData"
], function (PageController, JSONModel, ComparisonMicroChart, ComparisonMicroChartData) {
	return PageController.extend("sap.fe.featureShowcase.mainApp.ext.controller.CustomObjectPage", {
		onInit: function () {
			PageController.prototype.onInit.apply(this);

			var oModel = new JSONModel(sap.ui.require.toUrl(DATA_MODEL_PATH));
			var that = this;

			this.getView().setModel(oModel, GRAPH_MODEL_NAME);

			this._oModelSettings = new JSONModel(INITIAL_SETTINGS);

			this.getView().setModel(this._oModelSettings, SETTINGS_MODEL_NAME);

			var fnSetContent = function (oNode) {
				const chartData = MICROCHART_DATA.map(function (item) {
					return new ComparisonMicroChartData({
						title: item.title,
						value: typeof item.value !== 'undefined' ? item.value : (item.isNegative ? Math.floor(Math.random() * 60) * -1 : (item.max ? Math.floor(Math.random() * item.max) : Math.floor(Math.random() * 60))),
						color: item.color
					});
				});
				oNode.setContent(new ComparisonMicroChart({
					size: "M",
					scale: "M",
					data: chartData
				}).addStyleClass("sapUiSmallMargin"));
			};

			oModel.attachRequestCompleted(function (oData) {
				that.byId("graph").getNodes().forEach(function (oNode) {
					if (oNode.getKey() === "21" || oNode.getKey() === "18") {
						fnSetContent(oNode);
					}
				});
			});
		},
		onAfterRendering: function () {
			this.byId("graphWrapper").$().css("overflow-y", "auto");
		},
		mergeChanged: function (oEvent) {
			this._oModelSettings.setProperty("/mergeEdges", !!Number(oEvent.getSource().getProperty("selectedKey")));
		},
		spacingChanged: function (oEvent) {
			this._oModelSettings.setProperty("/nodeSpacing", Number(oEvent.getSource().getProperty("selectedKey")));
		}
	});
});