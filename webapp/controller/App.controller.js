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
			token: "",
		
			postAbandonedBasket: function(oInteractionModel){
                var that = this; 
                
                var sUrl = "/API_MKT_INTERACTION_SRV"; 
				var oSettings = {
					"url": sUrl,
					"method": "GET",
					"top": "6",
					"headers": {
						"X-CSRF-Token": "Fetch"
					},
					"dataType": "json",
					"contentType": "application/json"
				};
				
				$.ajax(oSettings)
				.done(function(results, textStatus, XMLHttpRequest){
					that.token =XMLHttpRequest.getResponseHeader('X-CSRF-Token');
				    sap.m.MessageToast.show("token received " + that.token, {
						duration:600
					});
					var sUrlToInsert = "/API_MKT_INTERACTION_SRV/Interactions";
				//	var oPayload = oInteractionModel;
					var oSettingsToInsert ={
						"url": sUrlToInsert,
						"method" : "POST",
						"headers": {
							"X-CSRF-Token": that.token
						},
						"dataType":"json",
						"contentType":"application/JSON",
						"data": JSON.stringify(oInteractionModel)
					};
						$.ajax(oSettingsToInsert)
							.done(function(results,textStatus, XMLHttpRequest){
								sap.m.MessageToast.show("POST done", {
											duration: 6000
										});
							})
							.fail(function(err){
								if (err !== undefined) {
									//	var oErrorResponse = $.parseJSON(err.responseText);
										sap.m.MessageToast.show("oErrorResponse.message while post", {
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
				
			
				
				},	
								
	
			// POST request
			onPostAB: function(oInteractionModel){
				
	/*		var oInteractionModel = {
		
  "InteractionUUID": "00000000-0000-0000-0000-000000000000",
  "InteractionContactOrigin": "EMAIL",
  "InteractionContactId": "nona.fisher.00@bk.ru",
  "CommunicationMedium": "ONLINE_SHOP",
  "InteractionType": "SHOP_CART_ABANDONED",
  "InteractionTimeStampUTC": "2020-12-08T09:10:53",
  "InteractionSourceObject": "o33050440",  
  "InteractionReason": "REGISTERED_CUSTOMERS",
  "InteractionIsAnonymous": false,
  "InteractionAmount": "50.00",
  "InteractionCurrency": "GBP",
  "InteractionLatitude": "0",
  "InteractionLongitude": "0",
  "PrecedingInteractionUUID": "00000000-0000-0000-0000-000000000000",
  "InteractionSourceDataURL": "urberry.com/abandoned-cart/Q0cTRsjX4FHwBRzEEPGwXg==",
  "InteractionSourceTimeStampUTC": "2020-12-08T09:14:53",

   "YY1_PRICE_LIST_LOCALE_MIA":"en_GB_GBP",
   "YY1_DELIVERY_TO_STORE_MIA":"F",
   "YY1_AB_CHANNEL_SOURCE_MIA": "ROW",
   "YY1_PR_TAX_TOTAL_MIA" : "0.00",
   "YY1_SHIPPING_METHOD_NA_MIA" : "GB_UPS_STANDARD",
   "YY1_SH_FIRST_NAME_MIA": "",
   "YY1_SH_LAST_NAME_MIA": "",
   "YY1_SIGN_UP_CODE_MIA": "ATGAB",
   "YY1_AMOUNT_FTD_MIA" : "76.00",
   "YY1_SHIPNG_AMOUNT_FTD_MIA": "$25.00",
   
   
    "InteractionProductCategories": {
    "results": [
      {
        "InteractionUUID": "00000000-0000-0000-0000-000000000000",
        "ProductCategoryHierarchy": "ATG",
        "ProductCategory": "cat7270024"      
      
      },
	{
        "InteractionUUID": "00000000-0000-0000-0000-000000000000",
        "ProductCategoryHierarchy": "ATG",
        "ProductCategory": "cat6720026"      
      
      }
    ]
  },   
   
   "InteractionAdditionalObjects": {
    "results": [
      {
        "InteractionUUID": "00000000-0000-0000-0000-000000000000",
        "MarketingObjectType": "Email",
        "MarketingObject": "nona.fisher.00@bk.ru"
      }
    ]
  },
  "InteractionProducts": {
    "results": [
      {
        "InteractionProductUUID": "00000000-0000-0000-0000-000000000000",
        "ProductOrigin": "EXTERNAL_01",
        "Product": "80181731",
        "InteractionProductAmount": "50.00",
        "InteractionProductQuantity": "1.00000"

      },
	{
        "InteractionProductUUID": "00000000-0000-0000-0000-000000000000",
        "ProductOrigin": "EXTERNAL_01",
        "Product": "40785761",
        "InteractionProductAmount": "110.00",
        "InteractionProductQuantity": "1.00000"
      }
    ]
  }
 };*/
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
    	    //get array of rows in table
	        var oPrTable = this.byId("prTable");
			var rows = oPrTable.getRows();
	     	
	        //form payload to be post
	        
	        var aProducts = [];
	        var aProductCategories =[];
	       
			var oInteractionModel = {
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
				  "InteractionAmount":  "30.00",
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
				        "results": [
	//			        	    "InteractionProductUUID": "00000000-0000-0000-0000-000000000000",
	//					        "ProductOrigin": "EXTERNAL_01",
	//					        "Product": "80181731",
	//					        "YY1_SIZE_MIP": "S",
	//					        "YY1_COLOUR_MIP": "Black",
	//					        "InteractionProductAmount": "50.00",
	//					        "InteractionProductQuantity": "1.00000"
				        ]
					}, 
					
				   "InteractionProductCategories": {
    					"results": [
    	//						"InteractionUUID": "00000000-0000-0000-0000-000000000000",
		//				        "ProductCategoryHierarchy": "ATG",
		//				        "ProductCategory": "cat2330046"  
    					]
					 }
	
		 	};
		 //	oInteractionModel.InteractionProducts.results.push(aProducts);
		// 	oInteractionModel.InteractionProductCategories.results.push(aProductCategories);
		 	for ( var i = 0; i < rows.length; i++ ) {
		//	var totalAmount = 10;
	      
	    // 	totalAmount += rows[i].getCells()[3].getProperty("value")*rows[i].getCells()[4].getProperty("value");
			
			oInteractionModel.InteractionProducts.results.push({
		        InteractionProductUUID: "00000000-0000-0000-0000-000000000000",
		        ProductOrigin: "EXTERNAL_01",
		        Product: rows[i].getCells()[0].getProperty("value"),
		        YY1_SIZE_MIP: rows[i].getCells()[6].getProperty("value"),
		        YY1_COLOUR_MIP: rows[i].getCells()[5].getProperty("value"),
		        InteractionProductAmount: rows[i].getCells()[3].getProperty("value"),
		        InteractionProductQuantity: rows[i].getCells()[4].getProperty("value"),
            });
           oInteractionModel.InteractionProductCategories.results.push({
            	InteractionUUID: "00000000-0000-0000-0000-000000000000",
		        ProductCategoryHierarchy: "ATG",
		        ProductCategory: rows[i].getCells()[2].getProperty("value"),   
            });
            } //  END get array of rows in table
	        
	      /* 
	        var oInteractionModel = {
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
				  "InteractionAmount":  "50.00",
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
				        "results": [
	//			        	    "InteractionProductUUID": "00000000-0000-0000-0000-000000000000",
	//					        "ProductOrigin": "EXTERNAL_01",
	//					        "Product": "80181731",
	//					        "YY1_SIZE_MIP": "S",
	//					        "YY1_COLOUR_MIP": "Black",
	//					        "InteractionProductAmount": "50.00",
	//					        "InteractionProductQuantity": "1.00000"
				        ]
					}, 
					
				   "InteractionProductCategories": {
    					"results": [
    	//						"InteractionUUID": "00000000-0000-0000-0000-000000000000",
		//				        "ProductCategoryHierarchy": "ATG",
		//				        "ProductCategory": "cat2330046"  
    					]
					 }
	
		 	};
		 	*/
		 //	oInteractionModel.InteractionProducts.results.push(aProducts);
		// 	oInteractionModel.InteractionProductCategories.results.push(aProductCategories);
		 	
		 
		 	/*
		 	oInteractionModel.setProperty("/InteractionProducts/results",aProducts);
		 	oInteractionModel.setProperty("/InteractionProductCategories/results",aProductCategories);
		 		// message to confirm  sending
		 	*/
			var sMsg = oBundle.getText("ABsent", [sRecipient]);
		 	sap.m.MessageToast.show(sMsg,{
				duration:600
			});
		 	this.postAbandonedBasket(oInteractionModel);
			},
			
		 		
	 
	// Using fetch method
	/*
			    var sUrl = "/API_MKT_INTERACTION_SRV"; 
				var oSettings = {
					"url": sUrl,
					"method": "GET",
					"top": "6",
					"headers": {
						"X-CSRF-Token": "Fetch"
					},
					"dataType": "json",
					"contentType": "application/json"
				};
				
				
				$.ajax(oSettings)
				.done(function(results1, textStatus, XMLHttpRequest){
					sap.m.MessageToast.show("token received",{
						duration:600
					});
					var token =XMLHttpRequest.getResponseHeader('X-CSRF-Token');
					var sUrlToInsert = "/API_MKT_INTERACTION_SRV/Interactions";
				
					fetch(sUrlToInsert,{
							method:"POST",
							headers:{
								"X-CSRF-Token": token, 
    							"content-Type": "application/json",
							},
							body: JSON.stringify(oInteractionModel)
						}).then(function(response){
							return response.json();
						}).then(function(data) {
							  	sap.m.MessageToast.show("data", {
								duration: 6000
							});
							}).catch(function(error) {
							  	sap.m.MessageToast.show("fetch error", {
								duration: 6000
							});
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
			
	
	});
});