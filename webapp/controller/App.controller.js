sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
//	"sap/m/library",
// "sap/m/MessageToast"
//	"sap/ui/core/Locale",
//	"sap/ui/core/LocaleData",
//	"sap/ui/model/type/Currency",
	//"sap/m/ObjectAttribute"
	], function(Controller,  JSONModel) {
		"use strict";
		
		return Controller.extend("sap.ui.demo.db.controller.App", {
				onPostAB: function(oInteractionModel){
				
	/*			   var oInteractionModel = new JSONModel({
				  "InteractionUUID": "00000000-0000-0000-0000-000000000000",
				  "InteractionContactOrigin": "EMAIL",
				   "InteractionContactId": "test.burberry@bk.ru",
				  "CommunicationMedium": "ONLINE_SHOP",
				  "InteractionType": "SHOP_CART_ABANDONED",
				  "InteractionLanguage": "DE",
				  "InteractionTimeStampUTC": new Date(),
				  "InteractionSourceObject": "o33050440",  
				  "InteractionReason": "REGISTERED_CUSTOMERS",
				  "InteractionIsAnonymous": false,
				  "InteractionAmount": "972.00",
				  "InteractionCurrency": "EUR",
				   "InteractionSourceDataURL": "cart/YN5a6QGy4HMiymdNmy66Pg==",
				   "YY1_PRICE_LIST_LOCALE_MIA":"de_DE_EUR",
				   
				  "InteractionAdditionalObjects": {
				    "results": [
				      {
				        "InteractionUUID": "00000000-0000-0000-0000-000000000000",
			        	"MarketingObjectType": "Email",
				        "MarketingObject": "test.burberry@bk.ru",
				      }
				    ]
					},
					
				  "InteractionProducts": {
				        "results": [{
				        	    "InteractionProductUUID": "00000000-0000-0000-0000-000000000000",
						        "ProductOrigin": "EXTERNAL_01",
						        "Product": "80181731",
						        "YY1_SIZE_MIP": "S",
						        "YY1_COLOUR_MIP": "Black",
						        "InteractionProductAmount": "50.00",
						        "InteractionProductQuantity": "1.00000"
				        }]
					}, 
					
				   "InteractionProductCategories": {
    					"results": [{
    							"InteractionUUID": "00000000-0000-0000-0000-000000000000",
					             "ProductCategoryHierarchy": "ATG",
		  			             "ProductCategory": "cat2330046"  
    					}]
					 }
	
		 	});
		 	
		 		var oPayload = oInteractionModel;
			    var sUrl = "/API_MKT_INTERACTION_SRV/Interactions"; 
				var oSettings = {
					"url": sUrl,
					"top": "10",
					"filter": "InteractionType eq 'SHOP_CART_ABANDONED'",
					"method": "GET",
					"headers": {
						"X-CSRF-Token": "Fetch"
					},
					"dataType": "json",
					"contentType": "application/json"
				};
				
				
				$.ajax(oSettings)
				.done(function(results, textStatus, XMLHttpRequest){
					sap.m.MessageToast.show("token received",{
						duration:600
					});
					var token =XMLHttpRequest.getResponseHeader('X-CSRF-Token');
					var sUrlToInsert = "API_MKT_INTERACTION_SRV/Interactions";
					var that =self;
					
					var oPayload = oInteractionModel;
					var oSettingsToInsert ={
						"url": sUrlToInsert,
						"method" : "POST",
						"headers": {
							"X-CSRF-Token": token
						},
						"async": false,
						"dataType":"json",
						"contentType":"application/JSON",
						"data":JSON.stringify(oPayload)
					};
						$.ajax(oSettingsToInsert)
							.done(function(results){})
							.fail(function(err){
								if (err !== undefined) {
									//	var oErrorResponse = $.parseJSON(err.responseText);
										sap.m.MessageToast.show("oErrorResponse.message", {
											duration: 6000
										});
									} else {
										sap.m.MessageToast.show("Unknown error!");
									}
							});
				})
				.fail(function(err){
						if (err !== undefined) {
						//	var oErrorResponse = $.parseJSON(err.responseText);
							sap.m.MessageToast.show("oErrorResponse.message", {
								duration: 6000
							});
						} else {
							sap.m.MessageToast.show("Unknown error!");
						}
				});
			}
		*/	
		 	
				var sUrl = "/API_MKT_INTERACTION_SRV/Interactions";   
				
				var oParams = {
					$format: "json",
					$top: 10,
					$filter: "InteractionType eq 'SHOP_CART_ABANDONED'",
					$inlinecount: "allpages"
				};
				
					$.get(sUrl, oParams)
						.done(function (results) {
						sap.m.MessageToast.show("Success", {
							duration: 6000
						});
					})
					.fail(function (err) {
						if (err !== undefined) {
						//var oErrorResponse = $.parseJSON(err.responseText);
						sap.m.MessageToast.show("oErrorResponse.message", {
							duration: 6000
						});
					} else {
						sap.m.MessageToast.show("Unknown error!");
					}
				});
			}
			
			
			
		/*
			onPostAB: function(){
			var	oBundle, sRecipient,sCurrency, sLocale, sSource, sDomain, oLength,sNavigation;
			
			oBundle = this.getView().getModel("i18n").getResourceBundle();
			sRecipient = this.byId("email").getValue();
			sCurrency = this.byId("currency").getSelectedItem().getKey();
			sLocale = this.byId("locale").getSelectedItem().getKey();
			sSource = this.byId("source").getSelectedItem().getKey();
			sDomain = this.byId("domain").getSelectedItem().getKey();
			sNavigation = this.byId("navigation").getValue();
			
			var today = new Date();
			
			//Count row number in the table
			var oTable = this.getView().byId("prTable");  
			var oRowsBinding = oTable.getBinding("rows");
    	    oLength = oRowsBinding.getLength();    
    	    
	        //form payload to be post
	        var aProducts = [];
	        var aProductCategories =[];
	        var totalAmount = 0;
	         //get array of rows in table
	        var oPrTable = this.byId("prTable");
			var rows = oPrTable.getRows();
	     	for ( var i = 0; i < rows.length; i++ ) {
	     	totalAmount += rows[i].getCells()[3].getProperty("value")*rows[i].getCells()[4].getProperty("value");
			aProducts.push({
		        InteractionProductUUID: "00000000-0000-0000-0000-000000000000",
		        ProductOrigin: "EXTERNAL_01",
		        Product: rows[i].getCells()[0].getProperty("value"),
		        YY1_SIZE_MIP: rows[i].getCells()[6].getProperty("value"),
		        YY1_COLOUR_MIP: rows[i].getCells()[5].getProperty("value"),
		        InteractionProductAmount: rows[i].getCells()[3].getProperty("value"),
		        InteractionProductQuantity: rows[i].getCells()[4].getProperty("value"),
		       
            });
            aProductCategories.push({
            	InteractionUUID: "00000000-0000-0000-0000-000000000000",
		        ProductCategoryHierarchy: "ATG",
		        ProductCategory: rows[i].getCells()[2].getProperty("value"),   
            });
            } //  END get array of rows in table
	        
	       
	        var oInteractionModel = new JSONModel({
				  "InteractionUUID": "00000000-0000-0000-0000-000000000000",
				  "InteractionContactOrigin": "EMAIL",
				  "InteractionContactId": sRecipient,
				  "CommunicationMedium": "ONLINE_SHOP",
				  "InteractionType": "SHOP_CART_ABANDONED",
				  "InteractionLanguage": sDomain,
				  "InteractionTimeStampUTC": new Date(),
				  "InteractionSourceObject": sSource,  
				  "InteractionReason": "REGISTERED_CUSTOMERS",
				  "InteractionIsAnonymous": false,
				  "InteractionAmount":  totalAmount,
				  "InteractionCurrency": sCurrency,
				  "InteractionSourceDataURL": sNavigation,
				  "InteractionSourceTimeStampUTC": new Date(),
				  "YY1_PRICE_LIST_LOCALE_MIA":sLocale,
				   
				  "InteractionAdditionalObjects": {
				    "results": [
				      {
				        "InteractionUUID": "00000000-0000-0000-0000-000000000000",
			        	"MarketingObjectType": "Email",
				        "MarketingObject": sRecipient
				      }
				    ]
					},
					
				  "InteractionProducts": {
				        "results": [{
	//			        	    "InteractionProductUUID": "00000000-0000-0000-0000-000000000000",
	//					        "ProductOrigin": "EXTERNAL_01",
	//					        "Product": "80181731",
	//					        "YY1_SIZE_MIP": "S",
	//					        "YY1_COLOUR_MIP": "Black",
	//					        "InteractionProductAmount": "50.00",
	//					        "InteractionProductQuantity": "1.00000"
				        }]
					}, 
					
				   "InteractionProductCategories": {
    					"results": [{
    	//						"InteractionUUID": "00000000-0000-0000-0000-000000000000",
		//				        "ProductCategoryHierarchy": "ATG",
		//				        "ProductCategory": "cat2330046"  
    					}]
					 }
	
		 	});
		 	
		 	oInteractionModel.setProperty("/InteractionProducts/results",aProducts);
		 	oInteractionModel.setProperty("/InteractionProductCategories/results",aProductCategories);
		 		// message to confirm  sending
			var sMsg = oBundle.getText("ABsent", [sRecipient]);
		 	sap.m.MessageToast.show(sMsg,{
				duration:600
			});
		 	this.postAbandonedBasket(oInteractionModel);
 	
		 
		  
		
			},
			postAbandonedBasket: function(oInteractionModel){
			
				var sUrl = "API_MKT_INTERACTION_SRV/Interactions/";   
				
				var oParams = {
					$format: "json",
					$top: 10,
					$filter: "InteractionType eq 'SHOP_CART_ABANDONED'",
					$inlinecount: "allpages"
				};
				
					$.get(sUrl, oParams)
						.done(function (results) {
						sap.m.MessageToast.show("Success", {
							duration: 6000
						});
					})
					.fail(function (err) {
						if (err !== undefined) {
						//var oErrorResponse = $.parseJSON(err.responseText);
						sap.m.MessageToast.show("oErrorResponse.message", {
							duration: 6000
						});
					} else {
						sap.m.MessageToast.show("Unknown error!");
					}
				});
			}
				
			
			*/
			
				
			
			/*
			postAbandonedBasket: function(oInteractionModel){
				var oView = this.getView();
				oView.setBusy(true);
				var sUrl = "API_MKT_INTERACTION_SRV/Interactions";   // destination on Cloud Platform to be set
				var oPayload = oInteractionModel;
				var self = this;
				
				var oSettings = {
					"url": sUrl,
					"top": "10",
					"filter": "InteractionType eq 'SHOP_CART_ABANDONED'",
					"method": "GET",
					"headers": {
						"X-CSRF-Token": "Fetch"
					},
					"dataType": "json",
					"contentType": "application/json"
				};
				
				
				$.ajax(oSettings)
				.done(function(results, textStatus, XMLHttpRequest){
					sap.m.MessageToast.show("token received",{
						duration:600
					});
					var token =XMLHttpRequest.getResponseHeader('X-CSRF-Token');
					var sUrlToInsert = "API_MKT_INTERACTION_SRV/Interactions";
					var that =self;
					
					var oPayload = oInteractionModel;
					var oSettingsToInsert ={
						"url": sUrlToInsert,
						"method" : "POST",
						"headers": {
							"X-CSRF-Token": token
						},
						"async": false,
						"dataType":"json",
						"contentType":"application/JSON",
						"data":JSON.stringify(oPayload)
					};
						$.ajax(oSettingsToInsert)
							.done(function(results){})
							.fail(function(err){
								if (err !== undefined) {
									//	var oErrorResponse = $.parseJSON(err.responseText);
										sap.m.MessageToast.show("oErrorResponse.message", {
											duration: 6000
										});
									} else {
										sap.m.MessageToast.show("Unknown error!");
									}
							});
				})
				.fail(function(err){
						oView.setBusy(false);
						if (err !== undefined) {
						//	var oErrorResponse = $.parseJSON(err.responseText);
							sap.m.MessageToast.show("oErrorResponse.message", {
								duration: 6000
							});
						} else {
							sap.m.MessageToast.show("Unknown error!");
						}
				});
			}
			*/
			
			/*
			postAbandonedBasket: function(oInteractionModel){
				var oView = this.getView();
				oView.setBusy(true);
				var sUrl = "API_MKT_INTERACTION_SRV/Interactions";   // destination on Cloud Platform to be set
				var oPayload = oInteractionModel;
				
				var oSettings ={
					"url": sUrl,
					"method" : "POST",
					"dataType":"json",
					"contentType":"application/JSON",
					"data":JSON.stringify(oPayload)
				};
				
				$.ajax(oSettings)
				.done(function(results){
					oView.setBusy(false);
					//to get interaction GUID
					//show message Interaction created
					var	oBundle = this.getView().getModel("i18n").getResourceBundle();
					var sMsg = oBundle.getText("ABposted");
					sap.m.MessageToast.show(sMsg,{
						duration:600
					});
				})
				.fail(function(err){
					oView.setBusy(false);
					if(err!== undefined){
						//var oErrorResponse = $.parseJSON(err.responseText);
						sap.m.MessageToast.show("oErrorResponse.message",{
							duration: 6000
						});
					} else {
						sap.m.MessageToast.show("Unknown error!");
					}
				});
			
				
			}
				
			
			*/
			
			
			
			
			
			
			
			
			
			
	
		});
	
	
	
});