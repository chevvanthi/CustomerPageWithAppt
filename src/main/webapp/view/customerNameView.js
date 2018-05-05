var customerNameView = Backbone.View.extend({
tagName 	: 'ul',
className	: 'nameShow_ul',
events		:{
				"click #deleteCustomer " : "deleteCustomer",
				"click #customerName-li" : "showCustomerDetails"
			 },
initialize: function() {
    			model = new customerDetailsModel(this);
				model.on('change', this.render, this);
},

showCustomerDetails : function(){
						
					     console.log(this.attributes);
						
						 var emailArray  = [];
						 var mobileArray = [];
    					 var email  = this.attributes.customerEmail;
    					 var emails = JSON.parse(email);
    					 emailArray.push(emails);
    					
    					 
    					 var mobile = this.attributes.customerMobile;
    					 var mobiles = JSON.parse(mobile);
    					 mobileArray.push(mobiles);
						
    					 var customerValues = {
    							 
    							 customerName 	 :  this.attributes.customerName,
    							 customerAddress :	this.attributes.customerAddress,
    							 customerCompany :	this.attributes.customerCompany,
    							 customerEmail   :	this.attributes.customerEmail,
    							 customerMobile  :	this.attributes.customerMobile,
    							 randomId		 : 	this.attributes.randomId,
    							 adminId		 :  this.attributes.adminId
    							
    							 
    					 }
    					 
    					 var customerModel = new customerDetailsModel(customerValues);
    					 
						var customerDetailsShow = new customerDetailsView(customerModel);
    		   			$('#customerDetailsContainer').html(customerDetailsShow.render().el);
    					
    		   			$('#customerNameShow').val(this.attributes.customerName);
    					$('#customerAddressShow').val(this.attributes.customerAddress);
    					$('#customerCompanyShow').val(this.attributes.customerCompany);
    					$('#primaryEmailShow'). val(emails[0].email);
	    				$('#primaryMobileShow').val(mobiles[0].mobile);
	    				
	    				var emailLabel = emails[0].label;
	    				
	    				if($("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]')!= null){
	    				$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]').setAttribute('selected','selected');		
	    				}else {
	    					$("#EmailContainerDetails div:last #EmailLabelShow").append($("<option  selected='selected' value = " +emailLabel+">"+emailLabel+"</option>"));
	    				}
	    				
	    				var mobileLabel = mobiles[0].label;

	    				if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]')!= null){
		    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]').setAttribute('selected','selected');		
		    				}else {
		    					$("#MobileContainerDetails div:last #MobileLabelShow").append($("<option value = " + mobileLabel +">"+mobileLabel +"</option>")).attr('selected','selected');	
		    				}


	    				if(emailArray[0].length > 1){
    						
    						$.each(emailArray[0],function(key,value){
    							
    							if(key == 0){
    								console.log("don't append");
    							}else{
	    							var label = value.label;
	    							var email = value.email;
	    							
	    							var emailTemplate =  _.template($('#EmailTemplate').html());
	    							$('#EmailContainerDetails').append(emailTemplate);
	    							
	    							$("#EmailContainerDetails div:last input:last").attr('id', 'customerEmailShow' + id).val(email);
	    							
	    							if($("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]')!= null){
	    			    				$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');		
	    			    				}else {
	    			    					$("#EmailContainerDetails div:last #EmailLabel").append($("<option  selected='selected' value = " +label+">"+label+"</option>"));
	    			    				}   
	    							}

    						  });

    					}
	    				
	    				if(mobileArray[0].length > 1){
    						
    						$.each(mobileArray[0],function(key,value){
    							
    							if(key == 0){
    								console.log("don't append");
    							}else{
	    							var label = value.label;
	    							var mobile = value.mobile;
	    							
	    							var mobileTemplate =  _.template($('#mobileTemplate').html());
	    							$('#MobileContainerDetails').append(mobileTemplate);
	    							
	    							$("#MobileContainerDetails div:last input:last").attr('id', 'customerMobileShow' + id).val(mobile);
	    							
	    							if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]')!= null){
	    			    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');		
	    			    				}else {
	    			    					$("#MobileContainerDetails div:last #MobileLabel").append($("<option  selected='selected' value = " +label+">"+label+"</option>"));
	    			    				}   
	    							}

    						  });

    					}	
	    				
	
},
deleteCustomer : function(){	
	
				 target = event.currentTarget
				 var RecentrandomId = target.getAttribute('randomId');

				
				 var deleteModel = new customerDetailsModel({ID:RecentrandomId});
				
				
				
					customerCollections.remove(deleteModel);
				    nextElement = target.nextElementSibling;
					target.remove();
				
				 
				 if(nextElement){
 					
 					 var currentModel 		=  customerCollections.where({randomId : RecentrandomId});
 					
						
 					 var customerValues = {
						
 						 customerName 	   : nextElement.getAttribute('customerName'),
						 customerCompany   : nextElement.getAttribute('customerCompany'),
						 customerAddress   : nextElement.getAttribute('customerAddress'),
						 customerEmail     : nextElement.getAttribute('customerEmail'),
						 customerMobile	   : nextElement.getAttribute('customerMobile')
						 
 					 }
 					
 					 var emailArray  = [];
					 var mobileArray = [];
					 var email  = nextElement.getAttribute('customerEmail');
					 var emails = JSON.parse(email);
					 emailArray.push(emails);
					
					 
					 var mobile = nextElement.getAttribute('customerMobile');
					 var mobiles = JSON.parse(mobile);
					 mobileArray.push(mobiles);
 					
 					var customerDetailsShow = new customerDetailsView(customerValues);
		   			$('#customerDetailsContainer').html(customerDetailsShow.render().el);
		   			
		   			$('#customerNameShow').val(customerValues.customerName);
					$('#customerAddressShow').val(customerValues.customerAddress);
					$('#customerCompanyShow').val(customerValues.customerCompany);					
					
					$('#primaryEmailShow'). val(emails[0].email);
    				$('#primaryMobileShow').val(mobiles[0].mobile);
    				
    				var emailLabel = emails[0].label;
    				if($("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]')!= null){
	    				$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]').setAttribute('selected','selected');		
	    				}else {
	    					$("#EmailContainerDetails div:last #EmailLabel").append($("<option  selected='selected' value = " +emailLabel+">"+emailLabel+"</option>"));
	    				}       				
    				var mobileLabel = mobiles[0].label;
    				
    				
    				if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]')!= null){
	    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]').setAttribute('selected','selected');		
	    				}else {
	    					$("#MobileContainerDetails div:last #MobileLabelShow").append($("<option value = " + mobileLabel +">"+mobileLabel +"</option>")).attr('selected','selected');	
	    				}

    				if(emailArray[0].length > 1){
						
						$.each(emailArray[0],function(key,value){
							
							if(key == 0){
								console.log("don't append");
							}else{
    							var label = value.label;
    							var email = value.email;
    							
    							var emailTemplate =  _.template($('#EmailTemplate').html());
    							$('#EmailContainerDetails').append(emailTemplate);
    							
    							$("#EmailContainerDetails div:last input:last").attr('id', 'customerEmailShow' + id).val(email);
    							
    							$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');						    							
							}

						  });

					}
    				
    				if(mobileArray[0].length > 1){
						
						$.each(mobileArray[0],function(key,value){
							
							if(key == 0){
								console.log("don't append");
							}else{
    							var label = value.label;
    							var mobile = value.mobile;
    							
    							var mobileTemplate =  _.template($('#mobileTemplate').html());
    							$('#MobileContainerDetails').append(mobileTemplate);
    							
    							$("#MobileContainerDetails div:last input:last").attr('id', 'customerMobileShow' + id).val(mobile);
    							
    							if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]')!= null){
    			    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');		
    			    				}else {
    			    					$("#MobileContainerDetails div:last #MobileLabel").append($("<option  selected='selected' value = " +label+">"+label+"</option>"));
    			    				}   							}

						  });

					}	
 					
				 }
				
				deleteModel.destroy({
						
				    success: function (model, respose, options) {
				    	alert('contact deleted succesfully');
				    },
				    error: function (model, xhr, options) {
				    	alert('contact deleted succesfully');

				        console.log("Something went wrong while deleting the model");
				    }
				});				

	
},
render    	: function(){
				
				customerCollections.forEach(function(model){
					console.log(model.get('customerName'));
					customerName = model.get('customerName');
				})
				
				this.$el.append($("<li id='customerName-li'>" + customerName + "</li>"))
				this.$el.append($("<span id='deleteCustomer'>&times</span>"));
				return this;
}

});


var customerDetailsView = Backbone.View.extend({

tagName :   'div',
id 		:   'customerDetailsShow',

initialize: function() {
			this.model = new customerDetailsModel(this);
},
events 	: {
			"click #updateCustomerbutton": "updateDetails",
			"click  #primaryPlus" : "EmailTemplate",
			"click #primaryMobileAdd" : "mobileTemplate",
			"click  .emailMinus" : "removeTemplate",
			"click  .mobileMinus" :"removeTemplate",
			"change .lable" : "customLabelTemplate",
			"click #deleteCustomerButton" : "deletecustomer" 
			
			

		},
EmailTemplate	: function(){

					if($('#primaryEmailShow').val() ==''){
						alert('Please enter the email address');
					 }
					else{
						
						var emailTemplate =  _.template($('#EmailTemplate').html());
						$('#EmailContainerDetails').append(emailTemplate);
						id++;
					    
						$("#EmailContainer div:last input:last").attr('id', 'customerEmailShow' + id);
					}

},
	
removeTemplate     : function(event){
						$("#customerPageContainer").removeClass("background_fade");

						var currentElement = $(event.currentTarget).parent();
						currentElement.remove();

		},
mobileTemplate 		: function(){
						
						if($('#primaryMobileShow').val()==''){
							alert('Please enter the Mobile numbers');
						 }
						else{
							
							var mobileTemplate =  _.template($('#mobileTemplate').html());
							$('#MobileContainerDetails').append(mobileTemplate);
							id1++;
						    
							$("#MobileContainer div:last input:last").attr('id', 'customerMobileShow' + id1);
						}


},
customLabelTemplate : function(){
	 
    
							 selectTarget = event.target;
							 var id = event.target.id;
						 
						 		if($('#contactFormWrapper').has($("#customTemplateContainer")).length ==1) {
								return;								
							}else{
						 
								 if(id=='EmailLabelShow'){
									 var selected    = selectTarget.selectedOptions[0].value;
								 }else if(id=='MobileLabelShow'){
									 var selected    = selectTarget.selectedOptions[0].value;
								 }else if(id == 'EmailLabel'){
									 var selected    = selectTarget.selectedOptions[0].value;

								 }else if(id == 'MobileLabel'){
									 var selected    = selectTarget.selectedOptions[0].value;

								 }
								 
								 if(selected == "customLable"){
									 $("#customerPageContainer").addClass("background_fade");
									 	var customLabel = new customLabelTemplateView();
										$('#customTemplate').append(customLabel.render().el);
								 }
							}

},
deletecustomer : function(){

				 target = event.currentTarget
				 var RecentrandomId = target.getAttribute('randomId');
				
				  
				 var singleCustomerViewName =  $('#customerNamesContainer').find("[randomId='" +RecentrandomId+ "']");
				 singleCustomerViewName.remove();
				 customerCollections.remove(deleteModel);
				 target.remove();
				
				 	nextElement = target.nextElementSibling;
					target.remove();
				 
				 var deleteModel = new customerDetailsModel({ID:RecentrandomId});
				 
				 if(nextElement){
	 					
 					 var currentModel 		=  customerCollections.where({randomId : RecentrandomId});
 					
						
 					 var customerValues = {
						
 						 customerName 	   : nextElement.getAttribute('customerName'),
						 customerCompany   : nextElement.getAttribute('customerCompany'),
						 customerAddress   : nextElement.getAttribute('customerAddress'),
						 customerEmail     : nextElement.getAttribute('customerEmail'),
						 customerMobile	   : nextElement.getAttribute('customerMobile')
						 
 					 }
 					
 					 var emailArray  = [];
					 var mobileArray = [];
					 var email  = nextElement.getAttribute('customerEmail');
					 var emails = JSON.parse(email);
					 emailArray.push(emails);
					
					 
					 var mobile = nextElement.getAttribute('customerMobile');
					 var mobiles = JSON.parse(mobile);
					 mobileArray.push(mobiles);
 					
 					var customerDetailsShow = new customerDetailsView(customerValues);
		   			$('#customerDetailsContainer').html(customerDetailsShow.render().el);
		   			
		   			$('#customerNameShow').val(customerValues.customerName);
					$('#customerAddressShow').val(customerValues.customerAddress);
					$('#customerCompanyShow').val(customerValues.customerCompany);					
					
					$('#primaryEmailShow'). val(emails[0].email);
    				$('#primaryMobileShow').val(mobiles[0].mobile);
    				
    				var emailLabel = emails[0].label;
    				if($("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]')!= null){
	    				$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]').setAttribute('selected','selected');		
	    				}else {
	    					$("#EmailContainerDetails div:last #EmailLabel").append($("<option  selected='selected' value = " +emailLabel+">"+emailLabel+"</option>"));
	    				}       				
    				var mobileLabel = mobiles[0].label;
    				
    				
    				if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]')!= null){
	    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]').setAttribute('selected','selected');		
	    				}else {
	    					$("#MobileContainerDetails div:last #MobileLabelShow").append($("<option value = " + mobileLabel +">"+mobileLabel +"</option>")).attr('selected','selected');	
	    				}

    				if(emailArray[0].length > 1){
						
						$.each(emailArray[0],function(key,value){
							
							if(key == 0){
								console.log("don't append");
							}else{
    							var label = value.label;
    							var email = value.email;
    							
    							var emailTemplate =  _.template($('#EmailTemplate').html());
    							$('#EmailContainerDetails').append(emailTemplate);
    							
    							$("#EmailContainerDetails div:last input:last").attr('id', 'customerEmailShow' + id).val(email);
    							
    							$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');						    							
							}

						  });

					}
    				
    				if(mobileArray[0].length > 1){
						
						$.each(mobileArray[0],function(key,value){
							
							if(key == 0){
								console.log("don't append");
							}else{
    							var label = value.label;
    							var mobile = value.mobile;
    							
    							var mobileTemplate =  _.template($('#mobileTemplate').html());
    							$('#MobileContainerDetails').append(mobileTemplate);
    							
    							$("#MobileContainerDetails div:last input:last").attr('id', 'customerMobileShow' + id).val(mobile);
    							
    							if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]')!= null){
    			    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');		
    			    				}else {
    			    					$("#MobileContainerDetails div:last #MobileLabel").append($("<option  selected='selected' value = " +label+">"+label+"</option>"));
    			    				}   							}

						  });

					}	
 					
				 }
				 
				 deleteModel.destroy({
						
					    success: function (model, respose, options) {
					    	alert('contact deleted succesfully');
					    },
					    error: function (model, xhr, options) {
					    	alert('deleted');
					        console.log("Something went wrong while deleting the model");
					    }
					});				

				 
				 
				},
updateDetails : function(){
				
	
				var customerDetails =  $('#customerDetailsContainer #customerDetailsShow')[0];
				
				var oldValues  = {
						
						customerName	 :	 customerDetails.attributes.customerName.value,
					    customerAddress  :	 customerDetails.attributes.customerAddress.value,
						customerCompany  :   customerDetails.attributes.customerCompany.value,
						randomId		 :   customerDetails.attributes.randomId.value,
						customerEmail	 :   customerDetails.attributes.customerEmail.value,
						customerMobile	 :   customerDetails.attributes.customerMobile.value,
						adminId			 :   adminId
							
				}
	
				console.log("old values " + JSON.stringify(oldValues));
	
	
	
				var emailValues = [];
				var mobileValues = [] ;
				
				var emailContainer=$(' #EmailContainerDetails > #customerEmailDivShow');
				
				for(var i=0;i<emailContainer.length;i++){
					
					var currentEmailDiv 	= 	emailContainer[i];
					var email           	= 	currentEmailDiv.querySelector('input').value;
					var label           	= 	currentEmailDiv.querySelector('#EmailLabelShow')
					var selectedEmailLablel = 	label.options[label.selectedIndex].text;
					
					emailValues.push({
						label  : selectedEmailLablel,
						email : email
					});
					
				}
				
				var mobileContainer = $('#MobileContainerDetails > #customerMobileDivShow');
				
				for(var i=0;i<mobileContainer.length;i++){
					
					var currentMobileDiv = mobileContainer[i];
					var mobile = currentMobileDiv.querySelector('input').value;
					var label  = currentMobileDiv.querySelector('#MobileLabelShow')
					var selectedMobileLablel = label.options[label.selectedIndex].text;
					
					mobileValues.push({
						label : selectedMobileLablel,
						mobile : mobile
					});
					
				}		
				
				var additionalEmailArray = [];
				var additionalEmails =  $('#EmailContainerDetails > .additionalEmails');

				for(var i=0;i<additionalEmails.length;i++){
					
					var currentEmailDiv 	= 	additionalEmails[i];
					var email           	= 	currentEmailDiv.querySelector('input').value;
					var label           	= 	currentEmailDiv.querySelector('#EmailLabel');
					
					var selectedEmailLablel = 	label.options[label.selectedIndex].text;
		
					additionalEmailArray.push({
						label  : selectedEmailLablel,
						email  : email
					});
					
					emailValues.push({
						label : selectedEmailLablel,
						email  : email
					})
					
				 }

				var additionalMobileArray = [];
				var addtionalMobiles	  = $('#MobileContainerDetails > .additionalMobiles');
				
				for(var i=0;i<addtionalMobiles.length;i++){
					
					var currentMobileDiv 	= 	addtionalMobiles[i];
					var mobile           	= 	currentMobileDiv.querySelector('input').value;
					var label           	= 	currentMobileDiv.querySelector('#MobileLabel');
					var selectedMobileLablel = 	label.options[label.selectedIndex].text;
					
					additionalMobileArray.push({
						label  : selectedMobileLablel,
						mobile  : mobile
					});
					
					mobileValues.push({
						label : selectedMobileLablel,
						mobile : mobile
					});
					
				}
				
			   
				
				var newValue = {
						
						customerName	 :	 $('#customerNameShow').val(),
					    customerAddress  :	 $('#customerAddressShow').val(),
						customerCompany  :   $('#customerCompanyShow').val(),
						randomId		 :   this.model.attributes.attributes.randomId,
						customerEmail	 :   JSON.stringify(emailValues),
						customerMobile	 :   JSON.stringify(mobileValues),
						adminId			 :   adminId
							
					
				}
				
				console.log("New value " + JSON.stringify(newValue));

				if(JSON.stringify(oldValues) == JSON.stringify(newValue)){
					alert("please update some values");
				}else{
				
			var updateModel = new customerDetailsModel(newValue);
			
			customerCollections.set(updateModel);
				
			updateModel.save({},{
					
					success : function(){
									alert('contact updated succesfully');
									var singleCustomerView = new customerNameView(newValue);

					},
					error  : function(){
						console.log('inside the error call');
					}
					
				});
				}

},

template  : _.template($('#customerDetailsTemplate').html()),

render	  : function(){
				
				this.$el.html(this.template());
				return this;

}
	
});


var customLabelTemplateView = Backbone.View.extend({

className : "customLabel",
events 	  :{
			
			"click  #saveCustomValue" : "getNewValue",
			"click  #CancelCustomPopUp" : "RemovecustomLabelTemplate"
},
getNewValue			: function(event){	
		
					console.log(selectTarget);
					var newValue = $('#newCustomValue').val();
					
					if(selectTarget.id == 'EmailLabelShow'){
						if($('#contactFormView').length!=0){
						$("#contactFormWrapper > #contactFormView #EmailContainer #EmailLabelShow").append($("<option  selected='selected' value = " +newValue+">"+newValue+"</option>"));
						}else{
							$("#EmailLabelShow").append($("<option  selected='selected' value = " +newValue+">"+newValue+"</option>"));

						}
						
					}else if(selectTarget.id == 'MobileLabelShow'){
						if($('#contactFormView').length!=0){
						$("#contactFormWrapper > #contactFormView #MobileContainer #MobileLabelShow").append($("<option  selected='selected' value = " +newValue+">"+newValue+"</option>"));
						}else{
							$("#MobileLabelShow").append($("<option  selected='selected' value = " +newValue+">"+newValue+"</option>"));

						}
					}else if(selectTarget.id == 'EmailLabel'){
						if($('#contactFormView').length!=0){
						$("#contactFormWrapper > #contactFormView #EmailContainer div:last #EmailLabel").append($("<option  selected='selected' value = " +newValue+">"+newValue+"</option>"));
						}else{
							$("#EmailLabel").append($("<option  selected='selected' value = " +newValue+">"+newValue+"</option>"));

						}
						
					}else if(selectTarget.id == 'MobileLabel'){
						if($('#contactFormView').length!=0){
						$("#contactFormWrapper > #contactFormView #EmailContainer div:last #MobileLabel").append($("<option  selected='selected' value = " +newValue+">"+newValue+"</option>"));
						}else{
							$("#MobileLabel").append($("<option  selected='selected' value = " +newValue+">"+newValue+"</option>"));
	
						}
					}
					
					$('#customTemplateContainer').remove();
					$("#customerPageContainer").removeClass("background_fade");

},
RemovecustomLabelTemplate : function(){
							$('#customTemplateContainer').remove();
							$("#customerPageContainer").removeClass("background_fade");

},

template : _.template($('#customLabelTemplate').html()),
render	  : function(){
	
			this.$el.html(this.template());
			return this;

}
	
});

