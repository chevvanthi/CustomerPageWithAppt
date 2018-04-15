var id=0;
var id1;
var target;

customerCollections = new customerCollection();

var customerFormView = Backbone.View.extend({

tagName 	   : "div",
className	   : "contactForm modal-content",
id			   :'contactFormView',
events 		   : {

					"click .close" : "removeForm",
					"click #primaryPlus" : "EmailTemplate",
					"click .emailMinus" : "removeTemplate",
					"click #saveCustomerButton" : "saveCustomerDetails",
					"click  #primaryMobileAdd" : "mobileTemplate",
					"click .mobileMinus" :"removeTemplate",
					"change .lable" : "customLabelTemplate",
					"click  #saveCustomValue" : "getNewValue",
					"click #CancelCustomPopUp" : "RemovecustomLabelTemplate"
				},	
removeForm 		: function(){
	
					 console.log('remove form');
					 $('#contactFormWrapper .contactForm').remove();

					},
					
EmailTemplate	: function(){

						if($('#primaryEmail').val()==''){
							alert('Please enter the email address');
						 }
						else{
							
							var emailTemplate =  _.template($('#EmailTemplate').html());
							$('#EmailContainer').append(emailTemplate);
							id++;
							var last = $('#EmailContainer').last();
						    
							$("#EmailContainer div:last input:last").attr('id', 'customerEmail' + id);
						}
	
				  },
				
removeTemplate     : function(event){
						var currentElement = $(event.currentTarget).parent();
						currentElement.remove();

					},
mobileTemplate 		: function(){
						
						if($('#primaryMobile').val()==''){
							alert('Please enter the Mobile numbers');
						 }
						else{
							
							var mobileTemplate =  _.template($('#mobileTemplate').html());
							$('#MobileContainer').append(mobileTemplate);
							id1++;
							var last = $('#MobileContainer').last();
						    
							$("#MobileContainer div:last input:last").attr('id', 'customerMobile' + id1);
						}

	
					},
customLabelTemplate : function(){
							 
						    
							 target = event.target;
							 var id = event.target.id;
							 
							 		if($('#contactFormWrapper').has($("#customTemplateContainer")).length ==1) {
									
									return;								
								}else{
							 
									 if(id=='EmailLabel'){
										 var selected    = $('#EmailLabel').find(":selected").val();
									 }else if(target.id='MobileLabel'){
										 var selected    = $('#MobileLabel').find(":selected").val();
									 }
									 
									 if(selected == "customLable"){
										 var customLabel =  _.template($('#customLabelTemplate').html());
											$('#contactFormView').append(customLabel);
									 }
								}
			
					},
getNewValue			: function(event){	
	 							
								var newValue = $('#newCustomValue').val();
								
								if(target.id == 'EmailLabel'){
									 $('#EmailLabel').prepend($("<option selected='selected'></option>").text(newValue));
								}else if(target.id= 'MobileLabel'){
									 $('#MobileLabel').prepend($("<option selected='selected'></option>").text(newValue)); 

								}
								$('#customTemplateContainer').remove();

										
					},
RemovecustomLabelTemplate : function(){
								$('#contactFormWrapper #customTemplateContainer').remove();
	
						},
saveCustomerDetails : function(){
	
	
							var customerName 	 =  $('#customerName')
							var customerAddress  =  $('#customerAddress')
							var customerCompany  =  $('#customerCompany')
							var string = "";
							var randomId 		 =  string +Math.random()
							 emailValues  = [];
							var mobileValues = [];
							
							var primaryEmail = $('#primaryEmail').val();
							var primaryMobile = $('#primaryMobile').val();
							
							
							if(customerName.val() == ""){
			              	 	alert("please enter the name")
			              	 	$('#customerName').focus();
			              	 }else if(primaryEmail == ""){
			              	 	alert("please enter the email");
			              	 	$('#primaryEmail').focus();

			              	 }else if(primaryMobile == ""){
			              	 	alert("please enter the mobile num");
			              	 	$('#primaryMobile').focus();

			              	 	}else{
							
							
							var emailContainer=$(' #EmailContainer > #customerEmailDiv');
							
							
							for(var i=0;i<emailContainer.length;i++){
								
								var currentEmailDiv 	= 	emailContainer[i];
								var email           	= 	currentEmailDiv.querySelector('input').value;
								var label           	= 	currentEmailDiv.querySelector('#EmailLabel')
								var selectedEmailLablel = 	label.options[label.selectedIndex].text;
								
								emailValues.push({
									label  : selectedEmailLablel,
									email : email
								});
								
							}
							
							var mobileContainer = $('#MobileContainer > #customerMobileDiv');
							
							for(var i=0;i<mobileContainer.length;i++){
								
								var currentMobileDiv = mobileContainer[i];
								var mobile = currentMobileDiv.querySelector('input').value;
								var label  = currentMobileDiv.querySelector('#MobileLabel')
								var selectedMobileLablel = label.options[label.selectedIndex].text;
								
								mobileValues.push({
									label : selectedMobileLablel,
									mobile : mobile
								});
								
							}		
							
							
  							
							var customerDetails = {
								
										customerName    : customerName.val(),
										customerAddress : customerAddress.val(),
										customerCompany : customerCompany.val(),
										customerEmail   : JSON.stringify(emailValues),
										customerMobile  : JSON.stringify(mobileValues),
										randomId	    : randomId,
										adminId			: adminId
								
							}
							
							
							var customerModel = new customerDetailsModel(customerDetails);
							
							customerCollections.add(customerModel);
							console.log(customerCollections);	
							
							var singleCustomerView = new customerNameView(customerModel);
							$('#customerNamesContainer').append(singleCustomerView.render().el);
							
							$('#contactFormWrapper .contactForm').remove();

							customerModel.save({},{
								   
								   dataType :  "JSON",
						    	   contentType:'application/json',
						    	   success	:  function(model,xhr,option){
						    		   			console.log("success " + JSON.stringify(xhr));
						    		   			alert("Contact Saved");
						    		   			
						    		   			var customerDetailsShow = new customerDetailsView(customerModel);
						    		   			$('#customerDetailsContainer').html(customerDetailsShow.render().el);
						    					
						    		   			$('#customerName').val(customerDetails.customerName);
						    					$('#customerAddress').val(customerDetails.customerAddress);
						    					$('#customerCompany').val(customerDetails.customerCompany);
						    					$('#primaryEmail').val(emailValues[0].email);
						    					$('#primaryMobile').val(mobileValues[0].mobile);
						    					
						    					if(emailValues.length >1){
						    						
						    						$.each(emailValues,function(key,value){
						    							
						    							var label = value.label;
						    							var email = value.email;
						    							
						    							var emailTemplate =  _.template($('#EmailTemplate').html());
						    							$('#EmailContainer').append(emailTemplate);
						    							$("#EmailContainer div:last input:last").attr('id', 'customerEmail' + id).val(email);
						    							
						    							$('#EmailLabel' ).find("option[value=" + label + "]").attr('selected','selected')



						    						  });
						    						$('#EmailContainer #customerEmailDiv').eq(1).remove();

						    					}
						    					
							    				if(mobileValues.length > 1){
						    						
							    					$.each(mobileValues,function(key,value){
						    							
						    							var label = value.label;
						    							var email = value.mobile;
	
					    							var emailTemplate =  _.template($('#EmailTemplate').html());
					    							$('#MobileContainer').append(emailTemplate);
					    							$("#MobileContainer div:last input:last").attr('id', 'customerMobile' + id).val(mobile);
	
					    						  });
					    						$('#MobileContainer #customerMobileDiv').eq(1).remove();
	
							    				}

						    	   },
						    	   error   : function(model,xhr,option){
						    		   console.log("error " + JSON.stringify(xhr));
						    	   }
								
							});
							
			             }
	
					},
template	    : _.template($('#customerFormTemplate').html()),

initialize	    : 	function () {
    				this.render();
				},

render          : function()
				{
							this.$el.html(this.template());
							return this;
					 
			}

});
