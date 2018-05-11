var id=0;
var id1;
var target;

customerCollections = new customerCollection();

var customerFormView = Backbone.View.extend({

tagName 	   : "div",
className	   : "contactForm modal-content popup",
id			   :'contactFormView',
events 		   : {

					"click .close" : "removeForm",
					"click  #primaryPlus" : "EmailTemplate",
					"click  .emailMinus" : "removeTemplate",
					"click  #saveCustomerButton" : "saveCustomerDetails",
					"click  #primaryMobileAdd" : "mobileTemplate",
					"click  .mobileMinus" :"removeTemplate",
					"change .lable" : "customLabelTemplate",
					"click  #saveCustomValue" : "getNewValue",
					"click  #CancelCustomPopUp" : "RemovecustomLabelTemplate"
				},	
removeForm 		: function(){
	
					 console.log('remove form');
					 $('#contactFormWrapper .contactForm').remove();
						$("#customerPageContainer").removeClass("background_fade");

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
							 
						    
	 						selectTarget = event.target;
							 var id = event.target.id;
							
					          
							 		if($('#contactFormWrapper').has($("#customTemplateContainer")).length ==1) {
									
									return;								
								}else{
									  
									 if(id =='EmailLabel'){
										 var selected    = selectTarget.selectedOptions[0].value;
										 
										 var optionSelected = $("option:selected", this);

									 }else if(id='MobileLabel'){
										 var selected    = selectTarget.selectedOptions[0].value;
									 }
									 
									 if(selected == "customLable"){
										 $("#customerPageContainer").addClass("background_fade");
										 	var customLabel = new customLabelTemplateView();
											$('#customTemplate').append(customLabel.render().el);
										
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
							var emailValues  	 = [];
							var mobileValues 	 = [];
							
							var primaryEmail =  $('#primaryEmail').val();
							var primaryMobile = $('#primaryMobile').val();
							
							

							
							var validateEmail = function (email) {
								
								var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
								return re.test(email);
							}
							
							var validateMobile = function(mobile){
								var pattern =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
								return pattern.test(mobile);
							}
							
							
							var additionalEmails = $('.additionalEmails input');
							
							
							
							if(customerName.val() == ""){
			              	 	alert("please enter the name")
			              	 	$('#customerName').focus();
			              	 }else if(primaryEmail == "" ){
			              	 	alert("please enter the email");
			              	 	$('#primaryEmail').focus();

			              	 }else if(primaryMobile == ""){
			              	 	alert("please enter the mobile num");
			              	 	$('#primaryMobile').focus();

			              	 }else if(!validateEmail(primaryEmail)){
			              		 alert("please enter the valid email address");
			              		 $('#primaryEmail').focus();
			              	 }else if(!validateMobile(primaryMobile)){
			              		 alert("please enter the proper mobile number")
				              	 	$('#primaryMobile').focus();

			              	 }

			              	 
			              	 else{

			    		   			
							var emailContainer= $(' #EmailContainer > #customerEmailDiv');
							
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
							
							var additionalEmailArray = [];
	    					var additionalEmails =  $('#EmailContainer > .additionalEmails');

							for(var i=0;i<additionalEmails.length;i++){
								
								var currentEmailDiv 	= 	additionalEmails[i];
								var email           	= 	currentEmailDiv.querySelector('input').value;
								var label           	= 	currentEmailDiv.querySelector('#EmailLabel');
								var selectedEmailLablel = 	label.options[label.selectedIndex].text;
								
								additionalEmailArray.push({
									label  : selectedEmailLablel,
									email  : email
								});
								
							
							}

							var additionalMobileArray = [];
							var addtionalMobiles	  = $('#MobileContainer > .additionalMobiles');
							
							for(var i=0;i<addtionalMobiles.length;i++){
								
								var currentMobileDiv 	= 	addtionalMobiles[i];
								var mobile           	= 	currentMobileDiv.querySelector('input').value;
								var label           	= 	currentMobileDiv.querySelector('#MobileLabel');
								var selectedMobileLablel = 	label.options[label.selectedIndex].text;
								
								additionalMobileArray.push({
									label  : selectedMobileLablel,
									mobile  : mobile
								});
						
							}
							
							var mobileContainer =  $(' #MobileContainer > #customerMobileDiv');
							
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
												$("#customerPageContainer").removeClass("background_fade");

						    		   			
						    		   			var customerDetailsShow = new customerDetailsView(customerModel);
						    		   			$('#customerDetailsContainer').html(customerDetailsShow.render().el);
						    					
						    		   			$('#customerNameShow'). val(customerDetails.customerName);
						    					$('#customerAddressShow').val(customerDetails.customerAddress);
						    					$('#customerCompanyShow').val(customerDetails.customerCompany);
						    					$('#primaryEmailShow'). val(emailValues[0].email);
						    					$('#primaryMobileShow').val(mobileValues[0].mobile);
						    					
						    					
						    					
							    				var emailLabel = emailValues[0].label;
							    				
							    				if($("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]')!= null){
							    				$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ emailLabel + '"]').setAttribute('selected','selected');		
							    				}else {
							    					$("#EmailContainerDetails div:last #EmailLabelShow").append($("<option  selected='selected' value = " +emailLabel+">"+emailLabel+"</option>"));
							    				}
							    				
							    				var mobileLabel = mobileValues[0].label;

							    				if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]')!= null){
								    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ mobileLabel + '"]').setAttribute('selected','selected');		
								    				}else {
								    					$("#MobileContainerDetails div:last #MobileLabelShow").append($("<option value = " + mobileLabel +">"+mobileLabel +"</option>")).attr('selected','selected');	
								    				}
						    					
						    					
						    					if(additionalEmailArray.length >= 1){
						    						
						    						$.each(additionalEmailArray,function(key,value){
						    							id++;
						    							var label = value.label;
						    							var email = value.email;
						    							
						    							var emailTemplate =  _.template($('#EmailTemplate').html());
						    							$('#EmailContainerDetails').append(emailTemplate);
						    							$("#EmailContainerDetails div:last input:last").attr('id', 'customerEmail' + id).val(email);
						    							
						    							 if($("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]')!= null){
							    			    				$("#EmailContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');		
							    			    				}else {
							    			    					$("#EmailContainerDetails div:last #EmailLabel").append($("<option  selected='selected' value = " +label+">"+label+"</option>"));
							    			    				}   

						    						  });

						    					}
						    					
							    				if(additionalMobileArray.length >= 1){
						    						
							    					$.each(additionalMobileArray,function(key,value){
						    							id++;
						    							var label = value.label;
						    							var mobile = value.mobile;
	
					    							var mobileTemplate =  _.template($('#mobileTemplate').html());
					    							$('#MobileContainerDetails').append(mobileTemplate);
					    							$("#MobileContainerDetails div:last input:last").attr('id', 'customerMobile' + id).val(mobile);
					    							$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');						    							

					    							if($("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]')!= null){
					    			    				$("#MobileContainerDetails div:last")[0].querySelector('option[value="'+ label + '"]').setAttribute('selected','selected');		
					    			    				}else {
					    			    					$("#MobileContainerDetails div:last #MobileLabel").append($("<option  selected='selected' value = " +label+">"+label+"</option>"));
					    			    				}   
	
					    						  });
	
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

var userIconView = Backbone.View.extend({
	
className 	: 'userIconPopup modal-content',
events	 	: {
				"click  #logout" : "logoutFunction",
				"click #forgotPasswordLink" : "forgotPasswordFunction",

			},

logoutFunction : function(){
			console.log("logout clicked");
			$.ajax({
		
				 url : "/logout",
				success : function(value){
					
						console.log("session invalidated");
		   				window.location.href ="/";
		
		   				customerCollection.reset();
		
						$('#customerPage').hide();
		
						},
				failure : function(velue){
					console.log("error while invalidating");
			}
		
});
	
},
forgotPasswordFunction : function(){
						console.log('forgt cl');
						var template     =  _.template($('#forgotPasswordTemplate').html());
						$('#forgotPasswordContainer').html(template());
						$("#customerPageContainer").addClass("background_fade");

	
},
template  	: _.template($('#userIconTemplate').html()),
initialize 	: function(){
				this.render();
},
render   : function(){
	
			var template     =  _.template($('#userIconTemplate').html());
			this.$el.html(template({adminEmail:adminId}));
			return this;
}
	
});




