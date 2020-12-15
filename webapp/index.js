sap.ui.require([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/XMLView",
	"sap/ui/model/BindingMode",
	"sap/ui/model/resource/ResourceModel"
], function (JSONModel, XMLView, BindingMode, ResourceModel) {
	"use strict";

	// Attach an anonymous function to the SAPUI5 'init' event
	sap.ui.getCore().attachInit(function () {
		
		var oProductModel =new JSONModel();
		//oProductModel.loadData("./model/Products.json");
		//sap.ui.getCore().setModel(oProductModel, "products");
		//oTable._getSelectAllCheckbox().setVisible(false);
		//JSON model for AB products
		var oABProductModel =new JSONModel();
		oABProductModel.loadData("./model/ABProducts.json");
	//	sap.ui.getCore().setModel(oABProductModel, "abproducts");
	//	var oTable = sap.ui.getCore().byId("ProdTable");
		
		
	
		// Assign the model object to the SAPUI5 core
		//sap.ui.getCore().setModel(oModel);
		
		sap.ui.getCore().setModel(oABProductModel);
		
		// Create a resource bundle for language-specific texts
		// the configured supportedLocales represent the i18n files present:
		// * "" - i18n/i18n.properties
		// * "de" - i18n/i18n_de.properties
		// a configured fallbackLocale should represent one of these files
		// * "" - according to the fallback chain, the root bundle is the last fallback
		//   which means that if "de" was requested here, the root bundle would never be loaded.
		//   Configuring it explicitly avoids side effects when additional resource files are added.
		// @see https://sapui5.hana.ondemand.com/#/topic/ec753bc539d748f689e3ac814e129563
		var oResourceBundle = new ResourceModel({
			bundleName: "sap.ui.demo.db.i18n.i18n",
			supportedLocales: ["", "de"],
			fallbackLocale: ""
		});
		// Assign the model object to the SAPUI5 core using the name "i18n"
		sap.ui.getCore().setModel(oResourceBundle, "i18n");

		// Display the XML view called "App"
		var oView = new XMLView({
			viewName: "sap.ui.demo.db.view.App"
		});
		
		//Register the view with the message manager
		sap.ui.getCore().getMessageManager().registerObject(oView,true);
	
		//insert the view into the DOM
		oView.placeAt("content");
		
	});
});